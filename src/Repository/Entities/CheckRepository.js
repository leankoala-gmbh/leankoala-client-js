const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-08-14
 */
class CheckRepository extends Repository {

  /**
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
   * @param system
   * @param toolIdentifier
   * @param {Object} args
   */
  async runChecksForSystem(system, toolIdentifier, args) {
    const route = { path: 'check/checks/run/{system}/{toolIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ system, toolIdentifier }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = CheckRepository
