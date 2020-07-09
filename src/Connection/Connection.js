const axios = require('axios')
const jwtDecode = require('jwt-decode')

/**
 *
 * @author Nils Langner (nils.langner@leankoala.com)
 * @created 2020-07-07
 */
class Connection {

  /**
   * Init routes and set default values
   *
   * @param apiServer
   */
  constructor(apiServer) {
    this._accessToken = ''
    this._refreshToken = ''
    this._user = {}
    this._accessExpireTimestamp = 0
    this._refreshExpireTimestamp = 0
    this._apiServer = apiServer

    this._routes = {
      authenticateByPassword: {
        version: 1,
        path: 'auth/tokens/access',
        method: 'POST'
      },
      refresh: {
        version: 1,
        path: 'auth/tokens/refresh/{user_id}',
        method: 'POST'
      }
    }
  }

  /**
   * Connect to the KoalityEngine server and fetch the tokens and user information.
   *
   * @param args
   * @return {Promise<void>}
   */
  async connect(args) {
    const defaultArgs = {}

    this._connectionArgs = Object.assign(defaultArgs, args)

    this._initAxios()

    if (args.hasOwnProperty('wakeUpToken')) {
      const wakeUpToken = JSON.parse(args[ 'wakeUpToken' ])
      this._refreshToken = wakeUpToken[ 'refreshToken' ]
      this._user = wakeUpToken[ 'user' ]
      this._refreshExpireTimestamp = wakeUpToken[ 'expireDate' ]
      this._accessExpireTimestamp = 0

      await this._refreshAccessToken()

    } else {
      if (!this._connectionArgs.hasOwnProperty('username')) {
        throw new Error('Mandatory username is missing')
      }

      if (!this._connectionArgs.hasOwnProperty('password')) {
        throw new Error('Mandatory password is missing')
      }
      await this._authenticate(args.username, args.password)
    }
  }

  getExpireDate() {
    return this._refreshExpireTimestamp
  }

  getWakeUpToken() {
    return JSON.stringify({
      refreshToken: this._refreshToken,
      user: this.getUser(),
      expireDate: this.getExpireDate()
    })
  }

  /**
   * Return the current user that is logged in.
   *
   * @return {{}}
   */
  getUser() {
    return this._user
  }

  /**
   * Get the effective url that will be called depending on path, server and value.
   *
   * It will replace placeholder strings by the actual values from the given
   * arguments.
   *
   * @param route
   * @param args
   *
   * @return {string}
   *
   * @private
   */
  _getUrl(route, args) {
    const plainPath = route[ 'path' ]
    const version = route[ 'version' ]
    const apiServer = this._apiServer

    let url = apiServer + '/v' + version + '/' + plainPath

    const matches = url.match(/{(.*?)}/gi)

    if (matches != null) {
      matches.forEach(function (match) {
        const varName = match.replace('{', '').replace('}', '')
        if (args.hasOwnProperty(varName)) {
          url = url.replace(match, args[ varName ])
        } else {
          throw new Error('The mandatory parameter ' + varName + ' is missing in the arguments object.')
        }
      })
    }

    return url
  }

  /**
   * Send a request to the KoalityEngine and handle the result.
   *
   * @param route
   * @param data
   * @param withoutToken
   *
   * @return {Promise<*>}
   */
  async send(route, data, withoutToken = false) {
    const method = route[ 'method' ].toUpperCase()
    const url = this._getUrl(route, data)

    if (withoutToken !== true) {
      await this._refreshAccessToken()
      data[ 'access_token' ] = this._accessToken
    }

    let response = {}

    try {
      response = await axios({ method, url, data })
    } catch (e) {
      if (e.response) {
        response = e.response
      } else {
        throw e
      }
    }

    this._assertValidResponse(response, url, data)

    return response.data.data
  }

  /**
   * Throw an exception if the response is not a valid or successful KoalityEngine response.
   *
   * @param response
   * @param url
   * @param data
   *
   * @private
   */
  _assertValidResponse(response, url, data) {
    const responseData = response.data
    if (responseData.status !== 'success') {
      throw new Error(responseData.message + ' (url: ' + url + ', data: ' + JSON.stringify(data) + ')')
    }
  }

  /**
   * Initialize axios as HTTP client.
   *
   * @private
   */
  _initAxios() {
    this._axios = axios
  }

  /**
   * Authenticate the user using username and password.
   *
   * This function will set the access and refresh tokens that are used afterwards for authentication.
   *
   * @param username
   * @param password
   * @return {Promise<void>}
   *
   * @private
   */
  async _authenticate(username, password) {
    const tokens = await this.send(this._routes[ 'authenticateByPassword' ], {
      username,
      password
    }, true)

    this._accessToken = tokens[ 'token' ]
    this._refreshToken = tokens[ 'refresh_token' ]
    this._user = tokens[ 'user' ]

    this._refreshTokenExpireDate(true)
  }

  /**
   * Refresh the expire date
   *
   * This function should be called after a new token is generated
   *
   * @private
   */
  _refreshTokenExpireDate(withFreshToken = false) {
    const accessTokenData = jwtDecode(this._accessToken)
    this._accessExpireTimestamp = Date.now() + accessTokenData[ 'ttl' ]

    if (withFreshToken) {
      const refreshTokenData = jwtDecode(this._refreshToken)
      this._refreshExpireTimestamp = Date.now() + refreshTokenData[ 'ttl' ]
    }
  }

  /**
   * Use the refrsh token to create a new access token.
   *
   * @return {Promise<void>}
   * @private
   */
  async _refreshAccessToken() {
    if (Date.now() + 10 > this._accessExpireTimestamp) {
      const user = this.getUser()

      const tokens = await this.send(this._routes[ 'refresh' ], {
        user_id: user.id,
        access_token: this._refreshToken
      }, true)

      this._accessToken = tokens[ 'token' ]
      this._refreshTokenExpireDate()
    }
  }
}

module.exports = Connection
