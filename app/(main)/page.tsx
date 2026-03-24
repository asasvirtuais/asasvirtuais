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
              en={<>High-performance programming. <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>Done right, without the fluff.</Text></>}
              pt={<>Programação de alta performance. <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>Direto ao ponto, sem frescura.</Text></>}
            />
          </Title>
          <Stack gap="xl">
            <Text size="xl" style={{ lineHeight: 1.6, fontWeight: 500 }}>
              <Intl
                en="I code systems that actually work. I built my own tools to deliver faster and better than the standard market junk. If you need it done, I'll program it—simple as that."
                pt="Eu programo sistemas que funcionam de verdade. Criei minhas próprias ferramentas para entregar mais rápido e melhor que o lixo que o mercado oferece por aí. Se você precisa de algo feito, eu faço — simples assim."
              />
            </Text>
            <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
              <Intl
                en="Better, cheaper, and different. I've spent 7 years stripping away the technical waste that other people charge you for. No bureaucracy, no empty talk—just high-level code."
                pt="Melhor, mais barato e diferente. Passei 7 anos eliminando o desperdício técnico que os outros te cobram caro para manter. Sem burocracia, sem papo furado — apenas código de alto nível."
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
                <Intl en="Zero Waste" pt="Zero Desperdício" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="I don't waste time with unnecessary abstractions. I deliver lean, powerful code that solves your needs without creating maintenance nightmares. If it's simple, I keep it simple."
                  pt="Não perco tempo com abstrações desnecessárias. Entrego código enxuto e poderoso que resolve o que você precisa sem criar pesadelos de manutenção. Se é simples, eu mantenho simples."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Faster and Cheaper" pt="Mais Rápido e Mais Barato" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="Because I use a superior stack I built myself, I can do in days what agencies take months to deliver. You get better tech for a fraction of the price because I've automated the boring parts."
                  pt="Como uso ferramentas superiores que eu mesmo desenvolvi, consigo fazer em dias o que agências levam meses para entregar. Você ganha tecnologia melhor por uma fração do preço, porque eu automatizei a parte chata."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Code that Lasts" pt="Código que Dura" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="I don't just write code; I build tools that you can actually use. I work with people who want things done efficiently and don't want to hear corporate speeches about productivity."
                  pt="Eu não apenas escrevo código; eu construo ferramentas que você realmente usa. Trabalho com quem quer as coisas feitas com eficiência e não quer ouvir discurso de CEO sobre produtividade."
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
                    en="I programmed a system to help their clients choose products easily. No complex jargon—just a flow that works for the sales team and the customer."
                    pt="Programei um sistema para ajudar os clientes deles a escolherem produtos facilmente. Sem enrolação — apenas um fluxo que funciona para o time de vendas e para o cliente."
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
                    en="A payment flow that just works. Built to be fast, reliable, and get the job done."
                    pt="Um fluxo de pagamento que simplesmente funciona. Feito para ser rápido, confiável e resolver o problema."
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
                    en="A simple platform for students. Clean code, no bugs, and easy to manage."
                    pt="Uma plataforma simples para alunos. Código limpo, sem bugs e fácil de gerir."
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
              <Intl en="Straight Talk" pt="Papo Reto" />
            </Title>
            <Text size="lg" c="dimmed">
              <Intl
                en="I show you that my code works first. Then we talk about how to keep it growing."
                pt="Eu te mostro que meu código funciona primeiro. Depois a gente conversa sobre como continuar crescendo."
              />
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <GlassCard>
              <Badge color="cyan" mb="md"><Intl en="Proof of Concept" pt="Prova de Conceito" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Initial Code" pt="Código Inicial" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="I'll program the core of your idea for free. If you like it, we move forward. No risk for you."
                  pt="Eu programo o núcleo da sua ideia de graça. Se você gostar, a gente segue. Sem risco para você."
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
              <Text fw={700} size="xl" mb={4}><Intl en="Continuous Coding" pt="Programação Contínua" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="I keep improving your system as you need it. Faster delivery than anyone else on the market."
                  pt="Continuo melhorando seu sistema conforme a necessidade. Entrega mais rápida que qualquer um no mercado."
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
              <Badge color="green" mb="md"><Intl en="Complex" pt="Complexo" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Technical Lead" pt="Liderança Técnica" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="Full technical management for projects that demand high volume and rock-solid reliability."
                  pt="Gestão técnica total para projetos que exigem alto volume e confiabilidade absoluta."
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
              en="No bureaucracy. Just a chat to get things moving."
              pt="Sem burocracia. Só um papo pra fazer as coisas andarem."
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
