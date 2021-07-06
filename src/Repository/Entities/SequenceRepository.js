const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-07-06
 */
class SequenceRepository extends Repository {

  constructor() {
    super()
    this._connectionType = 'ClusterConnection'
  }

  /**
   * Get a list of possible commands
   *
   * request url: /kapi/v1/sequences/{project}/comands/
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getCommands(project, args) {
    const route = { path: 'sequences/{project}/comands/', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = SequenceRepository
