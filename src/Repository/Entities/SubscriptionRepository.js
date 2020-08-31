const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-08-31
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
   * @param company
   * @param {Object} args
   * @param {*} args.stripe_cc_id The stripe credit card id
   * @param {String} args.last_digits The last 4 digits of the credit card
   * @param {String} args.brand The credit cards brand
   */
  async setCreditCard(company, args) {
    const route = { path: 'subscription/company/{company}/creditcard', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['stripe_cc_id', 'last_digits', 'brand']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = SubscriptionRepository
