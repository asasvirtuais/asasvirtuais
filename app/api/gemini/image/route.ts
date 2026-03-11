import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateImage } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export const maxDuration = 60

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { prompt, apiKey: bodyApiKey, aspect_ratio = "1:1", model = 'imagen-3.0-generate-001' } = body

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
        }

        const apiKey = bodyApiKey || req.headers.get('x-gemini-api-key') || process.env.GOOGLE_GENERATIVE_AI_API_KEY

        if (!apiKey) {
            return NextResponse.json({ error: 'Google API key is missing' }, { status: 400 })
        }

        const google = createGoogleGenerativeAI({ apiKey })

        // Use Vercel AI SDK generateImage
        const { image } = await generateImage({
            model: google.image(model),
            prompt,
            aspectRatio: aspect_ratio as any,
        })

        // Save to Vercel Blob for persistent URL
        const fileName = `gemini-images/${Date.now()}-${Math.random().toString(36).substring(7)}.png`
        
        // Handle data URL from generateImage
        const base64Data = image.base64
        const buffer = Buffer.from(base64Data, 'base64')

        const blob = await put(fileName, buffer, {
            access: 'public',
            contentType: 'image/png',
        })

        return NextResponse.json({ url: blob.url, revisedPrompt: image.uint8Array ? '...' : undefined })
    } catch (error: any) {
        console.error('Error drawing Gemini image:', error)
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        )
    }
}

