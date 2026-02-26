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
    Button
} from '@mantine/core'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { IconPlus, IconDatabase } from '@tabler/icons-react'
import { schema } from '.'
import { useChats } from './provider'
import { CreateChat, UpdateChat, DeleteChat } from './forms'
import { SingleChat } from './components'

export default function ChatPage() {
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
                    <Title order={1}>Chat Model CRUD</Title>
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={() => {
                            setIsCreating(true)
                            setSelectedId(null)
                        }}
                    >
                        Create New
                    </Button>
                </Group>

                <Grid gutter='md'>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Paper withBorder p='md' radius='md'>
                            <Stack gap='sm'>
                                <Text fw={700} size='sm' c='dimmed' tt='uppercase'>Record List</Text>
                                <ScrollArea h={600} offsetScrollbars>
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
                                                <Text fw={500} truncate>{chat.title || 'Untitled'}</Text>
                                                <Text size='xs' c='dimmed' truncate>{chat.id}</Text>
                                            </Card>
                                        ))}
                                    </Stack>
                                </ScrollArea>
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Paper withBorder p='xl' radius='md' mih={600}>
                            {isCreating ? (
                                <Stack>
                                    <Title order={2}>Create Record</Title>
                                    <CreateChat onSuccess={handleCreateSuccess} />
                                </Stack>
                            ) : selectedId ? (
                                <SingleProvider id={selectedId} table='Chats' schema={schema}>
                                    <Stack gap='xl'>
                                        <Group justify='space-between'>
                                            <Title order={2}>Manage Record</Title>
                                            <DeleteChat onSuccess={() => setSelectedId(null)} />
                                        </Group>

                                        <Grid>
                                            <Grid.Col span={{ base: 12, lg: 6 }}>
                                                <Title order={4} mb='md'>View Display</Title>
                                                <SingleChat />
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, lg: 6 }}>
                                                <Title order={4} mb='md'>Update Form</Title>
                                                <UpdateChat />
                                            </Grid.Col>
                                        </Grid>
                                    </Stack>
                                </SingleProvider>
                            ) : (
                                <Stack align='center' justify='center' mih={500} gap='xs'>
                                    <IconDatabase size={48} stroke={1.5} color='var(--mantine-color-gray-4)' />
                                    <Text size='lg' fw={500}>Select a record to start</Text>
                                </Stack>
                            )}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    )
}
