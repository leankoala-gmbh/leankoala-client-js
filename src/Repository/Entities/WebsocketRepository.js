const Repository = require('../Repository')

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2020-08-14
 */
class WebsocketRepository extends Repository {

  /**
   * Return a websocket server with the room names for the given user.
   * @param {Object} args
   */
  async getRooms(args) {
    const route = { path: 'websockets/rooms', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = WebsocketRepository
