const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-04-13
 */
class CrawlerRepository extends Repository {

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
   * @param {String} args.checklist_name The check lists name
   * @param {String} args.name The crawls name
   * @param {Number} args.system The systems id
   * @param {Number} args.depth Number of URLs to be crawled (default: 5)
   * @param {String} args.path The URL the crawler starts to crawl (default: /)
   * @param {Boolean} args.curl_only If true the crawler does only use curl. (default: false)
   * @param {Number} args.parallel_requests Number of parallel requests that can be done (default: 8)
   */
  async runCrawl(project, args) {
    const route = { path: 'crawler/crawl/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['user', 'checklist_name', 'name', 'system']
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
   * request url: /kapi/v1/crawler/crawl/{crawl}
   * request method: GET
   *
   * @param crawl
   * @param {Object} args
   */
  async getCrawl(crawl, args) {
    const route = { path: 'crawler/crawl/{crawl}', method: 'GET', version: 1 }
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

}

module.exports = CrawlerRepository
