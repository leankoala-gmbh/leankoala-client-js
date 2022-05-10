import Repository from '../Repository'
import {IRCheckA11YResultsResponse} from '../../typescript/interfaces/repos/checkA11YRepo.interface'

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class CheckA11yRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * Return all current accessibility audit results for the given systems components.
   *
   * request url: /kapi/v1/check/checks/{system}/a11y/results
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getResults(system: string, args = {}): Promise<IRCheckA11YResultsResponse> {
    const route = { path: 'check/checks/{system}/a11y/results', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

}

export default CheckA11yRepository
