const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
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
   */
  async createUser(application, args) {
    const route = { path: '/{application}/user', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['userName', 'email', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
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

    return this._connection.send(route, argList)
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

    return this._connection.send(route, argList)
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

    return this._connection.send(route, argList)
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

    return this._connection.send(route, argList)
  }

  /**
   * Request password change e-mail.
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {String} args.email The users email address
   */
  async requestPasswordReset(application, user, args) {
    const route = { path: '/{application}/user/{user}/password/request', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user }, args)
    const requiredArguments = ['email']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
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

    return this._connection.send(route, argList)
  }

}

module.exports = UserRepository
