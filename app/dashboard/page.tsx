import { Text, Badge, Box, Stack, Center } from '@chakra-ui/react'
import { userOrLogin } from '@/app/auth/actions'
import { ChatComponent } from '@/app/chat/components'

export default async () => {
    const user = await userOrLogin('/dashboard')
    return (
        <Stack p={6} h='100%' alignItems='flex-start'>
            <Text fontSize='3xl'>Hello {user.nickname}</Text>
            <Badge>{new Date().toLocaleDateString(undefined, {
                dateStyle: 'full'
            })}</Badge>
            <Center height='100%' w='100%'>
                <ChatComponent id={user.sub + '_dashbaord-chat'} />
            </Center>
        </Stack>
    )
}
