'use client'
import { useEffect, useState } from 'react'
import { useChats } from '@/packages/chat/provider'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { schema } from '@/packages/chat'
import { Box, Center, Loader, Title } from '@mantine/core'
import { DashboardChatView } from './DashboardChatView'

export default function DashboardRootPage() {
    const { list, create, array } = useChats()
    const [targetId, setTargetId] = useState<string | null>(null)
    const [initializing, setInitializing] = useState(true)

    useEffect(() => {
        let isMounted = true

        const initDashboardChat = async () => {
            try {
                const res = await list.trigger({ query: { title: 'Dashboard Chat' } })

                if (!isMounted) return

                let existing = res[0]

                if (existing) {
                    setTargetId(existing.id)
                } else {
                    const newChat = await create.trigger({ data: { title: 'Dashboard Chat' } })
                    setTargetId(newChat.id)
                }
            } catch (err) {
                console.error("Failed to initialize Dashboard Chat", err)
            } finally {
                if (isMounted) setInitializing(false)
            }
        }
        initDashboardChat()

        return () => { isMounted = false }
    }, []) // Only run once on mount

    if (initializing) {
        return (
            <Center h="100%" mih={400}>
                <Loader type="dots" />
            </Center>
        )
    }

    if (!targetId) {
        return (
            <Center h="100%" mih={400}>
                <Title order={3} c="red.6">Failed to load Dashboard Chat.</Title>
            </Center>
        )
    }

    return (
        <Box h="calc(100vh - 92px)">
            <SingleProvider id={targetId} table="chats" schema={schema}>
                <DashboardChatView />
            </SingleProvider>
        </Box>
    )
}
