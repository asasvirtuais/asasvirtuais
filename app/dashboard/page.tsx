import { Text, Badge, Stack, Center } from '@chakra-ui/react'
import { userOrLogin } from '@/app/auth/actions'
import { ChatComponent } from '@/app/chat/components'
import { initDashboardChat } from '@/app/chat/actions'
import { ChatProvider } from '../chat/context'

export default async () => {
    const user = await userOrLogin('/dashboard')
    const chat = await initDashboardChat()
    return (
        <Stack p={6} h='100%' alignItems='flex-start'>
            <Text fontSize='3xl'>Hello {user.nickname}</Text>
            <Badge>{new Date().toLocaleDateString(undefined, {
                dateStyle: 'full'
            })}</Badge>
            <Center height='100%' w='100%'>
                <ChatProvider value={chat}>
                    <ChatComponent {...chat} />
                </ChatProvider>
            </Center>
        </Stack>
    )
}
