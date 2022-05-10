export type TCheckSystem = string | number

export interface IRCheckGlobComponent {
  id: number
  name: string
  url: string
}

export interface IRCheckGlobSuggestion {
  id: number
  identifier: string
  name: string
}
