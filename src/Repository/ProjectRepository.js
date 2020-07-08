/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-08
 */
class ProjectRepository {

  constructor(connection) {
    this._connection = connection
  }

  /**
   * Return all projects and the user roles for a given user.
   *
   * @param {Object} args
   * @param {Number} args.user The users id
   * @param {Boolean} args.with_next_full_run If true the next approximated hourly run will be returned; the value is the time in seconds till the next run
   */
   async find(args) {
    const route = {
      path: 'project/projects/search',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({  }, args)

    // validate arguments
    const requiredArguments = ['user']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Set the last full run timestamp on a system.
   *
   * @param system
   */
   async changeLastFullRun(system, args) {
    const route = {
      path: 'project/systems/{system}/lastFullRun',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return the approximated time in seconds when the next full check run is triggered.
   *
   * @param system
   */
   async getNextLastFullRun(system, args) {
    const route = {
      path: 'project/systems/{system}/nextFullRun',
      method: 'GET',
      version: 1
    }

    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint will return a detailed onboarding status.
   *
   * @param project
   */
   async getStatus(project, args) {
    const route = {
      path: 'project/{project}/onboarding/status',
      method: 'GET',
      version: 1
    }

    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Throw an exception if a mandatory argument is not set.
   *
   * @param requiredArguments
   * @param actualArguments
   * @private
   *
   * @todo this should be done in a parent class
   */
  _assertValidArguments(requiredArguments, actualArguments) {
    requiredArguments.forEach(function (argument) {
      if (!actualArguments.hasOwnProperty(argument)) {
        throw new Error('The mandatory argument ' + argument + ' could not be found in the argument object.')
      }
    })
  }
}

module.exports = ProjectRepository
