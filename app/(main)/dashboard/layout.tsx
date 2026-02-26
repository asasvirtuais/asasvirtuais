'use client'
import { AppShell, Burger, Group, NavLink, Title, Badge, Button, Text, Space } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMessage, IconMessageCircle2, IconLogin, IconLogout, IconSettings } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure()
    const pathname = usePathname()
    const { user, isLoading } = useUser()

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Link href='/dashboard' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Title order={3}>
                                A.I. Dashboard
                            </Title>
                        </Link>
                    </Group>

                    <Group>
                        {!isLoading && !user && (
                            <Group gap="xs">
                                <Badge color="gray" variant="light">Guest Mode</Badge>
                                <Button
                                    component="a"
                                    href="/auth/login"
                                    size="xs"
                                    variant="outline"
                                    leftSection={<IconLogin size={14} />}
                                >
                                    Sign In
                                </Button>
                            </Group>
                        )}
                        {user && (
                            <Group gap="xs">
                                <Text size="sm" fw={500}>{user.name || user.email}</Text>
                                <Button
                                    component="a"
                                    href="/auth/logout"
                                    size="xs"
                                    variant="subtle"
                                    color="gray"
                                    leftSection={<IconLogout size={14} />}
                                >
                                    Log out
                                </Button>
                            </Group>
                        )}
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb="xs" mt="xs">
                    Main
                </Text>
                <NavLink
                    component={Link}
                    href="/dashboard/settings"
                    label="Settings"
                    leftSection={<IconSettings size={16} stroke={1.5} />}
                    active={pathname === '/dashboard/settings'}
                />

                <Space h="lg" />

                <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb="xs">
                    CRUD
                </Text>
                <NavLink
                    component={Link}
                    href="/dashboard/chats"
                    label="Chats"
                    leftSection={<IconMessageCircle2 size={16} stroke={1.5} />}
                    active={pathname === '/dashboard/chats'}
                />
                <NavLink
                    component={Link}
                    href="/dashboard/messages"
                    label="Messages"
                    leftSection={<IconMessage size={16} stroke={1.5} />}
                    active={pathname === '/dashboard/messages'}
                />
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    )
}
