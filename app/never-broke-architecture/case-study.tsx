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

const gradientText = { from: 'violet', to: 'cyan' }

const stats = [
  ['~10', 'working days, Oct 1–12'],
  ['240', 'commits by the agent'],
  ['19', 'tables, all read and written through one CRUD interface'],
  ['50', 'commits that changed the database schema'],
  ['48', 'commits that changed authorization rules'],
  ['5', 'structural refactors, each done in a day or less'],
]

export function CaseStudy({ markdown }: { markdown: string }) {
  return (
    <Box style={{ backgroundColor: '#0a0a0b', minHeight: '100vh', color: '#f8f9fa', overflowX: 'hidden' }}>
      <Container size="md" pt={40} pb={80}>
        <Anchor href="/" c="dimmed" size="sm">
          <Group gap={6}><FaArrowLeft size={11} /> asasvirtuais.dev</Group>
        </Anchor>

        <Box mt={60} mb={60}>
          <Text size="sm" c="violet" fw={700} tt="uppercase" mb="sm" style={{ letterSpacing: '1px' }}>
            Case study · Guild RPG · October 2026
          </Text>
          <Title order={1} fz={{ base: rem(34), sm: rem(46) }} style={{ lineHeight: 1.1, fontWeight: 900 }} mb="xl">
            Built by an agent. <Text span variant="gradient" gradient={gradientText} inherit>The architecture never broke.</Text>
          </Title>
          <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }} mb="xl">
            Guild RPG is a multiplayer play-by-post role-playing game where an AI runs the game. Claude Code built it from a
            written specification in about ten working days, from a phone. In 240 commits, bugs were rare and quick to find.
            It is live in production. This page shows what made that possible: a framework,{' '}
            <Anchor href="https://github.com/asasvirtuais/asasvirtuais-framework" target="_blank">asasvirtuais</Anchor>, and one
            instructions file, <code>AGENTS.md</code>, that tells any coding agent where each piece of code goes.
          </Text>
          <Group gap="sm">
            <Button component="a" href="https://guildrpg.vercel.app" target="_blank" variant="gradient" gradient={gradientText} radius="md" rightSection={<FaExternalLinkAlt size={11} />}>
              Open Guild RPG
            </Button>
            <Button component="a" href="https://github.com/asasvirtuais/asasvirtuais-framework" target="_blank" variant="default" radius="md" leftSection={<FaGithub size={14} />}>
              asasvirtuais on GitHub
            </Button>
          </Group>
        </Box>

        <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md" mb={80}>
          {stats.map(([value, label]) => (
            <GlassCard key={label} padding="lg">
              <Text fw={900} fz={rem(32)} lh={1} variant="gradient" gradient={gradientText}>{value}</Text>
              <Text size="xs" c="dimmed" mt={6}>{label}</Text>
            </GlassCard>
          ))}
        </SimpleGrid>

        <Typography>
          <ReactMarkdown
            components={{
              h2: ({ children }) => <Title order={2} mt={64} mb="md" fz={rem(30)}>{children}</Title>,
              h3: ({ children }) => <Title order={3} mt={48} mb="sm" fz={rem(21)}>{children}</Title>,
              p: ({ children }) => <Text c="gray.4" mb="md" style={{ lineHeight: 1.75 }}>{children}</Text>,
              li: ({ children }) => <li style={{ color: 'var(--mantine-color-gray-4)', lineHeight: 1.7, marginBottom: 6 }}>{children}</li>,
              strong: ({ children }) => <strong style={{ color: '#f8f9fa' }}>{children}</strong>,
              pre: ({ children }) => (
                <pre
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
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
                  ? <code style={{ background: 'none', padding: 0, color: '#e9ecef' }}>{children}</code>
                  : <code style={{ background: 'rgba(121, 80, 242, 0.15)', color: '#d0bfff', padding: '1px 5px', borderRadius: 4, fontSize: '0.9em' }}>{children}</code>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </Typography>

        <Divider my={80} />

        <Box style={{ textAlign: 'center' }}>
          <Text size="sm" c="violet" fw={700} tt="uppercase" mb="md" style={{ letterSpacing: '1px' }}>The point</Text>
          <Title order={2} fz={{ base: rem(26), sm: rem(34) }} mb="lg" style={{ lineHeight: 1.25 }}>
            I make codebases <Text span variant="gradient" gradient={gradientText} inherit>agent-maintainable</Text>, and
            this case study shows what it accomplished.
          </Title>
          <Text c="dimmed" size="lg" style={{ maxWidth: 680, margin: '0 auto 16px', lineHeight: 1.7 }}>
            A multi-tenant app with guilds, roles and permissions, an AI game master, a card economy and approval
            workflows: 19 tables and 240 commits in about ten working days.
          </Text>
          <Text c="dimmed" size="lg" style={{ maxWidth: 680, margin: '0 auto', lineHeight: 1.7 }}>
            All of it maintained by two things: the framework's intelligent design and machine intelligence. The framework
            decided where every piece of code goes, the agents wrote it, and the architecture{' '}
            <Text span c="white" fw={700} inherit>never broke</Text>.
          </Text>
          <Group justify="center" gap="sm" mt="xl">
            <Button component="a" href="https://linkedin.com/in/asasvirtuais" target="_blank" variant="gradient" gradient={gradientText} radius="md">
              Talk to me on LinkedIn
            </Button>
            <Button component="a" href="/" variant="default" radius="md">
              About me
            </Button>
          </Group>
        </Box>
      </Container>
    </Box>
  )
}
