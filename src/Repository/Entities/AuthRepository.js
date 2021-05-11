const Repository = require('../Repository')

/**
 * The result type for the createTokenByCredentials API request.
 *
 * @typedef {Object} createTokenByCredentialsResultSubscription
 * @property {integer} trial_end - The trial time in seconds.
 *
 * @typedef {Object} createTokenByCredentialsResultCompany
 * @property {createTokenByCredentialsResultSubscription} subscription
 *
 * @typedef {Object} createTokenByCredentialsResultUser
 * @property {createTokenByCredentialsResultCompany} company
 * @property {string} preferred_language - The preferred users language.
 *
 * @typedef {Object} createTokenByCredentialsResult
 * @property {createTokenByCredentialsResultUser} user
 *
 */

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class AuthRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * request url: /kapi/v1/auth/tokens/access
   * request method: POST
   *
   * @param {Object} args
   * @param {String} args.username 
   * @param {String} args.password 
   * @param {Boolean} args.expire  (default: true)
   * @param {Boolean} args.with_memories If true all Memory entities will be attached in the answer. (default: false)
   *
   * @return {createTokenByCredentialsResult}
   */
  async createTokenByCredentials(args) {
    const route = { path: 'auth/tokens/access', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['username', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * request url: /kapi/v1/auth/tokens/refresh/{user}
   * request method: POST
   *
   * @param user
   * @param {Object} args
   * @param {Boolean} args.with_memories If true all Memory entities will be attached in the answer. (default: false)
   */
  async createTokenByRefreshToken(user, args) {
    const route = { path: 'auth/tokens/refresh/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ user }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = AuthRepository
