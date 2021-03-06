const Connection = require('./Connection/Connection')

const RepositoryCollection = require('./Repository/RepositoryCollection')

/**
 * The KoalityEngine client is used to connect to an instance of the KoalityEngine
 * and process all needed tasks.
 *
 * @author Nils Langner (nils.langner@leankoala.com)
 * @created 2020-07-05
 */
class LeankoalaClient {

    /**
     * Create a client and set the environment
     *
     * @param {String} environment the environment (development|production)
     */
    constructor(environment = 'production') {
        this._connection = false
        this._environment = environment
        this._connectionStatus = 'disconnected'
        this._registeredEventListeners = {};
    }

    /**
     * Connect to the API server and retrieve the JWT for later requests.
     *
     * @param {Object} args
     * @param {String} [args.username] the user name for the user that should be logged in
     * @param {String} [args.password the password for the given user
     * @param {String} [args.wakeUpToken] the wakeup token can be used to log in instead of username and pasword
     * @param {String} [args.accessToken] the token fill this in the client generator
     * @param {Boolean} [args.withMemories] return the users memory on connect
     * @param {String} [args.language] the preferred language (default: en; implemented: de, en)
     * @param {Object} [args.axiosAdapter] the preferred language (default: en; implemented: de, en)
     * @param {function} [args.axios] a predefined axios instance
     */
    async connect(args) {
        this._connectionStatus = 'connecting'
        try {
            await this._initConnection(args)

            this._repositoryCollection = new RepositoryCollection(this._connection)
        } catch (error) {
            this._connectionStatus = 'disconnected'
            throw error
        }

        this._connectionStatus = 'connected'
    }

    /**
     * Return true if the client has valid and not expired refresh tokens.
     *
     * @return {boolean}
     */
    isConnected() {
        if (this._connection === false) {
            return false
        }

        return Math.floor(Date.now() / 1000) < this._connection.getExpireDate()
    }

    /**
     * Set the preferred language for the API results.
     *
     * The language can already be added when connecting.
     *
     * @param {String} language
     */
    setLanguage(language) {
        this._connection.setLanguage(language)
    }

    /**
     * Return the current refresh token.
     *
     * It can be used to reactivate the connection without using the username and
     * password.
     *
     * @return {String}
     */
    getWakeUpToken() {
        return this._connection.getWakeUpToken()
    }

    /**
     * Initialize the connection object and connect to the server
     *
     * @param {Object} args see connect function
     *
     * @private
     */
    async _initConnection(args) {

        const apiServer = this._environment === 'production'
            ? 'https://api.cluster1.koalityengine.com'
            : 'https://stage.monitor.leankoala.com/kapi'

        if (!args.hasOwnProperty('axios')) {
            throw new Error('Missing parameter axios. The HTTP client must be injected.')
        }

        const axios = args['axios']

        if (typeof axios !== 'function') {
            throw new Error('The axios argument is not a function. Seems like it is not a valid axios object,')
        }

        this._connection = new Connection(apiServer, axios)
        await this._connection.connect(args)

        this._registerConnectionListeners()
    }

    _registerConnectionListeners() {
        const connection = this._connection
        const listeners = this._registeredEventListeners

        Object.keys(listeners).forEach((key) => {
            listeners[key].forEach((element) => {
                connection.on(key, element)
            })
        })
    }

    /**
     * Return the repository by the given name.
     *
     * Throws an exception if the repository is not known.
     *
     * @param {String} entityType
     *
     * @return {Repository}
     *
     * @throws {Error}
     */
    async getRepository(entityType) {
        if (this._connectionStatus === 'disconnected') {
            throw new Error('Please connect the client before running this method.')
        }

        if (this._connectionStatus === 'connected') {
            return this._repositoryCollection.getRepository(entityType)
        }

        if (this._connectionStatus === 'connecting') {
            while (this._connectionStatus === 'connecting') {
                await this._sleep(300)
            }
            return this.getRepository(entityType)
        }
    }

    /**
     * Sleep for an amount of milliseconds.
     *
     * @param {Number} milliseconds
     * @return {Promise}
     *
     * @private
     */
    async _sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    /**
     * Return the current user.
     *
     * @return {Object}
     */
    getUser() {
        return this._connection.getUser()
    }

    /**
     * Register event handler.
     *
     * @param {String} eventName
     * @param {CallableFunction} callback
     */
    on(eventName, callback) {
        if (!this._registeredEventListeners.hasOwnProperty(eventName)) {
            this._registeredEventListeners[eventName] = []
        }
        this._registeredEventListeners[eventName].push(callback)

        if (this._connection) {
            this._connection.on(eventName, callback)
        }
    }

    /**
     * Return all resolved promises.
     *
     * @param promises
     * @returns Object
     */
    async fetchAll(promises) {
        const promiseArray = []
        const results = {}
        let count = 0;

        Object.keys(promises).forEach((element) =>
            promiseArray.push(promises[element])
        )

        const promiseResults = await Promise.allSettled(promiseArray);

        Object.keys(promises).forEach((element) => {
                results[element] = promiseResults[count].value
                count++
            }
        )

        return results
    }
}

module.exports = LeankoalaClient
