import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText, Output, jsonSchema } from 'ai'
import { NextRequest } from 'next/server'

export const maxDuration = 60

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-gemini-api-key',
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders
    })
}

export async function POST(req: NextRequest) {
    try {
        const { prompt, instructions, model, temperature, apiKey: bodyApiKey, schema: schemaProp } = await req.json()

        if (!prompt) {
            return new Response('Prompt is required', { status: 400, headers: corsHeaders })
        }

        const apiKey = bodyApiKey || req.headers.get('x-gemini-api-key') || process.env.GOOGLE_GENERATIVE_AI_API_KEY

        if (!apiKey) {
            return new Response('Google API key is missing', { status: 400, headers: corsHeaders })
        }

        const google = createGoogleGenerativeAI({ apiKey })
        const modelInstance = google(model || 'gemini-3.1-flash-lite-preview')

        const { output } = await generateText({
            model: modelInstance,
            output: Output.object({
                schema: jsonSchema(schemaProp),
            }),
            prompt,
            system: instructions || '',
            temperature: temperature ?? 0.7,
        })

        return new Response(JSON.stringify(output), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        })
    } catch (error: any) {
        console.error('Gemini Object API Error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        })
    }
}





