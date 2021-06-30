const Repository = require('../Repository')



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-06-14
 */
class MemoryRepository extends Repository {

  /**
   * Write something to the memory
   *
   * @param application
   * @param objectType
   * @param objectId
   * @param {Object} args
   * @param {String} args.key 
   * @param {String} args.value 
   */
  async set(application, objectType, objectId, args) {
    const route = { path: '{application}/memory/{objectType}/{objectId}', method: 'PUT', version: 1 }
    const argList = Object.assign({ application, objectType, objectId }, args)
    const requiredArguments = ['key', 'value']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = MemoryRepository
