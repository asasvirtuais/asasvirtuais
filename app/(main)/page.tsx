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
  Timeline
} from '@mantine/core'
import {
  FaGithub,
  FaLinkedin,
  FaCode,
  FaArrowRight,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa'
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiVercel,
  SiAirtable,
  SiStripe,
  SiPython,
  SiFirebase,
  SiGooglecloud
} from 'react-icons/si'
import {
  IconRocket,
  IconShieldCheck,
  IconClock,
  IconCurrencyDollar,
  IconBulb,
  IconArrowRight,
  IconMessage,
  IconCode,
  IconDeviceLaptop,
  IconHeadset,
  IconUsers,
  IconPuzzle
} from '@tabler/icons-react'

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
      transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      ...props.style
    }}
  >
    {children}
  </Paper>
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
          background: 'radial-gradient(circle, rgba(121, 80, 242, 0.12) 0%, rgba(0,0,0,0) 70%)',
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
          background: 'radial-gradient(circle, rgba(21, 170, 191, 0.08) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <Container size="lg" pt={40} style={{ position: 'relative', zIndex: 1 }}>
        {/* Header/Nav */}
        <Group justify="space-between" mb={80}>
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

        {/* ========== HERO / CONVERSATION START ========== */}
        <Box mb={120} mt={60} style={{ maxWidth: 850 }}>
          <Badge variant="dot" color="violet" size="lg" mb="sm">
            Ícaro C. Capobianco — Programador
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
              en={<>Systems development. <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>From concept to product in days.</Text></>}
              pt={<>Desenvolvimento de sistemas. <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>Do conceito ao produto em dias.</Text></>}
            />
          </Title>
          <Stack gap="xl">
            <Text size="xl" style={{ lineHeight: 1.6, fontWeight: 500 }}>
              <Intl
                en="I turn your ideas into functional software quickly. With a clear vision of what needs to be built, I deliver results in days, not weeks."
                pt="Transformo sua ideia em software funcional com rapidez. Com uma visão clara do que precisa ser feito, entrego resultados em dias, não semanas."
              />
            </Text>
            <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
              <Intl
                en="I use a custom set of tools to speed up development and ensure quality, without the bottlenecks or delays of traditional processes."
                pt="Uso um conjunto de ferramentas próprias para acelerar o desenvolvimento e garantir qualidade, sem as travas ou a demora dos processos tradicionais."
              />
            </Text>
            <Group gap="lg" mt="md">
              <Button
                size="lg"
                radius="md"
                variant="gradient"
                gradient={{ from: 'violet', to: 'cyan' }}
                rightSection={<FaArrowRight size={16} />}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Intl en="Let's build it" pt="Vamos fazer acontecer" />
              </Button>
            </Group>
          </Stack>
        </Box>

        {/* ========== THE STATE OF THINGS ========== */}
        <Box mb={140} style={{ maxWidth: 800 }}>
          <Divider mb={80} label={<Intl en="How I Work" pt="Como eu trabalho" />} labelPosition="center" />
          <Stack gap={80}>
            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Focus on the Goal" pt="Foco no Objetivo" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="I prioritize understanding the core needs of your project. I build direct and efficient solutions, avoiding unnecessary complexity."
                  pt="Priorizo entender a necessidade real do seu projeto. Desenvolvo soluções diretas e eficientes, evitando complexidade desnecessária."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Agile Delivery" pt="Entrega Ágil" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="With a refined workflow, I can turn ideas into functional prototypes in a fraction of the usual market time."
                  pt="Com um fluxo de trabalho otimizado, consigo transformar ideias em protótipos funcionais em uma fração do tempo habitual do mercado."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Custom Technology" pt="Tecnologia Própria" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="I use a custom framework that handles the repetitive parts of coding, allowing me to focus on what makes your project unique."
                  pt="Utilizo um framework próprio que lida com a parte repetitiva do código, permitindo focar no que torna seu projeto único."
                />
              </Text>
            </Box>
          </Stack>
        </Box>

        <Divider mb={120} label={<Intl en="What I've Done" pt="O que eu já fiz" />} labelPosition="center" />

        {/* ========== PORTFOLIO ========== */}
        <Box id="work" mb={140}>
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <Text size="lg" c="dimmed">
              <Intl
                en="Straightforward projects for people who value speed and technical clarity."
                pt="Projetos diretos para quem valoriza velocidade e clareza técnica."
              />
            </Text>
          </Box>

          {/* ── FEATURED: Latham Pools ── */}
          <GlassCard padding={0} style={{ overflow: 'hidden', border: '1px solid rgba(121, 80, 242, 0.25)' }} mb="xl">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
              <Box style={{ position: 'relative', minHeight: 300, background: 'rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                <Image src="/portfolio/latham-estimator/latham1.webp" height={300} fit="contain" alt="Latham Pools Estimator" />
              </Box>
              <Box p="xl" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Group gap="sm" mb="xs">
                  <Badge variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} size="lg"><Intl en="Featured Project" pt="Projeto em Destaque" /></Badge>
                  <Badge variant="light" color="blue">USA</Badge>
                </Group>
                <Text fw={800} size="xl" mb="xs">Latham Pools — Lead System</Text>
                <Text size="sm" c="dimmed" mb="md" style={{ lineHeight: 1.7 }}>
                  <Intl
                    en="Configurator to help clients choose products, simplifying the sales flow."
                    pt="Configurador para ajudar clientes a escolherem produtos, simplificando o fluxo de vendas."
                  />
                </Text>
                <Group gap="xs">
                  <Badge size="sm" variant="outline" color="gray">React</Badge>
                  <Badge size="sm" variant="outline" color="gray">Airtable</Badge>
                  <Badge size="sm" variant="outline" color="gray">Programming</Badge>
                </Group>
              </Box>
            </SimpleGrid>
          </GlassCard>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {/* Card Checkout */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 200, background: 'rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                <Image src="/portfolio/cardcheckout/checkout.PNG" height={200} fit="contain" alt="Card Checkout" />
              </Box>
              <Box p="lg">
                <Text fw={700} size="sm" mb="xs">Card Checkout — Direct Payments</Text>
                <Text size="xs" c="dimmed" mb="sm">
                  <Intl
                    en="A high-performance checkout for direct payments, focused on conversion."
                    pt="Checkout de alta performance para pagamentos diretos, focado em conversão."
                  />
                </Text>
              </Box>
            </GlassCard>

            {/* CertWorld */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 200, background: 'rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                <Image src="/portfolio/certworld/courses.png" height={200} fit="contain" alt="CertWorld" />
              </Box>
              <Box p="lg">
                <Text fw={700} size="sm" mb="xs">CertWorld — Learning Platform</Text>
                <Text size="xs" c="dimmed" mb="sm">
                  <Intl
                    en="Online course platform with an intuitive interface and easy content management."
                    pt="Plataforma de cursos online com interface intuitiva e fácil gestão de conteúdo."
                  />
                </Text>
              </Box>
            </GlassCard>
          </SimpleGrid>
        </Box>

        <Divider mb={120} label={<Intl en="The Deal" pt="O Acordo" />} labelPosition="center" />

        {/* ========== PRICING / INVESTMENT ========== */}
        <Box mb={140} id="pricing">
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 750, margin: '0 auto' }}>
            <Title order={2} mb="md" fz={{ base: rem(28), sm: rem(36) }}>
              <Intl en="The Deal" pt="O Acordo" />
            </Title>
            <Text size="lg" c="dimmed">
              <Intl
                en="Clear steps to start and evolve your project."
                pt="Etapas claras para iniciar e evoluir seu projeto."
              />
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <GlassCard>
              <Badge color="cyan" mb="md"><Intl en="Proof of Concept" pt="Prova de Conceito" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Core Development" pt="Desenvolvimento Inicial" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="I develop the core functionality of your project so you can validate the idea in practice before any long-term commitment."
                  pt="Desenvolvo a funcionalidade principal do seu projeto para você validar a ideia na prática antes de qualquer compromisso de longo prazo."
                />
              </Text>
              <Text fw={900} fz={32} mb="md">
                <Intl en="$0" pt="R$ 0" />
              </Text>
              <Button fullWidth variant="light" color="cyan" radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Show me" pt="Me mostra" />
              </Button>
            </GlassCard>

            <GlassCard style={{ border: '1px solid rgba(121, 80, 242, 0.3)', background: 'rgba(121, 80, 242, 0.05)' }}>
              <Badge color="violet" mb="md"><Intl en="Ongoing" pt="Contínuo" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Continuous Evolution" pt="Evolução Contínua" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="Constant support and development to expand your system as your business grows and new needs arise."
                  pt="Suporte e desenvolvimento constante para expandir seu sistema conforme seu negócio cresce e novas necessidades surgem."
                />
              </Text>
              <Text fw={700} fz={24} mb="md">
                <Intl en="Fair Value" pt="Valor Justo" />
              </Text>
              <Button fullWidth variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Let's Talk" pt="Vamos Conversar" />
              </Button>
            </GlassCard>

            <GlassCard>
              <Badge color="green" mb="md"><Intl en="Robust" pt="Robusto" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Full Solution" pt="Solução Completa" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="Complete systems for projects that demand high performance, complex integrations, and guaranteed stability."
                  pt="Sistemas completos para projetos que exigem alta performance, integrações complexas e estabilidade garantida."
                />
              </Text>
              <Text fw={700} fz={rem(24)} mb="md">
                <Intl en="Custom Pricing" pt="Valor Sob Medida" />
              </Text>
              <Button fullWidth variant="light" color="green" radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Contact Me" pt="Chama no Zap" />
              </Button>
            </GlassCard>
          </SimpleGrid>
        </Box>

        {/* ========== CONTACT ========== */}
        <Box id="contact" py={80} style={{ textAlign: 'center' }}>
          <Title order={1} mb="md" fz={{ base: rem(32), sm: rem(42) }}>
            <Intl
              en={<>Need <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>real programming?</Text></>}
              pt={<>Precisa de <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>programação de verdade?</Text></>}
            />
          </Title>
          <Text mb={40} c="dimmed" size="lg" style={{ maxWidth: 650, margin: '0 auto 40px' }}>
            <Intl
              en="Let's talk about your project and see how I can help you get it off the ground quickly."
              pt="Vamos conversar sobre seu projeto e ver como posso ajudá-lo a sair do papel rapidamente."
            />
          </Text>
          <Stack align="center" gap="md">
            <Group justify="center" gap="lg">
              <Button
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ from: 'violet', to: 'cyan' }}
                leftSection={<FaWhatsapp size={20} />}
                component="a"
                href="https://wa.me/+5516997234567"
                target="_blank"
              >
                WhatsApp
              </Button>
              <Button
                size="xl"
                radius="md"
                variant="default"
                leftSection={<FaLinkedin size={20} />}
                component="a"
                href="https://linkedin.com/in/asasvirtuais"
                target="_blank"
              >
                LinkedIn
              </Button>
            </Group>
            <Text c="dimmed" size="sm">icaro@asasvirtuais.dev</Text>
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
