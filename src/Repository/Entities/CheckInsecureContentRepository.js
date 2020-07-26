const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-26
 */
class CheckInsecureContentRepository extends Repository {

  /**
   * Return all insecure elements for all components of a system.
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
