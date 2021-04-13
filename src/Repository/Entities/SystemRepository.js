const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-04-13
 */
class SystemRepository extends Repository {

  /**
   * Create a new system.
   *
   * @param {Object} args
   * @param {Number} args.project The project the system should be part of. If the project is not set a
   *                               new project will be created with the systems name. (optional)
   * @param {Boolean} args.add_standard_alerting If true add a standard channel and alerting policy for
   *                                             the owner. (default: false)
   * @param {String} args.name The shops name.
   * @param {Url} args.base_url The shops base url with scheme, subdomain and domain.
   * @param {Number} args.owner The shops owner (id).
   * @param {Number} args.system_type The shops system type (id).
   * @param {Boolean} args.add_checklist_checks If true all checks of the checklist connected to the main
   *                                            system type are added. (default: true)
   * @param {Boolean} args.add_support_user Add the support user for support requests (default: true)
   */
  async createSystem(args) {
    const route = { path: 'project/systems/system', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['name', 'base_url', 'owner', 'system_type']
    this._assertValidArguments(requiredArguments, argList)

    const result = await this._connection.send(route, argList)
    await this._connection.refreshAccessToken(true)
    return result
  }

  /**
   * Update an existing system.
   *
   * @param system
   * @param {Object} args
   * @param {String} args.name The shops name. (optional)
   * @param {Url} args.base_url The shops base url with scheme, subdomain and domain. (optional)
   */
  async updateSystem(system, args) {
    const route = { path: 'project/systems/system/{system}', method: 'PUT', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
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
    const route = { path: 'project/systems/{system}/suggestions', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Set the last full run timestamp on a system.
   *
   * @param system
   * @param status
   * @param {Object} args
   */
  async changeLastFullRun(system, status, args) {
    const route = { path: 'project/systems/{system}/lastFullRun/{status}', method: 'POST', version: 1 }
    const argList = Object.assign({ system, status }, args)

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

  /**
   * Return the maximum number of components that can be added to the given system.
   *
   * @param system
   * @param {Object} args
   */
  async getComponentLimit(system, args) {
    const route = { path: 'project/systems/{system}/component/limit', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Trigger the component finder for a given system.
   *
   * @param project
   * @param system
   * @param user
   * @param {Object} args
   */
  async triggerComponentFinder(project, system, user, args) {
    const route = { path: 'project/{project}/componentfinder/{system}/{user}/trigger', method: 'POST', version: 1 }
    const argList = Object.assign({ project, system, user }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = SystemRepository
