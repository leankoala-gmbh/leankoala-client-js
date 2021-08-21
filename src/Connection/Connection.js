const jwtDecode = require('jwt-decode')

const BadRequestError = require('./BadRequestError')

/**
 * This class takes care of the connection between the KoalityEngine server and the client. It
 * handles the validation process, refreshes the tokens if needed and processes the servers response.
 *
 * events:
 *  - send (axios send data/parameters)
 *  - failure (BadRequestError)
 *  - error (Axios error)
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

    this._refreshRoute = {
      version: 1,
      path: 'auth/tokens/refresh/{user_id}',
      method: 'POST'
    }

    this._accessToken = ''
    this._refreshToken = ''
    this._user = {}
    this._accessExpireTimestamp = 0
    this._refreshExpireTimestamp = 0
    this._apiServer = apiServer
    this._preferredLanguage = 'en'
    this._axios = axios
    this._axiosAdapter = false
    this._defaultParameters = {}

    this._registeredEventListeners = {}

    this._routes = {
      authenticateByPassword: {
        version: 1,
        path: 'auth/tokens/access',
        method: 'POST'
      },
      authenticateByToken: {
        version: 1,
        path: 'auth/tokens/token/{masterUserId}',
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
      this.setLanguage(args['language'])
    }

    if (args.hasOwnProperty('axiosAdapter')) {
      this._axiosAdapter = args['axiosAdapter']
    }

    if (args.hasOwnProperty('refreshToken')) {
      if (!args.hasOwnProperty('userId')) {
        throw new Error('When connecting via refresh token the userId is also mandatory.')
      }

      this._user = {id: args['userId']}
      this._refreshToken = args['refreshToken']
      this._accessExpireTimestamp = 0

      await this.refreshAccessToken(true, args.withMemories)
    } else if (args.hasOwnProperty('accessToken')) {
      this._accessToken = args['accessToken']
      this._accessExpireTimestamp = (Date.now() / 1000) + 60
    } else if (args.hasOwnProperty('wakeUpToken')) {
      await this._connectByWakeUpToken(args)
    } else {
      let withMemories = false

      if (!this._connectionArgs.hasOwnProperty('loginToken')) {
        if (!this._connectionArgs.hasOwnProperty('username')) {
          throw new Error('Mandatory username is missing')
        }

        if (!this._connectionArgs.hasOwnProperty('password')) {
          throw new Error('Mandatory password is missing')
        }
      }

      if (this._connectionArgs.hasOwnProperty('withMemories')) {
        withMemories = this._connectionArgs['withMemories']
      }

      await this._authenticate({
        username: args.username,
        password: args.password,
        withMemories,
        loginToken: args.loginToken
      })
    }
  }

  /**
   * Establish the connection via wake up token.
   *
   * The token must be generated via the getWakeUpToken() method.
   *
   * @param args
   * @returns {Promise<void>}
   *
   * @private
   */
  async _connectByWakeUpToken(args) {
    const wakeUpToken = JSON.parse(args['wakeUpToken'])

    this._refreshToken = wakeUpToken['refreshToken']
    this._user = wakeUpToken['user']
    this._refreshExpireTimestamp = wakeUpToken['expireDate']
    this._accessExpireTimestamp = 0
    this.setLanguage(args.preferred_language)
    await this.refreshAccessToken(true, args.withMemories)
  }

  getAccessToken() {
    return this._accessToken
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
   * @return {array}
   */
  getWakeUpToken() {
    return {
      refreshToken: this._refreshToken,
      user: this.getUser(),
      expireDate: this.getExpireDate(),
      apiServer: this._apiServer
    }
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
    const plainPath = route['path']
    const version = route['version']
    const apiServer = this._apiServer

    let url = `${apiServer}v${version}/${plainPath}`

    const matches = url.match(/{(.*?)}/gi)

    if (!apiServer) {
      throw new Error('Unable to create the url. ApiServer parameter is missing.')
    }

    if (matches != null) {
      matches.forEach(function (match) {
        const varName = match.replace('{', '').replace('}', '')
        if (args.hasOwnProperty(varName)) {
          url = url.replace(match, args[varName])
        } else {
          throw new Error('The mandatory parameter ' + varName + ' is missing in the arguments object.')
        }
      })
    }

    url = url.replace(/(https?:\/\/)|(\/)+/g, "$1$2");

    return url
  }

  /**
   * Send a request to the KoalityEngine and handle the result.
   *
   * @event send
   * @event error
   *
   * @param {Object} route
   * @param {Object} data
   * @param {Boolean} withoutToken
   *
   * @return {Array}
   */
  async send(route, data, withoutToken = false) {

    let headers = {
      'accept-language': this._preferredLanguage
    }

    if (withoutToken !== true) {
      await this.refreshAccessToken()
      headers['Authorization'] = 'Bearer ' + this._accessToken
    }

    let defaultParameter = this._defaultParameters;
    const fullData = Object.assign(defaultParameter, data)

    const method = route['method'].toUpperCase()
    const url = this._getUrl(route, fullData)

    let response = {}

    try {
      const parameters = {method, url, data: fullData, headers, adapter: this._axiosAdapter}
      this._publish('send', parameters)
      response = await this._axios(parameters)
    } catch (e) {
      if (e.response) {
        response = e.response
      } else {
        this._publish('error', e)
        throw e
      }
    }

    this._publish('response', response)
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
   * Add a default parameter to every request that gets send.
   *
   * @param key
   * @param value
   */
  addDefaultParameter(key, value) {
    this._defaultParameters[key] = value
  }

  /**
   * Throw an exception if the response is not a valid or successful KoalityEngine response.
   *
   * @event failure
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
      const payload = {message: responseData.message, url, data}
      if (responseData.identifier) {
        payload.identifier = responseData.identifier
      }
      this._publish('failure', payload)
      throw new BadRequestError(payload)
    }
  }

  /**
   * Authenticate the user using username and password.
   *
   * This function will set the access and refresh tokens that are used afterwards for authentication.
   *
   * @param {Object} args
   *
   * @private
   */
  async _authenticate(args) {
    let tokens
    if (args.username) {
      tokens = await this.send(this._routes['authenticateByPassword'], {
        username: args.username,
        password: args.password,
        with_memories: args.withMemories,
        withMemories: args.withMemories
      }, true)
    } else if (args.loginToken) {
      tokens = await this.send(this._routes['authenticateByToken'], {
        access_token: args.loginToken,
        with_memories: args.withMemories,
        withMemories: args.withMemories
      }, true)
    }else{
      throw new Error('User name or login token is not set. At least one of them must be set..')
    }

    this._accessToken = tokens['token']
    this._refreshToken = tokens['refresh_token']
    this._user = tokens['user']

    if(tokens.memories) {
      this._user.memories = tokens.memories
    }

    this._refreshTokenExpireDate(true)
  }

  /**
   * Refresh the expire date.
   *
   * This function should be called after a new token is generated.
   *
   * @param {Boolean} withRefreshToken
   *
   * @private
   */
  _refreshTokenExpireDate(withRefreshToken = false) {
    const accessTokenData = jwtDecode(this._accessToken)
    this._accessExpireTimestamp = Math.floor(Date.now() / 1000) + accessTokenData['ttl']

    if (withRefreshToken) {
      const refreshTokenData = jwtDecode(this._refreshToken)
      this._refreshExpireTimestamp = Math.floor(Date.now() / 1000) + refreshTokenData['ttl']
    }
  }

  /**
   * Set the access token.
   *
   * @param {String} token
   * @param {String} refreshToken
   */
  setAccessToken(token, refreshToken) {
    this._accessToken = token

    let withRefreshToken = false

    if (refreshToken) {
      this._refreshToken = refreshToken
      withRefreshToken = true
    }

    this.addDefaultParameter('access_token', token)
    this._refreshTokenExpireDate(withRefreshToken)
  }

  /**
   * Use the refresh token to create a new access token.
   *
   * Thís function should be used if the user access rights have changed e.g. when a new project
   * has been created.
   *
   * @param {boolean} forceRefresh
   * @param {boolean} withMemories
   */
  async refreshAccessToken(forceRefresh = false, withMemories = false) {
    if (forceRefresh || Math.floor(Date.now() / 1000) + 10 > this._accessExpireTimestamp) {
      const user = this.getUser()
      const tokens = await this.send(this._refreshRoute, {
        user_id: user.id,
        user: user.id,
        access_token: this._refreshToken,
        with_memories: withMemories,
        withMemories: withMemories,
        application: 'koality'
      }, true)

      this._user = tokens['user']

      if(tokens.memories) {
        this._user.memories = tokens.memories
      }

      this.setAccessToken(tokens['token'], this._refreshToken)
    }
  }

  setUser(user) {
    this._user = user
  }

  /**
   * Set the refresh route for this connection
   *
   * @param {string} route
   */
  setRefreshRoute(route) {
    this._refreshRoute = route
  }

  /**
   * Register a callback for an internal published event.
   *
   * @param {String} eventName
   * @param {CallableFunction} callback
   */
  on(eventName, callback) {
    if (!this._registeredEventListeners.hasOwnProperty(eventName)) {
      this._registeredEventListeners[eventName] = []
    }
    this._registeredEventListeners[eventName].push(callback)
  }

  /**
   * Publish an internal event.
   *
   * @param {String} eventName
   * @param {Object} payload
   *
   * @private
   */
  _publish(eventName, payload) {
    if (this._registeredEventListeners.hasOwnProperty(eventName)) {
      this._registeredEventListeners[eventName].forEach(element => {
        element(payload)
      })
    }
  }
}

module.exports = Connection
