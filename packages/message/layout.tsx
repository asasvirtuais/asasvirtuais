'use client'
import React from 'react'
import {
    Group,
    Box,
    Paper,
    Avatar,
    ActionIcon,
    Menu,
    Modal,
    Code,
    rem,
    Text,
    GroupProps,
    AvatarProps,
    PaperProps,
    TextProps,
    BoxProps
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDotsVertical, IconTrash, IconPencil, IconInfoCircle } from '@tabler/icons-react'

// Layout Blocks for Messages

export function MessageLayout({
    children,
    justify = 'flex-start',
    align = 'flex-start',
    gap = 'xs',
    mb = 'md',
    wrap = 'nowrap',
    ...props
}: GroupProps) {
    return (
        <Group align={align} gap={gap} mb={mb} wrap={wrap} justify={justify} {...props}>
            {children}
        </Group>
    )
}

export function MessageAvatar({
    children,
    radius = 'xl',
    size = 'md',
    ...props
}: AvatarProps) {
    return (
        <Avatar radius={radius} size={size} {...props}>
            {children}
        </Avatar>
    )
}

export function MessagePaper({
    children,
    p = 'sm',
    radius = 'lg',
    color = 'inherit',
    style,
    ...props
}: PaperProps & { color?: string, children?: React.ReactNode }) {
    return (
        <Paper
            p={p}
            radius={radius}
            style={{ position: 'relative', color, ...style }}
            {...props}
        >
            <Group justify="space-between" align="flex-start" wrap="nowrap" gap="xs">
                {children}
            </Group>
        </Paper>
    )
}

export function MessageText({
    children,
    size = 'sm',
    style,
    ...props
}: TextProps & { children?: React.ReactNode }) {
    return (
        <Text size={size} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', flex: 1, ...style }} {...props}>
            {children}
        </Text>
    )
}

/**
 * A specialized container where text flows/wraps around a floated avatar.
 */
export function MessageFloatingLayout({
    children,
    avatar,
    mb = 'md',
    style,
    ...props
}: BoxProps & { avatar: React.ReactNode, children?: React.ReactNode }) {
    return (
        <Box style={{ display: 'flow-root', ...style }} mb={mb} {...props}>
            <Box style={{ float: 'left', marginRight: '1rem', marginBottom: '0.25rem' }}>
                {avatar}
            </Box>
            <Box style={{ display: 'inline', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {children}
            </Box>
        </Box>
    )
}

export interface MessageMenuOptionsProps extends BoxProps {
    onEdit?: () => void
    onDelete?: () => void
    metadata?: any
    iconColor?: string
}

export function MessageMenuOptions({
    onEdit,
    onDelete,
    metadata,
    iconColor = 'gray',
    ...props
}: MessageMenuOptionsProps) {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <Box {...props}>
            <Menu position="bottom-end" withinPortal shadow="md">
                <Menu.Target>
                    <ActionIcon variant="subtle" color={iconColor} size="sm">
                        <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Options</Menu.Label>
                    {onEdit && (
                        <Menu.Item
                            leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                            onClick={onEdit}
                        >
                            Edit
                        </Menu.Item>
                    )}
                    <Menu.Item
                        leftSection={<IconInfoCircle style={{ width: rem(14), height: rem(14) }} />}
                        onClick={open}
                    >
                        Info (Debug)
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                        color="red"
                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                        onClick={onDelete}
                    >
                        Delete
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

            <Modal opened={opened} onClose={close} title="Message Debug Info" size="lg">
                <Code block>{JSON.stringify(metadata || { no: 'metadata' }, null, 2)}</Code>
            </Modal>
        </Box>
    )
}
