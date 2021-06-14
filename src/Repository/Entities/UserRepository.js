const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-06-14
 */
class UserRepository extends Repository {

  /**
   * This endpoint creates a new user.
   *
   * @param application
   * @param {Object} args
   * @param {String} args.userName 
   * @param {String} args.email 
   * @param {String} args.password 
   * @param {Number} args.company  (optional)
   * @param {String} args.fullName The users full name. (optional)
   * @param {String} args.firstName The users first name. (optional)
   * @param {String} args.lastName The users last name. (optional)
   * @param {Boolean} args.suppressActivation  (default: false)
   */
  async createUser(application, args) {
    const route = { path: '/{application}/user', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['userName', 'email', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList, false)
  }

  /**
   * This endpoint updates an existing user.
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {String} args.email The email address of the new user. (optional)
   * @param {String} args.preferred_language The users preferred interface language. (optional)
   * @param {Number} args.company_id The companies numeric id of the new user. (optional)
   * @param {String} args.first_name The users first name. (optional)
   * @param {String} args.last_name The users last name. (optional)
   */
  async updateUser(application, user, args) {
    const route = { path: '/{application}/user/{user}', method: 'PUT', version: 1 }
    const argList = Object.assign({ application, user }, args)

    return this._connection.send(route, argList, false)
  }

  /**
   * Update the users preferred language.
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {String} args.language The users preferred interface language.
   */
  async setPreferredLanguage(application, user, args) {
    const route = { path: '/{application}/user/{user}/language', method: 'PUT', version: 1 }
    const argList = Object.assign({ application, user }, args)
    const requiredArguments = ['language']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList, false)
  }

  /**
   * Change the users password.
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {String} args.password_old 
   * @param {String} args.password_new 
   */
  async changePassword(application, user, args) {
    const route = { path: '/{application}/user/{user}/password', method: 'PUT', version: 1 }
    const argList = Object.assign({ application, user }, args)
    const requiredArguments = ['password_old', 'password_new']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList, false)
  }

  /**
   * Checks if the user can be deleted.
   *
   * @param application
   * @param user
   * @param company
   * @param {Object} args
   */
  async isDeletable(application, user, company, args) {
    const route = { path: '/{application}/user/{user}/deletable/{company}', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user, company }, args)

    return this._connection.send(route, argList, false)
  }

  /**
   * Reset the password.
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {String} args.password The new password
   */
  async resetPassword(application, user, args) {
    const route = { path: '/{application}/user/{user}/password/reset', method: 'PUT', version: 1 }
    const argList = Object.assign({ application, user }, args)
    const requiredArguments = ['password']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList, true)
  }

  /**
   * Request password change e-mail.
   *
   * @param application
   * @param {Object} args
   * @param {String} args.email The users email address
   */
  async requestPasswordReset(application, args) {
    const route = { path: '/{application}/user/password/request', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['email']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList, false)
  }

  /**
   * Activate an user account. The endpoint will return a valid access and refresh token so the user can
   * be logged in without re-entering username and password.
   *
   * @param application
   * @param {Object} args
   * @param {String} args.activation_key 
   */
  async activate(application, args) {
    const route = { path: '/{application}/user/activate', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['activation_key']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList, false)
  }

  /**
   * This endpoint returns a user that matches the given search criteria.
   *
   * @param application
   * @param {Object} args
   * @param {Array} args.query The key value pairs for the search.
   */
  async find(application, args) {
    const route = { path: '/{application}/user/find', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['query']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList, false)
  }

  /**
   * This endpoint connects an OAuth provider with the current user.
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {*} args.provider The OAuth provider.
   * @param {String} args.providerUserId The OAuth provider user id.
   */
  async connectAuthAccount(application, user, args) {
    const route = { path: '/{application}/user/{user}/connect', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user }, args)
    const requiredArguments = ['provider', 'providerUserId']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList, false)
  }

}

module.exports = UserRepository
