'use server'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { cookies } from 'next/headers'
import { writable as CharacterWritable } from '@/packages/character'
import { writable as VenueWritable } from '@/packages/venue'
import { writable as ChatWritable } from '@/packages/chat'

async function getProvider(model: string = 'gemini-3-flash-preview') {
    const cookieStore = await cookies()
    const userApiKey = cookieStore.get('google-ai-key')?.value
    const google = createGoogleGenerativeAI({
        apiKey: userApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY
    })
    return google(model)
}

export async function generateCharacter(prompt: string) {
    const model = await getProvider()
    const { object } = await generateObject({
        model,
        schema: CharacterWritable,
        prompt: `Generate a character based on this description: ${prompt}`,
    })
    return object
}

export async function generateVenue(prompt: string) {
    const model = await getProvider()
    const { object } = await generateObject({
        model,
        schema: VenueWritable,
        prompt: `Generate a venue based on this description: ${prompt}`,
    })
    return object
}

export async function generateChat(prompt: string) {
    const model = await getProvider()
    const { object } = await generateObject({
        model,
        schema: ChatWritable,
        prompt: `Generate a chat session configuration based on this description: ${prompt}`,
    })
    return object
}
