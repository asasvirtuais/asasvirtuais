'use client'
import type { MessagePart } from '.'

import { PropsWithChildren, useState } from 'react'

import { createContext } from '@chakra-ui/react-context'

export type MessagePartsProps = {
    value: MessagePart[]
}

const useMessagePartsHook = ( { value } : MessagePartsProps ) => {

    const [messageParts, setMessageParts] = useState<MessagePart[]|undefined>(value)

    return {
        messageParts,
    }
}

const [MessagePartsContextProvider, useMessagePartsContext] = createContext<ReturnType<typeof useMessagePartsHook>>()

export const MessagePartsProvider = ( { children, ...props } : PropsWithChildren<MessagePartsProps> ) => {
    const value = useMessagePartsHook(props)
    return (
        <MessagePartsContextProvider value={value}>
            {children}
        </MessagePartsContextProvider>
    )
}

export const useMessageParts = () => useMessagePartsContext()

type MessagePartProps = {
    value: MessagePart
}

const useMessagePartHook = ( { value } : MessagePartProps ) => {

    const [messagePart, setMessagePart] = useState<MessagePart|undefined>(value)

    return {
        messagePart,
    }
}

const [MessagePartContextProvider, useMessagePartContext] = createContext<ReturnType<typeof useMessagePartHook>>()

export const MessagePartProvider = ( { children, ...props } : PropsWithChildren<MessagePartProps> ) => {
    const value = useMessagePartHook(props)
    return (
        <MessagePartContextProvider value={value}>
            {children}
        </MessagePartContextProvider>
    )
}

export const useMessagePart = () => useMessagePartContext()
