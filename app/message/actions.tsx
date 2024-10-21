'use server'

import { userOrLogin } from '@/app/auth/actions'
import * as Chat from '@/app/chat'
import * as Message from '@/app/message'
import * as Paragraph from '@/app/paragraph'

export async function newMessage(formData: FormData) {
    const user = await userOrLogin('/dashboard')

    const chatId = formData.get('chat')
    if ( ! chatId || typeof chatId !== 'string' || chatId.length === 0 )
        return { error: 'Invalid or missing chat' }

    const chat = await Chat.find(chatId)

    if ( chat.user !== user.sub )
        return { error: 'Chat not found' }

    const text = formData.get('text')

    if (typeof text !== 'string' || text.length === 0)
        return { error: 'Invalid or missing message' }

    const newMessage = await Message.insert({
        author: user.sub,
        chat: chatId,
    })

    const paragraphs = text.split('\n\n').map((content, index) => ({
        content,
        message: newMessage.id,
    }))

    const newParagraphs = await Paragraph.insert(paragraphs)

    return {
        message: newMessage,
        paragraphs: newParagraphs,
    }
}
