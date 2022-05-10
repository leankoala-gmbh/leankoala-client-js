/**
 * TODO: Add Interface for getResultsByCompany, getConfiguration, unignorePattern
 */
import {IRCheckGlobComponent, IRCheckGlobSuggestion, TCheckSystem} from '../global/checkRepos.interface'

interface IRCheckDeadlinksComponent extends IRCheckGlobComponent {
  suggestion?: IRCheckGlobSuggestion
}

export interface IRCheckDeadlinksResultsResponse {
  [key: string]: {
    component: IRCheckDeadlinksComponent
    error?: string
    deadLinks?: {
      status: string
      totalLinkCount: number
      deadLinkCount: number
      deadLinks: {
        url: string
        status: number
        guide?: string
      }[]
    }
  }
}

export interface IRCheckDeadlinksIgnoreResponse {
  ignoredPatterns: {
    [key: string]: string
  }
}


export interface IRCheckDeadlinks {
  getResults(system: TCheckSystem, args: object): Promise<IRCheckDeadlinksResultsResponse>
  getResultsByCompany(company: string, args?: object): Promise<void>
  getConfiguration(system: string, args?: object): Promise<void>
  ignorePattern(system: string, args: { patterns: string[] }): Promise<IRCheckDeadlinksIgnoreResponse>
  unignorePattern(system: string, args: { pattern_id: number }): Promise<void>
}
