'use client'
import { useEffect, useState } from 'react'
import { useChats } from '@/packages/chat/provider'
import { useCharacters } from '@/packages/character/provider'
import { useVenues } from '@/packages/venue/provider'
import { useScenarios } from '@/packages/scenario/provider'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { schema } from '@/packages/scenario'
import { Box, Center, Loader, Title } from '@mantine/core'
import { DashboardChatView } from './DashboardChatView'

export default function DashboardRootPage() {
    const { list: listChats, create: createChat } = useChats()
    const { list: listCharacters, create: createCharacter } = useCharacters()
    const { list: listVenues, create: createVenue } = useVenues()
    const { list: listScenarios, create: createScenario } = useScenarios()

    const [targetScenarioId, setTargetScenarioId] = useState<string | null>(null)
    const [initializing, setInitializing] = useState(true)

    useEffect(() => {
        let isMounted = true

        const initDashboardScenario = async () => {
            try {
                // 1. Check for existing Dashboard Scenario
                const scenariosRes = await listScenarios.trigger({
                    query: { instructions: "You're at the dashboard chat with the user, this chat is the default chat of the app" }
                })

                if (!isMounted) return

                if (scenariosRes.length > 0) {
                    setTargetScenarioId(scenariosRes[0].id)
                    return
                }

                // 2. Scenario doesn't exist, we need to create the pieces
                // Character: Assistant
                let charId = ''
                const charsRes = await listCharacters.trigger({ query: { name: 'Assistant' } })
                if (charsRes.length > 0) {
                    charId = charsRes[0].id
                } else {
                    const newChar = await createCharacter.trigger({
                        data: {
                            name: 'Assistant',
                            details: "you're an A.I assistant",
                            skills: ['database']
                        }
                    })
                    charId = newChar.id
                }

                // Venue: Admin
                let venueId = ''
                const venuesRes = await listVenues.trigger({ query: { title: 'Admin' } })
                if (venuesRes.length > 0) {
                    venueId = venuesRes[0].id
                } else {
                    const newVenue = await createVenue.trigger({
                        data: {
                            title: 'Admin',
                            system: "you're at the administration of the app dashboard with the user"
                        }
                    })
                    venueId = newVenue.id
                }

                // Chat: Dashboard Chat
                let chatId = ''
                const chatsRes = await listChats.trigger({ query: { title: 'Dashboard Chat' } })
                if (chatsRes.length > 0) {
                    chatId = chatsRes[0].id
                } else {
                    const newChat = await createChat.trigger({ data: { title: 'Dashboard Chat' } })
                    chatId = newChat.id
                }

                if (!isMounted) return

                // 3. Create the Scenario
                const newScenario = await createScenario.trigger({
                    data: {
                        instructions: "You're at the dashboard chat with the user, this chat is the default chat of the app",
                        character: charId,
                        venue: venueId,
                        chat: chatId
                    }
                })

                setTargetScenarioId(newScenario.id)

            } catch (err) {
                console.error("Failed to initialize Dashboard Scenario", err)
            } finally {
                if (isMounted) setInitializing(false)
            }
        }

        initDashboardScenario()

        return () => { isMounted = false }
    }, []) // Only run once on mount

    if (initializing) {
        return (
            <Center h="100%" mih={400}>
                <Loader type="dots" />
            </Center>
        )
    }

    if (!targetScenarioId) {
        return (
            <Center h="100%" mih={400}>
                <Title order={3} c="red.6">Failed to load Dashboard Scenario.</Title>
            </Center>
        )
    }

    return (
        <Box h="calc(100vh - 92px)">
            <SingleProvider id={targetScenarioId} table="scenarios" schema={schema}>
                <DashboardChatView />
            </SingleProvider>
        </Box>
    )
}
