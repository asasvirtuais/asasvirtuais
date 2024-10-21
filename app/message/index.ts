'use server'

import kysely, { genRandomId } from '@/app/kysely'

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


export type InsertMessage = Omit<Insertable<MessageTable>, 'id'>
export type SelectMessage = Selectable<MessageTable>

export const insert = async (message: InsertMessage) => (
    kysely.insertInto('messages').returningAll()
    .values({
        id: genRandomId(),
        ...message
    })
    .executeTakeFirstOrThrow()
)

export const chatMessages = async (chat: string) => (
    kysely.selectFrom('messages')
        .where('chat', '=', chat)
        .selectAll()
        .execute()
)
