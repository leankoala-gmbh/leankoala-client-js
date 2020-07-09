const _assertValidArguments = require('../utils')
/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-08
 */
class CheckRepository {

  constructor(connection) {
    this._connection = connection
  }

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
    const route = {
      path: 'check/checks/{system}/lighthouse/results/{category}',
      method: 'GET',
      version: 1
    }

    const argList = Object.assign({ system, category }, args)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint returns a list of domains that set cookies for the given system. As array elements it adds the components on that the domain sets the cookies. IMPORTANT: The leankoala worker is blocking some tracking integrations. So there will never be, for example, a Google Analytics cookie set.
   *
   * @param system
   */
   async getDomains(system, args) {
    const route = {
      path: 'check/checks/{system}/cookies/domains',
      method: 'GET',
      version: 1
    }

    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Throw an exception if a mandatory argument is not set.
   *
   * @param requiredArguments
   * @param actualArguments
   * @private
   *
   * @todo this should be done in a parent class
   */
  _assertValidArguments(requiredArguments, actualArguments) {
    requiredArguments.forEach(function (argument) {
      if (!actualArguments.hasOwnProperty(argument)) {
        throw new Error('The mandatory argument ' + argument + ' could not be found in the argument object.')
      }
    })
  }
}

module.exports = CheckRepository
