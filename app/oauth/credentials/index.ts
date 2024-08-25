import { Generated, Insertable, Selectable } from 'kysely'
import kysely from '@/app/kysely'

export type Select = Selectable<CredentialsTable>

export interface CredentialsTable {
  id: Generated<string>
  provider: string
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  created_at: Generated<Date>
}

export type InsertCredential = Omit<Insertable<CredentialsTable>, 'id' | 'key'>
export type SelectCredential = Selectable<CredentialsTable>

const rnd = () => Math.random().toString(36).substring(2).toUpperCase()
const rand = () => rnd() + rnd() + rnd()

export const insert = (insert: InsertCredential) => (
  kysely
    .insertInto('credentials')
    .values({ id: rand(), ...insert })
    .returning('id')
    .executeTakeFirstOrThrow()
)

export const getById = (id: string) => (
  kysely
    .selectFrom('credentials').where('id', '=', id)
    .selectAll()
    .executeTakeFirstOrThrow()
)

export const replace = (id: string, data: InsertCredential) => (
  kysely
    .replaceInto('credentials')
    .values({ ...data, id, created_at: new Date() })
    .returningAll()
    .executeTakeFirstOrThrow()
)
