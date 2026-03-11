import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamText, convertToModelMessages } from 'ai'
import { NextRequest } from 'next/server'

export const maxDuration = 60

export async function POST(req: NextRequest) {
    try {
        const { messages, instructions, model, temperature, apiKey: bodyApiKey } = await req.json()

        if (!messages) {
            return new Response('Messages are required', { status: 400 })
        }

        // Get API key from body, header, or environment
        const apiKey = bodyApiKey || req.headers.get('x-gemini-api-key') || process.env.GOOGLE_GENERATIVE_AI_API_KEY

        if (!apiKey) {
            return new Response('Google API key is missing', { status: 400 })
        }

        const google = createGoogleGenerativeAI({ apiKey })
        const modelInstance = google(model || 'gemini-2.0-flash')

        const result = streamText({
            model: modelInstance,
            messages: await convertToModelMessages(messages),
            system: instructions || '',
            temperature: temperature ?? 0.7,
        })

        return result.toUIMessageStreamResponse()
    } catch (error: any) {
        console.error('Gemini Chat API Error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
