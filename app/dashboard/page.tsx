import { Text, Badge } from '@chakra-ui/react'
import { userOrLogin } from '@/app/auth/actions'
import { ChatComponent } from '@/app/chat/components'
import { initDashboardChat } from '@/app/chat/actions'
import { ChatProvider } from '@/app/chat/context'
import { ParagraphsProvider } from '@/app/paragraph/contex'

export default async () => {
    const user = await userOrLogin('/dashboard')
    const chat = await initDashboardChat()
    return (
        <>
            <Text fontSize='3xl'>Hello {user.nickname}</Text>
            <Badge alignSelf='flex-start'>{new Date().toLocaleDateString(undefined, {
                dateStyle: 'full'
            })}</Badge>
            <ParagraphsProvider value={[]}>
                <ChatProvider value={chat}>
                    <ChatComponent/>
                </ChatProvider>
            </ParagraphsProvider>
        </>
    )
}
