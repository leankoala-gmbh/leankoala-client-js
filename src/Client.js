const Connection = require('./Connection/Connection')

const RepositoryCollection = require('./Repository/RepositoryCollection')

/**
 * The KoalityEngine client is used to connect to an instance of the KoalityEngine
 * and process all needed tasks.
 *
 * @created 2020-07-05
 */
class LeankoalaClient {

  /**
   * Create a client and set the environment
   *
   * @param {String} environment the environment (stage|production)
   */
  constructor(environment = 'production') {
    this._connection = false
    this._environment = environment
  }

  /**
   * Connect to the API server and retrieve the JWT for later requests.
   *
   * @param {Object} args
   * @param {String} args.username the user name for the user that should be logged in
   * @param {String} args.password the password for the given user
   * @param {String} args.wakeUpToken the wakeup token can be used to log in instead of username and pasword
   *
   * @return {Promise<void>}
   */
  async connect(args) {
    await this._initConnection(args)
    this._repositoryCollection = new RepositoryCollection(this._connection)
  }

  /**
   * Return true if the client has valid and not expired refresh tokens.
   *
   * @return {boolean}
   */
  isConnected() {
    if (this._connection === false) {
      return false
    }

    return Date.now() < this._connection.getExpireDate()
  }

  /**
   * Return the current refresh token.
   *
   * It can be used to reactivate the connection without using the username and
   * password.
   */
  getWakeUpToken() {
    return this._connection.getWakeUpToken()
  }

  /**
   * Initialize the connection object and connect to the server
   *
   * @param args see connection function
   *
   * @private
   */
  async _initConnection(args) {

    let apiServer = ''
    if (this._environment === 'stage') {
      apiServer = 'https://stage.monitor.leankoala.com/kapi'
    } else {
      apiServer = 'https://api.cluster1.koalityengine.com'
    }

    this._connection = new Connection(apiServer)
    await this._connection.connect(args)
  }

  /**
   * Return the repository by the given name.
   *
   * Throws an exception if the repository is not known.
   *
   * @param entityType
   * @return {undefined}
   */
  getRepository(entityType) {
    return this._repositoryCollection.getRepository(entityType)
  }

  /**
   * Return the current user
   *
   * @return {Object}
   */
  getUser() {
    return this._connection.getUser()
  }
}

module.exports = LeankoalaClient
