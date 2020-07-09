const assertValidArguments = require('../utils/assertValidArguments')
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
    assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }
}

module.exports = MemoryRepository
