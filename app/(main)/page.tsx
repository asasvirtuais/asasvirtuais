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
  Paper,
  BoxProps,
  rem,
  List
} from '@mantine/core'
import {
  FaGithub,
  FaLinkedin,
  FaCode,
  FaRocket,
  FaTools,
  FaLightbulb,
  FaArrowRight,
  FaDatabase,
  FaCheckCircle,
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
  SiPython
} from 'react-icons/si'

import { IntlProvider, Intl, LanguageToggle } from './IntlProvider'

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
    <IntlProvider>
      <LandingPage />
    </IntlProvider>
  )
}

function LandingPage() {
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
            <LanguageToggle />
            <Button
              component="a"
              href="/dashboard"
              variant="subtle"
              color="violet"
              size="sm"
              leftSection={<FaDatabase size={14} />}
            >
              <Intl en="Database Dashboard" pt="Dashboard de Base de Dados" />
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
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80} mb={120} mt={60}>
          <Stack gap={40} justify="center">
            <Box>
              <Badge variant="dot" color="violet" size="lg" mb="sm">
                <Intl en="Solutions Architect & Full-Stack Developer" pt="Arquiteto de Soluções & Desenvolvedor Full-Stack" />
              </Badge>
              <Title
                order={1}
                fz={{ base: rem(42), sm: rem(54), md: rem(64) }}
                style={{
                  lineHeight: 1.1,
                  fontWeight: 900,
                  marginBottom: rem(24)
                }}
              >
                <Intl
                  en={<>Delivering enterprise software in a <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>fraction of the time.</Text></>}
                  pt={<>Entregando software de ponta em uma <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>fração do tempo.</Text></>}
                />
              </Title>
              <Text size="xl" c="dimmed" style={{ lineHeight: 1.6 }}>
                <Intl
                  en="I'm Ícaro C. Capobianco, a Full-Stack Web Developer and Solutions Architect with over 7 years of experience. I build software that crushes development timelines while drastically reducing maintenance costs. Through highly refined architecture and pragmatic tooling, I deliver what takes teams months, in weeks."
                  pt="Sou Ícaro C. Capobianco, Desenvolvedor Full-Stack e Arquiteto de Soluções com mais de 7 anos de experiência. Eu construo sistemas que quebram prazos de desenvolvimento enquanto reduzem drasticamente custos de manutenção. Com arquitetura refinada, entrego em dias o que equipes levam meses para construir."
                />
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
                <Intl en="View My Work" pt="Ver Meu Trabalho" />
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
                <Intl en="Explore Framework" pt="Explorar Framework" />
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

        <Divider mb={120} label={<Intl en="My Approach" pt="Minha Abordagem" />} labelPosition="center" />

        {/* Philosophy Section */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mb={120}>
          <GlassCard>
            <ThemeIcon variant="light" color="violet" size="xl" radius="md" mb="md">
              <FaRocket />
            </ThemeIcon>
            <Text fw={700} size="lg" mb="xs"><Intl en="Rapid Delivery" pt="Entrega Rápida" /></Text>
            <Text size="sm" c="dimmed">
              <Intl
                en="By leveraging specialized infrastructure (Airtable, Stripe, Auth0) and my custom frameworks, I build resilient, production-ready systems exponentially faster than traditional development teams, slashing initial build costs."
                pt="Utilizando infraestrutura especializada (Airtable, Stripe, Auth0) e meus próprios frameworks, construo sistemas resilientes e prontos para produção exponencialmente mais rápido do que times tradicionais."
              />
            </Text>
          </GlassCard>
          <GlassCard>
            <ThemeIcon variant="light" color="cyan" size="xl" radius="md" mb="md">
              <FaTools />
            </ThemeIcon>
            <Text fw={700} size="lg" mb="xs"><Intl en="Near-Zero Maintenance" pt="Manutenção Quase Zero" /></Text>
            <Text size="sm" c="dimmed">
              <Intl
                en="Custom code is a liability unless it's business-critical. By coding only the exception and relying on rock-solid architectural patterns, I deliver lean applications that practically maintain themselves, saving countless hours of technical debt."
                pt="Código customizado é um passivo a menos que seja crítico para o negócio. Desenvolvendo apenas a exceção e contando com padrões sólidos, entrego apps enxutos que praticamente se mantêm sozinhos."
              />
            </Text>
          </GlassCard>
          <GlassCard>
            <ThemeIcon variant="light" color="pink" size="xl" radius="md" mb="md">
              <FaLightbulb />
            </ThemeIcon>
            <Text fw={700} size="lg" mb="xs"><Intl en="Maximum Velocity" pt="Velocidade Máxima" /></Text>
            <Text size="sm" c="dimmed">
              <Intl
                en="I focus purely on what gives your project a competitive edge. Skipping reinvented wheels means your product reaches the market faster, iterates quicker, and responds instantly to business needs without being bogged down by legacy bloat."
                pt="Foco apenas no que dá vantagem competitiva ao seu projeto. Não reinventar a roda significa que sua ideia atinge o mercado antes, itera mais rápido e responde instantaneamente às necessidades do negócio."
              />
            </Text>
          </GlassCard>
        </SimpleGrid>

        {/* Value Proposition Highlight */}
        <Box mb={120}>
          <GlassCard padding={{ base: 'xl', md: 60 }} style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(121, 80, 242, 0.1) 0%, rgba(21, 170, 191, 0.1) 100%)', border: '1px solid rgba(121, 80, 242, 0.2)' }}>
            <Title order={2} mb="md" fz={{ base: rem(28), sm: rem(36) }} style={{ lineHeight: 1.3 }}>
              <Intl
                en={<>If your business pivots next week, <Box component="br" display={{ base: 'none', md: 'block' }} /> <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>your app adapts in days not weeks.</Text></>}
                pt={<>Se o seu negócio mudar semana que vem,<Box component="br" display={{ base: 'none', md: 'block' }} /> <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>o app muda em 10 minutos.</Text></>}
              />
            </Title>
            <Text size="xl" c="dimmed" style={{ maxWidth: 800, margin: '0 auto' }}>
              <Intl
                en={<>With my technology stack, you will never again hear a developer say <i>"that's too hard to implement."</i> I deliver flexible, reactive systems designed specifically to accommodate and accelerate rapid business evolution.</>}
                pt={<>Com a minha solução tecnológica, você nunca mais vai ouvir de um programador que <i>"isso é difícil de implementar."</i> Eu entrego soluções flexíveis desenhadas especificamente para acompanhar a rápida evolução do seu negócio.</>}
              />
            </Text>
          </GlassCard>
        </Box>

        {/* Validate Ideas - Proof of Concept */}
        <Box mb={120}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Stack justify="center">
              <Badge color="blue" size="lg"><Intl en="Proof of Concept" pt="Prova de Conceito (PoC)" /></Badge>
              <Title order={2}>
                <Intl en="Perfect for Validating Ideas" pt="Perfeito para Validar Ideias" />
              </Title>
              <Text size="lg" c="dimmed">
                <Intl
                  en="Stop building prototypes that get thrown away. With my architecture, validating your idea means building the product. The infrastructure scales from day one."
                  pt="Chega de criar protótipos para jogar fora. Com a minha arquitetura, ideia validada = construir o app. A infraestrutura base já nasce pronta para escala real."
                />
              </Text>
              <List
                spacing="sm"
                size="md"
                mt="sm"
                icon={
                  <ThemeIcon color="violet" size={24} radius="xl">
                    <FaCheckCircle size={14} />
                  </ThemeIcon>
                }
              >
                <List.Item><Intl en="Real users on real apps, not mockups." pt="Usuários reais usando apps reais de verdade, não protótipos clicáveis." /></List.Item>
                <List.Item><Intl en="Go to market and test hypotheses in record time." pt="Vá para o mercado e teste hipóteses em tempo recorde." /></List.Item>
                <List.Item><Intl en="No throwaway code—your PoC is your production v1." pt="Nenhum código descartável, sua PoC já é a sua versão 1 oficial." /></List.Item>
              </List>
            </Stack>
            <Box style={{ position: 'relative' }}>
              <GlassCard p="xs" style={{ border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
                <Image src="/portfolio/latham-estimator/latham1.webp" radius="md" style={{ filter: 'brightness(0.9)' }} />
              </GlassCard>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Pricing Section */}
        <Box mb={120} id="pricing">
          <Title order={2} mb="xl" style={{ textAlign: 'center' }}><Intl en="Pricing / Investment" pt="Precificação / Investimento" /></Title>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <GlassCard>
              <Group mb="xs">
                <Text fw={700} size="xl"><Intl en="Advanced Forms" pt="Formulários Avançados" /></Text>
              </Group>
              <Text size="sm" c="dimmed" mb="md" style={{ minHeight: 60 }}>
                <Intl
                  en="Advanced forms for precise technical and industrial operations. Specialized data gathering."
                  pt="Soluções avançadas para operações industriais precisas e técnicas."
                />
              </Text>
              <Text fw={900} fz={32} mb="md">
                <Intl en="$2,400 - $3,600" pt="R$ 12k - R$ 18k" />
              </Text>
              <Button fullWidth variant="light" color="cyan" radius="md" component="a" href="/forms-demo">
                <Intl en="View Demo" pt="Ver Demo" />
              </Button>
            </GlassCard>

            <GlassCard>
              <Group mb="xs">
                <Text fw={700} size="xl"><Intl en="Robust Systems" pt="Sistemas Robustos" /></Text>
              </Group>
              <Text size="sm" c="dimmed" mb="md" style={{ minHeight: 60 }}>
                <Intl
                  en="Complete projects with robust backend setups, fully architected database, and administrative dashboard."
                  pt="Projetos de sistemas completos com backend robusto, base de dados modelada e tabela de administração."
                />
              </Text>
              <Text fw={900} fz={32} mb="md">
                <Intl en="$4,000 - $10,000" pt="R$ 20k - R$ 50k" />
              </Text>
              <Button fullWidth variant="light" color="cyan" radius="md" component="a" href="https://linkedin.com/in/asasvirtuais" target="_blank">
                <Intl en="Contact Me" pt="Entre em Contato" />
              </Button>
            </GlassCard>

            <GlassCard>
              <Group mb="xs">
                <Text fw={700} size="xl"><Intl en="Full Applications" pt="Aplicativos Completos" /></Text>
              </Group>
              <Text size="sm" c="dimmed" mb="md" style={{ minHeight: 60 }}>
                <Intl
                  en="Annual service contracts for comprehensive app development with installment options available."
                  pt="Contratos anuais para projetos extensos de aplicativos completos, com opções de parcelamento."
                />
              </Text>
              <Text fw={900} fz={32} mb="md">
                <Intl en="$10,000+ / yr" pt="R$ 50k+" />
              </Text>
              <Button fullWidth variant="light" color="cyan" radius="md" component="a" href="https://linkedin.com/in/asasvirtuais" target="_blank">
                <Intl en="Contact Me" pt="Entre em Contato" />
              </Button>
            </GlassCard>
          </SimpleGrid>
        </Box>

        {/* Featured Project: asasvirtuais */}
        <Box mb={120}>
          <GlassCard padding={0} style={{ overflow: 'hidden' }}>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
              <Box p={40}>
                <Badge color="violet" mb="xs">Open Source</Badge>
                <Title order={2} mb="md">asasvirtuais Framework</Title>
                <Text mb="xl" c="dimmed">
                  <Intl
                    en="My open-source React framework designed to resolve the gap between API integration and state management. Built to eliminate architectural debt for CRUD-driven applications and local-first PWAs."
                    pt="Meu próprio framework React open-source desenhado para resolver o abismo entre APIs e gerência de estado. Feito para eliminar dívida arquitetural de apps crud e sistemas PWA local-first."
                  />
                </Text>
                <Stack gap="sm">
                  <Group gap="md" wrap="nowrap" align="flex-start">
                    <ThemeIcon size="sm" color="green" variant="light" radius="xl" mt={2} style={{ flexShrink: 0 }}><FaRocket /></ThemeIcon>
                    <Text size="sm" style={{ flex: 1 }}>
                      <Intl en="AI-Friendly: Simple, predictable primitives that LLMs can generate correctly." pt="Fácil para IAs: Formatos previsíveis para ajudar LLMs a gerar código corretamente." />
                    </Text>
                  </Group>
                  <Group gap="md" wrap="nowrap" align="flex-start">
                    <ThemeIcon size="sm" color="blue" variant="light" radius="xl" mt={2} style={{ flexShrink: 0 }}><FaDatabase /></ThemeIcon>
                    <Text size="sm" style={{ flex: 1 }}>
                      <Intl en="Agnostic Database: Deep integration with IndexedDB for seamless offline apps." pt="Banco de Dados Agnóstico: Integrações profundas com IndexedDB para excelentes apps offline." />
                    </Text>
                  </Group>
                </Stack>
                <Button mt={40} variant="outline" color="violet" component="a" href="https://www.npmjs.com/package/asasvirtuais" target="_blank">
                  <Intl en="View on NPM" pt="Acessar no NPM" />
                </Button>
              </Box>
              <Box style={{ background: 'linear-gradient(45deg, #1a1a1b, #2a2a2b)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
                <Stack align="center" gap="xs">
                  <SiReact size={80} color="#61DAFB" style={{ filter: 'drop-shadow(0 0 20px rgba(97, 218, 251, 0.3))' }} />
                  <Text fw={700} size="lg"><Intl en="Simplified State Management" pt="Gestão de Estado Descomplicada" /></Text>
                </Stack>
              </Box>
            </SimpleGrid>
          </GlassCard>
        </Box>

        {/* Portfolio Section */}
        <Box id="portfolio" mb={120}>
          <Group justify="space-between" mb="xl">
            <Title order={2}><Intl en="Selected Work" pt="Trabalhos Selecionados" /></Title>
            <Anchor href="https://upwork.com/fl/icarocc" target="_blank" size="sm" c="violet"><Intl en="View more on UpWork" pt="Ver mais no UpWork" /></Anchor>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {/* Project 1 */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 240, background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
                <Image src="/portfolio/latham-estimator/latham1.webp" height={240} fit="contain" alt="Latham Estimator" />
              </Box>
              <Box p="lg">
                <Group justify="space-between" mb="xs">
                  <Text fw={700}>Latham Pools Lead Qualification</Text>
                  <Badge variant="light">React + GraphQL</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  <Intl
                    en="A frontend lead qualification tool built with React and GraphQL. It reads Airtable bases to guide clients for a major US pool sales company."
                    pt="Uma ferramenta frontend voltada a leads usando React e GraphQL para guiar clientes numa das maiores empresas de piscinas dos EUA."
                  />
                </Text>
                <Group gap="xs"><SiTypescript size={18} /><SiReact size={18} /><SiAirtable size={18} /></Group>
              </Box>
            </GlassCard>

            {/* Project 2 */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 240, background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
                <Image src="/portfolio/grimoire/cards.png" height={240} fit="contain" alt="Grimoire Interface" />
              </Box>
              <Box p="lg">
                <Group justify="space-between" mb="xs">
                  <Text fw={700}>Grimoire RPG Companion</Text>
                  <Badge variant="light">Framework Demo</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  <Intl
                    en="A complex RPG companion app showcasing the abilities of the asasvirtuais framework in handling intricate, local-first state management."
                    pt="Um app para acompanhamento de campanhas de RPG incrivelmente complexo. Demonstra a enorme capacidade de escala single-player e processamento do asasvirtuais framework."
                  />
                </Text>
                <Group gap="xs"><SiMantine size={18} /><SiTypescript size={18} /><SiReact size={18} /></Group>
              </Box>
            </GlassCard>

            {/* Project 3 */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 240, background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
                <Image src="/portfolio/certworld/courses.png" height={240} fit="contain" alt="CertWorld Platform" />
              </Box>
              <Box p="lg">
                <Group justify="space-between" mb="xs">
                  <Text fw={700}>CertWorld CMS & Learning</Text>
                  <Badge variant="light">Full MVP</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  <Intl
                    en="A functional MVP for a machine learning courses platform. Built single-handedly from client discovery to launch, featuring Stripe integration."
                    pt="Um MVP 100% funcional para hospedar cursos. Construído do zero em tempo recorde com integrações Airtable e Stripe Checkout."
                  />
                </Text>
                <Group gap="xs"><SiStripe size={18} /><SiNextdotjs size={18} /><SiAirtable size={18} /></Group>
              </Box>
            </GlassCard>

            {/* Project 4 */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 240, background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}>
                <Image src="/portfolio/easyaidiarychat/chat.png" height={240} fit="contain" alt="Easy AI Diary Chat" fallbackSrc="https://placehold.co/600x400?text=Easy+AI+Diary" />
              </Box>
              <Box p="lg">
                <Group justify="space-between" mb="xs">
                  <Text fw={700}>Easy AI Diary & Chat</Text>
                  <Badge variant="light">PWA + Gemini AI</Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  <Intl
                    en="A local-first PWA powered by Gemini AI for automated journal analysis and chat, utilizing IndexedDB for rock-solid offline persistence."
                    pt="Um PWA local-first rodando integração com Gemini AI para análises automatizadas usando banco de dados IndexedDB de persistência impecável."
                  />
                </Text>
                <Group gap="xs"><SiMantine size={18} /><FaBrain size={18} /><FaDatabase size={18} /></Group>
              </Box>
            </GlassCard>
          </SimpleGrid>
        </Box>

        {/* Tech Stack Section */}
        <Box mb={120}>
          <Title order={2} mb="xl" style={{ textAlign: 'center' }}><Intl en="Technologies" pt="Tecnologias" /></Title>
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
          <Title order={1} mb="md">
            <Intl
              en={<>Let's accelerate your <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>product.</Text></>}
              pt={<>Vamos acelerar seu <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>produto.</Text></>}
            />
          </Title>
          <Text mb={40} c="dimmed" size="lg" style={{ maxWidth: 600, margin: '0 auto 40px' }}>
            <Intl
              en="Stop waiting months for features that should take weeks. Let's discuss how my high-velocity architectural approach can drastically reduce your development costs and maintenance overhead."
              pt="Pare de aguardar meses por algo de algumas semanas. Vamos discutir o quão rápido meu modelo de arquitetura de alta escala destrói barreiras financeiras para te permitir iterar sem estresse."
            />
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
          <Text size="sm" c="dimmed">
            © 2026 Ícaro C. Capobianco. <Intl en="All rights reserved." pt="Todos os direitos reservados." />
          </Text>
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
