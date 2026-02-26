'use client'
import React, { useEffect } from 'react'
import {
    ChatPageLayout,
    ChatHeader,
    ChatBody,
    ChatInput
} from '@/packages/chat/layout'
import { useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '@/packages/chat'
import {
    Text,
    ActionIcon,
    Textarea,
    Stack,
    Group,
    Box,
    Paper,
    Avatar,
    Title,
    Loader
} from '@mantine/core'
import {
    IconSend,
    IconRobot,
    IconUser
} from '@tabler/icons-react'
import ReactMarkdown from 'react-markdown'
import { useAIChat } from '@/packages/aichat/hooks'

/**
 * Premium Message Bubble Component
 */
function DashboardMessageBubble({ role, content }: { role: string, content: string }) {
    const isAssistant = role === 'assistant'
    const isSystem = role === 'system'

    if (isSystem) return null

    return (
        <Group align="flex-start" justify={isAssistant ? 'flex-start' : 'flex-end'} wrap="nowrap" gap="md">
            {isAssistant && (
                <Avatar radius="xl" color="blue" size="md">
                    <IconRobot size={24} />
                </Avatar>
            )}
            <Paper
                p="md"
                radius="lg"
                shadow="sm"
                withBorder={false}
                bg={isAssistant ? 'gray.0' : 'blue.6'}
                c={isAssistant ? 'dark.9' : 'white'}
                style={{
                    maxWidth: '85%',
                    overflowWrap: 'break-word',
                    borderBottomLeftRadius: isAssistant ? 4 : undefined,
                    borderBottomRightRadius: !isAssistant ? 4 : undefined,
                }}
            >
                <Box style={{ fontSize: 'var(--mantine-font-size-md)', lineHeight: 1.6 }}>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </Box>
            </Paper>
            {!isAssistant && (
                <Avatar radius="xl" color="gray" size="md">
                    <IconUser size={24} />
                </Avatar>
            )}
        </Group>
    )
}

export function DashboardChatView() {
    const { single, id } = useSingle('chats', schema)
    const item = single as Readable

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        status,
        error,
        regenerate,
    } = useAIChat(id)

    const isLoading = status === 'submitted' || status === 'streaming'

    // Auto-scroll to bottom of ChatBody
    useEffect(() => {
        const scrollArea = document.querySelector('.mantine-ScrollArea-viewport')
        if (scrollArea) {
            scrollArea.scrollTo({ top: scrollArea.scrollHeight, behavior: 'smooth' })
        }
    }, [messages])

    if (!item) return <Text c="dimmed" ta="center" py="xl">Chat not found.</Text>

    return (
        <ChatPageLayout>
            {/* Header */}
            <ChatHeader>
                <Group>
                    <Avatar color="blue" radius="md">
                        <IconRobot size={24} />
                    </Avatar>
                    <Box>
                        <Title order={4}>{item.title || 'A.I. Assistant'}</Title>
                        <Text size="xs" c="dimmed">Always here to help</Text>
                    </Box>
                </Group>
            </ChatHeader>

            {/* Body */}
            <ChatBody>
                <Stack gap="xl" py="md">
                    {messages.length === 0 && !isLoading && (
                        <Stack align="center" gap="xs" py="xl" opacity={0.6}>
                            <IconRobot size={48} stroke={1.5} />
                            <Text ta="center" size="md">
                                How can I help you manage your workspace today?
                            </Text>
                        </Stack>
                    )}

                    {messages.map((m) => (
                        <DashboardMessageBubble
                            key={m.id}
                            role={m.role}
                            content={m.parts.filter(p => p.type === 'text').map(p => p.text).join('')}
                        />
                    ))}

                    {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                        <Group gap="md">
                            <Avatar radius="xl" color="blue" size="md">
                                <Loader size="xs" type="dots" color="white" />
                            </Avatar>
                            <Paper p="md" radius="lg" bg="gray.0">
                                <Text size="sm" c="dimmed">Analyzing your request...</Text>
                            </Paper>
                        </Group>
                    )}

                    {error && (
                        <Paper p="md" radius="md" bg="red.0" style={{ border: '1px solid var(--mantine-color-red-3)' }}>
                            <Text size="sm" c="red.9" fw={500}>Something went wrong</Text>
                            <Text size="xs" c="red.7">{error.message}</Text>
                        </Paper>
                    )}
                </Stack>
            </ChatBody>

            {/* Input */}
            <ChatInput>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Group align="flex-end" gap="sm">
                        <Textarea
                            placeholder="Message the A.I. Assistant..."
                            style={{ flex: 1 }}
                            autosize
                            minRows={1}
                            maxRows={6}
                            size="md"
                            radius="md"
                            variant="filled"
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    if (input.trim() && !isLoading) {
                                        handleSubmit(e as any)
                                    }
                                }
                            }}
                        />
                        <ActionIcon
                            type="submit"
                            variant="filled"
                            size={42}
                            radius="md"
                            color="blue"
                            disabled={!input.trim() || isLoading}
                        >
                            <IconSend size={20} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </form>
            </ChatInput>
        </ChatPageLayout>
    )
}
