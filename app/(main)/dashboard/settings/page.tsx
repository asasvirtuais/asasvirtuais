'use client'
import { Container, Title, Paper, Stack, Text, Alert, Loader, Center } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { useSettings } from '@/packages/setting/provider'
import { CreateSetting, UpdateSetting } from '@/packages/setting/forms'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { schema } from '@/packages/setting'
import { useEffect } from 'react'

export default function SettingsPage() {
    const { array, list } = useSettings()

    useEffect(() => {
        list.trigger({ query: { $limit: 1 } })
    }, [])

    if (list.loading) {
        return (
            <Center h={300}>
                <Loader color="violet" />
            </Center>
        )
    }

    const currentSetting = array[0]

    return (
        <Container size="sm">
            <Stack gap="xl">
                <div>
                    <Title order={2}>Settings</Title>
                    <Text c="dimmed">Manage your API keys and application preferences.</Text>
                </div>

                <Alert variant="light" color="blue" title="Privacy Note" icon={<IconInfoCircle />}>
                    Your API keys are stored in your private database. We never see your keys on our servers.
                </Alert>

                <Paper withBorder p="xl" radius="md">
                    {!currentSetting ? (
                        <Stack gap="md">
                            <Text fw={500}>Initialize Settings</Text>
                            <Text size="sm" c="dimmed">
                                It looks like you haven't configured your settings yet.
                                Provide your Google AI Studio API key to get started.
                            </Text>
                            <CreateSetting />
                        </Stack>
                    ) : (
                        <SingleProvider id={currentSetting.id} table="settings" schema={schema}>
                            <Stack gap="md">
                                <Text fw={500}>App Configuration</Text>
                                <UpdateSetting />
                            </Stack>
                        </SingleProvider>
                    )}
                </Paper>
            </Stack>
        </Container>
    )
}
