const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-03-17
 */
class SubscriptionRepository extends Repository {

  /**
   * Get the companies subscription information.
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
   * Set the companies credit card plan.
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
   * Set the companies credit card.
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
   * @param company
   * @param {Object} args
   * @param {String} args.company_name The companies name.
   * @param {String} args.country The companies billing address country.
   * @param {String} args.postal_code The companies billing address postal code.
   * @param {String} args.city The companies billing address city.
   * @param {String} args.street The companies billing address street.
   * @param {String} args.usident The companies "Umsatzsteuer-Identifikationsnummer". (optional)
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
   * @param company
   * @param {Object} args
   */
  async getSubscribedFeatures(company, args) {
    const route = { path: 'subscription/company/{company}/features', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = SubscriptionRepository
