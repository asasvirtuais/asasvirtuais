'use client'

import {
  Container,
  Title,
  Text,
  Group,
  Button,
  SimpleGrid,
  Box,
  Anchor,
  Divider,
  Typography,
  rem
} from '@mantine/core'
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

import { GlassCard } from '@/components/ui/glass-card'
import { ColorSchemeToggle } from '@/components/ui/color-scheme-toggle'
import { Logo } from '@/components/ui/logo'

const stats = [
  ['240', 'commits by a coding agent on a single, unchanging architectural pattern'],
  ['19', 'database tables, all read and written through one unified CRUD interface'],
  ['50', 'commits that altered or migrated the database schema without breaking types'],
  ['48', 'commits that evolved role-based authorization rules inside isolated table middlewares'],
  ['5', 'full-codebase structural refactors, each completed in a day or less'],
  ['0', 'times the architecture broke'],
]

const links = (
  <Group gap="sm">
    <Button component="a" href="https://github.com/asasvirtuais/asasvirtuais-framework" target="_blank" radius="md" leftSection={<FaGithub size={14} />}>
      asasvirtuais on GitHub
    </Button>
    <Button component="a" href="https://guildrpg.vercel.app" target="_blank" variant="default" radius="md" rightSection={<FaExternalLinkAlt size={11} />}>
      Open Guild RPG
    </Button>
  </Group>
)

export function CaseStudy({ markdown }: { markdown: string }) {
  return (
    <Box style={{ backgroundColor: 'var(--site-bg)', minHeight: '100vh', color: 'var(--site-text)', overflowX: 'hidden' }}>
      <Container size="md" pt={40} pb={80}>
        <Group justify="space-between">
          <Anchor href="/" c="dimmed" size="sm">
            <Group gap="sm"><FaArrowLeft size={11} /> <Logo h={26} /></Group>
          </Anchor>
          <ColorSchemeToggle />
        </Group>

        <Box mt={60} mb={60}>
          <Text size="sm" c="var(--site-accent)" fw={700} tt="uppercase" mb="sm" style={{ letterSpacing: '1px' }}>
            Case Study · asasvirtuais
          </Text>
          <Title order={1} fz={{ base: rem(34), sm: rem(46) }} style={{ lineHeight: 1.1, fontWeight: 900 }} mb="xl">
            Never Broke <Text span c="var(--site-accent)" inherit>Architecture</Text>
          </Title>
          <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }} mb="md">
            asasvirtuais is a framework of architectural decisions for feature-driven development. It locks down how forms,
            server actions, state, and database operations connect so that every feature is built the same way—whether by a
            human developer or a coding agent.
          </Text>
          <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }} mb="xl">
            To test it at scale, an autonomous coding agent built Guild RPG—a live, multi-tenant production platform—strictly
            within the framework's rules across 240 commits. The architecture never broke, feature velocity never slowed down,
            and structural tech debt remained practically zero.
          </Text>
          {links}
        </Box>

        <Title order={2} mb="md" fz={rem(30)}>Results</Title>
        <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md" mb={80}>
          {stats.map(([value, label]) => (
            <GlassCard key={label} padding="lg">
              <Text fw={900} fz={rem(32)} lh={1} c="var(--site-accent)">{value}</Text>
              <Text size="xs" c="dimmed" mt={6}>{label}</Text>
            </GlassCard>
          ))}
        </SimpleGrid>

        <Typography>
          <ReactMarkdown
            components={{
              h2: ({ children }) => <Title order={2} mt={64} mb="md" fz={rem(30)}>{children}</Title>,
              h3: ({ children }) => <Title order={3} mt={48} mb="sm" fz={rem(21)}>{children}</Title>,
              p: ({ children }) => <Text c="var(--site-text-body)" mb="md" style={{ lineHeight: 1.75 }}>{children}</Text>,
              li: ({ children }) => <li style={{ color: 'var(--site-text-body)', lineHeight: 1.7, marginBottom: 6 }}>{children}</li>,
              strong: ({ children }) => <strong style={{ color: 'var(--site-text)' }}>{children}</strong>,
              pre: ({ children }) => (
                <pre
                  style={{
                    background: 'var(--site-surface-code)',
                    border: '1px solid var(--site-border)',
                    borderRadius: 'var(--mantine-radius-md)',
                    padding: rem(16),
                    overflowX: 'auto',
                    fontSize: rem(13),
                    lineHeight: 1.55,
                    marginBottom: rem(24),
                  }}
                >
                  {children}
                </pre>
              ),
              code: ({ children, className }) => (
                className
                  ? <code style={{ background: 'none', padding: 0, color: 'var(--site-code-text)' }}>{children}</code>
                  : <code style={{ background: 'var(--site-inline-code-bg)', color: 'var(--site-inline-code-text)', padding: '1px 5px', borderRadius: 4, fontSize: '0.9em' }}>{children}</code>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </Typography>

        <Divider my={80} />

        <Box>
          <Text size="sm" c="var(--site-accent)" fw={700} tt="uppercase" mb="md" style={{ letterSpacing: '1px' }}>The framework</Text>
          <Title order={2} fz={{ base: rem(26), sm: rem(34) }} mb="lg" style={{ lineHeight: 1.25 }}>
            asasvirtuais
          </Title>
          <Text c="dimmed" size="lg" style={{ marginBottom: 16, lineHeight: 1.7 }}>
            Most stacks leave the same architectural questions open on every feature: where client state lives, how a form
            reaches the server, how lists refresh after a write, and where permission checks sit. Developers and coding agents
            end up solving those problems over and over, accumulating boilerplate and architectural drift with every commit.
          </Text>
          <Text c="dimmed" size="lg" style={{ marginBottom: 16, lineHeight: 1.7 }}>
            asasvirtuais answers those questions once at the root. Forms bind directly to server actions, server actions route
            through domain middleware to database operations, and mutations automatically update a shared reactive index on
            the client.
          </Text>
          <Text c="dimmed" size="lg" style={{ lineHeight: 1.7 }} mb="xl">
            Whether used by human engineers or autonomous coding agents, the result is the same: continuous, non-frictional
            feature delivery where the codebase never wears out and structural tech debt stays at{' '}
            <Text span c="var(--site-text-strong)" fw={700} inherit>practically zero</Text>.
          </Text>
          {links}
        </Box>
      </Container>
    </Box>
  )
}
