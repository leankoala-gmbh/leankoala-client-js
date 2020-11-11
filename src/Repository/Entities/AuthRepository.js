const Repository = require('../Repository')

/**
 * The result type for the createTokenByCredentials API request.
 *
 * @typedef {Object} createTokenByCredentialsResultUser
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
 * @created 2020-11-03
 */
class AuthRepository extends Repository {

  /**
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

}

module.exports = AuthRepository
