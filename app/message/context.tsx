'use client'
import { createContext } from '@chakra-ui/react-context'
import { PropsWithChildren, use, useCallback, useEffect, useState } from 'react'
import { chatMessages, Message } from '.'
import { useBoolean } from '@chakra-ui/react'

type MessagesProps = {
    value?: Message[]
    chat?: string | undefined
}

const useMessagesHook = ( { value, chat } : MessagesProps ) => {

    const [messages, setMessages] = useState<Message[]>(value ?? [])
    const [loading, setLoading] = useBoolean(false)
    const [error, setError] = useState<{error: any} | undefined>(undefined)

    const add = useCallback( (message: Message) => (
        setMessages(prev => [...prev.filter(m => m.id !== message.id), message])
    ), [] )

    useEffect(() => {
        if (chat)
            chatMessages(chat)
            .then(setMessages)
            .catch(setError)
            .finally(setLoading.off)
    }, [chat])

    return {
        messages,
        loading,
        error,
        add,
    }
}

const [MessagesContextProvider, useMessagesContext] = createContext<ReturnType<typeof useMessagesHook>>()

export const MessagesProvider = ( { children, ...props } : PropsWithChildren<MessagesProps> ) => {
    const value = useMessagesHook(props)
    return (
        <MessagesContextProvider value={value}>
            {children}
        </MessagesContextProvider>
    )
}

export const useMessages = () => useMessagesContext()

type MessageProps = {
    value: Message
}

const useMessageHook = ( { value } : MessageProps ) => {

    const [message, setMessage] = useState<Message|undefined>(value)

    return {
        message,
    }
}

const [MessageContextProvider, useMessageContext] = createContext<ReturnType<typeof useMessageHook>>()

export const MessageProvider = ( { children, ...props } : PropsWithChildren<MessageProps> ) => {
    const value = useMessageHook(props)
    return (
        <MessageContextProvider value={value}>
            {children}
        </MessageContextProvider>
    )
}

export const useMessage = () => useMessageContext()
