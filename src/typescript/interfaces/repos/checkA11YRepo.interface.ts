import {IRCheckGlobComponent, IRCheckGlobSuggestion} from '../global/checkRepos.interface'

interface IRCheckA11YSuggestion {
  id: number
  identifier: string
  name: string
}

interface IRCheckA11YComponent extends IRCheckGlobComponent {
  suggestion: IRCheckGlobSuggestion
}

interface IRCheckA11YResult {
  identifier: string
  status: string
  title: string
  message: string
  value: number
  attributes: {
    google_identifier: string
    recommendations: {
      url: string
      identifier: string
      name: string
    }[]
    details: {
      type: string
      items: {
        finalLayoutShiftTraceEventFound: boolean
        url: string
        totalBytes?: number
        wastedBytes?: number
        wastedPercent?: number
      }[]
      headings: {
        key: string
        valueType: string
        label: string
      }[]
      overallSavingsMs?: number
      overallSavingsBytes?: number
    }
  }
}

export interface IRCheckA11YResultsResponse {
  component?: IRCheckA11YComponent
  target_group_name?: string
  html_report?: string
  results: {
    [key: string]: {
      component: {
        id: number
        name: string
        url: string
        suggestion?: IRCheckA11YSuggestion
      }
      results: IRCheckA11YResult[]
    }
  }
}


export interface IRCheckA11Y {
  getResults(system: string, args?: object): Promise<IRCheckA11YResultsResponse>
}
