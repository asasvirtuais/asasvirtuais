'use client'
import { createContext } from '@chakra-ui/react-context'
import { PropsWithChildren, useState } from 'react'
import { Message } from '.'

type MessagesProps = {
    value: Message[]
    chat?: string
}

const useMessagesHook = ( { value, chat } : MessagesProps ) => {

    const [messages, setMessages] = useState<Message[]|undefined>(value)

    // TODO: fetch messages from chat

    return {
        messages,
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
