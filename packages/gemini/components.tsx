'use client'
import React from 'react'
import { useGeneration, useObjectGeneration, useImageGeneration } from './hooks'

export interface GeminiChatProps {
    api?: string
    instructions?: string
    model?: string
    apiKey?: string
    prompt?: string
    autoTrigger?: boolean
    children: (props: ReturnType<typeof useGeneration>) => React.ReactNode
}

export function GeminiChat({
    api,
    instructions,
    model,
    apiKey,
    prompt,
    autoTrigger,
    children
}: GeminiChatProps) {
    const generation = useGeneration({ api, instructions, model, apiKey })

    React.useEffect(() => {
        if (autoTrigger && prompt && generation.messages.length === 0 && (generation as any).status === 'ready') {
            (generation as any).sendMessage({ text: prompt })
        }
    }, [])

    return <>{children(generation)}</>
}


export interface GeminiObjectProps<T = any> {
    api?: string
    instructions?: string
    model?: string
    apiKey?: string
    schema: any
    prompt?: string
    autoTrigger?: boolean
    children: (props: ReturnType<typeof useObjectGeneration<T>>) => React.ReactNode
}

export function GeminiObject<T = any>({
    api,
    instructions,
    model,
    apiKey,
    schema,
    prompt,
    autoTrigger,
    children
}: GeminiObjectProps<T>) {
    const generation = useObjectGeneration<T>({ api, instructions, model, apiKey, schema })

    React.useEffect(() => {
        if (autoTrigger && prompt && !generation.object && !generation.isLoading) {
            generation.submit(prompt)
        }
    }, [])

    return <>{children(generation)}</>
}

export interface GeminiImageProps {
    api?: string
    apiKey?: string
    prompt?: string
    autoTrigger?: boolean
    children: (props: ReturnType<typeof useImageGeneration>) => React.ReactNode
}

export function GeminiImage({ api, apiKey, prompt, autoTrigger, children }: GeminiImageProps) {
    const generation = useImageGeneration({ api, apiKey })

    React.useEffect(() => {
        if (autoTrigger && prompt && !generation.result && !generation.loading) {
            generation.submit(prompt)
        }
    }, [])

    return <>{children(generation)}</>
}

