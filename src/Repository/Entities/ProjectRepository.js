const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-12-11
 */
class ProjectRepository extends Repository {

  /**
   * Return all projects and the user roles for a given user.
   *
   * @param {Object} args
   * @param {Number} args.user The users id
   * @param {Boolean} args.with_next_full_run If true the next approximated hourly run will be returned;
   *                                          the value is the time in seconds till the next run (default: false)
   * @param {Boolean} args.with_onboarding_status If true the projects onboarding status is added to the
   *                                              response. (default: false)
   * @param {Boolean} args.with_features If true the projects marketplace features are added to the
   *                                     response. (default: false)
   */
  async search(args) {
    const route = { path: 'project/projects/search', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['user']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Update the given project.
   *
   * @param project
   * @param {Object} args
   * @param {String} args.name 
   */
  async update(project, args) {
    const route = { path: 'project/projects/{project}', method: 'PUT', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['name']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Delete the given project.
   *
   * @param project
   * @param {Object} args
   */
  async delete(project, args) {
    const route = { path: 'project/projects/{project}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return all users for the given project.
   *
   * @param project
   * @param {Object} args
   */
  async getUsers(project, args) {
    const route = { path: 'project/users/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint will return a detailed onboarding status.
   *
   * @param project
   * @param {Object} args
   */
  async getStatus(project, args) {
    const route = { path: 'project/{project}/onboarding/status', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = ProjectRepository
