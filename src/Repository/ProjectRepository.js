/**
 * @see
 */
class ProjectRepository {

  constructor(connection) {
    this._connection = connection

    this._routes = {
      'search': {
        version: 1,
        method: 'POST',
        path: 'project/projects/search'
      }
    }
  }

  async search(userId, args) {
    const result = await this._connection.send(this._routes[ 'search' ], {
      'user_id': userId
    })

    return result['projects']
  }
}

module.exports = ProjectRepository
