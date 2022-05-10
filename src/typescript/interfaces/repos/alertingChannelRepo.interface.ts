interface IAlertPolicy {
  id: number
  name: string
  severities: {
    priority: number
    name: string
  }[]
  interval: string
}

interface IAlertCreateOptions {
  emailaddresses: string
}

interface IAlertChannel {
  id: number
  name: string
  sender: string
  options: IAlertCreateOptions
  policies: IAlertPolicy[]
  language: string
}

export interface IRAlertResponseList {
  channels: {
    [key: string]: IAlertChannel
  }
}

export interface IRAlertCreate {
  name: string
  type: string
  language?: string
  options: IAlertCreateOptions
}

export interface IRAlertResponseCreate {
  channel: {
    id: number
    name: string
    sender: string
    options: IAlertCreateOptions
    policies: any[] | IAlertPolicy[]
    language: string
  }
}

export interface IRAlertUpdate {
  name?: string
  type: string
  language?: string
  options?: IAlertCreateOptions
}

export interface IAlertResponseUpdate {
  channel: IAlertChannel
}

export interface IRAlertingChannel {
  list(project: string, args?: object): Promise<IRAlertResponseList>
  create(project: string, args: IRAlertCreate): Promise<IRAlertResponseCreate>
  delete(project: string, channel: number, args?: object): Promise<void>
  update(project: string, channel: number, args: IRAlertUpdate): Promise<IAlertResponseUpdate>
}
