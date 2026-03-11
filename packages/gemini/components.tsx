'use client'
import React from 'react'
import { useGeneration, useObjectGeneration, useImageGeneration } from './hooks'

export interface GeminiChatProps {
    instructions?: string
    model?: string
    apiKey?: string
    prompt?: string
    autoTrigger?: boolean
    children: (props: ReturnType<typeof useGeneration>) => React.ReactNode
}

export function GeminiChat({ 
    instructions, 
    model, 
    apiKey, 
    prompt,
    autoTrigger,
    children 
}: GeminiChatProps) {
    const generation = useGeneration({ instructions, model, apiKey })
    
    React.useEffect(() => {
        if (autoTrigger && prompt && generation.messages.length === 0 && (generation as any).status === 'ready') {
            (generation as any).sendMessage({ text: prompt })
        }
    }, [autoTrigger, prompt, (generation as any).sendMessage, (generation as any).status, generation.messages.length])

    return <>{children(generation)}</>
}


export interface GeminiObjectProps<T = any> {
    instructions?: string
    model?: string
    apiKey?: string
    schema: any
    prompt?: string
    autoTrigger?: boolean
    children: (props: ReturnType<typeof useObjectGeneration<T>>) => React.ReactNode
}

export function GeminiObject<T = any>({ 
    instructions, 
    model, 
    apiKey, 
    schema, 
    prompt,
    autoTrigger,
    children 
}: GeminiObjectProps<T>) {
    const generation = useObjectGeneration<T>({ instructions, model, apiKey, schema })
    
    React.useEffect(() => {
        if (autoTrigger && prompt && !generation.object && !generation.isLoading) {
            generation.submit(prompt)
        }
    }, [autoTrigger, prompt, generation.submit, generation.isLoading, generation.object])

    return <>{children(generation)}</>
}

interface GeminiImageProps {
    apiKey?: string
    prompt?: string
    autoTrigger?: boolean
    children: (props: ReturnType<typeof useImageGeneration>) => React.ReactNode
}

export function GeminiImage({ apiKey, prompt, autoTrigger, children }: GeminiImageProps) {
    const generation = useImageGeneration({ apiKey })
    
    React.useEffect(() => {
        if (autoTrigger && prompt && !generation.result && !generation.loading) {
            generation.submit(prompt)
        }
    }, [autoTrigger, prompt, generation.submit, generation.loading, generation.result])

    return <>{children(generation)}</>
}

