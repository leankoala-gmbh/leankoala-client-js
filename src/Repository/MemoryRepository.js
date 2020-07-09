/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-08
 */
class MemoryRepository {

  constructor(connection) {
    this._connection = connection
  }

  /**
   * @param objectType
   * @param objectId
   */
   async getAll(objectType, objectId, args) {
    const route = {
      path: 'memory/{objectType}/{objectId}',
      method: 'GET',
      version: 1
    }

    const argList = Object.assign({ objectType, objectId }, args)

    return this._connection.send(route, argList)
  }

  /**
   * @param objectType
   * @param objectId
   * @param {Object} args
   * @param {String} args.key 
   * @param {String} args.value 
   */
   async set(objectType, objectId, args) {
    const route = {
      path: 'memory/{objectType}/{objectId}',
      method: 'POST',
      version: 1
    }

    const argList = Object.assign({ objectType, objectId }, args)

    // validate arguments
    const requiredArguments = ['key', 'value']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Throw an exception if a mandatory argument is not set.
   *
   * @param requiredArguments
   * @param actualArguments
   * @private
   *
   * @todo this should be done in a parent class
   */
  _assertValidArguments(requiredArguments, actualArguments) {
    requiredArguments.forEach(function (argument) {
      if (!actualArguments.hasOwnProperty(argument)) {
        throw new Error('The mandatory argument ' + argument + ' could not be found in the argument object.')
      }
    })
  }
}

module.exports = MemoryRepository
