const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-21
 */
class CheckRepository extends Repository {

  /**
   * @param system
   * @param {Object} args
   * @param {*} args.checklist 
   * @param {Boolean} args.clear_before 
   * @param {Boolean} args.activate_checks 
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

}

module.exports = CheckRepository
