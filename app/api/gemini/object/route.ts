import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamObject } from 'ai'
import { NextRequest } from 'next/server'

export const maxDuration = 60

export async function POST(req: NextRequest) {
    try {
        const { prompt, instructions, model, temperature, apiKey: bodyApiKey, schema: schemaProp } = await req.json()

        if (!prompt) {
            return new Response('Prompt is required', { status: 400 })
        }

        const apiKey = bodyApiKey || req.headers.get('x-gemini-api-key') || process.env.GOOGLE_GENERATIVE_AI_API_KEY

        if (!apiKey) {
            return new Response('Google API key is missing', { status: 400 })
        }

        const google = createGoogleGenerativeAI({ apiKey })
        const modelInstance = google(model || 'gemini-2.0-flash')

        // Using streamObject because it's generally preferred for UX
        // If the user specifically wants the Promise, the client can await it
        const result = streamObject({
            model: modelInstance,
            prompt,
            system: instructions || '',
            temperature: temperature ?? 0.7,
            schema: schemaProp // The schema may be sent as JSON schema or if predefined
        })

        return result.toTextStreamResponse()
    } catch (error: any) {
        console.error('Gemini Object API Error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
