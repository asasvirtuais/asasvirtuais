import { Generated, Insertable, Selectable } from 'kysely'
import kysely, { genRandomId } from '@/app/kysely'

export type Chat = {
    id: string
    user: string
    type: 'dashboard'
}

export interface ChatTable {
  id: Generated<string>
  user: string
  type: 'dashboard',
}

export type InsertCredential = Insertable<ChatTable>
export type SelectCredential = Selectable<ChatTable>

export const insert = (chat: InsertCredential) => (
  kysely.insertInto('chats')
  .values({
    id: genRandomId(),
    ...chat,
  })
  .returningAll()
  .executeTakeFirstOrThrow()
)

export const findDashboardChat = (user: string) => (
  kysely.selectFrom('chats')
  .selectAll()
  .where('user', '=', user)
  .where('type', '=', 'dashboard')
  .executeTakeFirst()
)

export const find = (id: string) => (
  kysely.selectFrom('chats')
  .selectAll()
  .where('id', '=', id)
  .executeTakeFirstOrThrow()
)
