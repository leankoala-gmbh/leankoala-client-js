const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-11-23
 */
class IncidentRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * Find all open incidents for the given company.
   *
   * request url: /kapi/v1/incident/incidents/company/{company}/search
   * request method: POST
   *
   * @param company
   * @param {Object} args
   */
  async findByCompany(company, args) {
    const route = { path: 'incident/incidents/company/{company}/search', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Find all open incidents for the given project. Optionally it can be filtered by system.
   *
   * request url: /kapi/v1/incident/incidents/{project}/search
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {Number} args.system the system filter (optional)
   */
  async search(project, args) {
    const route = { path: 'incident/incidents/{project}/search', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Find all incidents that where open in the last days.
   *
   * request url: /kapi/v1/incident/incidents/{project}/since
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {Number} args.days The number of days the incidents can old
   */
  async since(project, args) {
    const route = { path: 'incident/incidents/{project}/since', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['days']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Find a single incident by id
   *
   * request url: /kapi/v1/incident/incidents/{project}/{incident}
   * request method: GET
   *
   * @param project
   * @param incident
   * @param {Object} args
   */
  async find(project, incident, args) {
    const route = { path: 'incident/incidents/{project}/{incident}', method: 'GET', version: 1 }
    const argList = Object.assign({ project, incident }, args)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint returns the the configuration (errors_in_a_row, success_in_a_row) of all tools in the
   * given project. It also handles tool inheritance.
   *
   * request url: /kapi/v1/incident/tools/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getConfig(project, args) {
    const route = { path: 'incident/tools/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = IncidentRepository
