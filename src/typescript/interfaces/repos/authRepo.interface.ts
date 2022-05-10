export interface IRAuthRefreshTokenArgs {
  with_memories?: boolean
}

export interface IRAuthCredentialsArgs extends IRAuthRefreshTokenArgs {
  username: string
  password: string
  expire?: boolean
}

export interface IRAuth {
  createTokenByCredentials(arg: IRAuthCredentialsArgs) : Promise<any>
  createTokenByRefreshToken(user: string, arg: IRAuthRefreshTokenArgs) : Promise<any>
}
