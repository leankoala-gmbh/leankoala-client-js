const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-12-11
 */
class InvitationRepository extends Repository {

  /**
   * This endpoint invites a new user to the project.
   *
   * @param project
   * @param {Object} args
   * @param {String} args.email The invitations e-mail address
   * @param {String} args.user_name The users company name. (default: )
   * @param {Number} args.user_role The projects role of the newly added user.
   * @param {Number} args.inviter The inviters user id.
   */
  async invite(project, args) {
    const route = { path: 'user/invitation/invite/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['email', 'user_role', 'inviter']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint aborts a given invitation.
   *
   * @param invitation
   * @param {Object} args
   */
  async abort(invitation, args) {
    const route = { path: 'user/invitation/abort/{invitation}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ invitation }, args)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint returns a list of all open invitations for the given project.
   *
   * @param project
   * @param {Object} args
   */
  async getOpenInvitations(project, args) {
    const route = { path: 'user/invitation/open/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = InvitationRepository
