'use client'
import { useState, useEffect } from 'react'
import {
    Container,
    Grid,
    Stack,
    Title,
    Paper,
    ScrollArea,
    Group,
    Text,
    Card,
    Button,
    Tabs,
    Box
} from '@mantine/core'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { IconPlus, IconDatabase, IconMessage, IconSettings } from '@tabler/icons-react'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '.'
import { useChats } from './provider'
import { CreateChat, UpdateChat, DeleteChat } from './forms'
import { SingleChat, ChatListItem } from './components'
import SingleChatView from './single-chat-view'

export default function ChatDashboardPage() {
    const { array, list } = useChats()
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        list.trigger({})
    }, [])

    const handleCreateSuccess = (newChat: Chat) => {
        setIsCreating(false)
        setSelectedId(newChat.id)
    }

    return (
        <Container size='xl' py='xl'>
            <Stack gap='xl'>
                <Group justify='space-between'>
                    <Title order={1}>Chat Model Package</Title>
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={() => {
                            setIsCreating(true)
                            setSelectedId(null)
                        }}
                    >
                        New Persona
                    </Button>
                </Group>

                <Grid gutter='md'>
                    {/* --- Sidebar: Record List --- */}
                    <Grid.Col span={{ base: 12, md: 3 }}>
                        <Paper withBorder p='md' radius='md'>
                            <Stack gap='sm'>
                                <Text fw={700} size='sm' c='dimmed' tt='uppercase'>Personas</Text>
                                <ScrollArea h={500} offsetScrollbars>
                                    <Stack gap='xs'>
                                        {array.map((chat) => (
                                            <Card
                                                key={chat.id}
                                                shadow='xs'
                                                p='sm'
                                                radius='md'
                                                withBorder
                                                onClick={() => {
                                                    setSelectedId(chat.id)
                                                    setIsCreating(false)
                                                }}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: selectedId === chat.id ? 'var(--mantine-color-blue-light)' : undefined,
                                                }}
                                            >
                                                <ChatListItem item={chat} />
                                            </Card>
                                        ))}
                                    </Stack>
                                </ScrollArea>
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    {/* --- Main Area: Create or Dashboard --- */}
                    <Grid.Col span={{ base: 12, md: 9 }}>
                        <Paper withBorder p='xl' radius='md' mih={600}>
                            {isCreating ? (
                                <Stack>
                                    <Title order={2}>Create New Persona</Title>
                                    <CreateChat onSuccess={handleCreateSuccess} />
                                </Stack>
                            ) : selectedId ? (
                                <SingleProvider id={selectedId} table='Chats' schema={schema}>
                                    <Tabs defaultValue="chat">
                                        <Tabs.List mb="md">
                                            <Tabs.Tab value="chat" leftSection={<IconMessage size={14} />}>Interface Demo</Tabs.Tab>
                                            <Tabs.Tab value="admin" leftSection={<IconSettings size={14} />}>CRUD Dashboard</Tabs.Tab>
                                        </Tabs.List>

                                        <Tabs.Panel value="chat">
                                            <SingleChatView />
                                        </Tabs.Panel>

                                        <Tabs.Panel value="admin">
                                            <Stack gap="xl">
                                                <Group justify="space-between">
                                                    <Title order={2}>Manage Record</Title>
                                                    <DeleteChat onSuccess={() => setSelectedId(null)} />
                                                </Group>
                                                <Grid>
                                                    <Grid.Col span={{ base: 12, lg: 6 }}>
                                                        <Title order={4} mb="md">Display View</Title>
                                                        <SingleChat />
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, lg: 6 }}>
                                                        <Title order={4} mb="md">Update Form</Title>
                                                        <UpdateChat />
                                                    </Grid.Col>
                                                </Grid>
                                            </Stack>
                                        </Tabs.Panel>
                                    </Tabs>
                                </SingleProvider>
                            ) : (
                                <Stack align='center' justify='center' mih={500} gap='xs'>
                                    <IconDatabase size={48} stroke={1.5} color='var(--mantine-color-gray-4)' />
                                    <Text size='lg' fw={500}>Select a Persona</Text>
                                    <Text size='sm' c='dimmed'>Choose a persona from the side list to start the demo.</Text>
                                </Stack>
                            )}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    )
}
