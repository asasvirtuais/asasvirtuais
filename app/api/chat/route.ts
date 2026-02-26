import { google } from '@ai-sdk/google'
import { openai } from '@ai-sdk/openai'
import { streamText, convertToModelMessages } from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
    try {
        const { messages, instructions, model, temperature } = await req.json()

        if (!messages || !Array.isArray(messages)) {
            return new Response('Messages are required', { status: 400 })
        }

        const provider = model?.includes('gpt') ? openai : google
        const modelName = model || 'gemini-3-flash-preview'

        const result = streamText({
            model: provider(modelName),
            // AI SDK v6: convertToModelMessages is async
            messages: await convertToModelMessages(messages),
            system: instructions || '',
            temperature: temperature ?? 0.7,
        })

        // AI SDK v6: use toUIMessageStreamResponse for useChat compatibility
        return result.toUIMessageStreamResponse()
    } catch (error: any) {
        console.error('API Chat Error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
