import Repository from '../Repository'
import {IRCheckCookiesResponse} from '../../typescript/interfaces/repos/checkCookiesRepo.interface'

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class CheckCookieRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * This endpoint returns a list of domains that set cookies for the given system. As array elements it
   * adds the components on that the domain sets the cookies. IMPORTANT: The leankoala worker is blocking
   * some tracking integrations. So there will never be, for example, a Google Analytics cookie set.
   *
   * request url: /kapi/v1/check/checks/{system}/cookies/domains
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getDomains(system: string|number, args = {}): Promise<IRCheckCookiesResponse> {
    const route = { path: 'check/checks/{system}/cookies/domains', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

}

export default CheckCookieRepository
