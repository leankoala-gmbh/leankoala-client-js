const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-04-13
 */
class CheckInsecureContentRepository extends Repository {

  /**
   * Return all insecure elements for all components of a system.
   *
   * request url: /kapi/v1/check/checks/{system}/insecure
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getInsecureElements(system, args) {
    const route = { path: 'check/checks/{system}/insecure', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = CheckInsecureContentRepository
