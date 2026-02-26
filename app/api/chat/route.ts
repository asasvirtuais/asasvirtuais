import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { openai } from '@ai-sdk/openai'
import { streamText, convertToModelMessages } from 'ai'
import { list } from '../../interface'

export const maxDuration = 30

export async function POST(req: Request) {
    try {
        const { messages, instructions, model, temperature } = await req.json()

        if (!messages || !Array.isArray(messages)) {
            return new Response('Messages are required', { status: 400 })
        }

        // Fetch user settings to get custom API key
        const settings = await list({ table: 'settings', query: { $limit: 1 } })
        const userApiKey = (settings?.[0] as any)?.google_api_key

        const modelName = model || 'gemini-1.5-flash'

        let provider: any
        if (modelName.includes('gpt')) {
            provider = openai(modelName)
        } else {
            // Initialize Google provider with custom key if available
            const google = createGoogleGenerativeAI({
                apiKey: userApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY
            })
            provider = google(modelName)
        }

        const result = streamText({
            model: provider,
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
