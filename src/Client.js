const Connection = require('./Connection/Connection')

const RepositoryCollection = require('./Repository/RepositoryCollection')

const ENVIRONMENT_LOCAL = 'local'
const ENVIRONMENT_STAGE = 'stage'
const ENVIRONMENT_PRODUCTION = 'production'

const SERVER_LOCAL = 'http://localhost:8082/'
const SERVER_STAGE = 'https://auth.stage.koalityengine.com/'
const SERVER_PRODUCTION = 'https://api.cluster1.koalityengine.com/'

/**
 * The KoalityEngine client is used to connect to an instance of the KoalityEngine
 * and process all needed tasks.
 *
 * @author Nils Langner (nils.langner@leankoala.com)
 * @created 2020-07-05
 */
class LeankoalaClient {

  /**
   * Create a client and set the environment
   *
   * @param {String} environment the environment (development|production)
   */
  constructor(environment = 'production') {
    this._clusterConnection = false
    this._masterConnection = false

    this._user = {}
    this._companies = {}
    this._currentCompany = false

    this._axios = false

    this._environment = environment
    this._connectionStatus = 'disconnected'
    this._registeredEventListeners = {};

    this._masterToken = '';

    this._routes = {
      masterRefresh: {
        version: 1,
        path: '{application}/auth/refresh/{user}',
        method: 'POST'
      },
      clusterRefresh: {
        version: 1,
        path: 'auth/tokens/refresh/{user_id}',
        method: 'POST'
      }
    }
  }

  /**
   * Connect to the API server and retrieve the JWT for later requests.
   *
   * @param {Object} args
   * @param {String} [args.username] the user name for the user that should be logged in
   * @param {String} [args.password the password for the given user
   * @param {String} [args.wakeUpToken] the wakeup token can be used to log in instead of username and pasword
   * @param {Boolean} [args.withMemories] return the users memory on connect
   * @param {String} [args.language] the preferred language (default: en; implemented: de, en)
   * @param {Object} [args.axiosAdapter] the preferred language (default: en; implemented: de, en)
   * @param {Object} [args.autoSelectCompany] auto select the company (and cluster) (default: false)
   *
   * @param {function} [args.axios] a predefined axios instance
   */
  async connect(args) {
    args.autoSelectCompany = args.autoSelectCompany | false
    this._connectionStatus = 'connecting'
    try {
      this._repositoryCollection = new RepositoryCollection()
      await this._initConnection(args)
    } catch (error) {
      this._connectionStatus = 'disconnected'
      throw error
    }

    this._connectionStatus = 'connected'
  }

  /**
   * Return true if the client has valid and not expired refresh tokens.
   *
   * @return {boolean}
   */
  isConnected() {
    if (this._masterConnection === false) {
      return false
    }

    return Math.floor(Date.now() / 1000) < this._masterConnection.getExpireDate()
  }

  /**
   * Set the preferred language for the API results.
   *
   * The language can already be added when connecting.
   *
   * @param {String} language
   */
  setLanguage(language) {
    this._masterConnection.setLanguage(language)
    if (this._clusterConnection) {
      this._clusterConnection.setLanguage(language)
    }
  }

  /**
   * Return the current refresh token.
   *
   * It can be used to reactivate the connection without using the username and
   * password.
   *
   * @return {String}
   */
  getWakeUpToken() {
    let tokenObject = {
      'master': this._masterConnection.getWakeUpToken(),
      'company': this._currentCompany,
      'user': this.getUser()
    }

    if (this._clusterConnection) {
      tokenObject.cluster = this._clusterConnection.getWakeUpToken()
    } else {
      tokenObject.cluster = ''
    }

    return JSON.stringify(tokenObject)
  }

  /**
   * Initialize the connection object and connect to the server
   *
   * @param {Object} args see connect function
   *
   * @private
   */
  async _initConnection(args) {
    this._axios = args.axios

    if (args.hasOwnProperty('wakeUpToken')) {
      await this._initConnectionViaWakeUpToken(args)
    } else if (args.hasOwnProperty('accessToken')) {
      await this._initConnectionViaMasterTokens(args)
    } else {
      await this._initConnectionViaCredentials(args)
    }

    this._registerConnectionListeners()
  }

