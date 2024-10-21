import { Generated, Insertable, Selectable } from 'kysely'
import kysely, { genRandomId } from '@/app/kysely'

export type Paragraph = {
    id: string
    index: number
    content: string
    message: string
    saved: boolean
}

export interface ParagraphTable {
    id: Generated<string>
    index: number
    content: string
    message: string
    saved: boolean
}

export type InsertParagraph = Omit<Insertable<ParagraphTable>, 'id' | 'index' | 'saved'>
export type SelectParagraph = Selectable<ParagraphTable>

export const insert = (paragraphs: InsertParagraph[]) => (
    kysely.insertInto('paragraphs').returningAll()
    .values(paragraphs.map(({ content, message }, index) => ({
        id: genRandomId(),
        content,
        message,
        index,
        saved: false,
    })))
    .execute()
)
