'use client'
import { useEffect, useState } from 'react'
import { useChats } from '@/packages/chat/provider'
import { useCharacters } from '@/packages/character/provider'
import { useVenues } from '@/packages/venue/provider'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { schema } from '@/packages/chat'
import { Box, Center, Loader, Title, Stack, Group } from '@mantine/core'
import { DashboardChatView } from './DashboardChatView'

export default function DashboardRootPage() {
    const { list: listChats, create: createChat, update: updateChat } = useChats()
    const { list: listCharacters, create: createCharacter } = useCharacters()
    const { list: listVenues, create: createVenue } = useVenues()

    const [targetChatId, setTargetChatId] = useState<string | null>(null)
    const [initializing, setInitializing] = useState(true)

    useEffect(() => {
        let isMounted = true

        const initDashboardChat = async () => {
            try {
                // 1. Fetch or create Character: Assistant
                let charDetails = "you're an A.I assistant"
                let charSkills = ['generate_character', 'generate_venue', 'generate_chat']
                const charsRes = await listCharacters.trigger({ query: { name: 'Assistant' } })
                if (charsRes.length > 0) {
                    charDetails = charsRes[0].details || charDetails
                    charSkills = charsRes[0].skills || charSkills
                } else {
                    await createCharacter.trigger({
                        data: {
                            name: 'Assistant',
                            details: charDetails,
                            skills: charSkills
                        }
                    })
                }

                // 2. Fetch or create Venue: Admin
                let venueCircumstances = "you're at the administration of the app dashboard with the user"
                let venueTools: string[] = []
                const venuesRes = await listVenues.trigger({ query: { title: 'Admin' } })
                if (venuesRes.length > 0) {
                    venueCircumstances = venuesRes[0].circumstances || venueCircumstances
                    venueTools = venuesRes[0].tools || venueTools
                } else {
                    await createVenue.trigger({
                        data: {
                            title: 'Admin',
                            circumstances: venueCircumstances,
                            tools: venueTools
                        }
                    })
                }

                if (!isMounted) return

                // 3. Compose the Chat
                const combinedInstructions = `${charDetails}\n${venueCircumstances}\nYou're at the dashboard chat with the user, this chat is the default chat of the app.
You have the ability to generate objects based on user requests. When the user asks to create a character, venue or chat, you can use your generation skills.`
                const combinedTools = Array.from(new Set([...charSkills, ...venueTools]))

                const chatsRes = await listChats.trigger({ query: { title: 'Dashboard Chat' } })

                if (chatsRes.length > 0) {
                    const existingChat = chatsRes[0]
                    // We can optionally update it if instructions/tools have changed
                    if (existingChat.instructions !== combinedInstructions ||
                        JSON.stringify(existingChat.tools) !== JSON.stringify(combinedTools)) {
                        await updateChat.trigger({
                            id: existingChat.id,
                            data: {
                                instructions: combinedInstructions,
                                tools: combinedTools
                            }
                        })
                    }
                    if (isMounted) setTargetChatId(existingChat.id)
                } else {
                    const newChat = await createChat.trigger({
                        data: {
                            title: 'Dashboard Chat',
                            instructions: combinedInstructions,
                            tools: combinedTools
                        }
                    })
                    if (isMounted) setTargetChatId(newChat.id)
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

    if (!targetChatId) {
        return (
            <Center h="100%" mih={400}>
                <Title order={3} c="red.6">Sign In to continue.</Title>
            </Center>
        )
    }

    return (
        <Box h="calc(100vh - 92px)">
            <Stack gap="xl" p="md">
                <Group justify="space-between" align="center">
                    <Title order={2}>Dashboard</Title>
                </Group>
                <SingleProvider id={targetChatId} table="chats" schema={schema}>
                    <DashboardChatView />
                </SingleProvider>
            </Stack>
        </Box>
    )
}
