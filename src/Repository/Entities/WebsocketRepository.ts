import Repository from '../Repository'
import {IRWebsocketGetRoomsResponse} from '../../typescript/interfaces/repos/websocketRepo.interface'

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2021-05-11
 */
class WebsocketRepository extends Repository {

  constructor() {
      super()
      this._connectionType = 'ClusterConnection'
  }

  /**
   * Return a websocket server with the room names for the given user.
   * request url: /kapi/v1/websockets/rooms
   * request method: POST
   *
   */
  async getRooms(args = {}): Promise<IRWebsocketGetRoomsResponse> {
    const route = { path: 'websockets/rooms', method: 'POST', version: 1 }
    const argList = Object.assign({}, args)

    return this._connection.send(route, argList)
  }
}

export default WebsocketRepository
