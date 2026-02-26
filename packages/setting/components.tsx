'use client'
import { Badge, Group, Text, Paper } from '@mantine/core'
import { useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '.'
import { IconLock, IconLockOpen } from '@tabler/icons-react'

export function SettingStatus() {
    const { single } = useSingle('settings', schema)
    const setting = single as Readable

    if (!setting) return <Text size="sm" c="dimmed">No settings found.</Text>

    const hasKey = !!setting.google_api_key

    return (
        <Paper withBorder p="xs" radius="md">
            <Group justify="space-between">
                <Text size="sm" fw={500}>Google AI API Status</Text>
                <Badge
                    color={hasKey ? 'green' : 'red'}
                    variant="light"
                    leftSection={hasKey ? <IconLockOpen size={12} /> : <IconLock size={12} />}
                >
                    {hasKey ? 'Configured' : 'Missing Key'}
                </Badge>
            </Group>
        </Paper>
    )
}

export function SingleSetting() {
    const { single } = useSingle('settings', schema)
    const setting = single as Readable

    if (!setting) return null

    return (
        <div>
            <Text size="sm" c="dimmed" fw={500} mb={5}>API Key (masked)</Text>
            <Text size="md">
                {setting.google_api_key
                    ? `••••••••${setting.google_api_key.slice(-4)}`
                    : 'Not configured'}
            </Text>
        </div>
    )
}
