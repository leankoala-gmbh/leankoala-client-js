const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-11-22
 */
class CheckA11yRepository extends Repository {

  /**
   * Return all current accessibility audit results for the given systems components.
   *
   * @param system
   * @param {Object} args
   */
  async getResults(system, args) {
    const route = { path: 'check/checks/{system}/a11y/results', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = CheckA11yRepository
