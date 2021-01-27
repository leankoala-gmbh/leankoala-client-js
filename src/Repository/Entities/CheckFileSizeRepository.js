const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-01-27
 */
class CheckFileSizeRepository extends Repository {

  /**
   * @param system
   * @param {Object} args
   */
  async getResults(system, args) {
    const route = { path: 'check/checks/{system}/performance/big', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Add a new ignore pattern to the configuration.
   *
   * @param system
   * @param {Object} args
   * @param {Array} args.patterns List of URLs (strings) that will be excluded from the dead link crawl
   */
  async ignorePattern(system, args) {
    const route = { path: 'check/checks/{system}/siteinfo/ignore', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)
    const requiredArguments = ['patterns']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = CheckFileSizeRepository
