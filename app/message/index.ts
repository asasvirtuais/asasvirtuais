import { Generated, Insertable, Selectable } from 'kysely'

export type Message = {
    id: string
    chat: string
    author: string
}

export interface MessageTable {
    id: Generated<string>
    chat: string
    author: string
}

export type Select = Selectable<MessageTable>

export type InsertMessage = Omit<Insertable<MessageTable>, 'id'>
export type SelectMessage = Selectable<MessageTable>
