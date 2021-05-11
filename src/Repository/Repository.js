class Repository {
    constructor() {
        this._connectionType = 'MasterConnection'
    }

    /**
     * Throw an exception if a mandatory argument is not set.
     *
     * @param requiredArguments
     * @param actualArguments
     * @private
     */
    _assertValidArguments(requiredArguments, actualArguments) {
        requiredArguments.forEach(function (argument) {
            if (!actualArguments.hasOwnProperty(argument)) {
                throw new Error('The mandatory argument ' + argument + ' could not be found in the argument object.')
            }
        })
    }

    setConnection(connection) {
        this._connection = connection
    }

    getConnectionType() {
        return this._connectionType
    }
}

module.exports = Repository

