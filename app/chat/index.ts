import { Generated, Insertable, Selectable } from 'kysely'

export type Chat = {
    id: string
    messages: string[]
    type: 'dashboard'
}

export interface ChatTable {
  id: Generated<string>
}

export type Select = Selectable<ChatTable>

export type InsertCredential = Omit<Insertable<ChatTable>, 'id'>
export type SelectCredential = Selectable<ChatTable>
