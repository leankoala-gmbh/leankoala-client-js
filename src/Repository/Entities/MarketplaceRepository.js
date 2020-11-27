const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-11-27
 */
class MarketplaceRepository extends Repository {

  /**
   * Return all features that are active for the given project
   *
   * @param project
   * @param {Object} args
   */
  async getActiveProjectFeatures(project, args) {
    const route = { path: 'marketplace/features/project/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return all features that are active for the given provider.
   *
   * @param providerIdentifier
   * @param {Object} args
   */
  async getActiveProviderFeatures(providerIdentifier, args) {
    const route = { path: 'marketplace/features/provider/{providerIdentifier}', method: 'GET', version: 1 }
    const argList = Object.assign({ providerIdentifier }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = MarketplaceRepository
