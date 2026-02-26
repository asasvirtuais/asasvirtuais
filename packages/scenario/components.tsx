'use client'
import { useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '.'
import { Text, Title, Stack, Group, Paper, Badge } from '@mantine/core'
import { useCharacters } from '@/packages/character/provider'
import { useVenues } from '@/packages/venue/provider'
import { useChats } from '@/packages/chat/provider'

export function ScenarioListItem() {
    const { single } = useSingle('scenarios', schema)
    const scenario = single as Readable
    const { index: charIndex } = useCharacters()
    const { index: venueIndex } = useVenues()

    const charName = scenario.character ? (charIndex[scenario.character] as any)?.name : 'Unknown Character'
    const venueTitle = scenario.venue ? (venueIndex[scenario.venue] as any)?.title : 'Unknown Venue'

    return (
        <Paper p="sm" withBorder shadow="sm">
            <Stack gap={4}>
                <Group justify="space-between" align="center">
                    <Title order={4}>
                        {charName} @ {venueTitle}
                    </Title>
                    <Badge variant="dot">Scenario</Badge>
                </Group>
                <Text size="sm" c="dimmed" lineClamp={1}>
                    {scenario.instructions || 'No special instructions'}
                </Text>
            </Stack>
        </Paper>
    )
}

export function SingleScenario() {
    const { single } = useSingle('scenarios', schema)
    const scenario = single as Readable
    const { index: charIndex } = useCharacters()
    const { index: venueIndex } = useVenues()
    const { index: chatIndex } = useChats()

    const char = scenario.character ? charIndex[scenario.character] : null
    const venue = scenario.venue ? venueIndex[scenario.venue] : null
    const chat = scenario.chat ? chatIndex[scenario.chat] : null

    return (
        <Stack gap="lg">
            <Title order={2}>
                {(char as any)?.name || 'Character'} at {(venue as any)?.title || 'Venue'}
            </Title>

            <Group gap="xl">
                <Stack gap={2}>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">Character</Text>
                    <Text fw={500}>{(char as any)?.name || 'Not set'}</Text>
                </Stack>
                <Stack gap={2}>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">Venue</Text>
                    <Text fw={500}>{(venue as any)?.title || 'Not set'}</Text>
                </Stack>
                <Stack gap={2}>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">Chat Reference</Text>
                    <Text fw={500}>{(chat as any)?.title || (chat as any)?.id || 'Not set'}</Text>
                </Stack>
            </Group>

            <Stack gap="xs">
                <Title order={5} c="dimmed" tt="uppercase">Instructions</Title>
                <Paper p="md" withBorder>
                    <Text style={{ whiteSpace: 'pre-wrap' }}>
                        {scenario.instructions || 'No instructions provided for this scenario.'}
                    </Text>
                </Paper>
            </Stack>
        </Stack>
    )
}
