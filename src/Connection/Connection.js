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
   */
  constructor() {
    this._accessToken = ''
    this._refreshToken = ''
    this._user = {}
    this._expireTimestamp = 0

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
    const defaultArgs = {
      apiServer: 'https://api.cluster1.koalityengine.com'
    }

    this._connectionArgs = Object.assign(defaultArgs, args)

    if (!this._connectionArgs.hasOwnProperty('username')) {
      throw new Error('Mandatory username is missing')
    }

    if (!this._connectionArgs.hasOwnProperty('password')) {
      throw new Error('Mandatory password is missing')
    }

    this._initAxios()
    await this._authenticate(args.username, args.password)
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
    const apiServer = this._connectionArgs[ 'apiServer' ]

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
   * @param withOutToken
   *
   * @return {Promise<*>}
   */
  async send(route, data, withOutToken) {
    const method = route[ 'method' ].toUpperCase()
    const url = this._getUrl(route, data)

    if (withOutToken !== true) {
      await this._refreshAccessToken()
      data[ 'access_token' ] = this._accessToken
    }

    let response = {}

    try {
      response = await axios({ method, url, data })
    } catch (e) {
      response = e.response
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

    this._refreshTokenExpireDate()
  }

  /**
   * Refresh the expire date
   *
   * This function should be called after a new token is generated
   *
   * @private
   */
  _refreshTokenExpireDate() {
    const tokenData = jwtDecode(this._accessToken)
    const ttl = tokenData[ 'ttl' ]

    this._expireTimestamp = Date.now() + ttl
  }

  /**
   * Use the refrsh token to create a new access token.
   *
   * @return {Promise<void>}
   * @private
   */
  async _refreshAccessToken() {
    if (Date.now() + 10 < this._expireTimestamp) {
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
