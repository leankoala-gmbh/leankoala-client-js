/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-09
 */
class SystemRepository {

  constructor(connection) {
    this._connection = connection
  }

  /**
   * Create a new system.
   *
   * @param {Object} args
   * @param {Number} args.project The project the system should be part of. If the project is not set a new project will be created with the systems name.
   * @param {String} args.name The shops name.
   * @param {Url} args.base_url The shops base url with scheme, subdomain and domain.
   * @param {Number} args.owner The shops owner (id).
   * @param {Number} args.system_type The shops system type (id).
   */
  async createSystem(args) {
    const route = {
      path: 'project/systems/system',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({  }, args)

    // validate arguments
    const requiredArguments = ['name', 'owner', 'system_type']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Set the last full run timestamp on a system.
   *
   * @param system
   */
  async changeLastFullRun(system, args) {
    const route = {
      path: 'project/systems/{system}/lastFullRun',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return the approximated time in seconds when the next full check run is triggered.
   *
   * @param system
   */
  async getNextLastFullRun(system, args) {
    const route = {
      path: 'project/systems/{system}/nextFullRun',
      method: 'GET',
      version: 1
    }

    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return all system types for the given provider.
   *
   * @param providerIdentifier
   */
  async getSystemTypes(providerIdentifier, args) {
    const route = {
      path: 'project/systems/{providerIdentifier}/systemType',
      method: 'GET',
      version: 1
    }

    const argList = Object.assign({ providerIdentifier }, args)

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

module.exports = SystemRepository
