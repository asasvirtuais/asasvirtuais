'use client'
import type { Paragraph } from '.'

import { PropsWithChildren, useEffect, useState, useCallback } from 'react'

import { createContext } from '@chakra-ui/react-context'
import { useBoolean } from '@chakra-ui/react'
import { chatParagraphs } from './actions'

export type ParagraphsProps = {
    value?: Paragraph[]
    message?: string | undefined
}

const useParagraphsHook = ( { value, message } : ParagraphsProps ) => {

    const [paragraphs, setParagraphs] = useState<Paragraph[]>(value ?? [])
    const [loading, setLoading] = useBoolean()
    const [error, setError] = useState<Error>()
    const addMany = useCallback( (paragraphs: Paragraph[]) => (
        setParagraphs(prev => [...prev.filter(p => ! paragraphs.find(p2 => p2.id === p.id)), ...paragraphs])
    ), [] )

    const fetchMessageParagraphs = useCallback((message: string) => {
        chatParagraphs(message)
            .then(setParagraphs)
            .catch(setError)
            .finally(setLoading.off)
    }, [])

    return {
        paragraphs,
        addMany,
        fetchMessageParagraphs,
    }
}

const [ParagraphsContextProvider, useParagraphsContext] = createContext<ReturnType<typeof useParagraphsHook>>()

export const ParagraphsProvider = ( { children,  ...props } : PropsWithChildren<ParagraphsProps> ) => {
    const value = useParagraphsHook(props)
    return (
        <ParagraphsContextProvider value={value}>
            {children}
        </ParagraphsContextProvider>
    )
}

export const useParagraphs = () => useParagraphsContext()

type ParagraphProps = {
    value: Paragraph
}

const useParagraphHook = ( { value } : ParagraphProps ) => {

    const [paragraph, setParagraph] = useState<Paragraph|undefined>(value)

    return {
        paragraph,
    }
}

const [ParagraphContextProvider, useParagraphContext] = createContext<ReturnType<typeof useParagraphHook>>()

export const ParagraphProvider = ( { children, ...props } : PropsWithChildren<ParagraphProps> ) => {
    const value = useParagraphHook(props)
    return (
        <ParagraphContextProvider value={value}>
            {children}
        </ParagraphContextProvider>
    )
}

export const useParagraph = () => useParagraphContext()
