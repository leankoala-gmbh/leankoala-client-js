const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-08-12
 */
class CheckDeadLinksRepository extends Repository {

  /**
   * Return a list of dead links for every component attached to the given system.
   *
   * @param system
   * @param {Object} args
   */
  async getResults(system, args) {
    const route = { path: 'check/checks/{system}/deadlinks', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return the dead link check configuration for the given system.
   *
   * @param system
   * @param {Object} args
   */
  async getConfiguration(system, args) {
    const route = { path: 'check/checks/{system}/deadlinks/config', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Add a new ignore pattern to the configuration.
   *
   * @param system
   * @param {Object} args
   * @param {String} args.pattern
   */
  async ignorePattern(system, args) {
    const route = { path: 'check/checks/{system}/deadlinks/ignore', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)
    const requiredArguments = ['pattern']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Remove an ignore pattern from the configuration.
   *
   * @param system
   * @param {Object} args
   * @param {Number} args.pattern_id
   */
  async unignorePattern(system, args) {
    const route = { path: 'check/checks/{system}/deadlinks/unignore', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)
    const requiredArguments = ['pattern_id']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = CheckDeadLinksRepository
