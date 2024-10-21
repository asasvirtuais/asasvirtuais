'use client'

import { Box } from '@chakra-ui/react/box'
import { useChat } from './context'
import { Button, FormControl, Textarea, VStack } from '@chakra-ui/react'
import { useFormStatus } from 'react-dom'
import { useCallback } from 'react'
import { useParagraphs } from '@/app/paragraph/contex'

const NewMessage = () => {

    const { chat } = useChat()
    const paragraphs = useParagraphs()

    const { pending } = useFormStatus()

    const handleNewMessage = useCallback( () => {
    }, [] )

    return (
        <VStack as='form' w='100%' action={handleNewMessage}>
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
            </Box>
            <NewMessage />
        </>
    )
}
