import { Generated, Insertable, Selectable } from 'kysely'

export type Paragraph = {
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

export type InsertParagraph = Omit<Insertable<ParagraphTable>, 'id'>
export type SelectParagraph = Selectable<ParagraphTable>
