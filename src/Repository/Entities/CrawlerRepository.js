const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-10
 */
class CrawlerRepository extends Repository {

  /**
   * Run a crawl for a given checklist
   *
   * @param project
   * @param {Object} args
   * @param {Number} args.user The user (id) that starts the crawl and gets informed when the crawl finishes
   * @param {String} args.checklist_name The check lists name
   * @param {String} args.name The crawls name
   * @param {Number} args.system The systems id
   * @param {Number} args.depth Number of URLs to be crawled
   * @param {String} args.path The URL the crawler starts to crawl
   * @param {Boolean} args.curl_only If true the crawler does only use curl.
   * @param {Number} args.parallel_requests Number of parallel requests that can be done
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
   * @param project
   * @param {Object} args
   * @param {String} args.checklist_name The check lists name
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
   * Return the detailed information for a given crawl with all results.
   *
   * @param crawl
   */
  async getCrawl(crawl, args) {
    const route = { path: 'crawler/crawl/{crawl}', method: 'GET', version: 1 }
    const argList = Object.assign({ crawl }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Stop active Crawler
   * @param project
   * @param id
   * @param args
   * @returns {Promise<Array>}
   */
  async stopCrawl(project, id, args) {
    const route = { path: 'crawler/crawl/{project}/{id}', method: 'PUT', version: 1 }
    const argList = Object.assign({ project, id }, args)

    return this._connection.send(route, argList)
  }
}

module.exports = CrawlerRepository
