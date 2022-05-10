import {IRCheckGlobComponent} from '../global/checkRepos.interface'

export interface IRCheckBrokenResourceResponse {
  component: IRCheckGlobComponent
  error?: string
  brokenResources?: {
    totalResourcesCount: number
    brokenResourcesCount: number
    resources: {
      url: string
      type: string
      status: number
    }[]
  }
}

export interface IRCheckBrokenResource {
  getBrokenResources(system: string, args?: object): Promise<IRCheckBrokenResourceResponse>
}
