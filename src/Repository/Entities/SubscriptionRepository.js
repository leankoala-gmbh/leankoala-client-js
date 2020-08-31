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
   * @param {Object} args
   */
  async getCompanySubscription(args) {
    const route = { path: 'subscription/company', method: 'GET', version: 1 }
    const argList = Object.assign({  }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Set the companies credit card plan.
   *
   * @param {Object} args
   * @param {Number} args.quantity The number of packets to be used (optional)
   */
  async setCompanyCreditCardPlans(args) {
    const route = { path: 'subscription/company/plans/creditcard', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)

    return this._connection.send(route, argList)
  }

  /**
   * @param {Object} args
   * @param {String} args.last_digits The last 4 digits of the credit card (optional)
   * @param {String} args.brand The credit cards brand (optional)
   */
  async setCreditCard(args) {
    const route = { path: 'subscription/company/creditcard', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = SubscriptionRepository
