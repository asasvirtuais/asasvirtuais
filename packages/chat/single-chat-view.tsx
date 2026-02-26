'use client'
import React from 'react'
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
    IconRobot
} from '@tabler/icons-react'
import ReactMarkdown from 'react-markdown'
import { UpdateChat } from '@/packages/chat/forms'

/**
 * Message Bubble component for Demo
 */
function MessageBubble({ role, content }: { role: 'user' | 'assistant', content: string }) {
    const isAssistant = role === 'assistant'
    return (
        <Group align="flex-start" justify={isAssistant ? 'flex-start' : 'flex-end'} wrap="nowrap" gap="sm">
            {isAssistant && <Avatar radius="xl" color="blue"><IconRobot size={20} /></Avatar>}
            <Paper
                p="sm"
                radius="md"
                withBorder={isAssistant}
                bg={isAssistant ? 'gray.0' : 'blue.6'}
                c={isAssistant ? 'black' : 'white'}
                style={{ maxWidth: '80%' }}
            >
                <ReactMarkdown>{content}</ReactMarkdown>
            </Paper>
            {!isAssistant && <Avatar radius="xl" src={null} />}
        </Group>
    )
}

export default function SingleChatView() {
    const { single, id } = useSingle('Chats', schema)
    const item = single as Readable
    const [opened, { open, close }] = useDisclosure(false)

    if (!item) return <Text c="dimmed" ta="center" py="xl">Persona not found.</Text>

    return (
        <ChatPageLayout>
            {/* Header: Title + Settings */}
            <ChatHeader>
                <Box style={{ flex: 1 }}>
                    <UpdateForm table="Chats" schema={schema} id={id} defaults={{ title: item.title || '' }}>
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

            {/* Body: Instructions + Demo Messages */}
            <ChatBody>
                {/* System Instructions Section */}
                {item.instructions && (
                    <Paper withBorder p="sm" radius="md" bg="gray.1" mb="md" style={{ borderStyle: 'dashed' }}>
                        <Text size="xs" fw={700} c="dimmed" mb={4} tt="uppercase">System Context</Text>
                        <Box style={{ fontSize: 'var(--mantine-font-size-sm)' }}>
                            <ReactMarkdown>{item.instructions}</ReactMarkdown>
                        </Box>
                    </Paper>
                )}

                {/* Long Demo Message Thread to demonstrate scroll */}
                <Stack gap="lg">
                    <MessageBubble
                        role="assistant"
                        content={`Hello! I am **${item.title || 'the AI'}**. How can I help you today?`}
                    />
                    <MessageBubble
                        role="user"
                        content="Can you explain the difference between local-first and cloud-only architectures?"
                    />
                    <MessageBubble
                        role="assistant"
                        content="Local-first software combines the best of both worlds: the availability and performance of local apps with the collaboration features of cloud apps. Data is stored on your device first, then synced."
                    />
                    <MessageBubble
                        role="user"
                        content="Tell me more about the technical challenges of synchronization."
                    />
                    <MessageBubble
                        role="assistant"
                        content="Synchronization often involves Conflict-free Replicated Data Types (CRDTs) to ensure convergence across different devices without requiring a central authority to resolve every edit. It's complex but provides a superior user experience."
                    />
                    <MessageBubble
                        role="user"
                        content="How does this framework handle that?"
                    />
                    <MessageBubble
                        role="assistant"
                        content="The `asasvirtuais` framework simplifies this by providing robust IndexedDB primitives and agnostic database interfaces, allowing you to build reactive local-first apps with minimal boilerplate."
                    />
                    <MessageBubble
                        role="user"
                        content="This looks great. Let's start building a demo app!"
                    />
                    <MessageBubble
                        role="assistant"
                        content="Excellent! We've already set up the basic layout. What should be the first feature we implement?"
                    />
                </Stack>
            </ChatBody>

            {/* Input: Simple Textarea + Quick Actions */}
            <ChatInput>
                <Group gap="xs">
                    <Button variant="light" size="compact-xs" color="gray" radius="xl">Sync Strategy</Button>
                    <Button variant="light" size="compact-xs" color="gray" radius="xl">Storage Limits</Button>
                </Group>

                <Group align="flex-end" gap="sm">
                    <ActionIcon variant="light" size="lg" radius="md">
                        <IconPlus size={20} />
                    </ActionIcon>
                    <Textarea
                        placeholder="Type a message..."
                        style={{ flex: 1 }}
                        autosize
                        minRows={1}
                        variant="filled"
                    />
                    <ActionIcon variant="filled" size="lg" radius="md" color="blue">
                        <IconSend size={20} />
                    </ActionIcon>
                </Group>
            </ChatInput>

            <Modal opened={opened} onClose={close} title="Edit Persona" centered>
                <UpdateChat onSuccess={close} />
            </Modal>
        </ChatPageLayout>
    )
}
