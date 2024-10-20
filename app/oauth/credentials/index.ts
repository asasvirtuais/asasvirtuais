import { Generated, Insertable, Selectable } from 'kysely'
import kysely, { genRandomId } from '@/app/kysely'

export type Select = Selectable<CredentialsTable>

export interface CredentialsTable {
  id: Generated<string>
  // App attributes
  user: string
  // Token Data
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  // Metadata
  provider: string
  created_at: Generated<Date>
}

export type InsertCredential = Omit<Insertable<CredentialsTable>, 'id' | 'key'>
export type SelectCredential = Selectable<CredentialsTable>

export const insert = (insert: InsertCredential) => (
  kysely
    .insertInto('credentials')
    .values({ id: genRandomId(), ...insert })
    .returning('id')
    .executeTakeFirstOrThrow()
)

export const getById = (id: string) => (
  kysely
    .selectFrom('credentials').where('id', '=', id)
    .selectAll()
    .executeTakeFirstOrThrow()
)

export const getByUser = (user: string) => (
  kysely
    .selectFrom('credentials')
    .where('user', '=', user)
    .selectAll()
    .execute()
)

export const replace = (id: string, data: InsertCredential) => (
  kysely
    .updateTable('credentials')
    .where('id', '=', id)
    .set({ ...data, created_at: new Date() })
    .returningAll()
    .executeTakeFirstOrThrow()
)
