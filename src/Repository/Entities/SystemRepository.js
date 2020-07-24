const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-24
 */
class SystemRepository extends Repository {

  /**
   * Create a new system.
   *
   * @param {Object} args
   * @param {Number} args.project The project the system should be part of. If the project is not set a
   *                               new project will be created with the systems name.
   * @param {String} args.name The shops name.
   * @param {Url} args.base_url The shops base url with scheme, subdomain and domain.
   * @param {Number} args.owner The shops owner (id).
   * @param {Number} args.system_type The shops system type (id).
   * @param {Boolean} args.add_checklist_checks If true all checks of the checklist connected to the main
   *                                            system type are added.
   */
  async createSystem(args) {
    const route = { path: 'project/systems/system', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['name', 'owner', 'system_type']
    this._assertValidArguments(requiredArguments, argList)

    const result = await this._connection.send(route, argList)
    await this._connection.refreshAccessToken(true)
    return result
  }

  /**
   * Return all components for the given system.
   *
   * @param system
   * @param {Object} args
   */
  async getComponents(system, args) {
    const route = { path: 'project/systems/{system}/components', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return all suggested component types for the given system.
   *
   * @param system
   * @param {Object} args
   */
  async getComponentSuggestions(system, args) {
    const route = { path: 'project/systems/{system}/suggestions', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Set the last full run timestamp on a system.
   *
   * @param system
   * @param {Object} args
   */
  async changeLastFullRun(system, args) {
    const route = { path: 'project/systems/{system}/lastFullRun', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return the approximated time in seconds when the next full check run is triggered.
   *
   * @param system
   * @param {Object} args
   */
  async getNextLastFullRun(system, args) {
    const route = { path: 'project/systems/{system}/nextFullRun', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return all system types for the given provider.
   *
   * @param providerIdentifier
   * @param {Object} args
   */
  async getSystemTypes(providerIdentifier, args) {
    const route = { path: 'project/systems/{providerIdentifier}/systemType', method: 'GET', version: 1 }
    const argList = Object.assign({ providerIdentifier }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = SystemRepository
