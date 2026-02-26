'use server'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'
import { cookies } from 'next/headers'
import { create as createInDb } from '@/app/interface'

async function getProvider(model: string = 'gemini-3-flash-preview') {
    const cookieStore = await cookies()
    const userApiKey = cookieStore.get('google-ai-key')?.value
    const google = createGoogleGenerativeAI({
        apiKey: userApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY
    })
    return google(model)
}

export async function askSkillAction({
    askingChatId,
    askingChatTitle,
    respondingChatInstructions,
    respondingChatModel,
    respondingChatTemperature,
    question,
}: {
    askingChatId: string
    askingChatTitle: string
    respondingChatInstructions: string
    respondingChatModel?: string
    respondingChatTemperature?: number
    question: string
}) {
    // 1. Save "asking" message to Chat A (Role: user)
    await createInDb({
        table: 'messages',
        data: {
            id: crypto.randomUUID(),
            chat: askingChatId,
            role: 'user',
            content: `Here is a question/request from ${askingChatTitle}: ${question}, please respond.`,
            timestamp: Date.now(),
        } as any
    })

    const model = await getProvider(respondingChatModel)

    const result = await generateText({
        model,
        system: respondingChatInstructions,
        prompt: `Here is a question/request from ${askingChatTitle}: ${question}, please respond.`,
        temperature: respondingChatTemperature ?? 0.7,
    })

    const response = result.text

    // 2. Save "response notification" message to Chat A (Role: user)
    await createInDb({
        table: 'messages',
        data: {
            id: crypto.randomUUID(),
            chat: askingChatId,
            role: 'user',
            content: `Here is the response to your question to ${askingChatTitle}: ${question}. Response: ${response}`,
            timestamp: Date.now(),
        } as any
    })

    return response
}
