const Connection = require('./Connection/Connection')

const RepositoryCollection = require('./Repository/RepositoryCollection')
const Repository = require('./Repository/Repository')

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
   * @param {String} environment the environment (development|production)
   */
  constructor(environment = 'production') {
    this._connection = false
    this._environment = environment
    this._connectionStatus = 'disconnected'
  }

  /**
   * Connect to the API server and retrieve the JWT for later requests.
   *
   * @param {Object} args
   * @param {String} [args.username] the user name for the user that should be logged in
   * @param {String} [args.password the password for the given user
   * @param {String} [args.wakeUpToken] the wakeup token can be used to log in instead of username and pasword
   * @param {Boolean} [args.withMemories] return the users memory on connect
   */
  async connect(args) {
    this._connectionStatus = 'connecting'
    try {
      await this._initConnection(args)
      this._repositoryCollection = new RepositoryCollection(this._connection)
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
   *
   * @return {String}
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

    const apiServer = this._environment === 'production'
      ? 'https://api.cluster1.koalityengine.com'
      : 'https://stage.monitor.leankoala.com/kapi'

    this._connection = new Connection(apiServer)
    await this._connection.connect(args)
  }

  /**
   * Return the repository by the given name.
   *
   * Throws an exception if the repository is not known.
   *
   * @param entityType
   * @return {Repository}
   */
  async getRepository(entityType) {
    if (this._connectionStatus === 'disconnected') {
      throw new Error('Please connect the client before running this method')
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
   * Sleep for an amount of milliseconds
   *
   * @param milliseconds
   * @return {Promise}
   *
   * @private
   */
  async _sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
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
