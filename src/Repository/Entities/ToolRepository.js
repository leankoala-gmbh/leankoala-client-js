const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-20
 */
class ToolRepository extends Repository {

  /**
   * Return all tools for the given project
   *
   * @param project
   * @param {Object} args
   */
  async findByProject(project, args) {
    const route = { path: 'check/tools/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = ToolRepository
