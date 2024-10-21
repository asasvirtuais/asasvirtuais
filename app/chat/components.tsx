'use client'

import { Box } from '@chakra-ui/react/box'
import { MessagesComponent } from '@/app/message/components'
import { useMessages } from '@/app/message/context'
import { useChat } from './context'
import { Button, FormControl, Textarea, VStack } from '@chakra-ui/react'
import { useFormStatus } from 'react-dom'
import { newMessage } from '@/app/message/actions'
import { useCallback, useState } from 'react'
import { useParagraphs } from '@/app/paragraph/contex'

const NewMessage = () => {

    const { chat } = useChat()
    const messages = useMessages()
    const paragraphs = useParagraphs()

    const { pending } = useFormStatus()

    const handleNewMessage = useCallback( (result: Awaited<ReturnType<typeof newMessage>>) => {
        if ( result.message )
            messages.add(result.message)
        if ( result.paragraphs )
            paragraphs.addMany(result.paragraphs)
    }, [] )

    return (
        <VStack as='form' w='100%' action={(data: FormData) => newMessage(data).then(handleNewMessage)}>
            <input type='hidden' name='chat' value={chat?.id as string} />
            <FormControl>
                <Textarea name='message' />
            </FormControl>
            <FormControl w='100%' display='flex' justifyContent='flex-end'>
                <Button isLoading={pending} type='submit' colorScheme='blue'>Send</Button>
            </FormControl>
        </VStack>
    )
}

export const ChatComponent = () => {
    return (
        <>
            <Box
                w='100%'
                maxH='600px'
                overflowY='auto'
                sx={{'& *': { overflowAnchor: 'none' }}}
            >
                <MessagesComponent />
            </Box>
            <NewMessage />
        </>
    )
}
