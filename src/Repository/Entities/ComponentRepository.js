const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class ComponentRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * Show all existing component types.
   *
   * request url: /kapi/v1/project/components/componenttypes/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async showComponentTypes(project, args) {
    const route = { path: 'project/components/componenttypes/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Get all information about the given component.
   *
   * request url: /kapi/v1/project/components/{component}
   * request method: GET
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
   * request url: /kapi/v1/project/components
   * request method: POST
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
   * Create a set of new components for a given system.
   *
   * request url: /kapi/v1/project/components/many
   * request method: POST
   *
   * @param {Object} args
   * @param {Number} args.system The system the components are part of,
   * @param {Boolean} args.enableToolsBySystem If true all checks from the parent system are inherited. (default: true)
   * @param {Boolean} args.updateIfComponentSuggestionExists If true and a component with the same
   *                                                         suggestion id already exists it will be
   *                                                         updated. (default: false)
   * @param {Array} args.components List of components that should be created/updated.
   */
  async createComponents(args) {
    const route = { path: 'project/components/many', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['system', 'components']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Update the given component.
   *
   * request url: /kapi/v1/project/components/{component}
   * request method: PUT
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
   * request url: /kapi/v1/project/components/{component}
   * request method: DELETE
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
