const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-12-08
 */
class CrawlerRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * Run a crawl for a given checklist
   *
   * request url: /kapi/v1/crawler/crawl/{project}
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {Number} args.user The user (id) that starts the crawl and gets informed when the crawl
   *                            finishes
   * @param {String} args.checklist_name The check lists name (optional)
   * @param {Array} args.collections The additional collections (optional)
   * @param {String} args.name The crawls name
   * @param {Number} args.system The systems id
   * @param {Number} args.depth Number of URLs to be crawled (default: 5)
   * @param {String} args.path The URL the crawler starts to crawl (default: /)
   * @param {Number} args.parallel_requests Number of parallel requests that can be done (default: 8)
   */
  async runCrawl(project, args) {
    const route = { path: 'crawler/crawl/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['user', 'name', 'system']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Run a crawl for a given checklist
   *
   * request url: /kapi/v1/crawler/crawl/company/{company}
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {Number} args.user The user (id) that starts the crawl and gets informed when the crawl
   *                            finishes
   * @param {String} args.checklist_name The check lists name (optional)
   * @param {Array} args.collections The additional collections (optional)
   * @param {String} args.name The crawls name
   * @param {Number} args.depth Number of URLs to be crawled (default: 50)
   * @param {String} args.path The URL the crawler starts to crawl
   * @param {Number} args.parallel_requests Number of parallel requests that can be done (default: 8)
   */
  async runCompanyCrawl(company, args) {
    const route = { path: 'crawler/crawl/company/{company}', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['user', 'name', 'path']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Return all crawl by the given parameters
   *
   * request url: /kapi/v1/crawler/crawl/{project}/crawls
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {String} args.checklist_name The check lists name (optional)
   * @param {Number} args.system The systems id
   */
  async listCrawls(project, args) {
    const route = { path: 'crawler/crawl/{project}/crawls', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['system']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Return all crawl of the given company
   *
   * request url: /kapi/v1/crawler/crawl/company/{company}/crawls
   * request method: POST
   *
   * @param company
   * @param {Object} args
   */
  async listCompanyCrawls(company, args) {
    const route = { path: 'crawler/crawl/company/{company}/crawls', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Abort a running crawl. The effect can take up to 5 minutes.
   *
   * request url: /kapi/v1/crawler/crawl/{project}/{crawl}
   * request method: PUT
   *
   * @param project
   * @param crawl
   * @param {Object} args
   */
  async abortCrawl(project, crawl, args) {
    const route = { path: 'crawler/crawl/{project}/{crawl}', method: 'PUT', version: 1 }
    const argList = Object.assign({ project, crawl }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return the detailed information for a given crawl with all results.
   *
   * request url: /kapi/v1/crawler/crawl/detail/{crawl}
   * request method: POST
   *
   * @param crawl
   * @param {Object} args
   * @param {String} args.format The output format (default: json)
   */
  async getCrawl(crawl, args) {
    const route = { path: 'crawler/crawl/detail/{crawl}', method: 'POST', version: 1 }
    const argList = Object.assign({ crawl }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return the crawler status for a given project.
   *
   * request url: /kapi/v1/crawler/status/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getCrawlerStatus(project, args) {
    const route = { path: 'crawler/status/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return the crawler status for a given company.
   *
   * request url: /kapi/v1/crawler/status/company/{company}
   * request method: POST
   *
   * @param company
   * @param {Object} args
   */
  async getCompanyCrawlerStatus(company, args) {
    const route = { path: 'crawler/status/company/{company}', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Get all collections that can be crawled.
   * request url: /kapi/v1/crawler/collections
   * request method: POST
   *
   * @param {Object} args
   */
  async getCrawlableCollections(args) {
    const route = { path: 'crawler/collections', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Set check status for a single url
   *
   * request url: /kapi/v1/crawler/company/{company}/check/status
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {*} args.check_type The check type (DeadLink)
   * @param {*} args.check_status The status that should be set
   * @param {String} args.url The url that status is valid for
   */
  async setCheckStatus(company, args) {
    const route = { path: 'crawler/company/{company}/check/status', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['check_type', 'check_status', 'url']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Delete check status by id
   *
   * request url: /kapi/v1/crawler/company/{company}/check/status/{crawlUrlStatus}
   * request method: DELETE
   *
   * @param company
   * @param crawlUrlStatus
   * @param {Object} args
   */
  async deleteCheckStatus(company, crawlUrlStatus, args) {
    const route = { path: 'crawler/company/{company}/check/status/{crawlUrlStatus}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ company, crawlUrlStatus }, args)

    return this._connection.send(route, argList)
  }

  /**
   * List check status by company
   *
   * request url: /kapi/v1/crawler/company/{company}/check/status
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async listCheckStatus(company, args) {
    const route = { path: 'crawler/company/{company}/check/status', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, args)

    return this._connection.send(route, argList)
  }
}

module.exports = CrawlerRepository
