/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-07-09
 */
class WebsocketRepository {

  constructor(connection) {
    this._connection = connection
  }

  /**
   * Return a websocket server with the room names for the given user.
   *
   */
  async getRoom(args) {
    const route = {
      path: 'websockets/rooms',
      method: 'GET',
      version: 1
    }

    const argList = Object.assign({  }, args)

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

module.exports = WebsocketRepository
