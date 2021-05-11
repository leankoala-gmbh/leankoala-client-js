const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-10
 */
class Auth2Repository extends Repository {

  /**
   * @param application
   * @param {Object} args
   * @param {String} args.emailOrUserName 
   * @param {String} args.password 
   */
  async loginWithCredentials(application, args) {
    const route = { path: '/{application}/auth/login', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['emailOrUserName', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = Auth2Repository
