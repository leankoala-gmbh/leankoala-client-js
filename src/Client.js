const Connection = require('./Connection/Connection')

const CheckRepository = require('./Repository/CheckRepository')
const CrawlerRepository = require('./Repository/CrawlerRepository')
const IncidentRepository = require('./Repository/IncidentRepository')
const MemoryRepository = require('./Repository/MemoryRepository')
const ScoreRepository = require('./Repository/ScoreRepository')
const UserRepository = require('./Repository/UserRepository')
const ProjectRepository = require('./Repository/ProjectRepository')

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
    this._initRepositories()
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

  _initRepositories() {
    this._repositories[ 'project' ] = new ProjectRepository(this._connection)
    this._repositories[ 'check' ] = new CheckRepository(this._connection)
    this._repositories[ 'crawler' ] = new CrawlerRepository(this._connection)
    this._repositories[ 'memory' ] = new MemoryRepository(this._connection)
    this._repositories[ 'incident' ] = new IncidentRepository(this._connection)
    this._repositories[ 'score' ] = new ScoreRepository(this._connection)
    this._repositories[ 'user' ] = new UserRepository(this._connection)
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
    const repositoryName = entityType.toLowerCase()
    if (this._repositories.hasOwnProperty(repositoryName)) {
      return this._repositories[ repositoryName ]
    } else {
      throw new Error('No repository with name ' + repositoryName + ' found. Registered repositories are: ' + JSON.stringify(Object.keys(this._repositories)))
    }
  }

  getUser() {
    return this._connection.getUser()
  }
}

module.exports = LeankoalaClient
