const jwtDecode = require('jwt-decode')

/**
 * This class takes care of the connection between the KoalityEngine server and the client. It
 * handles the validation process, refreshes the tokens if needed and processes the servers response.
 *
 * @author Nils Langner (nils.langner@leankoala.com)
 * @created 2020-07-07
 */
class Connection {

  /**
   * Init routes and set default values
   *
   * @param apiServer
   * @param {function} axios
   */
  constructor(apiServer, axios) {

    this._accessToken = ''
    this._refreshToken = ''
    this._user = {}
    this._accessExpireTimestamp = 0
    this._refreshExpireTimestamp = 0
    this._apiServer = apiServer
    this._preferredLanguage = 'en'
    this._axios = axios

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
   * @param {Object} args
   * @param {String} args.username the user name for the user that should be logged in
   * @param {String} args.password the password for the given user
   * @param {String} args.wakeUpToken the wakeup token can be used to log in instead of username and pasword
   * @param {Boolean} args.withMemories return the users memory on connect
   * @param {String} [args.language] the preferred language
   */
  async connect(args) {
    const defaultArgs = {}

    this._connectionArgs = Object.assign(defaultArgs, args)

    if (args.hasOwnProperty('language')) {
      this.setLanguage(args[ 'language' ])
    }

    if (args.hasOwnProperty('refreshToken')) {
      if (!args.hasOwnProperty('userId')) {
        throw new Error('When connecting via refresh token the userId is also mandatory.')
      }

      this._user = { id: args[ 'userId' ] }
      this._refreshToken = args[ 'refreshToken' ]
      this._accessExpireTimestamp = 0

      await this.refreshAccessToken(true)
    } else if (args.hasOwnProperty('wakeUpToken')) {
      const wakeUpToken = JSON.parse(args[ 'wakeUpToken' ])
      this._refreshToken = wakeUpToken[ 'refreshToken' ]
      this._user = wakeUpToken[ 'user' ]
      this._refreshExpireTimestamp = wakeUpToken[ 'expireDate' ]
      this._accessExpireTimestamp = 0

      await this.refreshAccessToken()

    } else {
      let withMemories = false

      if (!this._connectionArgs.hasOwnProperty('username')) {
        throw new Error('Mandatory username is missing')
      }

      if (!this._connectionArgs.hasOwnProperty('password')) {
        throw new Error('Mandatory password is missing')
      }

      if (this._connectionArgs.hasOwnProperty('withMemories')) {
        withMemories = this._connectionArgs[ 'withMemories' ]
      }

      await this._authenticate(args.username, args.password, withMemories)
    }
  }

  /**
   * Return the expire date (timestamp) of the refresh token
   *
   * @return {Number}
   */
  getExpireDate() {
    return this._refreshExpireTimestamp
  }

  /**
   * Return a wake up token
   *
   * This token can be used to wake the connection up without re-entering the username
   * and password.
   *
   * @return {string}
   */
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
   * @return {Array}
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
   * @param {String} route
   * @param {Object} args
   *
   * @return {string}
   *
   * @private
   */
  _getUrl(route, args) {
    const plainPath = route[ 'path' ]
    const version = route[ 'version' ]
    const apiServer = this._apiServer

    let url = `${ apiServer }/v${ version }/${ plainPath }`

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
   * @param {Object} route
   * @param {Object} data
   * @param {Boolean} withoutToken
   *
   * @return {Array}
   */
  async send(route, data, withoutToken = false) {
    const method = route[ 'method' ].toUpperCase()
    const url = this._getUrl(route, data)

    let headers = {
      'accept-language': this._preferredLanguage
    }

    if (withoutToken !== true) {
      await this.refreshAccessToken()
      headers[ 'Authorization' ] = 'Bearer ' + this._accessToken
    }

    let response = {}

    try {
      response = await this._axios({ method, url, data, headers })
    } catch (e) {
      if (e.response) {
        response = e.response
      } else {
        throw e
      }
    }

    this._assertValidResponse(response, url, method, data)

    return response.data.data
  }

  /**
   * Set the preferred language for the API results
   *
   * @param  {String} language
   */
  setLanguage(language) {
    this._preferredLanguage = language
  }

  /**
   * Throw an exception if the response is not a valid or successful KoalityEngine response.
   *
   * @param {Object} response
   * @param {String} url
   * @param {String} method
   * @param {Array} data
   *
   * @private
   */
  _assertValidResponse(response, url, method, data) {
    const responseData = response.data
    if (responseData.status !== 'success') {
      throw new Error(responseData.message + ' (url: ' + url + ', method: ' + method + ', data: ' + JSON.stringify(data) + ')')
    }
  }

  /**
   * Authenticate the user using username and password.
   *
   * This function will set the access and refresh tokens that are used afterwards for authentication.
   *
   * @param {String} [username]
   * @param {String} [password]
   * @param {Boolean} [withMemories]
   *
   * @private
   */
  async _authenticate(username, password, withMemories) {
    const tokens = await this.send(this._routes[ 'authenticateByPassword' ], {
      username,
      password,
      with_memories: withMemories
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
   * @param {Boolean} withFreshToken
   *
   * @private
   */
  _refreshTokenExpireDate(withFreshToken = false) {
    const accessTokenData = jwtDecode(this._accessToken)
    this._accessExpireTimestamp = Math.floor(Date.now() / 1000) + accessTokenData[ 'ttl' ]

    if (withFreshToken) {
      const refreshTokenData = jwtDecode(this._refreshToken)
      this._refreshExpireTimestamp = Math.floor(Date.now() / 1000) + refreshTokenData[ 'ttl' ]
    }
  }

  /**
   * Use the refresh token to create a new access token.
   *
   * Thís function should be used if the user access rights have changed e.g. when a new project
   * has been created.
   */
  async refreshAccessToken(forceRefresh = false) {
    if (forceRefresh || Math.floor(Date.now() / 1000) + 10 > this._accessExpireTimestamp) {

      const user = this.getUser()

      const tokens = await this.send(this._routes[ 'refresh' ], {
        user_id: user.id,
        access_token: this._refreshToken
      }, true)

      this._user = tokens[ 'user' ]

      this._accessToken = tokens[ 'token' ]
      this._refreshTokenExpireDate(true)
    }
  }
}

module.exports = Connection
