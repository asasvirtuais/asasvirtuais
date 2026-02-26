'use client'
import { Text } from '@mantine/core'
import { useSingle } from 'asasvirtuais/react-interface'
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
    const { single } = useSingle('chats', schema)
    const item = single as Readable
    return (
        <>
            <Text fw={500}>{item.title || 'Untitled Record'}</Text>
            <Text size='xs' c='dimmed'>{item.id}</Text>
        </>
    )
}

export function SingleChat() {
    const { single } = useSingle('chats', schema)
    const item = single as Readable
    return (
        <div>
            <h1>{item.title}</h1>
            <ReactMarkdown>{item.instructions || ''}</ReactMarkdown>
            <p>Temperature: {item.temperature}</p>
            <p>Model: {item.model}</p>
        </div>
    )
}
