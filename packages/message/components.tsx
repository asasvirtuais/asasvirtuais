'use client'
import { useSingle } from 'asasvirtuais/react-interface'
import {
    Paper,
    Text,
    Group,
    Avatar,
    Menu,
    ActionIcon,
    Modal,
    Code,
    Box,
    rem
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDotsVertical, IconTrash, IconPencil, IconInfoCircle } from '@tabler/icons-react'
import { schema, type Readable } from '.'

import { MessageLayout, MessageAvatar, MessagePaper, MessageText, MessageMenuOptions, MessageFloatingLayout } from './layout'

export function MessageListItem() {
    const { single } = useSingle('messages', schema)
    const message = single as Readable
    return (
        <Group wrap="nowrap" gap="sm">
            <Avatar size="sm" color={message.Role === 'user' ? 'blue' : 'green'}>
                {message.Role?.[0].toUpperCase()}
            </Avatar>
            <Box style={{ flex: 1, overflow: 'hidden' }}>
                <Text size="sm" fw={500} truncate>{message.Role}</Text>
                <Text size="xs" color="dimmed" truncate>{message.Content}</Text>
            </Box>
        </Group>
    )
}

export function SingleMessage() {
    const { single } = useSingle('messages', schema)
    const message = single as Readable
    const isUser = message.Role === 'user'
    const isSystem = message.Role === 'system'

    return (
        <MessageLayout justify={isUser ? 'flex-end' : 'flex-start'}>
            {!isUser && (
                <MessageAvatar color={isSystem ? 'gray' : 'teal'}>
                    {message.Role?.[0]?.toUpperCase()}
                </MessageAvatar>
            )}

            <Box style={{ maxWidth: '80%' }}>
                <MessagePaper
                    bg={isUser ? 'var(--mantine-primary-color-filled)' : isSystem ? 'var(--mantine-color-default-hover)' : 'var(--mantine-color-default)'}
                    withBorder={!isUser && !isSystem}
                    color={isUser ? 'var(--mantine-color-white)' : 'inherit'}
                >
                    <MessageText>{message.Content}</MessageText>
                    <MessageMenuOptions metadata={message.Metadata} iconColor={isUser ? 'white' : 'gray'} />
                </MessagePaper>
                <Text size="xs" color="dimmed" mt={4} ta={isUser ? 'right' : 'left'} px={4}>
                    {message.Role?.charAt(0).toUpperCase() + message.Role?.slice(1)}
                </Text>
            </Box>

            {isUser && (
                <MessageAvatar color="blue">U</MessageAvatar>
            )}
        </MessageLayout>
    )
}
