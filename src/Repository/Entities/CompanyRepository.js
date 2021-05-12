const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class CompanyRepository extends Repository {

  /**
   * @param application
   * @param company
   * @param {Object} args
   * @param {Number} args.cluster 
   */
  async setCluster(application, company, args) {
    const route = { path: '/api/{application}/company/{company}', method: 'POST', version: 1 }
    const argList = Object.assign({ application, company }, args)
    const requiredArguments = ['cluster']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = CompanyRepository
