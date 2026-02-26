'use client'
import { AppShell, Burger, Group, NavLink, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMessage, IconMessageCircle2 } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure()
    const pathname = usePathname()

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Link href='/dashboard'>
                        <Title order={3}>
                            A.I. Dashboard
                        </Title>
                    </Link>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
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
