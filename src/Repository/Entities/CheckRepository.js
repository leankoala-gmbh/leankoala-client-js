const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class CheckRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * request url: /kapi/v1/check/checks/{system}/checklist
   * request method: POST
   *
   * @param system
   * @param {Object} args
   * @param {*} args.checklist 
   * @param {Boolean} args.clear_before  (default: true)
   * @param {Boolean} args.activate_checks  (default: false)
   */
  async addByChecklist(system, args) {
    const route = { path: 'check/checks/{system}/checklist', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)
    const requiredArguments = ['checklist']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * request url: /kapi/v1/check/checks/cookbook
   * request method: POST
   *
   * @param {Object} args
   * @param {Number} args.component 
   * @param {Number} args.cookbook 
   */
  async addByRecipe(args) {
    const route = { path: 'check/checks/cookbook', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['component', 'cookbook']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Run checks defined by tool identifier for all components within this system.
   *
   * request url: /kapi/v1/check/checks/run/{system}/{toolIdentifier}
   * request method: POST
   *
   * @param system
   * @param toolIdentifier
   * @param {Object} args
   */
  async runChecksForSystem(system, toolIdentifier, args) {
    const route = { path: 'check/checks/run/{system}/{toolIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ system, toolIdentifier }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return a list of collections for the given project.
   *
   * request url: /kapi/v1/check/collections/{project}/{toolIdentifier}
   * request method: POST
   *
   * @param project
   * @param toolIdentifier
   * @param {Object} args
   * @param {String} args.group The collection group. It is used to specify the collections. (default: )
   */
  async showCollections(project, toolIdentifier, args) {
    const route = { path: 'check/collections/{project}/{toolIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ project, toolIdentifier }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return a list of active collections for the given system.
   *
   * request url: /kapi/v1/check/collections/system/active/{system}/{toolIdentifier}
   * request method: POST
   *
   * @param system
   * @param toolIdentifier
   * @param {Object} args
   * @param {String} args.group The collection group. It is used to specify the collections. (default: )
   */
  async showActiveCollections(system, toolIdentifier, args) {
    const route = { path: 'check/collections/system/active/{system}/{toolIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ system, toolIdentifier }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Update the collections. WARNING: will delete the current collection connections and create new.
   *
   * request url: /kapi/v1/check/collections/system/{system}
   * request method: PUT
   *
   * @param system
   * @param {Object} args
   * @param {Array} args.collections  (optional)
   * @param {String} args.group The collection group. It is used to specify the collections. (default: )
   */
  async updateCollections(system, args) {
    const route = { path: 'check/collections/system/{system}', method: 'PUT', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = CheckRepository
