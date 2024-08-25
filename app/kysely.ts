import { createKysely } from '@vercel/postgres-kysely'

interface Database { }

const kysely = createKysely<Database>()

export default kysely
