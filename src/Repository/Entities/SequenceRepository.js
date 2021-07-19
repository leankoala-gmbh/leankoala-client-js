const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-07-19
 */
class SequenceRepository extends Repository {

  constructor() {
    super()
    this._connectionType = 'ClusterConnection'
  }

  /**
   * Get a list of possible commands
   *
   * request url: /kapi/v1/sequences/{project}/commands
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getCommands(project, args) {
    const route = { path: 'sequences/{project}/commands', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Get a list of possible commands
   *
   * request url: /kapi/v1/sequences/{project}/sequences
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getSequences(project, args) {
    const route = { path: 'sequences/{project}/sequences', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Create a new sequence.
   *
   * request url: /kapi/v1/sequences/{project}/sequence
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {String} args.name
   * @param {String} args.startUrl
   * @param {Array} args.steps  (optional)
   */
  async createSequence(project, args) {
    const route = { path: 'sequences/{project}/sequence', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['name', 'startUrl']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Update an existing sequence
   *
   * request url: /kapi/v1/sequences/{project}/sequence
   * request method: PUT
   *
   * @param project
   * @param {Object} args
   * @param {String} args.name  (optional)
   * @param {String} args.startUrl  (optional)
   * @param {Array} args.steps  (optional)
   */
  async updateSequence(project, args) {
    const route = { path: 'sequences/{project}/sequence', method: 'PUT', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = SequenceRepository
