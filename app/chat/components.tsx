'use client'
import type { Chat } from '.'

import { Box } from '@chakra-ui/react/box'
import { MessagesComponent } from '@/app/message/components'
import { MessagesProvider } from '@/app/message/context'

export const ChatComponent = ( chat: Chat ) => {
    return (
        <Box
            maxH='600px'
            overflowY='auto'
            sx={{'& *': { 'overflow-anchor': 'none' }}}
        >
            <MessagesProvider value={[]} chat={chat?.id}>
                <MessagesComponent />
            </MessagesProvider>
        </Box>
    )
}