  /**
   * Initialize the connection using a wake up token.
   *
   * @param {Object} args
   *
   * @returns {Promise<void>}
   *
   * @private
   */
  async _initConnectionViaWakeUpToken(args) {

    const wakeUpToken = JSON.parse(args.wakeUpToken)
    this._masterUser = wakeUpToken.user
    this._currentCompany = wakeUpToken.company

    this._masterConnection = new Connection(this._getMasterServer(), args.axios)

    let masterConnectionArgs = args
    let masterWakeUpToken = wakeUpToken.master
    masterWakeUpToken.user.id = this._masterUser.masterId
    masterConnectionArgs.wakeUpToken = JSON.stringify(masterWakeUpToken)
    this._masterConnection.setRefreshRoute(this._routes.masterRefresh)
    await this._masterConnection.connect(masterConnectionArgs)
    this._repositoryCollection.setMasterConnection(this._masterConnection)

    if (wakeUpToken.company) {
      this._clusterConnection = new Connection(wakeUpToken.company.cluster.apiEndpoint, args.axios)
      this._clusterConnection.setRefreshRoute(this._routes.clusterRefresh)
      let clusterConnectionArgs = args
      clusterConnectionArgs.wakeUpToken = JSON.stringify(wakeUpToken.cluster)
      await this._clusterConnection.connect(clusterConnectionArgs)
      this._repositoryCollection.setClusterConnection(this._clusterConnection)
    }
  }

  async _initConnectionViaCredentials(args) {
    const apiServer = this._getMasterServer(this._environment)

    if (!args.hasOwnProperty('axios')) {
      throw new Error('Missing parameter axios. The HTTP client must be injected.')
    }

    this._axios = args['axios']

    if (typeof this._axios !== 'function') {
      throw new Error('The axios argument is not a function. Seems like it is not a valid axios object,')
    }

    this._masterConnection = new Connection(apiServer, this._axios)

    const route = {version: 1, path: '{application}/auth/login', method: 'POST'}

    const withMemories = Boolean(args.withMemories | false)

    const result = await this._masterConnection.send(route, {
      emailOrUserName: args.username,
      password: args.password,
      'application': 'koality',
      withMemories
    }, true)

    this._masterToken = result.token
    this._refrehToken = result.refreshToken

    this._masterUser = result.user
    this._masterConnection.setUser(result.user)

    this._masterUser['masterId'] = result.user.id

    if (result.memories) {
      this._masterUser['memories'] = result.memories
    }
    this._companies = result.companies

    this._masterConnection.setAccessToken(this._masterToken, this._refrehToken);
    this._repositoryCollection.setMasterConnection(this._masterConnection)

    if (args.autoSelectCompany) {
      await this._autoSelectCompany()
    }
  }

  async _initConnectionViaMasterTokens(args) {
    this._masterConnection = new Connection(this._getMasterServer(), args.axios);
    this._masterConnection.setAccessToken(args.accessToken, args.refreshToken)
    this._masterToken = args.accessToken
    if (args.hasOwnProperty('user')) {
      this._masterConnection.setUser(args.user)
      this._user = args.user
      this._user.masterId = args.user.id
      this._masterUser = args.user
      this._companies = args.user.companies
    }

    this._repositoryCollection.setMasterConnection(this._masterConnection)

    if (args.autoSelectCompany) {
      await this._autoSelectCompany()
    }

  }

  async _autoSelectCompany() {
    if (this._companies.length === 0) {
      throw new Error('Unable to auto select the company. User is not connected to any.')
    }
    const company = this._companies[0]
    await this.switchCompany(company.id)
  }

  async switchCompany(companyId) {
    const client = this
    let currentCompany
    this._companies.forEach(function (company) {
      if (company.id === companyId) {
        currentCompany = company
      }
    })

    if (currentCompany) {
      await client._switchCluster(currentCompany.cluster)
      this._currentCompany = currentCompany
    } else {
      throw new Error('Unable to select the company. Company id not connected to user.')
    }
  }

