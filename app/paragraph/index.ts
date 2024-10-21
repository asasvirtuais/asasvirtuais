'use server'
import { Generated, Insertable, Selectable } from 'kysely'
import kysely, { genRandomId } from '@/app/kysely'

export type Paragraph = {
    id: string
    chat_id: string
    index: number
    content: string
    saved: boolean
}

export interface ParagraphTable {
    id: Generated<string>
    chat_id: string
    index: number
    content: string
    saved: boolean
}

export type InsertParagraph = Omit<Insertable<ParagraphTable>, 'id' | 'index' | 'saved'>
export type SelectParagraph = Selectable<ParagraphTable>

export const insert = (chat: string, paragraphs: string[]) => (
    kysely.insertInto('paragraphs').returningAll()
    .values(paragraphs.map((content, index) => ({
        id: genRandomId(),
        chat_id: chat,
        content,
        index,
        saved: false,
    })))
    .execute()
)

export const chatParagraphs = (chat: string) => (
    kysely.selectFrom('paragraphs')
        .where('chat_id', '=', chat)
        .selectAll()
        .execute()
)
