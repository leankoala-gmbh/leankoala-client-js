import {IRCheckGlobComponent} from '../global/checkRepos.interface'

export interface IRCheckCertificateResultsResponse {
  results: {
    [key: string]: {
      component: IRCheckGlobComponent
      error?: string
      result?: {
        identifier: string
        status: string
        title: string
        message: string
        attributes: {
          _leankoala_worker: string
          effectiveUrl: string
          _expireLimit: number
          _validFrom: number
          _validTo: number
          _expired: boolean
          Device: string
          'Viewport width': number
          'Viewport height': number
          'User-Agent': string
          middleware_errors_in_a_row: number
          middleware_success_in_a_row: number
          _validFromFormatted: Date
          _validToFormatted: Date
          _validToInDays: number
        }
      }
    }
  }
}


export interface IRCheckCertificate {
  getExpirationResults(system: string, args: string): Promise<IRCheckCertificateResultsResponse>
}
