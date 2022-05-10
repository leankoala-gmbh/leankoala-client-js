import Repository from '../Repository'
import {TCheckSystem} from '../../typescript/interfaces/global/checkRepos.interface'
import {IRCheckInsecureContentResponse} from '../../typescript/interfaces/repos/checkInsecureContentRepo.interface'

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class CheckInsecureContentRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * Return all insecure elements for all components of a system.
   *
   * request url: /kapi/v1/check/checks/{system}/insecure
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getInsecureElements(system: TCheckSystem, args = {}): Promise<IRCheckInsecureContentResponse> {
    const route = { path: 'check/checks/{system}/insecure', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

}

export default CheckInsecureContentRepository
