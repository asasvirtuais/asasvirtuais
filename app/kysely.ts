import { createKysely } from '@vercel/postgres-kysely'
import { CredentialsTable } from '@/app/oauth/credentials'
import { ChatTable } from '@/app/chat'
import { MessageTable } from '@/app/message'
import { MessagePartTable } from '@/app/paragraph'

interface Database {
    credentials: CredentialsTable
    chat: ChatTable
    message: MessageTable
    'message_part': MessagePartTable
}

export const randomString = () => Math.random().toString(36).substring(2).toUpperCase()
export const genRandomId = () => randomString() + randomString() + randomString()

const kysely = createKysely<Database>()

export default kysely
