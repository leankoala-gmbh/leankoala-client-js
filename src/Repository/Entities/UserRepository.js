const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-10
 */
class UserRepository extends Repository {

  /**
   * @param application
   * @param {Object} args
   * @param {String} args.userName 
   * @param {String} args.email 
   * @param {String} args.password 
   * @param {Number} args.company  (optional)
   */
  async createUser(application, args) {
    const route = { path: '/api/{application}/user', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['userName', 'email', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = UserRepository
