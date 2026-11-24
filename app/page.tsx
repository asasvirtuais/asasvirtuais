'use client'

import { Box, Button, Group, Stack, Text, Title, ActionIcon, Tooltip, rem } from '@mantine/core'
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope, FaArrowRight, FaBolt } from 'react-icons/fa6'

import { IntlProvider, Intl, LanguageToggle } from './IntlProvider'
import { ColorSchemeToggle } from '@/components/ui/color-scheme-toggle'
import { Logo } from '@/components/ui/logo'

// Fill these in once the accounts exist. An empty string hides the icon.
const LINKS = {
  framework: 'https://github.com/asasvirtuais/asasvirtuais-framework',
  caseStudy: '/never-broke-architecture',
  fastTrack: 'https://fasttrackbta.us',
  linkedinCompany: '', // ex.: https://www.linkedin.com/company/asasvirtuais
  linkedinPersonal: 'https://www.linkedin.com/in/asasvirtuais',
  x: '', // ex.: https://x.com/asasvirtuais
  email: 'mailto:icaro@asasvirtuais.dev?subject=Consultoria',
}

export default function Home() {
  return (
    <IntlProvider>
      <Landing />
    </IntlProvider>
  )
}

function Landing() {
  const socials = [
    { href: LINKS.linkedinCompany || LINKS.linkedinPersonal, label: 'LinkedIn', icon: <FaLinkedin size={20} /> },
    { href: LINKS.x, label: 'X', icon: <FaXTwitter size={20} /> },
    { href: LINKS.framework, label: 'GitHub', icon: <FaGithub size={20} /> },
    { href: LINKS.email, label: 'E-mail', icon: <FaEnvelope size={20} /> },
  ].filter(s => s.href)

  return (
    <Box
      style={{
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--site-bg)',
        color: 'var(--site-text)',
        backgroundImage: 'radial-gradient(circle at 15% 20%, var(--site-glow-sun), transparent 45%), radial-gradient(circle at 85% 80%, var(--site-glow-sea), transparent 45%)',
      }}
    >
      <Group justify="space-between" px={{ base: 'md', sm: 'xl' }} py="md">
        <Logo h={32} />
        <Group gap="xs">
          <LanguageToggle />
          <ColorSchemeToggle />
        </Group>
      </Group>

      <Stack flex={1} justify="center" align="center" px="md" gap="lg" ta="center">
        <Text tt="uppercase" fw={700} fz="xs" c="var(--site-accent)" style={{ letterSpacing: '0.14em' }}>
          <Intl en="Applied Coding Agents Consulting" pt="Consultoria em Agentes de Código Aplicado" />
        </Text>

        <Title order={1} fz={{ base: rem(34), sm: rem(48), md: rem(60) }} lh={1.08} fw={800} maw={900} style={{ letterSpacing: '-0.025em', fontFamily: 'var(--font-montserrat)' }}>
          <Intl
            en={<>Architecture your coding agents <Text span c="var(--site-accent)" inherit>can't break.</Text></>}
            pt={<>Arquitetura que seus agentes de código <Text span c="var(--site-accent)" inherit>não quebram.</Text></>}
          />
        </Title>

        <Text fz={{ base: 'md', sm: 'lg' }} c="var(--site-text-body)" maw={620} lh={1.6}>
          <Intl
            en="Asas Virtuais builds and consults on the asasvirtuais framework: architectural decisions for feature-driven development, so humans and AI agents ship without piling up technical debt."
            pt="A Asas Virtuais constrói e presta consultoria sobre o asasvirtuais-framework: decisões de arquitetura para desenvolvimento orientado a features, para que humanos e agentes de IA entreguem sem acumular dívida técnica."
          />
        </Text>

        <Group justify="center" gap="sm" mt="xs">
          <Button component="a" href={LINKS.framework} target="_blank" size="md" radius="md" variant="gradient" gradient={{ from: 'var(--site-grad-from)', to: 'var(--site-grad-to)' }} leftSection={<FaGithub />}>
            <Intl en="See the framework" pt="Ver o framework" />
          </Button>
          <Button component="a" href={LINKS.caseStudy} size="md" radius="md" variant="default" rightSection={<FaArrowRight size={14} />}>
            <Intl en="Case study" pt="Case study" />
          </Button>
          <Button component="a" href={LINKS.email} size="md" radius="md" variant="subtle" color="gray">
            <Intl en="Talk to us" pt="Fale com a gente" />
          </Button>
        </Group>

        <Group gap="xs" mt="md">
          {socials.map(s => (
            <Tooltip key={s.label} label={s.label}>
              <ActionIcon component="a" href={s.href} target="_blank" variant="subtle" color="gray" size="xl" radius="xl" aria-label={s.label}>
                {s.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Group>
      </Stack>

      <Group justify="center" py="md" px="md" gap={6}>
        <FaBolt size={12} color="var(--site-accent)" />
        <Text fz="sm" c="var(--site-text-body)">
          <Intl
            en={<>Need it shipped in a week? <a href={LINKS.fastTrack} target="_blank" style={{ color: 'var(--site-accent)' }}>Fast Track BTA</a> delivers with this stack.</>}
            pt={<>Precisa entregue em uma semana? A <a href={LINKS.fastTrack} target="_blank" style={{ color: 'var(--site-accent)' }}>Fast Track BTA</a> entrega com essa stack.</>}
          />
        </Text>
      </Group>
    </Box>
  )
}
