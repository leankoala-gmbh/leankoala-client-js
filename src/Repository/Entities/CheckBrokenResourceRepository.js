const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class CheckBrokenResourceRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * request url: /kapi/v1/check/checks/{system}/brokenresources
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getBrokenResources(system, args) {
    const route = { path: 'check/checks/{system}/brokenresources', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = CheckBrokenResourceRepository
