'use client'

import {
  Container,
  Title,
  Text,
  Group,
  Button,
  Stack,
  SimpleGrid,
  Card,
  Image,
  Badge,
  Box,
  ThemeIcon,
  Divider,
  Anchor,
  ActionIcon,
  Tooltip,
  Paper,
  BoxProps,
  rem,
} from '@mantine/core'
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaRocket,
  FaTools,
  FaLightbulb,
  FaArrowRight,
  FaExternalLinkAlt,
  FaDatabase,
  FaBrain
} from 'react-icons/fa'
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiMantine,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiVercel,
  SiAirtable,
  SiStripe,
  SiPhp,
  SiPython,
  SiWordpress
} from 'react-icons/si'

const GlassCard = ({ children, padding = 'xl', ...props }: { children: React.ReactNode, padding?: any } & BoxProps) => (
  <Paper
    {...props}
    p={padding}
    style={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 'var(--mantine-radius-lg)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      ...props.style
    }}
  >
    {children}
  </Paper>
)

const SkillBadge = ({ icon: Icon, label, color }: { icon: any, label: string, color: string }) => (
  <Badge
    variant="filled"
    size="lg"
    color={color}
    leftSection={<Icon size={14} />}
    style={{ textTransform: 'none', fontWeight: 500 }}
  >
    {label}
  </Badge>
)

