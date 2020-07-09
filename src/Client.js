import Connection from './Connection/Connection'
import IncidentRepository from './Repository/IncidentRepository'
import ProjectRepository from './Repository/ProjectRepository'
import CheckRepository from './Repository/CheckRepository'
import CrawlerRepository from './Repository/CrawlerRepository'
import MetricRepository from './Repository/MetricRepository'
import MemoryRepository from './Repository/MemoryRepository'
import ScoreRepository from './Repository/ScoreRepository'
import UserRepository from './Repository/UserRepository'

/**
 * LeankoalaClient
 */
export default class {
  constructor(environment = 'production') {

    this._repositories = {}
    this._connection = {}

    this._environment = environment
  }

  async connect(args) {
    await this._initConnection(args)
    this._initRepositories()
  }

  _initRepositories() {
    this._repositories[ 'project' ] = new ProjectRepository(this._connection)
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
