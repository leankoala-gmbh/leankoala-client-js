import {IRCheckGlobComponent, IRCheckGlobSuggestion, TCheckSystem} from '../global/checkRepos.interface'

interface IRCheckInsecureContentComponent extends IRCheckGlobComponent {
  suggestion?: IRCheckGlobSuggestion
}

export interface IRCheckInsecureContentResponse {
  results: {
    [key: string]: {
      component: IRCheckInsecureContentComponent
      error?: string
    }
  }
}

export interface IRCheckInsecureContent {
  getInsecureElements(system: TCheckSystem, args?: object): Promise<IRCheckInsecureContentResponse>
}
