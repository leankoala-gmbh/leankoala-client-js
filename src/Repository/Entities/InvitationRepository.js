const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-12-09
 */
class InvitationRepository extends Repository {

  /**
   * This endpoint invites a new user to the project.
   *
   * @param project
   * @param user
   * @param {Object} args
   * @param {Email} args.email The invitations e-mail address
   * @param {String} args.company_name The users company name. (optional)
   * @param {Email} args.user_role The projects role of the newly added user.
   * @param {Email} args.language The language the invitation mail is send in.
   * @param {Email} args.inviter_name The invitations e-mail address
   */
  async invite(project, user, args) {
    const route = { path: 'user/invite/{project}/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ project, user }, args)
    const requiredArguments = ['email', 'user_role', 'language', 'inviter_name']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = InvitationRepository
