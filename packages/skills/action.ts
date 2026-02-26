'use server'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText, Output } from 'ai'
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

export async function generateCharacter(prompt: string, system?: string) {
    const model = await getProvider()
    const result = await generateText({
        model,
        system: system || 'You are a highly capable AI assistant helping to generate accurate data.',
        prompt: `Generate a character based on this request or description: ${prompt}`,
        output: Output.object({ schema: CharacterWritable }),
    })
    return result.experimental_output ? result.experimental_output : (result as any).object
}

export async function generateVenue(prompt: string, system?: string) {
    const model = await getProvider()
    const result = await generateText({
        model,
        system: system || 'You are a highly capable AI assistant helping to generate accurate data.',
        prompt: `Generate a venue based on this request or description: ${prompt}`,
        output: Output.object({ schema: VenueWritable }),
    })
    return result.experimental_output ? result.experimental_output : (result as any).object
}

export async function generateChat(prompt: string, system?: string) {
    const model = await getProvider()
    const result = await generateText({
        model,
        system: system || 'You are a highly capable AI assistant helping to generate accurate data.',
        prompt: `Generate a chat session configuration based on this request or description: ${prompt}`,
        output: Output.object({ schema: ChatWritable }),
    })
    return result.experimental_output ? result.experimental_output : (result as any).object
}
