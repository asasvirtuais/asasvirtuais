'use client'
import React, { useRef, useEffect } from 'react'
import {
    ChatPageLayout,
    ChatHeader,
    ChatBody,
    ChatInput
} from '@/packages/chat/layout'
import { useSingle, UpdateForm } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '@/packages/chat'
import {
    Text,
    ActionIcon,
    Menu,
    Modal,
    Textarea,
    Button,
    Stack,
    Group,
    Box,
    Paper,
    TextInput,
    Avatar
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    IconDotsVertical,
    IconSettings,
    IconSend,
    IconPlus,
    IconRobot,
    IconLoader2
} from '@tabler/icons-react'
import ReactMarkdown from 'react-markdown'
import { UpdateChat } from '@/packages/chat/forms'
import { useAIChat } from '@/packages/aichat/hooks'

/**
 * Message Bubble component for Demo
 */
function MessageBubble({ role, content }: { role: string, content: string }) {
    const isAssistant = role === 'assistant'
    const isSystem = role === 'system'

    if (isSystem) return null

    return (
        <Group align="flex-start" justify={isAssistant ? 'flex-start' : 'flex-end'} wrap="nowrap" gap="sm">
            {isAssistant && <Avatar radius="xl" color="blue"><IconRobot size={20} /></Avatar>}
            <Paper
                p="sm"
                radius="md"
                withBorder={isAssistant}
                bg={isAssistant ? 'gray.0' : 'blue.6'}
                c={isAssistant ? 'black' : 'white'}
                style={{ maxWidth: '85%', overflowWrap: 'break-word' }}
            >
                <Box style={{ fontSize: 'var(--mantine-font-size-sm)' }}>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </Box>
            </Paper>
            {!isAssistant && <Avatar radius="xl" src={null} />}
        </Group>
    )
}

export function SingleChatView() {
    const { single, id } = useSingle('chats', schema)
    const item = single as Readable
    const [opened, { open, close }] = useDisclosure(false)

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
            {/* Header: Title + Settings */}
            <ChatHeader>
                <Box style={{ flex: 1 }}>
                    <UpdateForm table="chats" schema={schema} id={id} defaults={{ title: item.title || '' }}>
                        {form => (
                            <form onBlur={form.submit} style={{ maxWidth: 300 }}>
                                <TextInput
                                    variant="unstyled"
                                    size="md"
                                    fw={700}
                                    value={form.fields.title || ''}
                                    onChange={(e) => form.setField('title', e.target.value)}
                                    placeholder="Enter chat title..."
                                />
                            </form>
                        )}
                    </UpdateForm>
                </Box>

                <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                            <IconDotsVertical size={20} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item leftSection={<IconSettings size={14} />} onClick={open}>
                            Settings
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </ChatHeader>

            {/* Body: Streamed Messages */}
            <ChatBody>
                {/* System Instructions Section */}
                {item.instructions && (
                    <Paper withBorder p="sm" radius="md" bg="gray.1" mb="md" style={{ borderStyle: 'dashed' }}>
                        <Text size="xs" fw={700} c="dimmed" mb={4} tt="uppercase">System Context</Text>
                        <Box style={{ fontSize: 'var(--mantine-font-size-xs)', opacity: 0.7 }}>
                            <ReactMarkdown>{item.instructions}</ReactMarkdown>
                        </Box>
                    </Paper>
                )}

                <Stack gap="lg">
                    {messages.length === 0 && !isLoading && (
                        <Text ta="center" c="dimmed" size="sm" py="xl">
                            No messages yet. Say hello to {item.title || 'AI'}!
                        </Text>
                    )}

                    {messages.map((m) => (
                        <MessageBubble
                            key={m.id}
                            role={m.role}
                            content={m.parts.filter(p => p.type === 'text').map(p => p.text).join('')}
                        />
                    ))}

                    {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                        <Group gap="sm">
                            <Avatar radius="xl" color="blue">
                                <IconLoader2 size={18} className="animate-spin" />
                            </Avatar>
                            <Paper p="xs" radius="md" bg="gray.0" withBorder>
                                <Text size="sm" c="dimmed">AI is thinking...</Text>
                            </Paper>
                        </Group>
                    )}

                    {error && (
                        <Paper p="md" radius="md" bg="red.0" withBorder style={{ borderColor: 'var(--mantine-color-red-4)' }}>
                            <Stack gap="xs">
                                <Text size="sm" c="red.9" fw={500}>Something went wrong</Text>
                                <Text size="xs" c="red.7">{error.message}</Text>
                                <Button variant="outline" color="red" size="compact-xs" onClick={() => regenerate()}>
                                    Retry
                                </Button>
                            </Stack>
                        </Paper>
                    )}
                </Stack>
            </ChatBody>

            {/* Input Form */}
            <ChatInput>
                <form onSubmit={handleSubmit}>
                    <Stack gap="xs">
                        <Group gap="xs">
                            <Button variant="light" size="compact-xs" color="gray" radius="xl">Context: {item.model || 'Default'}</Button>
                            <Button variant="light" size="compact-xs" color="gray" radius="xl">Temp: {item.temperature || 0.7}</Button>
                        </Group>

                        <Group align="flex-end" gap="sm">
                            <ActionIcon variant="light" size="lg" radius="md" disabled={isLoading}>
                                <IconPlus size={20} />
                            </ActionIcon>
                            <Textarea
                                placeholder="Type a message..."
                                style={{ flex: 1 }}
                                autosize
                                minRows={1}
                                maxRows={4}
                                variant="filled"
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSubmit(e as any)
                                    }
                                }}
                            />
                            <ActionIcon
                                type="submit"
                                variant="filled"
                                size="lg"
                                radius="md"
                                color="blue"
                                disabled={!input.trim() || isLoading}
                            >
                                <IconSend size={20} />
                            </ActionIcon>
                        </Group>
                    </Stack>
                </form>
            </ChatInput>

            <Modal opened={opened} onClose={close} title="Chat Settings" centered size="lg">
                <UpdateChat onSuccess={close} />
            </Modal>
        </ChatPageLayout>
    )
}
