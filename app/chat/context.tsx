'use client'
import type { Chat } from '.'

import { PropsWithChildren, useState } from 'react'

import { createContext } from '@chakra-ui/react-context'

export type ChatProps = {
    value: Chat
}

const useChatHook = ( { value } : ChatProps ) => {

    const [chat, setChat] = useState<Chat|undefined>(value)

    return {
        chat,
    }
}

const [ChatContextProvider, useChatContext] = createContext<ReturnType<typeof useChatHook>>()

export const ChatProvider = ( { children, ...props } : PropsWithChildren<ChatProps> ) => {
    const value = useChatHook(props)
    return (
        <ChatContextProvider value={value}>
            {children}
        </ChatContextProvider>
    )
}

export const useChat = () => useChatContext()
