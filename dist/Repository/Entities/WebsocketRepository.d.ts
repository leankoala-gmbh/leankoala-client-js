import Repository from '../Repository';
import { IRWebsocketGetRoomsResponse } from "../../typescript/interfaces/repos/websocketRepo.interface";
declare class WebsocketRepository extends Repository {
    constructor();
    getRooms(args?: {}): Promise<IRWebsocketGetRoomsResponse>;
}
export default WebsocketRepository;
