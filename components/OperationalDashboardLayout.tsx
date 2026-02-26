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
    Tabs
} from '@mantine/core'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { IconPlus, IconDatabase } from '@tabler/icons-react'
import { useTable } from 'asasvirtuais/react-interface'

export interface OperationalDashboardLayoutProps {
    title: string;
    tableName: string;
    schema: any;
    ListItem: React.ComponentType<{ item: any }>;
    SingleItem: React.ComponentType;
    CreateForm: React.ComponentType<{ onSuccess?: (item: any) => void }>;
    UpdateForm: React.ComponentType;
    DeleteForm: React.ComponentType<{ onSuccess?: () => void }>;
    CustomView?: React.ComponentType;
}

export function OperationalDashboardLayout({
    title,
    tableName,
    schema,
    ListItem,
    SingleItem,
    CreateForm,
    UpdateForm,
    DeleteForm,
    CustomView
}: OperationalDashboardLayoutProps) {
    const { array, list } = useTable(tableName, schema)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        list.trigger({})
    }, [])

    const handleCreateSuccess = (newItem: any) => {
        setIsCreating(false)
        setSelectedId(newItem.id)
    }

    return (
        <Container size='xl' py='xl'>
            <Stack gap='xl'>
                <Group justify='space-between'>
                    <Title order={1}>{title}</Title>
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={() => {
                            setIsCreating(true)
                            setSelectedId(null)
                        }}
                    >
                        New Record
                    </Button>
                </Group>

                <Grid gutter='md'>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Paper withBorder p='md' radius='md'>
                            <Stack gap='sm'>
                                <Text fw={700} size='sm' c='dimmed' tt='uppercase'>{tableName} Record List</Text>
                                <ScrollArea h={500} offsetScrollbars>
                                    <Stack gap='xs'>
                                        {array.map((item) => (
                                            <SingleProvider key={item.id} id={item.id} table={tableName} schema={schema}>
                                                <Card
                                                    shadow='xs'
                                                    p='sm'
                                                    radius='md'
                                                    withBorder
                                                    onClick={() => {
                                                        setSelectedId(item.id)
                                                        setIsCreating(false)
                                                    }}
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor: selectedId === item.id ? 'var(--mantine-color-blue-light)' : undefined,
                                                    }}
                                                >
                                                    <ListItem item={item} />
                                                </Card>
                                            </SingleProvider>
                                        ))}
                                    </Stack>
                                </ScrollArea>
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Paper withBorder p='xl' radius='md' mih={400}>
                            {isCreating ? (
                                <Stack>
                                    <Title order={2}>Create New {tableName.slice(0, -1)}</Title>
                                    <CreateForm onSuccess={handleCreateSuccess} />
                                </Stack>
                            ) : selectedId ? (
                                <SingleProvider id={selectedId} table={tableName} schema={schema}>
                                    {CustomView ? (
                                        <Tabs defaultValue="custom">
                                            <Tabs.List mb="md">
                                                <Tabs.Tab value="custom">Interface Demo</Tabs.Tab>
                                                <Tabs.Tab value="admin">CRUD Dashboard</Tabs.Tab>
                                            </Tabs.List>

                                            <Tabs.Panel value="custom">
                                                <CustomView />
                                            </Tabs.Panel>

                                            <Tabs.Panel value="admin">
                                                <Stack gap="xl">
                                                    <Group justify="space-between">
                                                        <Title order={2}>Manage {tableName.slice(0, -1)}</Title>
                                                        <DeleteForm onSuccess={() => setSelectedId(null)} />
                                                    </Group>
                                                    <Grid>
                                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                                            <Title order={4} mb="md">Display View</Title>
                                                            <SingleItem />
                                                        </Grid.Col>
                                                        <Grid.Col span={{ base: 12, lg: 6 }}>
                                                            <Title order={4} mb="md">Update Form</Title>
                                                            <UpdateForm />
                                                        </Grid.Col>
                                                    </Grid>
                                                </Stack>
                                            </Tabs.Panel>
                                        </Tabs>
                                    ) : (
                                        <Stack gap="xl">
                                            <Group justify="space-between">
                                                <Title order={2}>Manage {tableName.slice(0, -1)}</Title>
                                                <DeleteForm onSuccess={() => setSelectedId(null)} />
                                            </Group>
                                            <Grid>
                                                <Grid.Col span={{ base: 12, lg: 6 }}>
                                                    <Title order={4} mb="md">Display View</Title>
                                                    <SingleItem />
                                                </Grid.Col>
                                                <Grid.Col span={{ base: 12, lg: 6 }}>
                                                    <Title order={4} mb="md">Update Form</Title>
                                                    <UpdateForm />
                                                </Grid.Col>
                                            </Grid>
                                        </Stack>
                                    )}
                                </SingleProvider>
                            ) : (
                                <Stack align='center' justify='center' mih={500} gap='xs'>
                                    <IconDatabase size={48} stroke={1.5} color='var(--mantine-color-gray-4)' />
                                    <Text size='lg' fw={500}>Select an item</Text>
                                    <Text size='sm' c='dimmed'>Choose an item from the list to start.</Text>
                                </Stack>
                            )}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    )
}
