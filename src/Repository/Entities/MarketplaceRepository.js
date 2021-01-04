const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-01-04
 */
class MarketplaceRepository extends Repository {

  /**
   * Return all features that are active for the given project.
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

  /**
   * Return all component suggestions that are enabled by the active features.
   *
   * @param project
   * @param featureIdentifier
   * @param {Object} args
   */
  async getAdditionalComponentSuggestions(project, featureIdentifier, args) {
    const route = { path: 'marketplace/features/suggestions/{project}/{featureIdentifier}', method: 'GET', version: 1 }
    const argList = Object.assign({ project, featureIdentifier }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return all the status of the health checks of the systems components.
   *
   * @param system
   * @param featureIdentifier
   * @param {Object} args
   */
  async getHealthStatus(system, featureIdentifier, args) {
    const route = { path: 'marketplace/features/status/{system}/{featureIdentifier}', method: 'GET', version: 1 }
    const argList = Object.assign({ system, featureIdentifier }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = MarketplaceRepository
