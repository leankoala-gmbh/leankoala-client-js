const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-01-14
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
   * @param system
   * @param featureIdentifier
   * @param {Object} args
   */
  async getComponents(system, featureIdentifier, args) {
    const route = { path: 'marketplace/features/components/{system}/{featureIdentifier}', method: 'GET', version: 1 }
    const argList = Object.assign({ system, featureIdentifier }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Set a component using a given suggestion as template.
   *
   * @param system
   * @param suggestionIdentifier
   * @param {Object} args
   * @param {String} args.url 
   */
  async setComponent(system, suggestionIdentifier, args) {
    const route = { path: 'marketplace/features/components/{system}/{suggestionIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ system, suggestionIdentifier }, args)
    const requiredArguments = ['url']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Return all the status of the health checks of the systems components.
   *
   * @param system
   * @param featureIdentifier
   * @param {Object} args
   * @param {String} args.from  (default: -1day)
   * @param {String} args.time  (default: 1h)
   */
  async getHealthStatus(system, featureIdentifier, args) {
    const route = { path: 'marketplace/features/status/{system}/{featureIdentifier}', method: 'GET', version: 1 }
    const argList = Object.assign({ system, featureIdentifier }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return all features that can be activated for the given company and provider.
   *
   * @param providerIdentifier
   * @param company
   * @param {Object} args
   */
  async getFeatures(providerIdentifier, company, args) {
    const route = { path: 'marketplace/marketplace/features/{providerIdentifier}/{company}', method: 'GET', version: 1 }
    const argList = Object.assign({ providerIdentifier, company }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Activate the given feature for the given projects.
   *
   * @param company
   * @param featureIdentifier
   * @param {Object} args
   * @param {Array} args.projects 
   */
  async activateFeatures(company, featureIdentifier, args) {
    const route = { path: 'marketplace/marketplace/feature/activate/{company}/{featureIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ company, featureIdentifier }, args)
    const requiredArguments = ['projects']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Return all features that are activated for the given project.    
   *
   * @param project
   * @param {Object} args
   */
  async getActiveFeatures(project, args) {
    const route = { path: 'marketplace/marketplace/feature/active/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return all features that are activated for the given project.    
   *
   * @param project
   * @param {Object} args
   */
  async getAvailableFeatures(project, args) {
    const route = { path: 'marketplace/marketplace/feature/available/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = MarketplaceRepository
