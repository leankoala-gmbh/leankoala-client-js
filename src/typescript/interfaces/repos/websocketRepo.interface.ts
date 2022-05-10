export enum TIRWGRRType {
  Company = 'company',
  Project = 'project',
  User = 'user'
}
export interface IRWGRRRoom {
  type: TIRWGRRType
  project_id?: number
  room: string
  user_id?: number
  company_id?: number
}

export interface IRWebsocketGetRoomsResponse {
  server: string
  rooms: IRWGRRRoom[]
  access_token: string
}

export interface IRWebsocket {
  getRooms(args?: object): Promise<IRWebsocketGetRoomsResponse>
}
