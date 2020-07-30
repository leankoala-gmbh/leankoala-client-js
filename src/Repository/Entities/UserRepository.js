const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-30
 */
class UserRepository extends Repository {

  /**
   * This endpoint creates a new user. The given provider (url param) will be attached.
   *
   * @param provider
   * @param {Object} args
   * @param {String} args.username The new users name.
   * @param {String} args.email The email address of the new user.
   * @param {Number} args.company_id The companies numeric id of the new user.
   * @param {String} args.first_name The users first name.
   * @param {String} args.last_name The users last name.
   */
  async create(provider, args) {
    const route = { path: 'user/users/{provider}', method: 'POST', version: 1 }
    const argList = Object.assign({ provider }, args)
    const requiredArguments = ['username', 'email']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint connects an OAuth provider with the current user.
   *
   * @param user
   * @param {Object} args
   * @param {*} args.provider The OAuth provider.
   * @param {String} args.provider_user_id The OAuth provider user id.
   */
  async connectOAuthAccount(user, args) {
    const route = { path: 'user/oauth/{user}/connect', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['provider', 'provider_user_id']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint returns true if a user exists that matches the given search criteria.
   *
   * @param {Object} args
   * @param {Array} args.query The key value pairs for the search.
   */
  async exists(args) {
    const route = { path: 'user/users/exists', method: 'GET', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['query']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint returns a user that matches the given search criteria.
   *
   * @param {Object} args
   * @param {Array} args.query The key value pairs for the search.
   */
  async find(args) {
    const route = { path: 'user/users/find', method: 'GET', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['query']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Change the users password.
   *
   * @param user
   * @param {Object} args
   * @param {String} args.password_old 
   * @param {String} args.password_new 
   */
  async changePassword(user, args) {
    const route = { path: 'user/users/{user}/password', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['password_old', 'password_new']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Update the subscription for a given user.
   *
   * @param user
   * @param {Object} args
   * @param {Number} args.system_count The number of systems the user is allowed to create.
   */
  async update(user, args) {
    const route = { path: 'user/subscriptions/{user}', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['system_count']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = UserRepository
