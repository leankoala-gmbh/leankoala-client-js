const Connection = require('./Connection/Connection')

const RepositoryCollection = require('./Repository/RepositoryCollection')

/**
 * The KoalityEngine client is used to connect to an instance of the KoalityEngine
 * and process all needed tasks.
 */
class LeankoalaClient {
  constructor(environment = 'production') {

    this._repositories = {}
    this._connection = {}

    this._environment = environment
  }

  async connect(args) {
    await this._initConnection(args)
    this._repositoryCollection = new RepositoryCollection(this._connection)
  }

  isConnected() {
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

  getRepository(entityType) {
    return this._repositoryCollection.getRepository(entityType)
  }

  getUser() {
    return this._connection.getUser()
  }
}

module.exports = LeankoalaClient
