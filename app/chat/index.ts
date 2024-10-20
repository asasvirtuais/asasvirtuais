import { Generated, Insertable, Selectable } from 'kysely'
import kysely from '@/app/kysely'

export type Chat = {
    id: string
    user: string
    messages: string[]
    type: 'dashboard'
}

export interface ChatTable {
  id: Generated<string>
  user: string
  messages: Generated<string[]>
  type: 'dashboard'
}

export type InsertCredential = Insertable<ChatTable>
export type SelectCredential = Selectable<ChatTable>

export const insert = (chat: InsertCredential) => (
  kysely.insertInto('chats')
  .values(chat)
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
