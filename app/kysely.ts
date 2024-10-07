import { createKysely } from '@vercel/postgres-kysely'
import { CredentialsTable } from '@/app/oauth/credentials'

interface Database {
    credentials: CredentialsTable
}

const kysely = createKysely<Database>()

export default kysely
