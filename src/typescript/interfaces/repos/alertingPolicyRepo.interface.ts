interface ISeverity {
  priority: number
  name: string
}

interface IOptions {
  emailaddresses: string
}

interface IPolicyChannel {
  [key: string]: {
    id: number
    name: string
    sender: string
    options: IOptions
    policies: {
      id: number
      name: string
      severities: ISeverity[]
      interval: string
    }[]
    language: string
  }
}

export interface IRAlertPolicyListResponse {
  policies: {
    [key: string]: {
      id: number
      name: string
      severities: ISeverity[]
      interval: string
      channels?: any[] | IPolicyChannel
    }
  }
}

export interface IRAlertPolicyUpdateArgs {
  name: string
  severities: string[]
  interval: string
}

export interface IRAlertPolicyCreateArgs extends IRAlertPolicyUpdateArgs {
  channels: number[]
}

export interface IRAlertPolicyCreateResponse {
  policy: {
    id: number
    name: string
    severities: ISeverity[]
    interval: string
    channels: IPolicyChannel
  }
}

export interface IRAlertingPolicy {
  list(project: string, args?: object): Promise<IRAlertPolicyListResponse>
  create(project: string, args: IRAlertPolicyCreateArgs): Promise<IRAlertPolicyCreateResponse>
  delete(project: string, policy: number, args?: object): Promise<void>
  update(project: string, policy: number, args: IRAlertPolicyUpdateArgs): Promise<IRAlertPolicyCreateResponse>
}
