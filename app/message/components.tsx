'use client'
import { useMemo } from 'react'
import { HStack, VStack, Avatar } from '@chakra-ui/react'
import { Card, CardBody, CardHeader } from '@chakra-ui/react/card'

import { useChat } from '@/app/chat/context'
import { MessagePartsProvider } from '@/app/message-part/contex'
import { MessagePartsComponent } from '@/app/message-part/components'

import { Message } from '.'
import { useMessages } from './context'

export const MessageComponent = ( message: Message ) => {

    const { chat } = useChat()

    const isMine = useMemo(() => message?.author === 'me', [chat])

    return (
        <Card
            my={4}
            p={2}
            bg='white'
            >
            <HStack justifyContent={isMine ? 'flex-end' : 'flex-start'} alignItems='flex-start'>
                <VStack order={isMine ? 2 : 1}>
                    <CardHeader p={1} fontSize='xs' fontWeight='bold'>
                        {message?.author}
                    </CardHeader>
                    <Avatar />
                </VStack>
                <VStack order={isMine ? 1 : 2}>
                    <CardBody fontSize='sm' p={2}>
                        {/* TODO: include message parts in message object as a dynamically inserted property */}
                        <MessagePartsProvider value={[]} message={message.id}>
                            <MessagePartsComponent />
                        </MessagePartsProvider>
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
                <MessageComponent key={m.id} {...m} />
            ))}
        </>
    )
}
