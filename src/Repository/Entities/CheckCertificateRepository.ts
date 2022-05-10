import Repository from '../Repository'
import {IRCheckCertificateResultsResponse} from '../../typescript/interfaces/repos/checkCertificateRepo.interfaces'

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class CheckCertificateRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * request url: /kapi/v1/check/checks/{system}/certificate
   * request method: GET
   *
   * @param system
   * @param {string} args
   */
  async getExpirationResults(system: string, args: string): Promise<IRCheckCertificateResultsResponse> {
    const route = { path: 'check/checks/{system}/certificate', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

}

export default CheckCertificateRepository
