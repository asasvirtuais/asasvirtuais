'use client'
import { useState, useEffect } from 'react'
import {
    Container,
    Grid,
    Stack,
    Title,
    Paper,
    ScrollArea,
    ActionIcon,
    Group,
    Text,
    Card,
    Button
} from '@mantine/core'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { IconPlus, IconTrash, IconSettings } from '@tabler/icons-react'
import { schema } from '@/packages/chat'
import { useChats } from '@/packages/chat/provider'
import { CreateChat, UpdateChat, DeleteChat } from '@/packages/chat/forms'
import { ChatItem, SingleChat } from '@/packages/chat/components'

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
                    <Title order={1}>AI Persona Dashboard</Title>
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
                    {/* List Sidebar */}
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Paper withBorder p='md' radius='md'>
                            <Stack gap='sm'>
                                <Text fw={700} size='sm' c='dimmed' tt='uppercase'>Personas</Text>
                                <ScrollArea h={600} offsetScrollbars>
                                    <Stack gap='xs'>
                                        {array.length === 0 && !isCreating && (
                                            <Text size='sm' c='dimmed' ta='center' py='xl'>
                                                No personas created yet.
                                            </Text>
                                        )}
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
                                                    borderColor: selectedId === chat.id ? 'var(--mantine-color-blue-filled)' : undefined
                                                }}
                                            >
                                                <Group justify='space-between' wrap='nowrap'>
                                                    <Text fw={500} truncate>{chat.title || 'Untitled'}</Text>
                                                    <Text size='xs' c='dimmed'>{chat.model?.split('-').pop()}</Text>
                                                </Group>
                                            </Card>
                                        ))}
                                    </Stack>
                                </ScrollArea>
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    {/* Main Content Area */}
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Paper withBorder p='xl' radius='md' mih={600}>
                            {isCreating ? (
                                <Stack>
                                    <Group justify='space-between'>
                                        <Title order={2}>Create New Persona</Title>
                                        <Button variant='subtle' color='gray' onClick={() => setIsCreating(false)}>Cancel</Button>
                                    </Group>
                                    <CreateChat onSuccess={handleCreateSuccess} />
                                </Stack>
                            ) : selectedId ? (
                                <SingleProvider id={selectedId} table='Chats' schema={schema}>
                                    <Stack gap='xl'>
                                        <Group justify='space-between'>
                                            <Title order={2}>Persona Details</Title>
                                            <Group>
                                                <DeleteChat onSuccess={() => setSelectedId(null)} />
                                            </Group>
                                        </Group>

                                        <Grid>
                                            <Grid.Col span={{ base: 12, lg: 7 }}>
                                                <SingleChat />
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, lg: 5 }}>
                                                <Paper withBorder p='md' radius='md' bg='var(--mantine-color-gray-0)'>
                                                    <Stack gap='md'>
                                                        <Title order={4}>Edit Settings</Title>
                                                        <UpdateChat />
                                                    </Stack>
                                                </Paper>
                                            </Grid.Col>
                                        </Grid>
                                    </Stack>
                                </SingleProvider>
                            ) : (
                                <Stack align='center' justify='center' mih={500} gap='xs'>
                                    <IconSettings size={48} stroke={1.5} color='var(--mantine-color-gray-4)' />
                                    <Text size='lg' fw={500}>Select a Persona</Text>
                                    <Text size='sm' c='dimmed'>Choose a persona from the list to view or edit details.</Text>
                                </Stack>
                            )}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    )
}
