'use client'
import { useChat, experimental_useObject as useObject } from '@ai-sdk/react'
import { useState, useCallback } from 'react'
import { DefaultChatTransport } from 'ai'

/**
 * Hook for Gemini text generation.
 * Wraps useChat from @ai-sdk/react using AI SDK v6 transport pattern.
 */
export function useGeneration({ 
    api = '/api/gemini/chat', 
    instructions, 
    model, 
    apiKey 
}: { 
    api?: string, 
    instructions?: string, 
    model?: string, 
    apiKey?: string 
} = {}) {
    return useChat({
        transport: new DefaultChatTransport({
            api,
            body: { instructions, model, apiKey },
            headers: apiKey ? { 'x-gemini-api-key': apiKey } : undefined
        }),
    })
}

/**
 * Hook for Gemini object generation.
 * Performs a manual fetch for a full JSON object.
 */
export function useObjectGeneration<T = any>({
    api = '/api/gemini/object',
    instructions,
    model,
    apiKey,
    schema
}: {
    api?: string,
    instructions?: string,
    model?: string,
    apiKey?: string,
    schema: any
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [object, setObject] = useState<T | undefined>(undefined)
    const [error, setError] = useState<Error | null>(null)

    const submit = useCallback(async (prompt: string) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(apiKey ? { 'x-gemini-api-key': apiKey } : {})
                },
                body: JSON.stringify({ prompt, instructions, model, apiKey, schema }),
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate object')
            }

            setObject(data)
            return data
        } catch (err: any) {
            setError(err)
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [api, instructions, model, apiKey, schema])

    return { submit, isLoading, object, error }
}




/**
 * Hook for Gemini image generation.
 * Calls our custom image generation API.
 */
export function useImageGeneration({
    api = '/api/gemini/image',
    apiKey
}: {
    api?: string,
    apiKey?: string
} = {}) {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<{ url: string } | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const submit = useCallback(async (prompt: string, aspect_ratio?: string) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(apiKey ? { 'x-gemini-api-key': apiKey } : {})
                },
                body: JSON.stringify({ prompt, apiKey, aspect_ratio }),
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate image')
            }

            setResult(data)
            return data
        } catch (err: any) {
            setError(err)
            throw err
        } finally {
            setLoading(false)
        }
    }, [api, apiKey])

    return { submit, loading, result, error }
}
