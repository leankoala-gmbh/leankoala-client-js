const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-09
 */
class CheckRepository extends Repository {

  /**
   * Return all current lighthouse results for the given systems components.
   *
   * @param system
   * @param category
   * @param {Object} args
   * @param {*} args.targetGroup The target group. It can be either an integer or an string.
   * @param {Boolean} args.use_cache Use the cache for json document fetch
   */
  async getResults(system, category, args) {
    const route = { path: 'check/checks/{system}/lighthouse/results/{category}', method: 'GET', version: 1 }
    const argList = Object.assign({ system, category }, args)

    return this._connection.send(route, argList)
  }
  /**
   * This endpoint returns a list of domains that set cookies for the given system. As array elements it adds the components on that the domain sets the cookies. IMPORTANT: The leankoala worker is blocking some tracking integrations. So there will never be, for example, a Google Analytics cookie set.
   *
   * @param system
   */
  async getDomains(system, args) {
    const route = { path: 'check/checks/{system}/cookies/domains', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }
}

module.exports = CheckRepository