export default function Home() {
  return (
    <Box
      style={{
        backgroundColor: '#0a0a0b',
        minHeight: '100vh',
        color: '#f8f9fa',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Decor */}
      <Box
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(121, 80, 242, 0.15) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(21, 170, 191, 0.1) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <Container size="lg" pt={40} style={{ position: 'relative', zIndex: 1 }}>
        {/* Header/Nav */}
        <Group justify="space-between" >
          <Group gap="xs">
            <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ from: 'violet', to: 'cyan' }}>
              <FaCode size={20} />
            </ThemeIcon>
            <Text fw={800} size="xl" style={{ letterSpacing: '-0.5px' }}>
              asasvirtuais<Text span c="violet" inherit>.dev</Text>
            </Text>
          </Group>
          <Group gap="md">
            <Button
              component="a"
              href="/dashboard"
              variant="subtle"
              color="violet"
              size="sm"
              leftSection={<FaDatabase size={14} />}
            >
              Database Dashboard
            </Button>
            <Tooltip label="GitHub">
              <ActionIcon
                component="a"
                href="https://github.com/asasvirtuais"
                target="_blank"
                variant="subtle"
                color="gray"
                size="lg"
              >
                <FaGithub size={22} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="LinkedIn">
              <ActionIcon
                component="a"
                href="https://linkedin.com/in/asasvirtuais"
                target="_blank"
                variant="subtle"
                color="gray"
                size="lg"
              >
                <FaLinkedin size={22} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* Hero Section */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80} mb={120}>
          <Stack gap={40} justify="center">
            <Box>
              <Badge variant="dot" color="violet" size="lg" mb="sm">Solutions Architect & Full-Stack Developer</Badge>
              <Title
                order={1}
                fz={{ base: rem(42), sm: rem(54), md: rem(64) }}
                style={{
                  lineHeight: 1.1,
                  fontWeight: 900,
                  marginBottom: rem(24)
                }}
              >
                Delivering enterprise software in a <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>fraction of the time.</Text>
              </Title>
              <Text size="xl" c="dimmed" style={{ lineHeight: 1.6 }}>
                I'm Ícaro C. Capobianco, a Full-Stack Web Developer and Solutions Architect with over 7 years of experience.
                I build software that crushes development timelines while drastically reducing maintenance costs. Through highly refined architecture and pragmatic tooling, I deliver what takes teams months, in weeks.
              </Text>
            </Box>

            <Group gap="lg">
              <Button
                size="lg"
                radius="md"
                variant="gradient"
                gradient={{ from: 'violet', to: 'cyan' }}
                rightSection={<FaArrowRight size={16} />}
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                radius="md"
                variant="default"
                leftSection={<FaGithub size={18} />}
                component="a"
                href="https://github.com/asasvirtuais"
                target="_blank"
              >
                Explore Framework
              </Button>
            </Group>
          </Stack>

          <Box style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <Box
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(circle, rgba(121, 80, 242, 0.1) 0%, rgba(0,0,0,0) 70%)',
                zIndex: -1,
              }}
            />
            <Image
              src="/looking-dev.png"
              alt="Ícaro C. Capobianco"
              style={{
                maxWidth: '100%',
                height: 'auto',
                filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))',
              }}
            />
          </Box>
        </SimpleGrid>

        <Divider mb={120} label="My Approach" labelPosition="center" />

        {/* Philosophy Section */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mb={120}>
          <GlassCard>
            <ThemeIcon variant="light" color="violet" size="xl" radius="md" mb="md">
              <FaRocket />
            </ThemeIcon>
            <Text fw={700} size="lg" mb="xs">Rapid Delivery</Text>
            <Text size="sm" c="dimmed">
              By leveraging specialized infrastructure (Airtable, Stripe, Auth0) and my custom frameworks, I build resilient, production-ready systems exponentially faster than traditional development teams, slashing initial build costs.
            </Text>
          </GlassCard>
          <GlassCard>
            <ThemeIcon variant="light" color="cyan" size="xl" radius="md" mb="md">
              <FaTools />
            </ThemeIcon>
            <Text fw={700} size="lg" mb="xs">Near-Zero Maintenance</Text>
            <Text size="sm" c="dimmed">
              Custom code is a liability unless it's business-critical. By coding only the exception and relying on rock-solid architectural patterns, I deliver lean applications that practically maintain themselves, saving countless hours of technical debt.
            </Text>
          </GlassCard>
          <GlassCard>
            <ThemeIcon variant="light" color="pink" size="xl" radius="md" mb="md">
              <FaLightbulb />
            </ThemeIcon>
            <Text fw={700} size="lg" mb="xs">Maximum Velocity</Text>
            <Text size="sm" c="dimmed">
              I focus purely on what gives your project a competitive edge. Skipping reinvented wheels means your product reaches the market faster, iterates quicker, and responds instantly to business needs without being bogged down by legacy bloat.
            </Text>
          </GlassCard>
        </SimpleGrid>

        {/* Featured Project: asasvirtuais */}
        <Box mb={120}>
          <GlassCard padding={0} style={{ overflow: 'hidden' }}>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
              <Box p={40}>
                <Badge color="violet" mb="xs">Open Source</Badge>
                <Title order={2} mb="md">asasvirtuais Framework</Title>
                <Text mb="xl" c="dimmed">
                  My open-source React framework designed to resolve the gap between API integration and state management.
                  Built to eliminate architectural debt for CRUD-driven applications and local-first PWAs.
                </Text>
                <Stack gap="sm">
                  <Group gap="md" wrap="nowrap" align="flex-start">
                    <ThemeIcon size="sm" color="green" variant="light" radius="xl" mt={2} style={{ flexShrink: 0 }}><FaRocket /></ThemeIcon>
                    <Text size="sm" style={{ flex: 1 }}>AI-Friendly: Simple, predictable primitives that LLMs can generate correctly.</Text>
                  </Group>
                  <Group gap="md" wrap="nowrap" align="flex-start">
                    <ThemeIcon size="sm" color="blue" variant="light" radius="xl" mt={2} style={{ flexShrink: 0 }}><FaDatabase /></ThemeIcon>
                    <Text size="sm" style={{ flex: 1 }}>Agnostic Database: Deep integration with IndexedDB for seamless offline apps.</Text>
                  </Group>
                </Stack>
                <Button
                  mt={40}
                  variant="outline"
                  color="violet"
                  component="a"
                  href="https://www.npmjs.com/package/asasvirtuais"
                  target="_blank"
                >
                  View on NPM
                </Button>
              </Box>
              <Box
                style={{
                  background: 'linear-gradient(45deg, #1a1a1b, #2a2a2b)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 300
                }}
              >
                <Stack align="center" gap="xs">
                  <SiReact size={80} color="#61DAFB" style={{ filter: 'drop-shadow(0 0 20px rgba(97, 218, 251, 0.3))' }} />
                  <Text fw={700} size="lg">Simplified State Management</Text>
                </Stack>
              </Box>
            </SimpleGrid>
          </GlassCard>
        </Box>

        {/* Portfolio Section */}
        <Box id="portfolio" mb={120}>
          <Group justify="space-between" mb="xl">
            <Title order={2}>Selected Work</Title>
            <Anchor href="https://upwork.com/fl/icarocc" target="_blank" size="sm" c="violet">View more on UpWork</Anchor>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {/* Project 1: Latham Pools */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 240, background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
                <Image
                  src="/portfolio/latham-estimator/fmhjuy5grhidtvmno4v8.webp"
                  height={240}
                  fit="contain"
                  alt="Latham Estimator"
                />
              </Box>
              <Box p="lg">
                <Group justify="space-between" mb="xs">
                  <Text fw={700}>Latham Pools Lead Qualification</Text>
                  <Badge variant="light">React + GraphQL</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  A frontend lead qualification tool built with React and GraphQL. It reads Airtable bases
                  to guide clients through pool shape and type selection for a major US pool sales company.
                </Text>
                <Group gap="xs">
                  <SiTypescript size={18} />
                  <SiReact size={18} />
                  <SiAirtable size={18} />
                </Group>
              </Box>
            </GlassCard>

            {/* Project 2: Grimoire */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 240, background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
                <Image
                  src="/portfolio/grimoire/cards.png"
                  height={240}
                  fit="contain"
                  alt="Grimoire Interface"
                />
              </Box>
              <Box p="lg">
                <Group justify="space-between" mb="xs">
                  <Text fw={700}>Grimoire RPG Companion</Text>
                  <Badge variant="light">Framework Demo</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  A complex RPG companion app showcasing the abilities of the asasvirtuais framework
                  in handling intricate, local-first state management without the traditional overhead.
                </Text>
                <Group gap="xs">
                  <SiMantine size={18} />
                  <SiTypescript size={18} />
                  <SiReact size={18} />
                </Group>
              </Box>
            </GlassCard>

            {/* Project 3: CertWorld (MLS Platform) */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 240, background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
                <Image
                  src="/portfolio/certworld/courses.png"
                  height={240}
                  fit="contain"
                  alt="CertWorld Platform"
                />
              </Box>
              <Box p="lg">
                <Group justify="space-between" mb="xs">
                  <Text fw={700}>CertWorld CMS & Learning</Text>
                  <Badge variant="light">Full MVP</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  A functional MVP for a machine learning courses platform. Built single-handedly from
                  client discovery to launch, featuring complex onboarding flows and Stripe integration.
                </Text>
                <Group gap="xs">
                  <SiStripe size={18} />
                  <SiNextdotjs size={18} />
                  <SiAirtable size={18} />
                </Group>
              </Box>
            </GlassCard>

            {/* Project 4: Easy AI Diary */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 240, background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
                <Image
                  src="/portfolio/easyaidiarychat/chat.png"
                  height={240}
                  fit="contain"
                  alt="Easy AI Diary Chat"
                  fallbackSrc="https://placehold.co/600x400?text=Easy+AI+Diary"
                />
              </Box>
              <Box p="lg">
                <Group justify="space-between" mb="xs">
                  <Text fw={700}>Easy AI Diary & Chat</Text>
                  <Badge variant="light">PWA + Gemini AI</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  A local-first PWA powered by Gemini AI for automated journal analysis and chat,
                  utilizing IndexedDB for rock-solid offline data persistence.
                </Text>
                <Group gap="xs">
                  <SiMantine size={18} />
                  <FaBrain size={18} />
                  <FaDatabase size={18} />
                </Group>
              </Box>
            </GlassCard>
          </SimpleGrid>
        </Box>

        {/* Tech Stack Section */}
        <Box mb={120}>
          <Title order={2} mb="xl" style={{ textAlign: 'center' }}>Technologies</Title>
          <GlassCard>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
              <Stack gap="xs">
                <Text fw={700} size="sm" c="dimmed" tt="uppercase">Frontend / Core</Text>
                <Group gap="sm">
                  <SkillBadge icon={SiTypescript} label="TypeScript" color="blue" />
                  <SkillBadge icon={SiReact} label="React" color="cyan" />
                  <SkillBadge icon={SiNextdotjs} label="Next.js" color="dark" />
                </Group>
              </Stack>
              <Stack gap="xs">
                <Text fw={700} size="sm" c="dimmed" tt="uppercase">Backend / DB</Text>
                <Group gap="sm">
                  <SkillBadge icon={SiNodedotjs} label="Node.js" color="green" />
                  <SkillBadge icon={SiPostgresql} label="Postgres" color="blue" />
                  <SkillBadge icon={SiMongodb} label="MongoDB" color="green" />
                </Group>
              </Stack>
              <Stack gap="xs">
                <Text fw={700} size="sm" c="dimmed" tt="uppercase">Integration</Text>
                <Group gap="sm">
                  <SkillBadge icon={SiStripe} label="Stripe" color="indigo" />
                  <SkillBadge icon={SiAirtable} label="Airtable" color="blue" />
                  <SkillBadge icon={SiVercel} label="Vercel" color="dark" />
                </Group>
              </Stack>
              <Stack gap="xs">
                <Text fw={700} size="sm" c="dimmed" tt="uppercase">Legacy/Special</Text>
                <Group gap="sm">
                  <SkillBadge icon={SiPython} label="Python" color="yellow" />
                  <SkillBadge icon={SiPhp} label="PHP" color="indigo" />
                  <SkillBadge icon={SiDocker} label="Docker" color="blue" />
                </Group>
              </Stack>
            </SimpleGrid>
          </GlassCard>
        </Box>

        {/* Contact/CTA Section */}
        <Box py={80} style={{ textAlign: 'center' }}>
          <Title order={1} mb="md">Let's accelerate your <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>product.</Text></Title>
          <Text mb={40} c="dimmed" size="lg" style={{ maxWidth: 600, margin: '0 auto 40px' }}>
            Stop waiting months for features that should take weeks. Let's discuss how my high-velocity architectural approach can drastically reduce your development costs and maintenance overhead.
          </Text>
          <Group justify="center" gap="lg">
            <Button
              size="xl"
              radius="md"
              variant="default"
              leftSection={<FaLinkedin />}
              component="a"
              href="https://linkedin.com/in/asasvirtuais"
              target="_blank"
            >
              LinkedIn
            </Button>
          </Group>
        </Box>

        {/* Footer */}
        <Divider mb="xl" />
        <Group justify="space-between" pb="xl">
          <Text size="sm" c="dimmed">© 2026 Ícaro C. Capobianco. All rights reserved.</Text>
          <Group gap="md">
            <Anchor href="https://github.com/asasvirtuais" target="_blank" c="dimmed" size="sm">GitHub</Anchor>
            <Anchor href="https://linkedin.com/in/asasvirtuais" target="_blank" c="dimmed" size="sm">LinkedIn</Anchor>
            <Anchor href="https://upwork.com/fl/icarocc" target="_blank" c="dimmed" size="sm">UpWork</Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  )
}
