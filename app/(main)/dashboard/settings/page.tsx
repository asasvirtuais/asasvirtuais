'use client'
import { Container, Title, Paper, Stack, Text, Alert, PasswordInput, Button, Group } from '@mantine/core'
import { IconInfoCircle, IconDeviceFloppy, IconBellCheck } from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import { notifications } from '@mantine/notifications'

export default function SettingsPage() {
    const [apiKey, setApiKey] = useState('')

    useEffect(() => {
        // Read cookie on load
        const cookies = document.cookie.split('; ')
        const keyCookie = cookies.find(row => row.startsWith('google-ai-key='))
        if (keyCookie) {
            setApiKey(keyCookie.split('=')[1])
        }
    }, [])

    const handleSave = () => {
        // Set cookie (valid for 1 year)
        const d = new Date()
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000))
        document.cookie = `google-ai-key=${apiKey}; expires=${d.toUTCString()}; path=/; SameSite=Strict`

        notifications.show({
            title: 'Settings Saved',
            message: 'Your Google AI key has been stored in a cookie.',
            color: 'green',
            icon: <IconBellCheck size={18} />
        })
    }

    return (
        <Container size="sm">
            <Stack gap="xl">
                <div>
                    <Title order={2}>Settings</Title>
                    <Text c="dimmed">Manage your application preferences and credentials.</Text>
                </div>

                <Alert variant="light" color="blue" title="Privacy Note" icon={<IconInfoCircle />}>
                    Your API keys are stored in a cookie in your browser.
                    This allows the backend to read them automatically for each request without extra client-side logic.
                </Alert>

                <Paper withBorder p="xl" radius="md">
                    <Stack gap="md">
                        <Text fw={500}>Google AI Configuration</Text>
                        <PasswordInput
                            label="Google AI Studio API Key"
                            placeholder="Paste your API key here..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.currentTarget.value)}
                            description="Used for Gemini model interactions."
                        />
                        <Group justify="flex-end">
                            <Button
                                leftSection={<IconDeviceFloppy size={18} />}
                                onClick={handleSave}
                                color="violet"
                            >
                                Save Settings
                            </Button>
                        </Group>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    )
}
