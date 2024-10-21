'use server'

import kysely from '@/app/kysely'

export const chatParagraphs = async (message: string) => (
    kysely.selectFrom('paragraphs')
        .where('message', '=', message)
        .selectAll()
        .execute()
)
