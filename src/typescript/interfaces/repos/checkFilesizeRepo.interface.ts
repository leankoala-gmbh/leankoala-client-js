/**
 * TODO: Add Interface for Big-Files, IgnorePattern Response
 */

import {IRCheckGlobComponent, IRCheckGlobSuggestion, TCheckSystem} from '../global/checkRepos.interface'

interface IRCheckFilesizeComponent extends IRCheckGlobComponent {
  suggestion?: IRCheckGlobSuggestion
}

interface IRCheckFilesizeBigFiles {
  [key: string]: {
    'big-files': {
      name: string
    }
  }
}

export interface IRCheckFilesizeResultsResponse {
  [key: string]: {
    'big-files': IRCheckFilesizeBigFiles[]
    component: IRCheckFilesizeComponent
  }
}

export interface IRCheckFilesizeIgnoreResponse {
  ignoredPatterns: {
    [key: string]: string
  }
}
export interface IRCheckFilesize {
  getResults(system: TCheckSystem, args?: object): Promise<IRCheckFilesizeResultsResponse>
  ignorePattern(system: TCheckSystem, args: { patterns: string[] }): Promise<IRCheckFilesizeIgnoreResponse>
}
