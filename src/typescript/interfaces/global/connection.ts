export interface IConnectArgs {
  username: string
  password: string
  wakeUpToken?: string
  withMemories?: boolean
  withFeatures?: boolean
  preferred_language?: string
  language?: string
  axiosAdapter?: any
  refreshToken?: string
  userId?: string | number
  loginToken?: string
  accessToken?: string
}

export interface IGetWakeUpTokenResult {
  refreshToken: string
  user: object
  expireDate: number
  apiServer: string
}

export interface IRoute {
  method: string
  path: string
  version: number
}

export interface IError {
  response: string
}

export interface IGetUrlArgs {
  access_token: string
  user: number
  with_next_full_run: boolean
  with_onboarding_status: boolean
  with_features: boolean
  filter_empty_projects: boolean
}

export interface IUser {
  '360': {
    [key: string]: string
  }
  id: number | string
  username: string
  first_name: string
  last_name: string
  email: string
  preferred_language: string
  was_invited: boolean
  company: {
    id: number
    name: string
    role: {
      id: number
      name: string
    }
    provider: {
      id: number
      identifier: string
    }
    subscription: {
      status: string
      trial_end: number
      systems_free: number
    }
  }
  memories: {
    [key: string]: string
  }
}

export enum EConnectionSendName {
  Owner = 'Owner'
}

export enum EConnectionSendInterval {
  Hour = 'hour'
}

export interface IConnectionSendDataResult {
  projects: {
    id: number
    identifier: string
    name: string
    onboarding: {
      completed: boolean
      details: {
        hasSystems: boolean
        hasComponents: boolean
        hasPolicies: boolean
        isCustomDomain: boolean
      }
    }
    features: string[]
    systems: {
      id: number
      name: string
      domain: string
      interval: EConnectionSendInterval
      description: null
      system_type: {
        id: number
        name: string
        fixedComponents: boolean
      }
      screenshot: {
        raw: string
        thumb: string
      }
      next_run: number
      last_run: number
    }[]
    role: {
      id: number
      name: EConnectionSendName
    }
  }[]
}


export interface IConnectionSendResult {
  data: {
    status: string
    message: string
    data: IConnectionSendDataResult
    identifier?: string
  }
  status: number
  statusText: string
  headers: {
    'cache-control': string
    'content-length': string
    'content-type': string
  }
  config: {
    url: string
    method: string
    data: string
    headers: {
      Accept: string
      'Content-Type': string
      'accept-language': string
      Authorization: string
    }
    transformRequest: null[]
    transformResponse: null[]
    timeout: number
    adapter: boolean
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    transitional: {
      silentJSONParsing: boolean
      forcedJSONParsing: boolean
      clarifyTimeoutError: boolean
    }
  }
  request: object
}

export interface IAssertValidResponsePayload {
  message: string
  url: string
  data: any
  identifier?: any
}

export interface IAuthenticateArgs {
  loginToken: string | undefined
  password?: string
  username?: string
  withMemories: boolean
}

export interface IRefreshAccessTokenCompany {
  id: number
  name: string
  identifier: string
  cluster: {
    id: number
    identifier: string
    apiEndpoint: string
  }
}

export interface IRefreshAccessTokenMemories {
  [key: string]: string
}

export interface IRefreshAccessToken {
  token: string
  refreshToken?: string
  user: {
    id: number
    userName: string
    email: string
    enabled: boolean
    first_name: string
    last_name: string
    preferredLanguage: string
    application: string
    created: Date
    lastLogin: Date
    gravatar: string
    companies: IRefreshAccessTokenCompany[]
    memories: IRefreshAccessTokenMemories
  }
  companies?: IRefreshAccessTokenCompany[]
  memories?: IRefreshAccessTokenMemories
}

export interface ISendHeaders {
  'accept-language': string
  Authorization?: string
}
