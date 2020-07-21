const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-21
 */
class CompanyRepository extends Repository {

  /**
   * Create a new company
   *
   * @param providerIdentifier
   * @param {Object} args
   * @param {String} args.name The companies name
   */
  async create(providerIdentifier, args) {
    const route = { path: 'user/companies/{providerIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ providerIdentifier }, args)
    const requiredArguments = ['name']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Check if the given company name already exists
   *
   * @param {Object} args
   * @param {String} args.company_name The companies name
   */
  async exists(args) {
    const route = { path: 'user/companies/exists', method: 'GET', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['company_name']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Search for a given company by provider and name
   *
   * @param providerIdentifier
   * @param {Object} args
   * @param {String} args.company_name The companies name
   */
  async search(providerIdentifier, args) {
    const route = { path: 'user/companies/search/{providerIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ providerIdentifier }, args)
    const requiredArguments = ['company_name']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = CompanyRepository
