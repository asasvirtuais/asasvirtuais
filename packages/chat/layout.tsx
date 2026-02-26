'use client'
import React from 'react'
import { Box, Stack, Group, ScrollArea, TextInput } from '@mantine/core'

/**
 * LEGO Components for the Sub-sections
 */
export function ChatHeader({ children }: { children: React.ReactNode }) {
    return (
        <Group justify="space-between" p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
            {children}
        </Group>
    )
}

export function ChatBody({ children }: { children: React.ReactNode }) {
    return (
        <ScrollArea style={{ flex: 1 }} p="md" offsetScrollbars>
            <Stack gap="md">
                {children}
            </Stack>
        </ScrollArea>
    )
}

export function ChatInput({ children }: { children: React.ReactNode }) {
    return (
        <Stack gap="xs" p="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
            {children}
        </Stack>
    )
}

export function ChatPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box
            h="100%"
            style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--mantine-color-gray-2)',
                borderRadius: 'var(--mantine-radius-md)',
                backgroundColor: 'var(--mantine-color-white)',
                overflow: 'hidden'
            }}
        >
            {children}
        </Box>
    )
}
