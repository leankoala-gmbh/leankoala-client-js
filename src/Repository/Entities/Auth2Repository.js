const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-06-14
 */
class Auth2Repository extends Repository {

  /**
   * @param application
   * @param {Object} args
   * @param {String} args.emailOrUserName 
   * @param {String} args.password 
   * @param {Boolean} args.withMemories If true all Memory entities will be attached in the answer. (default: false)
   */
  async loginWithCredentials(application, args) {
    const route = { path: '/v1/{application}/auth/login', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['emailOrUserName', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Create a valid access token by the given refresh token.
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {Boolean} args.with_memories If true all Memory entities will be attached in the answer. (default: false)
   */
  async createTokenByRefreshToken(application, user, args) {
    const route = { path: '/v1/{application}/auth/refresh/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Create a valid access token.
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {Boolean} args.with_memories If true all Memory entities will be attached in the answer. (default: false)
   */
  async createToken(application, user, args) {
    const route = { path: '/v1/{application}/auth/token/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = Auth2Repository
