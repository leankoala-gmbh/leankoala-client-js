/**
 * @see https://documenter.getpostman.com/view/2826736/SzKTvJDq?version=latest
 */
class IncidentRepository {

  constructor(connection) {
    this._connection = connection

    this._routes = {
      'findByProject': {
        version: 1,
        method: 'POST',
        path: '/incident/incidents/{{project}}/search'
      }
    }
  }

  async search(args) {
    const route = this._routes['findByProject']
    const result = await this._connection.send(route, args)

    return result['projects']
  }
}

module.exports = IncidentRepository
