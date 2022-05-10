/**
 * TODO: Add Interface for getResults
 */

import {TCheckSystem} from '../global/checkRepos.interface'

export interface IRCheckHealthCheck {
  getResults(system: TCheckSystem, args: object): Promise<any>
}
