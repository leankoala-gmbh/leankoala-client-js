const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-08-14
 */
class ComponentRepository extends Repository {

  /**
   * Show all existing component types.
   * @param {Object} args
   */
  async showComponentTypes(args) {
    const route = { path: 'project/components/systemtypes', method: 'GET', version: 1 }
    const argList = Object.assign({  }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Get all information about the given component.
   *
   * @param component
   * @param {Object} args
   */
  async showComponents(component, args) {
    const route = { path: 'project/components/{component}', method: 'GET', version: 1 }
    const argList = Object.assign({ component }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Create a new component.
   *
   * @param {Object} args
   * @param {Number} args.system 
   * @param {Boolean} args.enableToolsBySystem  (default: true)
   */
  async createComponent(args) {
    const route = { path: 'project/components', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['system']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Update the given component.
   *
   * @param component
   * @param {Object} args
   */
  async updateComponent(component, args) {
    const route = { path: 'project/components/{component}', method: 'PUT', version: 1 }
    const argList = Object.assign({ component }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Mark the given component as deleted.
   *
   * @param component
   * @param {Object} args
   */
  async deleteComponent(component, args) {
    const route = { path: 'project/components/{component}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ component }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = ComponentRepository
