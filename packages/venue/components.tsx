'use client'
import { useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '.'
import { Text, Title, Stack, Badge, Group, Paper } from '@mantine/core'

export function VenueListItem() {
    const { single } = useSingle('venues', schema)
    const venue = single as Readable
    return (
        <Paper p="sm" withBorder shadow="sm">
            <Stack gap={4}>
                <Title order={4}>{venue.title || 'Untitled Venue'}</Title>
                <Text size="sm" c="dimmed" lineClamp={2}>
                    {venue.circumstances || 'No circumstances set'}
                </Text>
                {venue.tools && venue.tools.length > 0 && (
                    <Group gap={4} mt={4}>
                        {venue.tools.map((tool) => (
                            <Badge key={tool} size="xs" color="gray" variant="outline">
                                {tool}
                            </Badge>
                        ))}
                    </Group>
                )}
            </Stack>
        </Paper>
    )
}

export function SingleVenue() {
    const { single } = useSingle('venues', schema)
    const venue = single as Readable
    return (
        <Stack gap="lg">
            <Title order={2}>{venue.title}</Title>

            <Stack gap="xs">
                <Title order={5} c="dimmed" tt="uppercase">
                    Circumstances
                </Title>
                <Paper p="md" withBorder bg="gray.1">
                    <Text size="sm" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                        {venue.circumstances}
                    </Text>
                </Paper>
            </Stack>

            {venue.tools && venue.tools.length > 0 && (
                <Stack gap="xs">
                    <Title order={5} c="dimmed" tt="uppercase">
                        Available Tools
                    </Title>
                    <Group gap="xs">
                        {venue.tools.map((tool) => (
                            <Badge key={tool} color="indigo" variant="light" size="lg">
                                {tool}
                            </Badge>
                        ))}
                    </Group>
                </Stack>
            )}
        </Stack>
    )
}
