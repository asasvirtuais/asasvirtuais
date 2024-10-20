'use client'
import type { Paragraph } from '.'

import { PropsWithChildren, useState } from 'react'

import { createContext } from '@chakra-ui/react-context'

export type ParagraphsProps = {
    value: Paragraph[]
    message: string
}

const useParagraphsHook = ( { value, message } : ParagraphsProps ) => {

    const [paragraphs, setParagraphs] = useState<Paragraph[]|undefined>(value)

    // TODO: fetch message parts by message (id)

    return {
        paragraphs,
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
