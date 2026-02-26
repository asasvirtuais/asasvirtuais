'use client'
import { useSingle } from 'asasvirtuais/react-interface'
import { Card, Text, Badge, Group, Stack, TypographyStylesProvider } from '@mantine/core'
import ReactMarkdown from 'react-markdown'
import { schema, type Readable } from '.'

export function ChatListItem({ item }: { item: Readable }) {
    return (
        <>
            <Text fw={500} truncate>{item.title || 'Untitled Record'}</Text>
            <Text size='xs' c='dimmed' truncate>{item.id}</Text>
        </>
    )
}

export function ChatItem() {
    const { single } = useSingle('Chats', schema)
    const item = single as Readable

    return (
        <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Group justify='space-between' mb='xs'>
                <Text fw={500}>{item.title || 'Untitled Record'}</Text>
                <Badge color='blue' variant='light'>{item.model}</Badge>
            </Group>

            <Text size='sm' color='dimmed' lineClamp={2}>
                {item.instructions || 'No instructions provided.'}
            </Text>

            <Group mt='md' gap={5}>
                <Text size='xs' fw={700}>Temp:</Text>
                <Text size='xs'>{item.temperature ?? 0.7}</Text>
            </Group>
        </Card>
    )
}

export function SingleChat() {
    const { single } = useSingle('Chats', schema)
    const item = single as Readable

    return (
        <Stack>
            <Group justify='space-between'>
                <Text size='xl' fw={700}>{item.title}</Text>
                <Badge size='lg'>{item.model}</Badge>
            </Group>

            <Group gap='xs'>
                <Text fw={600}>Temperature:</Text>
                <Text>{item.temperature}</Text>
            </Group>

            <Stack gap={5}>
                <Text fw={600}>Instructions:</Text>
                <Card withBorder radius='md' p='md'>
                    <TypographyStylesProvider>
                        <ReactMarkdown>
                            {item.instructions || ''}
                        </ReactMarkdown>
                    </TypographyStylesProvider>
                </Card>
            </Stack>
        </Stack>
    )
}
