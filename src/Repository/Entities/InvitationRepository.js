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
   * @param {String} args.company_name The users company name. (optional)
   * @param {String} args.user_role The projects role of the newly added user.
   * @param {Number} args.inviter The inviters user id.
   */
  async invite(project, args) {
    const route = { path: 'user/invite/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['email', 'user_role', 'inviter']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = InvitationRepository
