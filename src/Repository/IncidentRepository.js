const assertValidArguments = require('../utils/assertValidArguments')
/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-08
 */
class IncidentRepository {

  constructor(connection) {
    this._connection = connection
  }

  /**
   * Find all open incidents for the given project. Optionally it can be filtered by system.
   *
   * @param project
   * @param {Object} args
   * @param {Number} args.system the system filter
   */
  async search(project, args) {
    const route = {
      path: 'incident/incidents/{project}/search',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({ project }, args)

    // validate arguments
    const requiredArguments = ['system']
    assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Find all incidents that where open in the last days.
   *
   * @param project
   * @param {Object} args
   * @param {Number} args.days The number of days the incidents can old
   */
  async since(project, args) {
    const route = {
      path: 'incident/incidents/{project}/since',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({ project }, args)

    // validate arguments
    const requiredArguments = ['days']
    assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint returns the the configuration (errors_in_a_row, success_in_a_row) of all tools in the given project. It also handles tool inheritance.
   *
   * @param project
   */
  async getConfig(project, args) {
    const route = {
      path: 'incident/tools/{project}',
      method: 'GET',
      version: 1
    }

    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }
}

module.exports = IncidentRepository
