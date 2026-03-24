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
            Ícaro C. Capobianco
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
              en={<>Let's be honest: <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>the software market has become a circus.</Text></>}
              pt={<>Vamos ser sinceros: <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>o mercado de software virou um circo.</Text></>}
            />
          </Title>
          <Stack gap="xl">
            <Text size="xl" style={{ lineHeight: 1.6, fontWeight: 500 }}>
              <Intl
                en="It's hard to find anyone who actually wants to do honest business and serve one another. Between endless billable hours and opaque promises, the essence of building something meaningful has been lost. I'm not here to play that game."
                pt="Está difícil encontrar quem realmente queira fazer um negócio honesto e servir um ao outro. Entre horas faturáveis infinitas e promessas opacas, a essência de construir algo que faça sentido se perdeu. Eu não estou aqui para jogar esse jogo."
              />
            </Text>
            <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
              <Intl
                en="For me, the real challenge isn't the code. The challenge is finding 'you' — the entrepreneur who truly believes in what they see is possible. Your vision is as important to me as the technology I've spent years refining. I value what I've built, and I want to deliver it to someone who values their own dream just as much."
                pt="Para mim, o desafio real não é o código. O desafio é encontrar 'você' — o empreendedor que acredita de verdade no que vê ser possível. Sua visão é tão importante para mim quanto a tecnologia que passei anos refinando. Eu valorizo o que construí, e quero entregar isso para quem valoriza o próprio sonho na mesma medida."
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
                <Intl en="Let's build something true" pt="Vamos construir algo verdadeiro" />
              </Button>
            </Group>
          </Stack>
        </Box>

        {/* ========== THE STATE OF THINGS ========== */}
        <Box mb={140} style={{ maxWidth: 800 }}>
          <Divider mb={80} label={<Intl en="The reality of the market" pt="A realidade do mercado" />} labelPosition="center" />
          <Stack gap={80}>
            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Why is it so hard to find honesty?" pt="Por que é tão difícil achar honestidade?" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="Agencies often profit from complexity and delay. The more confused you are, the more hours they bill. They create dependencies because it's safer for their business model. But that's not service — that's extraction. I want to work with people who value transparency and good will as much as I do."
                  pt="Agências costumam lucrar com a complexidade e o atraso. Quanto mais confuso você está, mais horas elas faturam. Elas criam dependências porque é mais seguro para o modelo de negócio delas. Mas isso não é servir — é extrair. Eu quero trabalhar com pessoas que valorizam a transparência e a boa vontade tanto quanto eu."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="The value of your vision" pt="O valor da sua visão" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="I can build the technology, but I can't invent the soul of your business. I need you to know exactly what you want to achieve. When you bring a clear vision, my execution becomes a multiplier. We serve each other: I provide the structural integrity and the unique technology you see here, and you provide the heartbeat."
                  pt="Eu posso construir a tecnologia, mas não posso inventar a alma do seu negócio. Preciso que você saiba exatamente o que quer alcançar. Quando você traz uma visão clara, minha execução vira um multiplicador. Nós servimos um ao outro: eu entrego a integridade estrutural e a tecnologia única que você vê aqui, e você entrega o pulsar do negócio."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="I protect what I've built" pt="Eu protejo o que construí" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="The framework and architecture I use are my pride. It's unique, fast, and built for transparency. I don't want to waste it on projects without a soul or ideas that aren't serious. I want to put this power in the hands of entrepreneurs who will use it to deliver something real to the world."
                  pt="A framework e a arquitetura que utilizo são o meu orgulho. É algo único, rápido e feito para ser transparente. Eu não quero desperdiçá-lo em projetos sem alma ou ideias que não são sérias. Quero colocar esse poder nas mãos de empreendedores que vão usá-lo para entregar algo real ao mundo."
                />
              </Text>
            </Box>
          </Stack>
        </Box>

        <Divider mb={120} label={<Intl en="Proof of Partnership" pt="Provas de Parceria" />} labelPosition="center" />

        {/* ========== PORTFOLIO ========== */}
        <Box id="work" mb={140}>
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <Text size="lg" c="dimmed">
              <Intl
                en="Here are some examples of entrepreneurs who knew exactly where they wanted to go. I just made sure the technology lived up to their vision."
                pt="Aqui estão alguns exemplos de empreendedores que sabiam exatamente para onde queriam ir. Eu apenas garanti que a tecnologia estivesse à altura da visão deles."
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
                  <Badge variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} size="lg"><Intl en="Featured Partner" pt="Parceria em Destaque" /></Badge>
                  <Badge variant="light" color="blue">USA</Badge>
                </Group>
                <Text fw={800} size="xl" mb="xs">Latham Pools — Lead Qualification System</Text>
                <Text size="sm" c="dimmed" mb="md" style={{ lineHeight: 1.7 }}>
                  <Intl
                    en="A multi-step configurator that guides potential clients through product selection and pricing. Fully integrated with the company's sales pipeline, it transformed a complex technical process into a clear and efficient tool for the sales team."
                    pt="Um configurador multi-etapas que guia potenciais clientes pela seleção de produtos e preços. Totalmente integrado ao pipeline de vendas da empresa, transformou um processo técnico complexo em uma ferramenta clara e eficiente para o time comercial."
                  />
                </Text>
                <Group gap="xs">
                  <Badge size="sm" variant="outline" color="gray">React</Badge>
                  <Badge size="sm" variant="outline" color="gray">Airtable</Badge>
                  <Badge size="sm" variant="outline" color="gray">Multi-step Forms</Badge>
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
                <Text fw={700} size="sm" mb="xs">Card Checkout — Payment Flow</Text>
                <Text size="xs" c="dimmed" mb="sm">
                  <Intl
                    en="A clear and direct payment flow designed to capture leads and process transactions without friction. Built for speed and reliability."
                    pt="Um fluxo de pagamento claro e direto, desenhado para capturar leads e processar transações sem fricção. Construído para velocidade e confiabilidade."
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
                    en="A complete platform for lessons and certifications. Every feature serves the student's progress and the business's scalability."
                    pt="Uma plataforma completa para aulas e certificações. Cada funcionalidade serve ao progresso do aluno e à escala do negócio."
                  />
                </Text>
              </Box>
            </GlassCard>
          </SimpleGrid>
        </Box>

        <Divider mb={120} label={<Intl en="The Investment" pt="O Investimento" />} labelPosition="center" />

        {/* ========== PRICING / INVESTMENT ========== */}
        <Box mb={140} id="pricing">
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 750, margin: '0 auto' }}>
            <Title order={2} mb="md" fz={{ base: rem(28), sm: rem(36) }}>
              <Intl en="Honest partnership, clear values." pt="Parceria honesta, valores claros." />
            </Title>
            <Text size="lg" c="dimmed">
              <Intl
                en="I invest in the creation of the asset because I believe in the partnership. You invest in the evolution of the business."
                pt="Eu invisto na criação do ativo porque acredito na parceria. Você investe na evolução do negócio."
              />
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <GlassCard>
              <Badge color="cyan" mb="md"><Intl en="Commitment" pt="Comprometimento" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Development" pt="Desenvolvimento" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="I build your system with no upfront development cost. My work is an investment in the vision you bring."
                  pt="Eu construo seu sistema sem custo inicial de desenvolvimento. Meu trabalho é um investimento na visão que você traz."
                />
              </Text>
              <Text fw={900} fz={32} mb="md">
                <Intl en="$0" pt="R$ 0" />
              </Text>
              <Button fullWidth variant="light" color="cyan" radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Start the conversation" pt="Iniciar conversa" />
              </Button>
            </GlassCard>

            <GlassCard style={{ border: '1px solid rgba(121, 80, 242, 0.3)', background: 'rgba(121, 80, 242, 0.05)' }}>
              <Badge color="violet" mb="md"><Intl en="Service" pt="Serviço" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Consultancy" pt="Consultoria Mensal" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="A monthly partnership for continuous support, evolution, and strategic technical alignment. We grow together."
                  pt="Uma parceria mensal para suporte contínuo, evolução e alinhamento técnico estratégico. Crescemos juntos."
                />
              </Text>
              <Text fw={700} fz={24} mb="md">
                <Intl en="To be negotiated" pt="Valor a negociar" />
              </Text>
              <Button fullWidth variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Discuss Details" pt="Discutir Detalhes" />
              </Button>
            </GlassCard>

            <GlassCard>
              <Badge color="green" mb="md"><Intl en="Expansion" pt="Expansão" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Strategic Partner" pt="Parceiro Técnico" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="For larger operations needing dedicated engineering or CTO-level management. A complete technical soul for your business."
                  pt="Para operações maiores que precisam de engenharia dedicada ou gestão nível CTO. Uma alma técnica completa para o seu negócio."
                />
              </Text>
              <Text fw={700} fz={rem(24)} mb="md">
                <Intl en="Custom Contract" pt="Contrato Customizado" />
              </Text>
              <Button fullWidth variant="light" color="green" radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Talk Scale" pt="Falar sobre Escala" />
              </Button>
            </GlassCard>
          </SimpleGrid>
        </Box>

        {/* ========== CONTACT ========== */}
        <Box id="contact" py={80} style={{ textAlign: 'center' }}>
          <Title order={1} mb="md" fz={{ base: rem(32), sm: rem(42) }}>
            <Intl
              en={<>Ready to build <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>something true?</Text></>}
              pt={<>Pronto pra construir <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>algo verdadeiro?</Text></>}
            />
          </Title>
          <Text mb={40} c="dimmed" size="lg" style={{ maxWidth: 650, margin: '0 auto 40px' }}>
            <Intl
              en="No sales pitch. Just an honest conversation about your vision. If I can serve your project, it will be clear. If not, I'll tell you straight away."
              pt="Sem discurso de vendas. Apenas uma conversa honesta sobre a sua visão. Se eu puder servir ao seu projeto, ficará claro. Se não, eu te direi na hora."
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
            © 2026 Ícaro C. Capobianco. <Intl en="Built with transparency." pt="Construído com transparência." />
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
