const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-11-26
 */
class MarketplaceRepository extends Repository {

  /**
   * Return all features that are active for this project and its provider.
   *
   * @param project
   * @param {Object} args
   */
  async getActiveFeatures(project, args) {
    const route = { path: 'marketplace/features/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = MarketplaceRepository
