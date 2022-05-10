import {IRCheckGlobComponent, IRCheckGlobSuggestion} from '../global/checkRepos.interface'

interface IRCheckCookiesComponent extends IRCheckGlobComponent {
  suggestion?: IRCheckGlobSuggestion
}

export interface IRCheckCookiesResponse {
  components: never[] | {
    [key: string]: {
      component: IRCheckCookiesComponent
      domains?: string[]
      error?: string
    }
  }
}

export interface IRCheckCookies {
  getDomains(system: string|number, args?: object): Promise<IRCheckCookiesResponse>
}
