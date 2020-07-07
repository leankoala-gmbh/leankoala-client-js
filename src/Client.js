const Connection = require('./Connection/Connection')

const IncidentRepository = require('./Repository/IncidentRepository')
const ProjectRepository = require('./Repository/ProjectRepository')

/**
 *
 */
class LeankoalaClient {
  constructor() {

    this._repositories = {}
    this._connection = {}
  }

  async connect(username, password) {
    await this._initConnection(username, password)
    this._initRepositories()
  }

  _initRepositories() {
    this._repositories[ 'incident' ] = new IncidentRepository(this._connection)
    this._repositories[ 'project' ] = new ProjectRepository(this._connection)
  }

  async _initConnection(username, password) {
    this._connection = new Connection()
    await this._connection.connect({ username, password })
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
