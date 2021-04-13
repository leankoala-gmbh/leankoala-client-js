const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-04-13
 */
class AlertingPolicyRepository extends Repository {

  /**
   * List all policies for the given project
   *
   * request url: /kapi/v1/alerting/policies/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async list(project, args) {
    const route = { path: 'alerting/policies/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * request url: /kapi/v1/alerting/policies/{project}
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {String} args.name 
   * @param {String} args.interval  (default: immediately)
   * @param {Array} args.severities  (optional)
   * @param {Number} args.channels  (optional)
   */
  async create(project, args) {
    const route = { path: 'alerting/policies/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['name']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Delete the given policy
   *
   * request url: /kapi/v1/alerting/policies/{project}/{policy}
   * request method: DELETE
   *
   * @param project
   * @param policy
   * @param {Object} args
   */
  async delete(project, policy, args) {
    const route = { path: 'alerting/policies/{project}/{policy}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ project, policy }, args)

    return this._connection.send(route, argList)
  }

  /**
   * request url: /kapi/v1/alerting/policies/{project}/{policy}
   * request method: PUT
   *
   * @param project
   * @param policy
   * @param {Object} args
   * @param {String} args.name  (optional)
   * @param {String} args.interval  (optional)
   * @param {Array} args.severities  (optional)
   * @param {Number} args.channels  (optional)
   */
  async update(project, policy, args) {
    const route = { path: 'alerting/policies/{project}/{policy}', method: 'PUT', version: 1 }
    const argList = Object.assign({ project, policy }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = AlertingPolicyRepository
