const CrawlerRepository = require('./Entities/CrawlerRepository')
const MemoryRepository = require('./Entities/MemoryRepository')
const ScoreRepository = require('./Entities/ScoreRepository')
const WebsocketRepository = require('./Entities/WebsocketRepository')
const MetricRepository = require('./Entities/MetricRepository')
const UserRepository = require('./Entities/UserRepository')
const ProjectRepository = require('./Entities/ProjectRepository')
const SystemRepository = require('./Entities/SystemRepository')
const CheckRepository = require('./Entities/CheckRepository')
const IncidentRepository = require('./Entities/IncidentRepository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 *  @created 2020-07-09
 */
class RepositoryCollection {

  constructor(connection) {

    this._repositories = {}
    this._repositories[ 'crawler' ] = new CrawlerRepository(connection)
    this._repositories[ 'memory' ] = new MemoryRepository(connection)
    this._repositories[ 'score' ] = new ScoreRepository(connection)
    this._repositories[ 'websocket' ] = new WebsocketRepository(connection)
    this._repositories[ 'metric' ] = new MetricRepository(connection)
    this._repositories[ 'user' ] = new UserRepository(connection)
    this._repositories[ 'project' ] = new ProjectRepository(connection)
    this._repositories[ 'system' ] = new SystemRepository(connection)
    this._repositories[ 'check' ] = new CheckRepository(connection)
    this._repositories[ 'incident' ] = new IncidentRepository(connection)

  }

  getRepository(entityType) {

    const repositoryName = entityType.toLowerCase()
    if (this._repositories.hasOwnProperty(repositoryName)) {
      return this._repositories[ repositoryName ]
    } else {
      throw new Error('No repository with name ' + repositoryName + ' found. Registered repositories are: ' + JSON.stringify(Object.keys(this._repositories)))
    }

  }
}

module.exports = RepositoryCollection
