const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-04-13
 */
class _CompanyRepository extends Repository {

  /**
   * Create a new company
   *
   * request url: /kapi/v1/user/companies/{providerIdentifier}
   * request method: POST
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
   * request url: /kapi/v1/user/companies/exists
   * request method: GET
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
   * request url: /kapi/v1/user/companies/search/{providerIdentifier}
   * request method: POST
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

module.exports = _CompanyRepository