  async _switchCluster(cluster) {
    this._clusterConnection = new Connection(cluster.apiEndpoint, this._axios)
    this._repositoryCollection.setClusterConnection(this._clusterConnection)
    this._clusterConnection.addDefaultParameter('masterUserId', this._masterUser.id)

    await this._clusterConnection.connect({loginToken: this._masterToken})

    const clusterUser = this._clusterConnection.getUser()
    this._masterUser['clusterId'] = clusterUser['id']
    this._masterUser['id'] = clusterUser['id']
  }

  _getMasterServer() {
    let apiServer
    switch (this._environment) {
      case ENVIRONMENT_LOCAL:
        apiServer = SERVER_LOCAL
        break
      case ENVIRONMENT_STAGE:
        apiServer = SERVER_STAGE
        break
      case ENVIRONMENT_PRODUCTION:
        apiServer = SERVER_PRODUCTION
        break
      default:
        throw new Error('The given environment "' + this._environment + '" is unknown.')
    }
    return apiServer
  }

  /**
   * Register all known connections listeners.
   *
   * @private
   */
  _registerConnectionListeners() {
    const masterConnection = this._masterConnection
    const clusterConnection = this._clusterConnection

    const listeners = this._registeredEventListeners

    Object.keys(listeners).forEach((key) => {
      listeners[key].forEach((element) => {
        masterConnection.on(key, element)
        if (clusterConnection) {
          clusterConnection.on(key, element)
        }
      })
    })
  }

  /**
   * Return the repository by the given name.
   *
   * Throws an exception if the repository is not known.
   *
   * @param {String} entityType
   *
   * @return {Repository}
   *
   * @throws {Error}
   */
  async getRepository(entityType) {
    if (this._connectionStatus === 'disconnected') {
      throw new Error('Please connect the client before running this method.')
    }

    if (this._connectionStatus === 'connected') {
      return this._repositoryCollection.getRepository(entityType)
    }

    if (this._connectionStatus === 'connecting') {
      while (this._connectionStatus === 'connecting') {
        await this._sleep(300)
      }
      return this.getRepository(entityType)
    }
  }

  /**
   * Sleep for an amount of milliseconds.
   *
   * @param {Number} milliseconds
   * @return {Promise}
   *
   * @private
   */
  async _sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  /**
   * Return the current cluster user.
   *
   * @return {Object}
   */
  getUser() {
    if (!this._masterUser) {
      throw new Error('No user found. Please run connect() to login in.')
    }
    return this._masterUser
  }

  getCompany() {
    return this._currentCompany
  }

  /**
   * Register event handler.
   *
   * @param {String} eventName
   * @param {CallableFunction} callback
   */
  on(eventName, callback) {
    if (!this._registeredEventListeners.hasOwnProperty(eventName)) {
      this._registeredEventListeners[eventName] = []
    }
    this._registeredEventListeners[eventName].push(callback)

    if (this._masterConnection) {
      this._masterConnection.on(eventName, callback)
    }

    if (this._clusterConnection) {
      this._clusterConnection.on(eventName, callback)
    }
  }

  /**
   * Return all resolved promises.
   *
   * @param promises
   * @returns Object
   */
  async fetchAll(promises) {
    const promiseArray = []
    const results = {}
    let count = 0;

    Object.keys(promises).forEach((element) =>
      promiseArray.push(promises[element])
    )

    const promiseResults = await Promise.allSettled(promiseArray);

    Object.keys(promises).forEach((element) => {
        results[element] = promiseResults[count].value
        count++
      }
    )

    return results
  }

  /**
   * Return true if the wake up token is expired.
   *
   * A wake up token is expired if the refresh token is expired.
   *
   * @param {string} token
   * @returns {boolean}
   */
  isWakeUpTokenExpired(token) {
    const {master, cluster} = JSON.parse(token)

    const time = Math.floor(new Date().getTime() / 1000)

    /** @todo this should be done in the connection  **/
    if (!cluster || cluster.expireDate < time) {
      return true
    }

    if (!master || master.expireDate < time) {
      return true
    }

    return false
  }
}

module.exports = LeankoalaClient
