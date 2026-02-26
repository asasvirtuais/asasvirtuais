'use client'
import React, { useEffect, useState } from 'react'
import {
    ChatPageLayout,
    ChatHeader,
    ChatBody,
    ChatInput
} from '@/packages/chat/layout'
import {
    MessageAvatar,
    MessageLayout,
    MessagePaper,
    MessageText,
    MessageMenuOptions
} from '@/packages/message/layout'
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
    Loader,
    Menu,
    Modal
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    IconSend,
    IconRobot,
    IconUser,
    IconDotsVertical,
    IconSettings
} from '@tabler/icons-react'
import ReactMarkdown from 'react-markdown'
import { useAIChat } from '@/packages/aichat/hooks'
import { UpdateChat } from '@/packages/chat/forms'
import { UpdateMessage } from '@/packages/message/forms'
import { useMessages } from '@/packages/message/provider'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { schema as messageSchema } from '@/packages/message'

/**
 * Premium Message Bubble Component using LEGO blocks
 */
function DashboardMessageBubble({ onEdit }: { onEdit: () => void }) {
    const { single } = useSingle('messages', messageSchema)
    const message = single as Message
    console.log(message)
    const isAssistant = message?.role === 'assistant'
    const isSystem = message?.role === 'system'
    const { remove } = useMessages()

    if (isSystem || !message) return null

    return (
        <MessageLayout justify={isAssistant ? 'flex-start' : 'flex-end'}>
            {isAssistant && (
                <MessageAvatar radius="xl" color="blue" size="md">
                    <IconRobot size={24} />
                </MessageAvatar>
            )}
            <MessagePaper
                p="md"
                radius="lg"
                shadow="sm"
                withBorder={false}
                bg={isAssistant ? 'gray.0' : 'blue.6'}
                color={isAssistant ? 'var(--mantine-color-dark-9)' : 'white'}
                style={{
                    maxWidth: '85%',
                    borderBottomLeftRadius: isAssistant ? 4 : undefined,
                    borderBottomRightRadius: !isAssistant ? 4 : undefined,
                }}
            >
                <Box style={{ flex: 1 }}>
                    <MessageText size="md" style={{ lineHeight: 1.6 }}>
                        <ReactMarkdown>{message.content || ''}</ReactMarkdown>
                    </MessageText>
                </Box>
                <MessageMenuOptions
                    metadata={message.metadata}
                    iconColor={isAssistant ? 'gray' : 'white'}
                    onDelete={() => remove.trigger({ id: message.id })}
                    onEdit={onEdit}
                />
            </MessagePaper>
            {!isAssistant && (
                <MessageAvatar radius="xl" color="gray" size="md">
                    <IconUser color='darkgray' size={24} />
                </MessageAvatar>
            )}
        </MessageLayout>
    )
}

export function DashboardChatView() {
    const { single, id } = useSingle('chats', schema)
    const item = single as Readable
    const [opened, { open, close }] = useDisclosure(false)
    const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false)
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null)

    const { list: listMessages, array: dbMessages } = useMessages()

    useEffect(() => {
        if (id) {
            listMessages.trigger({ query: { chat: id } })
        }
    }, [id])

    const {
        input,
        handleInputChange,
        handleSubmit,
        status,
        error,
    } = useAIChat(id)

    const isLoading = status === 'submitted' || status === 'streaming'

    // Sort messages by timestamp
    const sortedMessages = [...dbMessages].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))

    // Auto-scroll to bottom of ChatBody
    useEffect(() => {
        const scrollArea = document.querySelector('.mantine-ScrollArea-viewport')
        if (scrollArea) {
            scrollArea.scrollTo({ top: scrollArea.scrollHeight, behavior: 'smooth' })
        }
    }, [sortedMessages.length, isLoading])

    if (!item) return <Text c="dimmed" ta="center" py="xl">Chat not found.</Text>

    return (
        <ChatPageLayout>
            {/* Header */}
            <ChatHeader>
                <Group justify="space-between" style={{ width: '100%' }}>
                    <Group>
                        <Avatar color="blue" radius="md" variant="filled" style={{ border: '2px solid var(--mantine-color-blue-1)' }}>
                            <IconRobot size={24} />
                        </Avatar>
                        <Box>
                            <Title order={4} style={{ letterSpacing: '-0.5px' }}>{item.title || 'A.I. Assistant'}</Title>
                            <Group gap={6}>
                                <Box w={8} h={8} bg="green.5" style={{ borderRadius: '50%' }} />
                                <Text size="xs" c="dimmed" fw={500}>System Online</Text>
                            </Group>
                        </Box>
                    </Group>

                    <Menu shadow="lg" width={200} position="bottom-end" transitionProps={{ transition: 'pop-top-right' }}>
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray" radius="xl" size="lg">
                                <IconDotsVertical size={20} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Management</Menu.Label>
                            <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />} onClick={open}>
                                Chat Settings
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </ChatHeader>

            {/* Body */}
            <ChatBody>
                <Stack gap="xl" py="md">
                    {sortedMessages.length === 0 && !isLoading && (
                        <Stack align="center" gap="xs" py="xl" opacity={0.6}>
                            <IconRobot size={48} stroke={1.5} />
                            <Text ta="center" size="md">
                                How can I help you manage your workspace today?
                            </Text>
                        </Stack>
                    )}

                    {sortedMessages.map((m) => (
                        <SingleProvider key={m.id} id={m.id} table="messages" schema={messageSchema}>
                            <DashboardMessageBubble
                                onEdit={() => {
                                    setEditingMessageId(m.id)
                                    openEdit()
                                }}
                            />
                        </SingleProvider>
                    ))}

                    {isLoading && (
                        <MessageLayout justify="flex-start">
                            <MessageAvatar radius="xl" color="blue" size="md">
                                <Loader size="xs" type="dots" color="white" />
                            </MessageAvatar>
                            <MessagePaper p="md" radius="lg" bg="gray.0">
                                <Text size="sm" c="dimmed">Analyzing your request...</Text>
                            </MessagePaper>
                        </MessageLayout>
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
            <Modal opened={opened} onClose={close} title="Dashboard Chat Configuration" centered radius="lg">
                <Paper p="xs">
                    <UpdateChat onSuccess={close} />
                </Paper>
            </Modal>

            <Modal opened={editOpened} onClose={closeEdit} title="Edit Message" centered radius="lg">
                <Paper p="xs">
                    {editingMessageId && (
                        <SingleProvider id={editingMessageId} table="messages" schema={messageSchema}>
                            <UpdateMessage onSuccess={closeEdit} />
                        </SingleProvider>
                    )}
                </Paper>
            </Modal>
        </ChatPageLayout>
    )
}
