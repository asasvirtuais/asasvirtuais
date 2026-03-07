'use client'
import { useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '.'
import { Text, Title, Avatar, Group, Stack, Badge, Paper } from '@mantine/core'

export function CharacterListItem() {
    const { single } = useSingle('characters', schema)
    const character = single as Readable
    return (
        <Group wrap="nowrap">
            <Avatar src={character.avatar} size="lg" radius="xl" alt={character.name} />
            <Stack gap={0} style={{ flex: 1, overflow: 'hidden' }}>
                <Title order={4}>{character.name || 'Untitled Character'}</Title>
                <Text size="sm" c="dimmed" lineClamp={1}>
                    {character.definition || 'No definition set'}
                </Text>
                {character.skills && character.skills.length > 0 && (
                    <Group gap={4} mt={4}>
                        {character.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} size="xs" variant="light">
                                {skill}
                            </Badge>
                        ))}
                        {character.skills.length > 3 && (
                            <Text size="xs" c="dimmed">
                                +{character.skills.length - 3} more
                            </Text>
                        )}
                    </Group>
                )}
            </Stack>
        </Group>
    )
}

export function SingleCharacter() {
    const { single } = useSingle('characters', schema)
    const character = single as Readable
    return (
        <Stack gap="lg">
            <Group align="flex-start">
                <Avatar src={character.avatar} size={80} radius="xl" alt={character.name} />
                <Stack gap="xs">
                    <Title order={2}>{character.name}</Title>
                    <Text fw={500} c="blue">
                        {character.definition}
                    </Text>
                </Stack>
            </Group>

            <Stack gap="xs">
                <Title order={5} c="dimmed" tt="uppercase">
                    Persona Details
                </Title>
                <Text style={{ whiteSpace: 'pre-wrap' }}>{character.details}</Text>
            </Stack>

            {character.skills && character.skills.length > 0 && (
                <Stack gap="xs">
                    <Title order={5} c="dimmed" tt="uppercase">
                        Skills
                    </Title>
                    <Group gap="xs">
                        {character.skills.map((skill) => (
                            <Badge key={skill} variant="filled">
                                {skill}
                            </Badge>
                        ))}
                    </Group>
                </Stack>
            )}
        </Stack>
    )
}
