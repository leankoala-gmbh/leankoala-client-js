const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-08-14
 */
class CustomerMehrwertsteuercheckRepository extends Repository {

  /**
   * Mehrwertsteuer Check only: Start a new crawl for the given start page. Max. 100 urls are crawled
   * with 4 parallel requests.
   *
   * @param {Object} args
   * @param {String} args.email_address The email address the crawl result is send to.
   * @param {Url} args.start_url The url the crawler should start with.
   */
  async runMwstCrawl(args) {
    const route = { path: 'customers/mehrwertsteuer/crawl', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['email_address', 'start_url']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Mehrwertsteuer Check only: get the status and check result of the crawl with the given unique
   * identifier
   *
   * @param crawlIdentifier
   * @param {Object} args
   */
  async showCrawlResult(crawlIdentifier, args) {
    const route = { path: 'customers/mehrwertsteuer/crawl/{crawlIdentifier}', method: 'GET', version: 1 }
    const argList = Object.assign({ crawlIdentifier }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = CustomerMehrwertsteuercheckRepository
