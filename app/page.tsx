'use client'

import {
  Container,
  Title,
  Text,
  Group,
  Button,
  Stack,
  SimpleGrid,
  Image,
  Badge,
  Box,
  ThemeIcon,
  Divider,
  Anchor,
  ActionIcon,
  Tooltip,
  rem,
  Timeline
} from '@mantine/core'
import {
  FaGithub,
  FaLinkedin,
  FaCode,
  FaArrowRight,
  FaEnvelope,
  FaFileDownload,
  FaExternalLinkAlt
} from 'react-icons/fa'

import { IntlProvider, Intl, LanguageToggle } from './IntlProvider'
import { GlassCard } from '@/components/ui/glass-card'
import { ColorSchemeToggle } from '@/components/ui/color-scheme-toggle'

const CV = {
  en: '/cv/Icaro-Capobianco-CV-EN.pdf',
  pt: '/cv/Icaro-Capobianco-CV-PT.pdf',
}

const gradientText = { from: 'violet', to: 'cyan' }

export default function Home() {
  return (
    <IntlProvider>
      <LandingPage />
    </IntlProvider>
  )
}

function LandingPage() {
  return (
    <Box
      style={{
        backgroundColor: 'var(--site-bg)',
        minHeight: '100vh',
        color: 'var(--site-text)',
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
          background: 'radial-gradient(circle, var(--site-glow-violet) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, var(--site-glow-cyan) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <Container size="lg" pt={40} style={{ position: 'relative', zIndex: 1 }}>
        {/* Header/Nav */}
        <Group justify="space-between" mb={80}>
          <Group gap="xs">
            <ThemeIcon size="xl" radius="md" variant="gradient" gradient={gradientText}>
              <FaCode size={20} />
            </ThemeIcon>
            <Text fw={800} size="xl" style={{ letterSpacing: '-0.5px' }}>
              asasvirtuais<Text span c="violet" inherit>.dev</Text>
            </Text>
          </Group>
          <Group gap="md">
            <LanguageToggle />
            <Intl
              en={<ColorSchemeToggle />}
              pt={<ColorSchemeToggle lightLabel="Modo claro" darkLabel="Modo escuro" />}
            />
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

        {/* ========== HERO ========== */}
        <Box mb={120} mt={60} style={{ maxWidth: 880 }}>
          <Badge variant="dot" color="violet" size="lg" mb="sm">
            <Intl
              en="Ícaro C. Capobianco — Software Engineer · Framework Author"
              pt="Ícaro C. Capobianco — Engenheiro de Software · Autor de Framework"
            />
          </Badge>
          <Title
            order={1}
            fz={{ base: rem(34), sm: rem(44), md: rem(54) }}
            style={{
              lineHeight: 1.1,
              fontWeight: 900,
              marginBottom: rem(32)
            }}
          >
            <Intl
              en={<>I make codebases <Text span variant="gradient" gradient={gradientText} inherit>agent-maintainable.</Text></>}
              pt={<>Eu torno codebases <Text span variant="gradient" gradient={gradientText} inherit>sustentáveis por agentes.</Text></>}
            />
          </Title>
          <Stack gap="xl">
            <Text size="xl" style={{ lineHeight: 1.6, fontWeight: 500 }}>
              <Intl
                en="I created asasvirtuais, an open-source framework of architectural rules for React and TypeScript, and I maintain Guild RPG, a live multiplayer platform a coding agent built on it in ten working days."
                pt="Criei o asasvirtuais, um framework open-source de regras de arquitetura para React e TypeScript, e mantenho o Guild RPG, uma plataforma multiplayer em produção que um agente de código construiu sobre ele em dez dias úteis."
              />
            </Text>
            <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
              <Intl
                en="240 commits, 19 tables, and the architecture never broke. Seven years of remote work for US clients before that."
                pt="240 commits, 19 tabelas, e a arquitetura nunca quebrou. Antes disso, sete anos de trabalho remoto para clientes dos EUA."
              />
            </Text>
            <Group gap="md" mt="md">
              <Button
                size="lg"
                radius="md"
                variant="gradient"
                gradient={gradientText}
                rightSection={<FaArrowRight size={16} />}
                component="a"
                href="/never-broke-architecture"
              >
                <Intl en="Read the case study" pt="Leia o estudo de caso" />
              </Button>
              <Intl
                en={<CVButton href={CV.en} label="Download CV" />}
                pt={<CVButton href={CV.pt} label="Baixar currículo" />}
              />
            </Group>
          </Stack>
        </Box>

        <Divider mb={120} label={<Intl en="Software I maintain" pt="Minha engenharia de software" />} labelPosition="center" />

        {/* ========== SOFTWARE I MAINTAIN ========== */}
        <Box id="software" mb={140}>
          {/* ── Guild RPG ── */}
          <GlassCard padding={0} style={{ overflow: 'hidden', border: '1px solid rgba(121, 80, 242, 0.25)' }} mb="xl">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
              <Box style={{ background: 'var(--site-image-well)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: rem(32) }}>
                <Image src="/software/guild-rpg.png" mah={460} w="auto" fit="contain" alt="Guild RPG: a mission encounter with an AI-drawn scene and player turns" />
              </Box>
              <Box p="xl" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Group gap="sm" mb="xs">
                  <Badge variant="light" color="green"><Intl en="Live in production" pt="Em produção" /></Badge>
                </Group>
                <Text fw={800} size="xl" mb="xs">Guild RPG</Text>
                <Text size="sm" c="dimmed" mb="lg" style={{ lineHeight: 1.7 }}>
                  <Intl
                    en="A multiplayer play-by-post RPG where an AI runs the game: guilds with roles and permissions, AI-drafted characters, a card economy, and missions narrated and illustrated by an AI game master. Built by Claude Code from a written spec, from a phone."
                    pt="Um RPG multiplayer play-by-post em que uma IA conduz o jogo: guildas com cargos e permissões, personagens rascunhados por IA, uma economia de cartas e missões narradas e ilustradas por um mestre de jogo de IA. Construído pelo Claude Code a partir de uma especificação escrita, pelo celular."
                  />
                </Text>
                <SimpleGrid cols={2} spacing="md" mb="lg">
                  <Stat value="~10" label={<Intl en="working days" pt="dias úteis" />} />
                  <Stat value="240" label={<Intl en="commits by the agent" pt="commits do agente" />} />
                  <Stat value="19" label={<Intl en="tables, one CRUD interface" pt="tabelas, uma interface CRUD" />} />
                  <Stat value="5" label={<Intl en="big refactors, a day or less each" pt="grandes refatorações, um dia ou menos cada" />} />
                </SimpleGrid>
                <Group gap="sm">
                  <Button component="a" href="/never-broke-architecture" variant="gradient" gradient={gradientText} radius="md" rightSection={<FaArrowRight size={12} />}>
                    <Intl en="Case study" pt="Estudo de caso" />
                  </Button>
                  <Button component="a" href="https://guildrpg.vercel.app" target="_blank" variant="default" radius="md" rightSection={<FaExternalLinkAlt size={11} />}>
                    <Intl en="Open Guild RPG" pt="Abrir o Guild RPG" />
                  </Button>
                </Group>
              </Box>
            </SimpleGrid>
          </GlassCard>

          {/* ── asasvirtuais framework ── */}
          <GlassCard>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              <Box>
                <Group gap="sm" mb="xs">
                  <Badge variant="light" color="gray">Open source</Badge>
                </Group>
                <Text fw={800} size="xl" mb="xs">asasvirtuais framework</Text>
                <Text size="sm" c="dimmed" mb="lg" style={{ lineHeight: 1.7 }}>
                  <Intl
                    en="A set of architectural decisions for React and TypeScript apps, plus an AGENTS.md that tells any coding agent where each piece of code goes. It decides how data, forms and permissions are written, so the only questions left are about the product."
                    pt="Um conjunto de decisões de arquitetura para apps React e TypeScript, mais um AGENTS.md que diz a qualquer agente de código onde cada parte do código vai. Ele decide como dados, formulários e permissões são escritos, então as únicas perguntas que sobram são sobre o produto."
                  />
                </Text>
                <Group gap="xs" mb="lg">
                  {['TypeScript', 'React', 'Next.js', 'Zod', 'REST', 'IndexedDB', 'Airtable', 'Prisma'].map((tag) => (
                    <Badge key={tag} size="sm" variant="outline" color="gray">{tag}</Badge>
                  ))}
                </Group>
                <Button component="a" href="https://github.com/asasvirtuais/asasvirtuais-framework" target="_blank" variant="default" radius="md" leftSection={<FaGithub size={14} />}>
                  <Intl en="View on GitHub" pt="Ver no GitHub" />
                </Button>
              </Box>
              <Stack gap="md">
                <Rule
                  title={<Intl en="One CRUD interface" pt="Uma interface CRUD" />}
                  text={<Intl en="find, list, create, update, remove — each call routed to the middleware of its table. Any other table is refused." pt="find, list, create, update, remove — cada chamada vai para o middleware da sua tabela. Qualquer outra tabela é recusada." />}
                />
                <Rule
                  title={<Intl en="One schema per table" pt="Um schema por tabela" />}
                  text={<Intl en="A zod schema is the type, the validation and the form fields. Change a column and every use updates." pt="Um schema zod é o tipo, a validação e os campos do formulário. Mude uma coluna e todo uso se atualiza." />}
                />
                <Rule
                  title={<Intl en="Permissions grouped by table" pt="Permissões agrupadas por tabela" />}
                  text={<Intl en="Every rule for a table lives in its own middleware. Security review means reading one file per table." pt="Toda regra de uma tabela vive no seu próprio middleware. Revisar segurança é ler um arquivo por tabela." />}
                />
                <Rule
                  title={<Intl en="Forms that never go stale" pt="Formulários que nunca ficam desatualizados" />}
                  text={<Intl en="Saves go into a shared index of rows, so every component showing that table updates on its own." pt="Cada save vai para um índice compartilhado de linhas, então todo componente daquela tabela se atualiza sozinho." />}
                />
              </Stack>
            </SimpleGrid>
          </GlassCard>
        </Box>

        <Divider mb={120} label={<Intl en="Why it matters" pt="Por que importa" />} labelPosition="center" />

        {/* ========== WHY IT MATTERS ========== */}
        <Box mb={140} style={{ maxWidth: 800 }}>
          <Stack gap={80}>
            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Agents don't remember. The codebase has to." pt="Agentes não lembram. O código precisa lembrar." />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="Every agent session starts with no memory of the last one. When the architecture already decides where code goes, each session still puts it in the same place, and the codebase doesn't drift into five ways of doing one thing."
                  pt="Cada sessão de um agente começa sem lembrar da anterior. Quando a arquitetura já decide onde o código vai, cada sessão o coloca no mesmo lugar, e o código não se espalha em cinco jeitos de fazer a mesma coisa."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Big changes take a day or less" pt="Grandes mudanças levam um dia ou menos" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="In Guild RPG, authorization moved into per-table middleware, every page switched to server-side fetching, and the economy's core tables were split with a data migration. Each took a day or less, while new features kept shipping."
                  pt="No Guild RPG, a autorização foi movida para middlewares por tabela, todas as páginas passaram a buscar dados no servidor e as tabelas centrais da economia foram divididas com migração de dados. Cada mudança levou um dia ou menos, enquanto novas funcionalidades continuavam saindo."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Bugs have an address" pt="Bugs têm endereço" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="A table's rules are in its middleware, its shape in its schema, its writes in its forms. When something breaks, it's obvious which file to open."
                  pt="As regras de uma tabela estão no seu middleware, o formato no seu schema, as escritas nos seus formulários. Quando algo quebra, fica óbvio qual arquivo abrir."
                />
              </Text>
            </Box>
          </Stack>
        </Box>

        <Divider mb={120} label={<Intl en="Career" pt="Carreira" />} labelPosition="center" />

        {/* ========== CAREER ========== */}
        <Box mb={140} style={{ maxWidth: 800 }}>
          <Timeline active={0} bulletSize={14} lineWidth={2} color="violet">
            <Timeline.Item title={<Intl en="asasvirtuais & Guild RPG" pt="asasvirtuais e Guild RPG" />}>
              <Text c="dimmed" size="xs" mb={4}>2025 — <Intl en="present" pt="atual" /></Text>
              <Text size="sm" c="dimmed">
                <Intl
                  en="Created the asasvirtuais open-source framework for agent-maintainable React and TypeScript codebases. Maintain Guild RPG, a live multiplayer platform built on it."
                  pt="Criei o asasvirtuais, framework open-source para codebases React e TypeScript sustentáveis por agentes. Mantenho o Guild RPG, uma plataforma multiplayer em produção construída sobre ele."
                />
              </Text>
            </Timeline.Item>
            <Timeline.Item title={<Intl en="Senior Full-Stack Engineer — Startup Labs" pt="Engenheiro Full-Stack Sênior — Startup Labs" />}>
              <Text c="dimmed" size="xs" mb={4}><Intl en="Jul 2026 — present" pt="Jul 2026 — atual" /></Text>
              <Text size="sm" c="dimmed">
                <Intl
                  en="Architecture and development for early-stage B2B SaaS products in Next.js, React and TypeScript."
                  pt="Arquitetura e desenvolvimento de produtos B2B SaaS em estágio inicial com Next.js, React e TypeScript."
                />
              </Text>
            </Timeline.Item>
            <Timeline.Item title={<Intl en="Freelance Full-Stack Engineer" pt="Engenheiro Full-Stack Freelancer" />}>
              <Text c="dimmed" size="xs" mb={4}>2024 — 2025</Text>
              <Text size="sm" c="dimmed">
                <Intl
                  en="CertWorld, an online courses platform, as the sole engineer from spec to production. Top Rated on Upwork with 5,000+ tracked hours."
                  pt="CertWorld, uma plataforma de cursos online, como único engenheiro da especificação à produção. Top Rated no Upwork com mais de 5.000 horas registradas."
                />
              </Text>
            </Timeline.Item>
            <Timeline.Item title={<Intl en="Web Developer — The Get Smart Group (US)" pt="Desenvolvedor Web — The Get Smart Group (EUA)" />}>
              <Text c="dimmed" size="xs" mb={4}>2020 — 2023</Text>
              <Text size="sm" c="dimmed">
                <Intl
                  en="Led the migration from PHP/jQuery to React and TypeScript. Built the Latham Pools lead-qualification tool and dozens of plugins behind six-figure client revenue."
                  pt="Liderei a migração de PHP/jQuery para React e TypeScript. Construí a ferramenta de qualificação de leads da Latham Pools e dezenas de plugins por trás de receita de seis dígitos para clientes."
                />
              </Text>
            </Timeline.Item>
            <Timeline.Item title={<Intl en="Developer Advocate — SDK Co (US)" pt="Developer Advocate — SDK Co (EUA)" />}>
              <Text c="dimmed" size="xs" mb={4}>2021 — 2022</Text>
              <Text size="sm" c="dimmed">
                <Intl
                  en="Technical documentation, developer onboarding and blockchain integration research."
                  pt="Documentação técnica, onboarding de desenvolvedores e pesquisa de integrações blockchain."
                />
              </Text>
            </Timeline.Item>
            <Timeline.Item title={<Intl en="Web Developer — Expert Ready (US)" pt="Desenvolvedor Web — Expert Ready (EUA)" />}>
              <Text c="dimmed" size="xs" mb={4}>2019 — 2020</Text>
              <Text size="sm" c="dimmed">
                <Intl en="WordPress themes and PHP plugins." pt="Temas WordPress e plugins PHP." />
              </Text>
            </Timeline.Item>
          </Timeline>
        </Box>

        {/* ========== CONTACT ========== */}
        <Box id="contact" py={80} style={{ textAlign: 'center' }}>
          <Title order={1} mb="md" fz={{ base: rem(32), sm: rem(42) }}>
            <Intl
              en={<>Want a codebase <Text span variant="gradient" gradient={gradientText} inherit>agents can't break?</Text></>}
              pt={<>Quer um código que <Text span variant="gradient" gradient={gradientText} inherit>agentes não quebram?</Text></>}
            />
          </Title>
          <Text mb={40} c="dimmed" size="lg" style={{ maxWidth: 650, margin: '0 auto 40px' }}>
            <Intl
              en="Let's talk about your team, your product, or the framework."
              pt="Vamos conversar sobre o seu time, o seu produto ou o framework."
            />
          </Text>
          <Stack align="center" gap="md">
            <Group justify="center" gap="lg">
              <Button
                size="xl"
                radius="md"
                variant="gradient"
                gradient={gradientText}
                leftSection={<FaLinkedin size={20} />}
                component="a"
                href="https://linkedin.com/in/asasvirtuais"
                target="_blank"
              >
                LinkedIn
              </Button>
              <Button
                size="xl"
                radius="md"
                variant="default"
                leftSection={<FaGithub size={20} />}
                component="a"
                href="https://github.com/asasvirtuais"
                target="_blank"
              >
                GitHub
              </Button>
            </Group>
            <Anchor href="mailto:icaro@asasvirtuais.dev" c="dimmed" size="sm">
              <Group gap={6} justify="center"><FaEnvelope size={12} /> icaro@asasvirtuais.dev</Group>
            </Anchor>
          </Stack>
        </Box>

        {/* Footer */}
        <Divider mb="xl" />
        <Group justify="space-between" pb="xl">
          <Text size="sm" c="dimmed">
            © 2026 Ícaro C. Capobianco. <Intl en="Code that works." pt="Código que funciona." />
          </Text>
          <Group gap="md">
            <Anchor href="https://github.com/asasvirtuais" target="_blank" c="dimmed" size="sm">GitHub</Anchor>
            <Anchor href="https://linkedin.com/in/asasvirtuais" target="_blank" c="dimmed" size="sm">LinkedIn</Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  )
}

function CVButton({ href, label }: { href: string, label: string }) {
  return (
    <Button size="lg" radius="md" variant="default" leftSection={<FaFileDownload size={16} />} component="a" href={href} target="_blank">
      {label}
    </Button>
  )
}

function Stat({ value, label }: { value: string, label: React.ReactNode }) {
  return (
    <Box>
      <Text fw={900} fz={rem(28)} lh={1} variant="gradient" gradient={gradientText}>{value}</Text>
      <Text size="xs" c="dimmed" mt={4}>{label}</Text>
    </Box>
  )
}

function Rule({ title, text }: { title: React.ReactNode, text: React.ReactNode }) {
  return (
    <Box style={{ borderLeft: '2px solid rgba(121, 80, 242, 0.5)', paddingLeft: rem(16) }}>
      <Text fw={700} size="sm" mb={4}>{title}</Text>
      <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>{text}</Text>
    </Box>
  )
}
