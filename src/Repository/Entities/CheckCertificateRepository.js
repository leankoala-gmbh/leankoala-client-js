const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-04-13
 */
class CheckCertificateRepository extends Repository {

  /**
   * request url: /kapi/v1/check/checks/{system}/certificate
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getExpirationResults(system, args) {
    const route = { path: 'check/checks/{system}/certificate', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = CheckCertificateRepository
