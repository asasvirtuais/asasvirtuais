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

const StatCard = ({ value, label }: { value: string, label: React.ReactNode }) => (
  <Box style={{ textAlign: 'center' }}>
    <Text
      fw={900}
      fz={{ base: rem(36), md: rem(48) }}
      variant="gradient"
      gradient={{ from: 'violet', to: 'cyan' }}
      style={{ lineHeight: 1 }}
    >
      {value}
    </Text>
    <Text size="sm" c="dimmed" mt={4}>{label}</Text>
  </Box>
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
        <Group justify="space-between">
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

        {/* ========== HERO ========== */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80} mb={100} mt={60}>
          <Stack gap={32} justify="center">
            <Box>
              <Badge variant="dot" color="violet" size="lg" mb="sm">
                Ícaro C. Capobianco
              </Badge>
              <Title
                order={1}
                fz={{ base: rem(38), sm: rem(48), md: rem(56) }}
                style={{
                  lineHeight: 1.08,
                  fontWeight: 900,
                  marginBottom: rem(24)
                }}
              >
                <Intl
                  en={<>Web <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>Developer.</Text></>}
                  pt={<>Desenvolvedor <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>Web.</Text></>}
                />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="Good business doesn't create dependency. I am a reliable partner delivering solid software that doesn't leave you dependent. You bring the vision — I deliver the only AI stack (Next + React) that actually works, with zero vendor lock-in. If you decide to go internal, you take 100% of the technology with you. No strings attached."
                  pt="Bons negócios não geram dependência. Sou um parceiro confiável que entrega software sólido sem te deixar dependente. Você traz a visão — eu entrego a única stack de I.A. (Next + React) que realmente funciona, com zero vendor lock-in. Se decidir internalizar, você leva 100% da tecnologia com você. Sem amarras."
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
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Intl en="Get in Touch" pt="Entrar em Contato" />
              </Button>
              <Button
                size="lg"
                radius="md"
                variant="default"
                rightSection={<IconArrowRight size={16} />}
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Intl en="See the Work" pt="Ver Trabalhos" />
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

        {/* ========== STATS ========== */}
        <GlassCard mb={120} style={{ background: 'linear-gradient(135deg, rgba(121, 80, 242, 0.06) 0%, rgba(21, 170, 191, 0.06) 100%)', border: '1px solid rgba(121, 80, 242, 0.15)' }}>
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
            <StatCard value="100%" label={<Intl en="Technical Ownership" pt="Propriedade Técnica" />} />
            <StatCard value="0" label={<Intl en="Vendor Lock-in" pt="Zero Lock-in" />} />
            <StatCard value="React" label={<Intl en="Next.js + AI Stack" pt="Next.js + I.A." />} />
            <StatCard value="Just" label={<Intl en="Business Focus" pt="Foco em Negócio" />} />
          </SimpleGrid>
        </GlassCard>

        <Divider mb={120} label={<Intl en="The Real Problem" pt="O Problema Real" />} labelPosition="center" />

        {/* ========== THE PROBLEM ========== */}
        <Box mb={120}>
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <Title order={2} mb="md" fz={{ base: rem(28), sm: rem(36) }} style={{ lineHeight: 1.3 }}>
              <Intl
                en={<>Software projects are usually <Text span variant="gradient" gradient={{ from: '#ff6b6b', to: '#ffa94d' }} inherit>a trap of dependency.</Text></>}
                pt={<>Projetos de software costumam ser <Text span variant="gradient" gradient={{ from: '#ff6b6b', to: '#ffa94d' }} inherit>uma armadilha de dependência.</Text></>}
              />
            </Title>
            <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
              <Intl
                en="Traditional agencies create 'black boxes' that make you a hostage. Maintenance feels like an eternal tax, and the code is a locked secret. When a consultant becomes indispensable to your survival, they stop being a partner and start being a weight. I break this cycle."
                pt="Agências tradicionais criam 'caixas-pretas' que tornam você um refém. A manutenção parece um imposto eterno e o código é um segredo trancado. Quando um consultor se torna indispensável para sua sobrevivência, ele deixa de ser um parceiro e vira um peso. Eu quebro esse ciclo."
              />
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <GlassCard style={{ borderColor: 'rgba(255, 107, 107, 0.2)' }}>
              <ThemeIcon variant="light" color="red" size="xl" radius="md" mb="md">
                <IconClock size={24} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs"><Intl en="Endless Delays" pt="Atrasos Sem Fim" /></Text>
              <Text size="sm" c="dimmed">
                <Intl
                  en={<>"It'll be ready in two weeks" turns into two months. Then six. Then "we need to refactor the whole thing." The business waits while developers figure things out.</>}
                  pt={<>"Fica pronto em duas semanas" vira dois meses. Depois seis. Depois "precisamos refatorar tudo." O negócio espera enquanto o time de desenvolvimento tenta resolver o que deveria ter resolvido antes.</>}
                />
              </Text>
            </GlassCard>

            <GlassCard style={{ borderColor: 'rgba(255, 169, 77, 0.2)' }}>
              <ThemeIcon variant="light" color="orange" size="xl" radius="md" mb="md">
                <IconCurrencyDollar size={24} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs"><Intl en="Costs That Explode" pt="Custos Que Explodem" /></Text>
              <Text size="sm" c="dimmed">
                <Intl
                  en="What was quoted at $5k becomes $15k because of 'unforeseen complexities.' The real reason? Bad architecture decisions from day one that snowball into expensive rewrites."
                  pt="O que foi orçado em R$15k vira R$50k por causa de 'complexidades imprevistas.' O motivo real? Decisões ruins de arquitetura no dia um que viram retrabalhos caros."
                />
              </Text>
            </GlassCard>

            <GlassCard style={{ borderColor: 'rgba(255, 107, 107, 0.2)' }}>
              <ThemeIcon variant="light" color="red" size="xl" radius="md" mb="md">
                <IconShieldCheck size={24} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs"><Intl en="Vendor Lock-in" pt="Refém do Fornecedor" /></Text>
              <Text size="sm" c="dimmed">
                <Intl
                  en="The agency delivers something that only they can maintain. Need a change? Pay them. Need a fix? Pay them. Want to leave? Good luck finding someone who understands their spaghetti code."
                  pt="A agência entrega algo que só ela pode manter. Precisa mudar algo? Pague. Um bug? Pague. Quer sair? Boa sorte achando quem entenda o código espaguete que deixaram."
                />
              </Text>
            </GlassCard>
          </SimpleGrid>
        </Box>

        <Divider mb={120} label={<Intl en="A Different Approach" pt="Uma Abordagem Diferente" />} labelPosition="center" />

        {/* ========== MY APPROACH ========== */}
        <Box mb={120}>
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <Title order={2} mb="md" fz={{ base: rem(28), sm: rem(36) }} style={{ lineHeight: 1.3 }}>
              <Intl
                en={<>Building assets, <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>not technical dependency.</Text></>}
                pt={<>Construímos ativos, <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>não dependência técnica.</Text></>}
              />
            </Title>
            <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
              <Intl
                en="The value of this partnership is 'Just Business'. I provide the absolute best AI-powered technology to build your vision at no initial cost, provided you bring the strategy and technical specs. In exchange, you get full access to the framework and architecture. No vendor lock-in, no hidden code. Your success is the only thing that keeps us together."
                pt="O valor desta parceria é 'Apenas Negócios'. Eu forneço a melhor tecnologia movida a I.A. para construir sua visão sem custo inicial, desde que você traga a estratégia e as especificações. Em troca, você recebe acesso total à framework e arquitetura. Sem vendor lock-in, sem código oculto. Seu sucesso é a única coisa que nos mantém juntos."
              />
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <GlassCard>
              <ThemeIcon variant="light" color="violet" size="xl" radius="md" mb="md">
                <IconRocket size={24} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs"><Intl en="Absurd Speed" pt="Velocidade Absurda" /></Text>
              <Text size="sm" c="dimmed">
                <Intl
                  en="Functional systems delivered in weeks, not months. Deep infrastructure expertise combined with proprietary tooling eliminates the learning curve that slows conventional teams down."
                  pt="Sistemas funcionais entregues em semanas, não meses. Expertise profunda em infraestrutura combinada com ferramental proprietário eliminam a curva de aprendizado que atrasa times convencionais."
                />
              </Text>
            </GlassCard>
            <GlassCard>
              <ThemeIcon variant="light" color="cyan" size="xl" radius="md" mb="md">
                <IconPuzzle size={24} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs"><Intl en="The Definitive AI Stack" pt="A Stack de I.A. Definitiva" /></Text>
              <Text size="sm" c="dimmed">
                <Intl
                  en="I don't waste time with 'any stack'. I use the best: Next.js + React integrated with a proprietary AI engine. While the market promises magic with mediocre tools, I deliver results with the only architecture that actually makes AI perform in production."
                  pt="Não perco tempo com 'qualquer stack'. Eu uso a melhor: Next.js + React integrados a um motor de I.A. proprietário. Enquanto o mercado promete mágica com ferramentas medíocres, eu entrego resultados com a única arquitetura que realmente faz a I.A. performar em produção."
                />
              </Text>
            </GlassCard>
            <GlassCard>
              <ThemeIcon variant="light" color="green" size="xl" radius="md" mb="md">
                <IconUsers size={24} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs"><Intl en="Zero Vendor Lock-in" pt="Zero Vendor Lock-in" /></Text>
              <Text size="sm" c="dimmed">
                <Intl
                  en="The partnership is based on performance, not dependency. You own the code and the entire framework used to build it. If you decide to go internal or pick another partner, you take the full technology with you. No black boxes, just clean assets."
                  pt="A parceria é baseada em performance, não em dependência. Você é dono do código e de toda a framework usada para construí-lo. Se decidir internalizar ou escolher outro parceiro, você leva toda a tecnologia com você. Sem caixas pretas, apenas ativos claros."
                />
              </Text>
            </GlassCard>
          </SimpleGrid>
        </Box>

        {/* ========== HIGHLIGHT CTA ========== */}
        <Box mb={120}>
          <GlassCard padding={{ base: 'xl', md: 60 }} style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(121, 80, 242, 0.08) 0%, rgba(21, 170, 191, 0.08) 100%)', border: '1px solid rgba(121, 80, 242, 0.2)' }}>
            <Title order={2} mb="md" fz={{ base: rem(26), sm: rem(34) }} style={{ lineHeight: 1.3 }}>
              <Intl
                en={<>When the business pivots,<Box component="br" display={{ base: 'none', md: 'block' }} /> <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>the software adapts in days, not months.</Text></>}
                pt={<>Quando o negócio muda de rumo,<Box component="br" display={{ base: 'none', md: 'block' }} /> <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>o software se adapta em dias, não meses.</Text></>}
              />
            </Title>
            <Text size="lg" c="dimmed" style={{ maxWidth: 700, margin: '0 auto' }}>
              <Intl
                en="These systems are designed to change. Because every business will change — and technology cannot be the bottleneck."
                pt="Esses sistemas são projetados para mudar. Porque todo negócio vai mudar — e a tecnologia não pode ser o gargalo."
              />
            </Text>
          </GlassCard>
        </Box>

        <Divider mb={120} label={<Intl en="Proof" pt="Provas" />} labelPosition="center" />

        {/* ========== PORTFOLIO ========== */}
        <Box id="work" mb={120}>
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <Title order={2} mb="sm" fz={{ base: rem(28), sm: rem(36) }}>
              <Intl en="Real products. Real clients." pt="Produtos reais. Clientes reais." />
            </Title>
            <Text size="lg" c="dimmed">
              <Intl
                en="From the first meeting with the client to the deployed product. Full scope — architecture, backend, frontend, integrations, and deployment."
                pt="Da primeira reunião com o cliente ao produto no ar. Escopo completo — arquitetura, backend, frontend, integrações e deploy."
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
                  <Badge variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} size="lg"><Intl en="Featured Client" pt="Cliente em Destaque" /></Badge>
                  <Badge variant="light" color="blue">USA</Badge>
                </Group>
                <Text fw={800} size="xl" mb="xs">Latham Pools — Lead Qualification System</Text>
                <Text size="sm" c="dimmed" mb="md" style={{ lineHeight: 1.7 }}>
                  <Intl
                    en="Interactive lead qualification wizard for one of the largest pool manufacturers in the United States. Real-time data from Airtable powers a multi-step configurator that guides potential clients through product selection, technical specifications, and pricing — fully integrated with the company's sales pipeline."
                    pt="Wizard interativo de qualificação de leads para uma das maiores fabricantes de piscinas dos Estados Unidos. Dados em tempo real do Airtable alimentam um configurador multi-etapas que guia potenciais clientes pela seleção de produtos, especificações técnicas e precificação — totalmente integrado ao pipeline de vendas da empresa."
                  />
                </Text>
                <Group gap="xs">
                  <Badge size="sm" variant="outline" color="gray">React</Badge>
                  <Badge size="sm" variant="outline" color="gray">GraphQL</Badge>
                  <Badge size="sm" variant="outline" color="gray">Airtable</Badge>
                  <Badge size="sm" variant="outline" color="gray">Multi-step Forms</Badge>
                </Group>
              </Box>
            </SimpleGrid>
            <SimpleGrid cols={{ base: 2, sm: 4 }} spacing={2} p={2} pt={0}>
              <Image src="/portfolio/latham-estimator/latham3.webp" height={120} fit="cover" alt="Latham detail" radius="sm" />
              <Image src="/portfolio/latham-estimator/latham4.webp" height={120} fit="cover" alt="Latham detail" radius="sm" />
              <Image src="/portfolio/latham-estimator/latham5.webp" height={120} fit="cover" alt="Latham detail" radius="sm" />
              <Image src="/portfolio/latham-estimator/latham7.webp" height={120} fit="cover" alt="Latham detail" radius="sm" />
            </SimpleGrid>
          </GlassCard>

          {/* ── DELIVERED PROJECTS ── */}
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mb="xl">
            {/* Card Checkout */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 200, background: 'rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                <Image src="/portfolio/cardcheckout/checkout.PNG" height={200} fit="contain" alt="Card Checkout" />
              </Box>
              <Box p="lg">
                <Group justify="space-between" mb="xs">
                  <Text fw={700} size="sm">Card Checkout — Payment Flow</Text>
                  <Badge variant="light" color="orange" size="xs"><Intl en="Delivered" pt="Entregue" /></Badge>
                </Group>
                <Text size="xs" c="dimmed" mb="sm">
                  <Intl
                    en="Multi-step checkout with lead capture, card payment processing, responsive design, and real-time order tracking."
                    pt="Checkout multi-etapas com captura de leads, processamento de pagamento, design responsivo e rastreamento de pedidos em tempo real."
                  />
                </Text>
                <Group gap={4}>
                  <Badge size="xs" variant="outline" color="gray">React</Badge>
                  <Badge size="xs" variant="outline" color="gray">Payments</Badge>
                  <Badge size="xs" variant="outline" color="gray">Mobile</Badge>
                </Group>
              </Box>
            </GlassCard>

            {/* Live University */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 200, background: 'rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                <Image src="/portfolio/liveuniversity/cursos.live-university.jpeg" height={200} fit="contain" alt="Live University" />
              </Box>
              <Box p="lg">
                <Group justify="space-between" mb="xs">
                  <Text fw={700} size="sm">Live University — Course Platform</Text>
                  <Badge variant="light" color="orange" size="xs"><Intl en="Delivered" pt="Entregue" /></Badge>
                </Group>
                <Text size="xs" c="dimmed" mb="sm">
                  <Intl
                    en="University-grade course platform with enrollment flow, progress tracking, grading system, and content management."
                    pt="Plataforma de cursos com fluxo de matrícula, rastreamento de progresso, sistema de notas e gestão de conteúdo."
                  />
                </Text>
                <Group gap={4}>
                  <Badge size="xs" variant="outline" color="gray">Full-Stack</Badge>
                  <Badge size="xs" variant="outline" color="gray">LMS</Badge>
                  <Badge size="xs" variant="outline" color="gray">Auth</Badge>
                </Group>
              </Box>
            </GlassCard>

            {/* CertWorld */}
            <GlassCard padding={0} style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 200, background: 'rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                <Image src="/portfolio/certworld/courses.png" height={200} fit="contain" alt="CertWorld" />
              </Box>
              <Box p="lg">
                <Group justify="space-between" mb="xs">
                  <Text fw={700} size="sm">CertWorld — Learning + Certification</Text>
                  <Badge variant="light" color="green" size="xs">MVP</Badge>
                </Group>
                <Text size="xs" c="dimmed" mb="sm">
                  <Intl
                    en="Complete e-learning platform with catalog, video lessons, exams, certifications, and Stripe Checkout payment."
                    pt="Plataforma de e-learning completa com catálogo, videoaulas, provas, certificações e pagamento via Stripe."
                  />
                </Text>
                <Group gap={4}>
                  <Badge size="xs" variant="outline" color="gray">Next.js</Badge>
                  <Badge size="xs" variant="outline" color="gray">Stripe</Badge>
                  <Badge size="xs" variant="outline" color="gray">Airtable</Badge>
                </Group>
              </Box>
            </GlassCard>
          </SimpleGrid>

          {/* ── ARCHITECTURE LABS ── */}
          <Box mb="xl">
            <Text size="sm" c="dimmed" mb="md" ta="center" style={{ maxWidth: 600, margin: '0 auto' }}>
              <Intl
                en="The projects below are R&D — built to stress-test architecture patterns, offline-first strategies, and AI integrations before applying them in client work."
                pt="Os projetos abaixo são P&D — construídos para testar padrões de arquitetura, estratégias offline-first e integrações com IA antes de aplicá-los em projetos de clientes."
              />
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
              {/* Grimoire */}
              <GlassCard padding={0} style={{ overflow: 'hidden', opacity: 0.85 }}>
                <Box style={{ position: 'relative', height: 180, background: 'rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                  <Image src="/portfolio/grimoire/cards.png" height={180} fit="contain" alt="Grimoire RPG" />
                </Box>
                <Box p="lg">
                  <Group justify="space-between" mb="xs">
                    <Text fw={700} size="sm">Grimoire — RPG Companion</Text>
                    <Badge variant="light" color="violet" size="xs"><Intl en="R&D" pt="P&D" /></Badge>
                  </Group>
                  <Text size="xs" c="dimmed" mb="sm">
                    <Intl
                      en="Hundreds of interconnected entities, full offline capability, complex state trees. The stress-test that validated the framework's architecture for production use."
                      pt="Centenas de entidades interconectadas, funcionamento 100% offline, árvores de estado complexas. O stress-test que validou a arquitetura da framework para uso em produção."
                    />
                  </Text>
                  <Group gap={4}>
                    <Badge size="xs" variant="outline" color="gray">React</Badge>
                    <Badge size="xs" variant="outline" color="gray">IndexedDB</Badge>
                    <Badge size="xs" variant="outline" color="gray">PWA</Badge>
                  </Group>
                </Box>
              </GlassCard>

              {/* Easy AI Diary */}
              <GlassCard padding={0} style={{ overflow: 'hidden', opacity: 0.85 }}>
                <Box style={{ position: 'relative', height: 180, background: 'rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                  <Image src="/portfolio/easyaidiarychat/chat.png" height={180} fit="contain" alt="Easy AI Diary" />
                </Box>
                <Box p="lg">
                  <Group justify="space-between" mb="xs">
                    <Text fw={700} size="sm">Easy AI Diary — AI Journal</Text>
                    <Badge variant="light" color="pink" size="xs"><Intl en="R&D" pt="P&D" /></Badge>
                  </Group>
                  <Text size="xs" c="dimmed" mb="sm">
                    <Intl
                      en="Local-first PWA with Gemini AI for conversational insights. Zero server dependency for personal data. The testbed for AI integration patterns used in client projects."
                      pt="PWA local-first com Gemini AI para insights conversacionais. Zero dependência de servidor para dados pessoais. O laboratório para padrões de integração com IA usados em projetos de clientes."
                    />
                  </Text>
                  <Group gap={4}>
                    <Badge size="xs" variant="outline" color="gray">Gemini AI</Badge>
                    <Badge size="xs" variant="outline" color="gray">IndexedDB</Badge>
                    <Badge size="xs" variant="outline" color="gray">PWA</Badge>
                  </Group>
                </Box>
              </GlassCard>
            </SimpleGrid>
          </Box>

          <Box mt="xl" style={{ textAlign: 'center' }}>
            <Button
              variant="light"
              color="violet"
              size="md"
              component="a"
              href="/forms-demo"
              rightSection={<IconArrowRight size={16} />}
            >
              <Intl en="See a Live Technical Demo" pt="Ver uma Demo Técnica ao Vivo" />
            </Button>
          </Box>
        </Box>

        <Divider mb={120} label={<Intl en="How It Works" pt="Como Funciona" />} labelPosition="center" />

        {/* ========== PROCESS ========== */}
        <Box mb={120}>
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <Title order={2} mb="sm" fz={{ base: rem(28), sm: rem(36) }}>
              <Intl en="Clear process. No mysteries." pt="Processo claro. Sem mistérios." />
            </Title>
            <Text size="lg" c="dimmed">
              <Intl
                en="From first contact to delivered product. The client always knows where things stand and what comes next."
                pt="Do primeiro contato ao produto entregue. O cliente sempre sabe onde as coisas estão e qual o próximo passo."
              />
            </Text>
          </Box>

          <Box style={{ maxWidth: 700, margin: '0 auto' }}>
            <Timeline active={-1} bulletSize={40} lineWidth={2} color="violet">
              <Timeline.Item bullet={<IconMessage size={20} />} title={<Text fw={700}><Intl en="1. Strategic Alignment" pt="1. Alinhamento Estratégico" /></Text>}>
                <Text c="dimmed" size="sm" mt={4}>
                  <Intl
                    en="A deep dive into your business model and strategy. We don't just talk code; we talk about ROI and the long-term value of the asset we are building."
                    pt="Um mergulho profundo no seu modelo de negócio e estratégia. Não falamos apenas de código; falamos de ROI e do valor de longo prazo do ativo que estamos construindo."
                  />
                </Text>
              </Timeline.Item>

              <Timeline.Item bullet={<IconBulb size={20} />} title={<Text fw={700}><Intl en="2. Specs & Commitment" pt="2. Specs e Comprometimento" /></Text>}>
                <Text c="dimmed" size="sm" mt={4}>
                  <Intl
                    en="You provide the technical specifications and the business strategy. This commitment ensures we are building a genuine asset. I apply high-end AI tech to map and prepare the architecture."
                    pt="Você fornece as especificações técnicas e a estratégia do negócio. Esse comprometimento garante que estamos construindo um ativo real. Eu aplico tecnologia de I.A. de ponta para mapear e preparar a arquitetura."
                  />
                </Text>
              </Timeline.Item>

              <Timeline.Item bullet={<IconCode size={20} />} title={<Text fw={700}><Intl en="3. Development" pt="3. Desenvolvimento" /></Text>}>
                <Text c="dimmed" size="sm" mt={4}>
                  <Intl
                    en="The project is built with regular progress updates. The app is always available for the client to test and provide real-time feedback."
                    pt="O projeto é construído com atualizações regulares de progresso. O app fica sempre disponível para o cliente testar e dar feedback em tempo real."
                  />
                </Text>
              </Timeline.Item>

              <Timeline.Item bullet={<IconDeviceLaptop size={20} />} title={<Text fw={700}><Intl en="4. Ownership Transfer" pt="4. Transferência de Propriedade" /></Text>}>
                <Text c="dimmed" size="sm" mt={4}>
                  <Intl
                    en="The product is yours. You receive the full source code, the framework documentation, and the infrastructure access. No hidden parts. You are free to move forward as you wish."
                    pt="O produto é seu. Você recebe o código-fonte completo, a documentação da framework e o acesso à infraestrutura. Sem partes ocultas. Você é livre para seguir como desejar."
                  />
                </Text>
              </Timeline.Item>

              <Timeline.Item bullet={<IconHeadset size={20} />} title={<Text fw={700}><Intl en="5. Consultancy & Evolution" pt="5. Consultoria e Evolução" /></Text>}>
                <Text c="dimmed" size="sm" mt={4}>
                  <Intl
                    en="The project enters a continuous maintenance and evolution phase. My monthly consultancy ensures the app is always updated, secure, and growing alongside your business."
                    pt="O projeto entra em fase de manutenção e evolução contínua. Minha consultoria mensal garante que o app esteja sempre atualizado, seguro e crescendo junto com seu negócio."
                  />
                </Text>
              </Timeline.Item>
            </Timeline>
          </Box>
        </Box>

        <Divider mb={120} label={<Intl en="Investment" pt="Investimento" />} labelPosition="center" />

        {/* ========== PRICING ========== */}
        <Box mb={120} id="pricing">
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <Title order={2} mb="sm" fz={{ base: rem(28), sm: rem(36) }}>
              <Intl en="The AI Advantage." pt="A Vantagem da I.A." />
            </Title>
            <Text size="lg" c="dimmed">
              <Intl
                en="State-of-the-art tech, zero barrier. I'm providing the infrastructure and the build. You provide the specs and the drive to win."
                pt="Tecnologia de ponta, barreira zero. Eu forneço a infraestrutura e a construção. Você fornece as especificações e o desejo de vencer."
              />
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <GlassCard>
              <Badge color="cyan" mb="md"><Intl en="Low Friction" pt="Baixa Fricção" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Free App Development" pt="Desenvolvimento Gratuito" /></Text>
              <Text size="sm" c="dimmed" mb="lg" style={{ minHeight: 50 }}>
                <Intl
                  en="I'll build your application at zero cost provided you have a genuine interest in evolving the product via the monthly consultancy partnership."
                  pt="Eu construo seu aplicativo com custo zero de desenvolvimento, desde que haja um interesse genuíno em evoluir o produto através da nossa parceria de consultoria mensal."
                />
              </Text>
              <Text fw={900} fz={32} mb="md">
                <Intl en="$0" pt="R$ 0" />
              </Text>
              <Text size="xs" c="dimmed" mb="md"><Intl en="For genuine project interests" pt="Para interesses genuínos no projeto" /></Text>
              <Button fullWidth variant="light" color="cyan" radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Discuss Your App" pt="Discutir Meu App" />
              </Button>
            </GlassCard>

            <GlassCard style={{ border: '1px solid rgba(121, 80, 242, 0.3)', background: 'rgba(121, 80, 242, 0.05)' }}>
              <Badge color="violet" mb="md"><Intl en="Ongoing Evolution" pt="Evolução Contínua" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Monthly Consultancy" pt="Consultoria Mensal" /></Text>
              <Text size="sm" c="dimmed" mb="lg" style={{ minHeight: 50 }}>
                <Intl
                  en="Continuous maintenance, technical updates, and constant evolution of your app. Value is negotiated based on project complexity."
                  pt="Manutenção contínua, atualizações técnicas e evolução constante do seu aplicativo. Valor a negociar conforme a complexidade."
                />
              </Text>
              <Text fw={700} fz={24} mb="md">
                <Intl en="To be negotiated" pt="Valor a negociar" />
              </Text>
              <Text size="xs" c="dimmed" mb="md"><Intl en="Includes hosting & support" pt="Inclui hospedagem e suporte" /></Text>
              <Button fullWidth variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Check Values" pt="Verificar Valores" />
              </Button>
            </GlassCard>

            <GlassCard>
              <Badge color="green" mb="md"><Intl en="Full Scale" pt="Escala Completa" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Strategic Partnership" pt="Parceria Estratégica" /></Text>
              <Text size="sm" c="dimmed" mb="lg" style={{ minHeight: 50 }}>
                <Intl
                  en="For larger projects that need higher availability, complex infrastructure, or dedicated engineering teams. A complete technical partner for your business."
                  pt="Para projetos maiores que precisam de alta disponibilidade, infraestrutura complexa ou times dedicados. Um parceiro técnico completo para o seu negócio."
                />
              </Text>
              <Text fw={700} fz={rem(24)} mb="md">
                <Intl en="Custom Contract" pt="Contrato Customizado" />
              </Text>
              <Text size="xs" c="dimmed" mb="md"><Intl en="CTO-level technical management" pt="Gestão técnica nível CTO" /></Text>
              <Button fullWidth variant="light" color="green" radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Talk About Partnership" pt="Conversar Sobre Parceria" />
              </Button>
            </GlassCard>
          </SimpleGrid>
        </Box>

        {/* ========== TECH STACK (Compact) ========== */}
        <Box mb={120}>
          <Box mb="xl" style={{ textAlign: 'center' }}>
            <Text fw={700} size="sm" c="dimmed" tt="uppercase" mb="xs"><Intl en="Technologies" pt="Tecnologias" /></Text>
          </Box>
          <Group justify="center" gap="lg" style={{ opacity: 0.5 }}>
            <Tooltip label="TypeScript"><SiTypescript size={28} /></Tooltip>
            <Tooltip label="React"><SiReact size={28} /></Tooltip>
            <Tooltip label="Next.js"><SiNextdotjs size={28} /></Tooltip>
            <Tooltip label="Node.js"><SiNodedotjs size={28} /></Tooltip>
            <Tooltip label="PostgreSQL"><SiPostgresql size={28} /></Tooltip>
            <Tooltip label="MongoDB"><SiMongodb size={28} /></Tooltip>
            <Tooltip label="Firebase"><SiFirebase size={28} /></Tooltip>
            <Tooltip label="Google Cloud"><SiGooglecloud size={28} /></Tooltip>
            <Tooltip label="Stripe"><SiStripe size={28} /></Tooltip>
            <Tooltip label="Airtable"><SiAirtable size={28} /></Tooltip>
            <Tooltip label="Docker"><SiDocker size={28} /></Tooltip>
            <Tooltip label="Vercel"><SiVercel size={28} /></Tooltip>
            <Tooltip label="Python"><SiPython size={28} /></Tooltip>
          </Group>
        </Box>

        <Divider mb={80} />

        {/* ========== CONTACT CTA ========== */}
        <Box id="contact" py={80} style={{ textAlign: 'center' }}>
          <Title order={1} mb="md" fz={{ base: rem(32), sm: rem(44) }}>
            <Intl
              en={<>Ready to build <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>something real?</Text></>}
              pt={<>Pronto pra construir <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>algo de verdade?</Text></>}
            />
          </Title>
          <Text mb={40} c="dimmed" size="lg" style={{ maxWidth: 600, margin: '0 auto 40px' }}>
            <Intl
              en="No commitment. Just a conversation about the project. If this expertise can help, that will be made clear. If it can't, that will be said too."
              pt="Sem compromisso. Apenas uma conversa sobre o projeto. Se essa expertise pode ajudar, ficará claro. Se não puder, será dito também."
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
            <Button
              size="md"
              radius="md"
              variant="subtle"
              color="gray"
              leftSection={<FaEnvelope size={16} />}
              component="a"
              href="mailto:icaro@asasvirtuais.dev"
            >
              icaro@asasvirtuais.dev
            </Button>
          </Stack>
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
