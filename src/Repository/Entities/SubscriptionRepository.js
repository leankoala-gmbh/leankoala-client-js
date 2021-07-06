const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-07-06
 */
class SubscriptionRepository extends Repository {

  constructor() {
    super()
    this._connectionType = 'ClusterConnection'
  }

  /**
   * Get the companies subscription information.
   *
   * request url: /kapi/v1/subscription/company/{company}/
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getCompanySubscription(company, args) {
    const route = { path: 'subscription/company/{company}/', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Set the companies credit card plans.
   *
   * request url: /kapi/v1/subscription/company/{company}/plans/creditcard
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {Number} args.quantity The number of packets to be used
   */
  async setCompanyCreditCardPlans(company, args) {
    const route = { path: 'subscription/company/{company}/plans/creditcard', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['quantity']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Set the companies free plans.
   *
   * request url: /kapi/v1/subscription/company/{company}/plans/free
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {Number} args.quantity The number of packets to be used
   */
  async setCompanyFreePlans(company, args) {
    const route = { path: 'subscription/company/{company}/plans/free', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['quantity']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Set the companies credit card.
   *
   * request url: /kapi/v1/subscription/company/{company}/creditcard
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {*} args.stripe_cc_source The stripe credit card id
   * @param {String} args.last_digits The last 4 digits of the credit card
   * @param {String} args.brand The credit cards brand
   */
  async setCreditCard(company, args) {
    const route = { path: 'subscription/company/{company}/creditcard', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['stripe_cc_source', 'last_digits', 'brand']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Set the billing address information for the given company.
   *
   * request url: /kapi/v1/subscription/company/{company}/billingaddress
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {String} args.company_name The companies name.
   * @param {String} args.country The companies billing address country.
   * @param {String} args.postal_code The companies billing address postal code.
   * @param {String} args.city The companies billing address city.
   * @param {String} args.street The companies billing address street.
   * @param {String} args.usident The companies "Umsatzsteuer-Identifikationsnummer". (optional)
   * @param {String} args.email The email address the invoice information gets send to. (optional)
   */
  async setBillingAddress(company, args) {
    const route = { path: 'subscription/company/{company}/billingaddress', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['company_name', 'country', 'postal_code', 'city', 'street']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Get the billing address information for the given company.
   *
   * request url: /kapi/v1/subscription/company/{company}/billingaddress
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getBillingAddress(company, args) {
    const route = { path: 'subscription/company/{company}/billingaddress', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Get a list of features that are active.
   *
   * request url: /kapi/v1/subscription/company/{company}/features
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getSubscribedFeatures(company, args) {
    const route = { path: 'subscription/company/{company}/features', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Get a list invoices for the given company.
   *
   * request url: /kapi/v1/subscription/company/{company}/invoices
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getCompanyInvoices(company, args) {
    const route = { path: 'subscription/company/{company}/invoices', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, args)

    return this._connection.send(route, argList)
  }

  /**
   * End all trials.
   *
   * request url: /kapi/v1/subscription/trial/{providerIdentifier}/end
   * request method: POST
   *
   * @param providerIdentifier
   * @param {Object} args
   */
  async endTrials(providerIdentifier, args) {
    const route = { path: 'subscription/trial/{providerIdentifier}/end', method: 'POST', version: 1 }
    const argList = Object.assign({ providerIdentifier }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = SubscriptionRepository
