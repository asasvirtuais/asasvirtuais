'use client'
import { useEffect, useMemo, useState } from 'react'
import { useChat, UIMessage } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useChats } from '@/packages/chat/provider'
import { useMessages } from '@/packages/message/provider'

export function useAIChat(chatId: string) {
    const { index: chatIndex } = useChats()
    const chat = chatIndex?.[chatId]
    const { list: listMessages, create: createMessage, array: dbMessages } = useMessages()

    // AI SDK v6: Manually manage input state
    const [input, setInput] = useState('')

    // Fetch messages from DB
    useEffect(() => {
        if (chatId)
            listMessages.trigger({ query: { chat: chatId } })
    }, [chatId])

    // Prepare initial messages for AI SDK
    const initialMessages = useMemo(() => {
        return dbMessages
            .filter(m => m.chat === chatId)
            .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
            .map(m => ({
                id: m.id,
                role: m.role as 'user' | 'assistant' | 'system',
                parts: [{ type: 'text', text: m.content || '' }],
            })) as unknown as UIMessage[]
    }, [dbMessages, chatId])

    const {
        messages,
        sendMessage,
        status,
        error,
        regenerate,
    } = useChat({
        id: chatId,
        messages: initialMessages, // Renamed from initialMessages in v5/v6
        // AI SDK v6: Explicit transport
        transport: new DefaultChatTransport({
            api: '/api/chat',
            body: {
                chatId,
                instructions: chat?.instructions,
                model: chat?.model,
                temperature: chat?.temperature,
            },
        }),
        onFinish: async ({ message }) => {
            try {
                // Save assistant response to IndexedDB
                // Get text from parts
                const text = message.parts
                    .filter(p => p.type === 'text')
                    .map(p => p.text)
                    .join('')

                // Save assistant response to IndexedDB
                await createMessage.trigger({
                    data: {
                        chat: chatId,
                        role: 'assistant',
                        content: text,
                        timestamp: Date.now(),
                    }
                })
            } catch (err) {
                console.error('Failed to save assistant message to DB:', err)
            }
        },
        onError: (err) => {
            console.error('AI Chat Error:', err)
        }
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInput(e.target.value)
    }

    // Custom submit handler
    const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault()
        if (!input.trim() || !chatId || status !== 'ready') return

        const userContent = input
        setInput('') // Clear input immediately for better UX

        try {
            // 1. Save user message to IndexedDB
            await createMessage.trigger({
                data: {
                    chat: chatId,
                    role: 'user',
                    content: userContent,
                    timestamp: Date.now(),
                }
            })

            // 2. Trigger AI SDK manually
            sendMessage({ text: userContent })
        } catch (err) {
            console.error('Failed to save user message to DB:', err)
            // Still try to send to AI
            sendMessage({ text: userContent })
        }
    }

    return {
        messages,
        input,
        handleInputChange,
        handleSubmit: onSubmit,
        status,
        error,
        regenerate,
        chat,
    }
}
