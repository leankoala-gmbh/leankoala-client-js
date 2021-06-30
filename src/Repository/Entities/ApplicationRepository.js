const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-06-14
 */
class ApplicationRepository extends Repository {

  /**
   * @param {Object} args
   * @param {String} args.name 
   * @param {String} args.identifier 
   */
  async createApplication(args) {
    const route = { path: '/api/application', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['name', 'identifier']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * @param application
   * @param {Object} args
   */
  async getPrimaryCluster(application, args) {
    const route = { path: '{application}/cluster/primary', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = ApplicationRepository
