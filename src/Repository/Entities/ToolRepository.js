const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-02-25
 */
class ToolRepository extends Repository {

  /**
   * Return all tools for the given project.
   *
   * @param project
   * @param {Object} args
   */
  async findByProject(project, args) {
    const route = { path: 'check/tools/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Get the tool configuration.
   *
   * @param project
   * @param toolIdentifier
   * @param {Object} args
   */
  async getConfiguration(project, toolIdentifier, args) {
    const route = { path: 'check/tools/{project}/{toolIdentifier}', method: 'GET', version: 1 }
    const argList = Object.assign({ project, toolIdentifier }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Overwrite tool configuration.
   *
   * @param project
   * @param toolIdentifier
   * @param {Object} args
   * @param {Number} args.errors_in_a_row Number of errors in a row before marked as failure (optional)
   * @param {Number} args.success_in_a_row Number of successes in a row before marked as passed (optional)
   */
  async overwrite(project, toolIdentifier, args) {
    const route = { path: 'check/tools/{project}/{toolIdentifier}', method: 'PUT', version: 1 }
    const argList = Object.assign({ project, toolIdentifier }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = ToolRepository
