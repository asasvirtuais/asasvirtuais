'use client'
import { Container, Title, Grid, Card, Text, Button, Group, Badge, ThemeIcon, Loader, Center } from '@mantine/core'
import { useChats } from '@/packages/chat/provider'
import { schema, type Readable as Chat } from '@/packages/chat'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaPlay, FaRobot, FaGamepad } from 'react-icons/fa'

export default function ScenariosPage() {
    const { list, array } = useChats()
    const router = useRouter()

    useEffect(() => {
        list.trigger({})
    }, [])

    return (
        <Container size="lg" py="xl">
            <Group justify="space-between" mb="xl">
                <Group>
                    <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ from: 'violet', to: 'cyan' }}>
                        <FaGamepad size={20} />
                    </ThemeIcon>
                    <Title order={1} style={{ letterSpacing: '-0.5px' }}>
                        Scenarios
                    </Title>
                </Group>
                <Button variant="default" onClick={() => router.push('/dashboard/chats')}>
                    Manage Settings
                </Button>
            </Group>

            {list.loading && array.length === 0 ? (
                <Center h={200}>
                    <Loader size="lg" variant="dots" color="violet" />
                </Center>
            ) : (
                <Grid>
                    {array.map((chat: Chat) => (
                        <Grid.Col key={chat.id} span={{ base: 12, sm: 6, md: 4 }}>
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(10px)',
                                    borderColor: 'rgba(255, 255, 255, 0.08)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => router.push(`/dashboard/scenarios/${chat.id}`)}
                            >
                                <Group justify="space-between" mb="xs">
                                    <Text fw={700} size="lg" lineClamp={1}>
                                        {chat.title || 'Untitled Scenario'}
                                    </Text>
                                    <Badge color={chat.model?.includes('preview') || chat.model?.includes('pro') ? 'violet' : 'blue'} variant="light">
                                        {chat.model || 'Default Agent'}
                                    </Badge>
                                </Group>

                                <Text size="sm" c="dimmed" lineClamp={3} style={{ flexGrow: 1 }} mb="xl">
                                    {chat.instructions || 'No special instructions...'}
                                </Text>

                                <Button
                                    variant="light"
                                    color="violet"
                                    fullWidth
                                    mt="auto"
                                    radius="md"
                                    leftSection={<FaPlay size={14} />}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        router.push(`/dashboard/scenarios/${chat.id}`)
                                    }}
                                >
                                    Enter Scenario
                                </Button>
                            </Card>
                        </Grid.Col>
                    ))}

                    {array.length === 0 && !list.loading && (
                        <Grid.Col span={12}>
                            <Card shadow="none" withBorder ta="center" py="xl">
                                <ThemeIcon size={64} radius="xl" variant="light" color="gray" mx="auto" mb="md">
                                    <FaRobot size={32} />
                                </ThemeIcon>
                                <Title order={3} mb="xs">No scenarios found</Title>
                                <Text c="dimmed" mb="lg">Create your first character or chat scenario to get started.</Text>
                                <Button
                                    variant="gradient"
                                    gradient={{ from: 'violet', to: 'cyan' }}
                                    onClick={() => router.push('/dashboard/chats')}
                                >
                                    Go to Dashboard
                                </Button>
                            </Card>
                        </Grid.Col>
                    )}
                </Grid>
            )}
        </Container>
    )
}
