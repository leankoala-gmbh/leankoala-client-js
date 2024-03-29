const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-17
 */
class ClusterUserRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * Activate an user account. The endpoint will return a valid access and refresh token so the user can
   * be logged in without re-entering username and password.
   *
   * request url: /kapi/v1/user/users/activate
   * request method: POST
   *
   * @param {Object} args
   * @param {String} args.activation_key 
   */
  async activate(args) {
    const route = { path: 'user/users/activate', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['activation_key']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint creates a new user. The given provider (url param) will be attached.
   *
   * request url: /kapi/v1/user/users/{provider}
   * request method: POST
   *
   * @param provider
   * @param {Object} args
   * @param {String} args.username The new users name. (optional)
   * @param {Boolean} args.suppress_activation If true no activation mail will be send.. (default: false)
   * @param {String} args.email The email address of the new user.
   * @param {String} args.preferred_language The users preferred interface language. (optional)
   * @param {Number} args.company_id The companies numeric id of the new user. (optional)
   * @param {Boolean} args.create_company Create a new company if none exists. (default: false)
   * @param {String} args.full_name The users full name. (optional)
   * @param {String} args.first_name The users first name. (optional)
   * @param {String} args.last_name The users last name. (optional)
   * @param {String} args.password 
   */
  async create(provider, args) {
    const route = { path: 'user/users/{provider}', method: 'POST', version: 1 }
    const argList = Object.assign({ provider }, args)
    const requiredArguments = ['email', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint updates an existing user.
   *
   * request url: /kapi/v1/user/users/{user}
   * request method: PUT
   *
   * @param user
   * @param {Object} args
   * @param {String} args.email The email address of the new user. (optional)
   * @param {String} args.preferred_language The users preferred interface language. (optional)
   * @param {Number} args.company_id The companies numeric id of the new user. (optional)
   * @param {String} args.first_name The users first name. (optional)
   * @param {String} args.last_name The users last name. (optional)
   */
  async updateUser(user, args) {
    const route = { path: 'user/users/{user}', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Update the users preferred language.
   *
   * request url: /kapi/v1/user/users/preferredLanguage/{user}
   * request method: PUT
   *
   * @param user
   * @param {Object} args
   * @param {String} args.language The users preferred interface language.
   */
  async setPreferredLanguage(user, args) {
    const route = { path: 'user/users/preferredLanguage/{user}', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['language']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Delete the given user and all owned projects.
   *
   * request url: /kapi/v1/user/users/{user}
   * request method: DELETE
   *
   * @param user
   * @param {Object} args
   */
  async delete(user, args) {
    const route = { path: 'user/users/{user}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ user }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Checks if the user can be deleted.
   *
   * request url: /kapi/v1/user/users/deletable/{user}
   * request method: POST
   *
   * @param user
   * @param {Object} args
   */
  async isDeletable(user, args) {
    const route = { path: 'user/users/deletable/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ user }, args)

    return this._connection.send(route, argList)
  }

  /**
   *  the given user (by email) and all owned projects.
   *
   * request url: /kapi/v1/user/users/delete/email
   * request method: DELETE
   *
   * @param {Object} args
   * @param {String} args.email The users email address
   */
  async deleteByEmail(args) {
    const route = { path: 'user/users/delete/email', method: 'DELETE', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['email']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint connects an OAuth provider with the current user.
   *
   * request url: /kapi/v1/user/oauth/{user}/connect
   * request method: PUT
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
   * request url: /kapi/v1/user/users/exists
   * request method: GET
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
   * request url: /kapi/v1/user/users/find
   * request method: GET
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
   * request url: /kapi/v1/user/users/{user}/password
   * request method: PUT
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
   * Request password change e-mail.
   *
   * request url: /kapi/v1/user/users/password/reset/request
   * request method: POST
   *
   * @param {Object} args
   * @param {String} args.email The users email address
   */
  async requestPasswordReset(args) {
    const route = { path: 'user/users/password/reset/request', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['email']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Reset the password.
   *
   * request url: /kapi/v1/user/users/password/reset/{user}
   * request method: PUT
   *
   * @param user
   * @param {Object} args
   * @param {String} args.password The new password
   */
  async resetPassword(user, args) {
    const route = { path: 'user/users/password/reset/{user}', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['password']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = ClusterUserRepository
