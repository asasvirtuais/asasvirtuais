'use client'
import { useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '@/packages/message'
import {
    MessageLayout,
    MessageAvatar,
    MessagePaper,
    MessageText,
    MessageMenuOptions,
    MessageFloatingLayout
} from '@/packages/message/layout'
import { Stack, Title, Divider, Text, Alert, Box } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

export function DemoSingleMessageView() {
    const { single, loading } = useSingle('messages', schema)

    if (loading) return <Text>Loading message...</Text>
    if (!single) return (
        <Alert icon={<IconInfoCircle size="1rem" />} title="No message selected" color="blue">
            Select a message from the list or create a new one to see the high-fidelity view.
        </Alert>
    )

    const message = single as Readable
    const isUser = message.Role === 'user'
    const isSystem = message.Role === 'system'

    // Some dummy long text for the floating layout demo
    const longText = "This is a very long message. It needs to be long enough so that you can see how the text wraps around the floated avatar like it does in Character AI and other similar chat interfaces. Float left combined with block display makes text flow naturally around the rectangle. Let's add some more filler text just to make sure it wraps properly. " + (message.Content || '')

    return (
        <Stack gap="xl" p="md">
            <Title order={3}>Composable Building Blocks Demo</Title>

            <Alert color="gray" title="Framework Pattern">
                Instead of passing props (like 'borderless' or 'showAvatar') to a monolithic component, we compose specialized layout blocks.
            </Alert>

            <Divider label="Standard Bubble UI" labelPosition="center" />
            <MessageLayout justify={isUser ? 'flex-end' : 'flex-start'}>
                {!isUser && (
                    <MessageAvatar color={isSystem ? 'gray' : 'teal'} radius="xl">
                        {message.Role?.[0]?.toUpperCase()}
                    </MessageAvatar>
                )}

                <Box style={{ maxWidth: '80%' }}>
                    <MessagePaper
                        bg={isUser ? 'var(--mantine-primary-color-filled)' : isSystem ? 'var(--mantine-color-default-hover)' : 'var(--mantine-color-default)'}
                        withBorder={!isUser && !isSystem}
                        color={isUser ? 'var(--mantine-color-white)' : 'inherit'}
                        radius="lg"
                    >
                        <MessageText>{message.Content}</MessageText>
                        <MessageMenuOptions metadata={message.Metadata} iconColor={isUser ? 'white' : 'gray'} />
                    </MessagePaper>
                    <Text size="xs" color="dimmed" mt={4} ta={isUser ? 'right' : 'left'} px={4}>
                        {message.Role?.charAt(0).toUpperCase() + message.Role?.slice(1)}
                    </Text>
                </Box>

                {isUser && (
                    <MessageAvatar color="blue" radius="xl">U</MessageAvatar>
                )}
            </MessageLayout>

            <Divider label="Borderless UI" labelPosition="center" />
            <MessageLayout justify="flex-start">
                <MessageAvatar color="grape" radius="md">
                    {message.Role?.[0]?.toUpperCase()}
                </MessageAvatar>

                <Box style={{ flex: 1 }}>
                    <MessagePaper bg="transparent" withBorder={false} p={0} radius={0}>
                        <MessageText>{message.Content}</MessageText>
                        <MessageMenuOptions metadata={message.Metadata} />
                    </MessagePaper>
                </Box>
            </MessageLayout>

            <Divider label="Character AI Inspired (Floated Avatar)" labelPosition="center" />
            <Box style={{ border: '1px solid var(--mantine-color-gray-3)', padding: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                <MessageFloatingLayout
                    avatar={
                        <MessageAvatar
                            color="cyan"
                            radius={0}
                            size="xl"
                            style={{
                                height: '80px',
                                width: '80px',
                                marginLeft: '-1rem',
                                marginTop: '-1rem',
                                borderBottomRightRadius: '8px' // slight curve on the inside
                            }}
                        >
                            AI
                        </MessageAvatar>
                    }
                >
                    <Box style={{ display: 'inline' }}>
                        <Text component="span" fw={700} mr="xs">
                            {message.Role?.charAt(0).toUpperCase() + message.Role?.slice(1)} Assistant
                        </Text>
                        <Text component="span" size="sm" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {longText}
                        </Text>
                        <MessageMenuOptions
                            metadata={message.Metadata}
                            style={{ display: 'inline-block', marginLeft: '0.5rem', verticalAlign: 'middle' }}
                        />
                    </Box>
                </MessageFloatingLayout>
            </Box>

            <Divider label="Information System Log" labelPosition="center" />
            <MessageLayout justify="center">
                <MessagePaper bg="var(--mantine-color-gray-1)" withBorder radius="sm" p="xs">
                    <Text size="xs" c="dimmed" fs="italic">
                        {message.Content}
                    </Text>
                    <MessageMenuOptions metadata={message.Metadata} />
                </MessagePaper>
            </MessageLayout>

        </Stack>
    )
}
