/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-08
 */
class CrawlerRepository {

  constructor(connection) {
    this._connection = connection
  }

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
    const route = {
      path: 'crawler/crawl/{project}',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({ project }, args)

    // validate arguments
    const requiredArguments = ['user', 'checklist_name', 'name', 'system']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

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
    const route = {
      path: 'crawler/crawl/{project}/crawls',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({ project }, args)

    // validate arguments
    const requiredArguments = ['user', 'checklist_name', 'name', 'system']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Return the detailed information for a given crawl with all results.
   *
   * @param crawl
   */
   async getCrawl(crawl, args) {
    const route = {
      path: 'crawler/crawl/{crawl}',
      method: 'GET',
      version: 1
    }

    const argList = Object.assign({ crawl }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Throw an exception if a mandatory argument is not set.
   *
   * @param requiredArguments
   * @param actualArguments
   * @private
   *
   * @todo this should be done in a parent class
   */
  _assertValidArguments(requiredArguments, actualArguments) {
    requiredArguments.forEach(function (argument) {
      if (!actualArguments.hasOwnProperty(argument)) {
        throw new Error('The mandatory argument ' + argument + ' could not be found in the argument object.')
      }
    })
  }
}

module.exports = CrawlerRepository
