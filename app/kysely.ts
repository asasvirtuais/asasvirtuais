import { createKysely } from '@vercel/postgres-kysely'
import { CredentialsTable } from '@/app/oauth/credentials'
import { ChatTable } from '@/app/chat'
import { MessageTable } from '@/app/message'
import { ParagraphTable } from '@/app/paragraph'

interface Database {
    credentials: CredentialsTable
    chats: ChatTable
    messages: MessageTable
    paragraphs: ParagraphTable
}

export const randomString = () => Math.random().toString(36).substring(2).toUpperCase()
export const genRandomId = () => randomString() + randomString() + randomString()

const kysely = createKysely<Database>()

export default kysely
