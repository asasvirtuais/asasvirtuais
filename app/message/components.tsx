'use client'
import { useEffect, useMemo } from 'react'
import { HStack, VStack, Avatar } from '@chakra-ui/react'
import { Card, CardBody, CardHeader } from '@chakra-ui/react/card'

import { useChat } from '@/app/chat/context'
import { useParagraphs } from '@/app/paragraph/contex'
import { ParagraphsComponent } from '@/app/paragraph/components'

import { MessageProvider, useMessage, useMessages } from './context'

export const MessageComponent = () => {
    
    const { message } = useMessage()
    const { fetchMessageParagraphs } = useParagraphs()

    
    const { chat } = useChat()
    
    const isMine = useMemo(() => message?.author === 'me', [chat])

    useEffect(() => {
        if (message)
            fetchMessageParagraphs(message.id)
    }, [message])

    return (
        <Card
        p={2}
            my={4}
            bg='white'>
            <HStack justifyContent={isMine ? 'flex-end' : 'flex-start'} alignItems='flex-start'>
                <VStack order={isMine ? 2 : 1}>
                    <CardHeader p={1} fontSize='xs' fontWeight='bold'>
                        {message?.author}
                    </CardHeader>
                    <Avatar />
                </VStack>
                <VStack order={isMine ? 1 : 2}>
                    <CardBody fontSize='sm' p={2}>
                        <ParagraphsComponent />
                    </CardBody>
                </VStack>
            </HStack>
        </Card>
    )
}

export const MessagesComponent = () => {
    const { messages } = useMessages()
    return (
        <>
            {messages?.map(m => (
                <MessageProvider key={m.id} value={m}>
                    <MessageComponent />
                </MessageProvider>
            ))}
        </>
    )
}
