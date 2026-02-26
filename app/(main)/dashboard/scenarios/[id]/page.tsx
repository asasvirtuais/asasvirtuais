'use client'

import { useParams } from 'next/navigation'
import { Container } from '@mantine/core'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { DashboardChatView } from '@/app/(main)/dashboard/DashboardChatView'
import { schema } from '@/packages/chat'

export default function ScenarioChatPage() {
    const { id } = useParams<{ id: string }>()

    if (!id) return null

    return (
        <Container size="lg" h="calc(100vh - 80px)">
            <SingleProvider id={id} table="chats" schema={schema}>
                <DashboardChatView />
            </SingleProvider>
        </Container>
    )
}
