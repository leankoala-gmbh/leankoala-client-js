const axios = require('axios')

/**
 *
 */
class Connection {

  constructor() {
    this._accessToken = ''
    this._refreshToken = ''
    this._user = {}

    this._routes = {
      authenticateByPassword: {
        version: 1,
        path: 'auth/tokens/access',
        method: 'POST'
      }
    }
  }

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

  getUser() {
    return this._user
  }

  _getUrl(route, args) {
    const plainPath = route[ 'path' ]
    const version = route[ 'version' ]
    const apiServer = this._connectionArgs[ 'apiServer' ]

    const plainUrl = apiServer + '/v' + version + '/' + plainPath

    return plainUrl
  }

  async send(route, data, withOutToken) {
    const method = route[ 'method' ].toUpperCase()
    const url = this._getUrl(route, data)

    if (withOutToken !== true) {
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

  _assertValidResponse(response, url, data) {
    const responseData = response.data
    if (responseData.status !== 'success') {
      throw new Error(responseData.message + ' (url: ' + url + ', data: ' + JSON.stringify(data) + ')')
    }
  }

  _initAxios() {
    this._axios = axios
  }

  async _authenticate(username, password) {
    const tokens = await this.send(this._routes[ 'authenticateByPassword' ], {
      username,
      password
    }, true)
    this._accessToken = tokens[ 'token' ]
    this._refreshToken = tokens[ 'refresh_token' ]
    this._user = tokens[ 'user' ]
  }
}

module.exports = Connection
