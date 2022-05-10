import Repository from '../Repository'
import {TCheckSystem} from '../../typescript/interfaces/global/checkRepos.interface'
import {
  IRCheckDeadlinksIgnoreResponse,
  IRCheckDeadlinksResultsResponse
} from '../../typescript/interfaces/repos/checkDeadlinksRepo.interface'

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class CheckDeadLinksRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * Return a list of dead links for every component attached to the given system.
   *
   * request url: /kapi/v1/check/checks/{system}/deadlinks
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getResults(system: TCheckSystem, args = {}): Promise<IRCheckDeadlinksResultsResponse> {
    const route = { path: 'check/checks/{system}/deadlinks', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return a list of dead links for every component in every project owned by the company.
   *
   * request url: /kapi/v1/check/checks/company/{company}/deadlinks
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getResultsByCompany(company, args = {}) {
    const route = { path: 'check/checks/company/{company}/deadlinks', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return the dead link check configuration for the given system.
   *
   * request url: /kapi/v1/check/checks/{system}/deadlinks/config
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getConfiguration(system: string, args = {}): Promise<void> {
    const route = { path: 'check/checks/{system}/deadlinks/config', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Add a new ignore pattern to the configuration.
   *
   * request url: /kapi/v1/check/checks/{system}/deadlinks/ignore
   * request method: POST
   *
   * @param system
   * @param {Object} args
   * @param {Array} args.patterns List of URLs (strings) that will be excluded from the dead link crawl
   */
  async ignorePattern(system: string, args: { patterns: string[] }): Promise<IRCheckDeadlinksIgnoreResponse> {
    const route = { path: 'check/checks/{system}/deadlinks/ignore', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)
    const requiredArguments = ['patterns']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Remove an ignore pattern from the configuration.
   *
   * request url: /kapi/v1/check/checks/{system}/deadlinks/unignore
   * request method: POST
   *
   * @param system
   * @param {Object} args
   * @param {Number} args.pattern_id Single URL that will not be excluded anymore in the dead link crawl
   */
  async unignorePattern(system: string, args: { pattern_id: number }): Promise<void> {
    const route = { path: 'check/checks/{system}/deadlinks/unignore', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)
    const requiredArguments = ['pattern_id']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

export default CheckDeadLinksRepository
