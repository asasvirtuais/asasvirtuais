'use client'

import {
  Container,
  Title,
  Text,
  Group,
  Button,
  Stack,
  SimpleGrid,
  Grid,
  Image,
  Box,
  ThemeIcon,
  Anchor,
  ActionIcon,
  Tooltip,
  rem,
} from '@mantine/core'
import {
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaEnvelope,
  FaFileDownload,
  FaCalendarCheck,
  FaKey,
  FaPlug,
  FaInfinity,
  FaCheck,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaUserCircle,
  FaChartBar,
  FaGraduationCap,
  FaSyncAlt,
} from 'react-icons/fa'

import { IntlProvider, Intl, LanguageToggle } from './IntlProvider'
import { GlassCard } from '@/components/ui/glass-card'
import { ColorSchemeToggle } from '@/components/ui/color-scheme-toggle'
import { Logo } from '@/components/ui/logo'

const CV = {
  en: '/cv/Icaro-Capobianco-CV-EN.pdf',
  pt: '/cv/Icaro-Capobianco-CV-PT.pdf',
}

const CONTACT = 'mailto:icaro@asasvirtuais.dev?subject=Or%C3%A7amento'

export default function Home() {
  return (
    <IntlProvider>
      <LandingPage />
    </IntlProvider>
  )
}

function LandingPage() {
  return (
    <Box style={{ backgroundColor: 'var(--site-bg)', minHeight: '100vh', color: 'var(--site-text)', overflowX: 'hidden' }}>
      <Header />

      {/* ========== HERO ========== */}
      <Container size="lg" pt={{ base: 48, md: 88 }} pb={{ base: 64, md: 104 }}>
        <Grid gap={{ base: 48, md: 64 }} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Eyebrow><Intl en="Custom software for small businesses" pt="Software sob medida para pequenos negócios" /></Eyebrow>
            <Title order={1} fz={{ base: rem(36), sm: rem(44), md: rem(52) }} lh={1.1} fw={800} mb="lg" style={{ letterSpacing: '-0.02em' }}>
              <Intl
                en={<>The software your business needs, <Text span c="var(--site-accent)" inherit>ready in one week.</Text></>}
                pt={<>O sistema que o seu negócio precisa, <Text span c="var(--site-accent)" inherit>pronto em uma semana.</Text></>}
              />
            </Title>
            <Text size="lg" c="var(--site-text-body)" lh={1.65} mb="xl" maw={540}>
              <Intl
                en="Custom web software for under R$ 2,000. Connected to the tools you already use, and the code is yours when we deliver."
                pt="Sistemas web sob medida por menos de R$ 2.000. Conectados às ferramentas que você já usa, e o código é seu na entrega."
              />
            </Text>
            <Group gap="sm" mb="xl">
              <Button size="lg" radius="md" rightSection={<FaArrowRight size={14} />} component="a" href={CONTACT}>
                <Intl en="Get a quote" pt="Pedir um orçamento" />
              </Button>
              <Button size="lg" radius="md" variant="default" component="a" href="#como-funciona">
                <Intl en="How it works" pt="Como funciona" />
              </Button>
            </Group>
            <Group gap="lg">
              <Check><Intl en="Fixed price" pt="Preço fechado" /></Check>
              <Check><Intl en="Code delivered to you" pt="Código entregue a você" /></Check>
              <Check><Intl en="No technical knowledge needed" pt="Sem precisar entender de tecnologia" /></Check>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <BrowserFrame src="/portfolio/certworld/courses.png" alt="CertWorld" url="certworld.com" />
          </Grid.Col>
        </Grid>
      </Container>

      {/* ========== CREDENTIALS ========== */}
      <Box style={{ background: 'var(--site-band)', borderTop: '1px solid var(--site-border)', borderBottom: '1px solid var(--site-border)' }}>
        <Container size="lg" py={{ base: 32, md: 40 }}>
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
            <Stat value={<Intl en="7 years" pt="7 anos" />} label={<Intl en="building software" pt="construindo software" />} />
            <Stat value="Top Rated" label={<Intl en="on Upwork" pt="no Upwork" />} />
            <Stat value={<Intl en="Brazil & US" pt="Brasil e EUA" />} label={<Intl en="clients served" pt="clientes atendidos" />} />
            <Stat value={<Intl en="1 week" pt="1 semana" />} label={<Intl en="from conversation to launch" pt="da conversa ao sistema no ar" />} />
          </SimpleGrid>
        </Container>
      </Box>

      {/* ========== PROMISES ========== */}
      <Section>
        <SectionHeading
          eyebrow={<Intl en="Why Asas Virtuais" pt="Por que a Asas Virtuais" />}
          title={<Intl en="Fast, affordable, and truly yours." pt="Rápido, acessível e seu de verdade." />}
        />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          <Feature
            icon={<FaCalendarCheck size={18} />}
            title={<Intl en="Delivered in one week" pt="Entrega em uma semana" />}
            text={<Intl en="From the first conversation to the system running, in days, not months." pt="Da primeira conversa ao sistema funcionando, em dias, não em meses." />}
          />
          <Feature
            icon={<FaKey size={18} />}
            title={<Intl en="100% yours" pt="100% seu" />}
            text={<Intl en="You get the full code. Nothing ties you to us: take it to any other professional whenever you want." pt="Você recebe o código completo. Nada te prende à gente: pode levá-lo para qualquer outro profissional quando quiser." />}
          />
          <Feature
            icon={<FaPlug size={18} />}
            title={<Intl en="Works with what you use" pt="Funciona com o que você usa" />}
            text={<Intl en="Payments, spreadsheets, calendars, invoicing, messaging: if it has an integration, we connect it." pt="Pagamentos, planilhas, agenda, emissão de notas, mensagens: se tem integração, a gente conecta." />}
          />
          <Feature
            icon={<FaInfinity size={18} />}
            title={<Intl en="Unlimited features" pt="Funcionalidades ilimitadas" />}
            text={<Intl en="Ask for whatever your business needs. Everything is agreed in the quote, at a fixed price, before we start." pt="Peça o que o seu negócio precisar. Tudo fica combinado no orçamento, com preço fechado, antes de começar." />}
          />
        </SimpleGrid>
      </Section>

      {/* ========== WHAT WE BUILD ========== */}
      <Section id="servicos" band>
        <SectionHeading
          eyebrow={<Intl en="What we build" pt="O que fazemos" />}
          title={<Intl en="If it's eating your time today, it can probably be a system." pt="Se hoje isso toma o seu tempo, provavelmente dá para virar um sistema." />}
          description={<Intl en="A few examples of what we can build:" pt="Alguns exemplos do que dá para fazer:" />}
        />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          <Service icon={<FaCalendarAlt size={16} />} title={<Intl en="Online booking" pt="Agendamento online" />} text={<Intl en="Clients pick a time on their own, and you stop scheduling over the phone." pt="O cliente escolhe o horário sozinho, e você para de marcar por telefone." />} />
          <Service icon={<FaFileInvoiceDollar size={16} />} title={<Intl en="Orders and quotes" pt="Pedidos e orçamentos" />} text={<Intl en="Customers build their order and see the price on the spot." pt="O cliente monta o pedido e vê o preço na hora." />} />
          <Service icon={<FaUserCircle size={16} />} title={<Intl en="Client area" pt="Área do cliente" />} text={<Intl en="A place for your clients to log in, see their history and download files." pt="Um lugar para o seu cliente entrar, ver o histórico e baixar arquivos." />} />
          <Service icon={<FaChartBar size={16} />} title={<Intl en="Internal dashboard" pt="Painel de gestão" />} text={<Intl en="Sales, inventory or services in one screen, instead of five spreadsheets." pt="Vendas, estoque ou atendimentos em uma tela só, no lugar de cinco planilhas." />} />
          <Service icon={<FaGraduationCap size={16} />} title={<Intl en="Courses and members" pt="Cursos e membros" />} text={<Intl en="Sell and deliver your content on your own platform." pt="Venda e entregue o seu conteúdo em uma plataforma sua." />} />
          <Service icon={<FaSyncAlt size={16} />} title={<Intl en="Automations" pt="Automações" />} text={<Intl en="The copy-and-paste between systems you do every day, done by itself." pt="O copia e cola entre sistemas que você faz todo dia, feito sozinho." />} />
        </SimpleGrid>
      </Section>

      {/* ========== HOW IT WORKS ========== */}
      <Section id="como-funciona">
        <SectionHeading
          eyebrow={<Intl en="How it works" pt="Como funciona" />}
          title={<Intl en="From first conversation to launch in four steps." pt="Da primeira conversa ao sistema no ar em quatro passos." />}
        />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" mb="xl">
          <Step
            n="1"
            title={<Intl en="You tell us the problem" pt="Você conta o problema" />}
            text={<Intl en="A conversation about how your business works today and what needs to change. No technical knowledge needed." pt="Uma conversa sobre como o seu negócio funciona hoje e o que precisa mudar. Não precisa entender nada de tecnologia." />}
          />
          <Step
            n="2"
            title={<Intl en="Fixed-price proposal" pt="Proposta com preço fechado" />}
            text={<Intl en="You get what will be built, the deadline and the price, before paying anything." pt="Você recebe o que vai ser feito, o prazo e o preço, antes de pagar qualquer coisa." />}
          />
          <Step
            n="3"
            title={<Intl en="We build it in a week" pt="A gente constrói em uma semana" />}
            text={<Intl en="You follow along and can ask for adjustments while the system takes shape." pt="Você acompanha e pode pedir ajustes enquanto o sistema toma forma." />}
          />
          <Step
            n="4"
            title={<Intl en="It's yours" pt="É seu" />}
            text={<Intl en="The system goes live and you receive the code and every access. No strings attached." pt="O sistema vai ao ar e você recebe o código e todos os acessos. Sem amarras." />}
          />
        </SimpleGrid>

        <GlassCard style={{ borderLeft: '3px solid var(--site-blue)' }}>
          <Title order={3} mb="xs" fz={rem(20)}>
            <Intl en="How can it be this fast and this affordable?" pt="Como dá para ser tão rápido e tão acessível?" />
          </Title>
          <Text c="var(--site-text-body)" lh={1.7}>
            <Intl
              en="We built our own production line with artificial intelligence. It does the repetitive work that used to take weeks, following a method we developed and refined over years of projects. Every system is planned and reviewed by an experienced engineer before it reaches you."
              pt="Montamos uma linha de produção própria com inteligência artificial. Ela faz o trabalho repetitivo que antes levava semanas, seguindo um método que desenvolvemos e refinamos em anos de projetos. Todo sistema é planejado e revisado por um engenheiro experiente antes de chegar até você."
            />
          </Text>
        </GlassCard>
      </Section>

      {/* ========== WORK ========== */}
      <Section id="portfolio" band>
        <SectionHeading
          eyebrow={<Intl en="Work" pt="Portfólio" />}
          title={<Intl en="Real systems, in production." pt="Sistemas reais, em produção." />}
        />

        {/* Case study */}
        <GlassCard padding={0} mb="lg" style={{ overflow: 'hidden' }}>
          <Grid gap={0} align="stretch">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Box p={{ base: 'xl', md: rem(48) }} h="100%" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Text size="sm" fw={600} c="var(--site-accent)" mb="xs">
                  <Intl en="Case study · Guild RPG, our own product" pt="Estudo de caso · Guild RPG, produto próprio" />
                </Text>
                <Title order={3} mb="sm" fz={{ base: rem(24), md: rem(28) }}>
                  <Intl en="A complete platform, built in ten working days." pt="Uma plataforma completa, feita em dez dias úteis." />
                </Title>
                <Text c="var(--site-text-body)" mb="xl" lh={1.7}>
                  <Intl
                    en="User accounts, groups with roles and permissions, and AI-generated content, live in production and built by our production line. Since then it has gone through five big changes, each done in a day or less, without breaking what already worked."
                    pt="Contas de usuário, grupos com cargos e permissões e conteúdo gerado por IA, em produção e construída pela nossa linha de produção. Desde então passou por cinco grandes mudanças, cada uma feita em um dia ou menos, sem quebrar o que já funcionava."
                  />
                </Text>
                <Box>
                  <Button component="a" href="/never-broke-architecture" variant="default" radius="md" rightSection={<FaArrowRight size={12} />}>
                    <Intl en="Read the case study" pt="Ler o estudo de caso" />
                  </Button>
                </Box>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Box h="100%" mih={rem(340)} style={{ background: 'var(--site-blue-soft)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingTop: rem(40), overflow: 'hidden' }}>
                <Box w={rem(240)} style={{ borderRadius: '28px 28px 0 0', border: '8px solid #1b202c', borderBottom: 0, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.25)', maxHeight: rem(380) }}>
                  <Image src="/software/guild-rpg.png" alt="Guild RPG" w="100%" />
                </Box>
              </Box>
            </Grid.Col>
          </Grid>
        </GlassCard>

        <Text size="sm" fw={600} c="dimmed" mt={48} mb="md">
          <Intl en="Ícaro's past client projects" pt="Projetos anteriores do Ícaro para clientes" />
        </Text>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          <Work
            image="/portfolio/latham-estimator/latham1.webp"
            alt="Pool price estimator"
            title={<Intl en="Online price estimator" pt="Orçamento online" />}
            client="Latham Pools (EUA)"
            text={<Intl en="Visitors pick model, size and options and get an estimate, while the company gets a qualified lead." pt="O visitante escolhe modelo, tamanho e opcionais e recebe uma estimativa, enquanto a empresa recebe um contato qualificado." />}
          />
          <Work
            image="/portfolio/certworld/courses.png"
            alt="Online courses platform"
            title={<Intl en="Online courses platform" pt="Plataforma de cursos" />}
            client="CertWorld (EUA)"
            text={<Intl en="Course catalog, checkout, lessons and exams, in English and Spanish." pt="Catálogo de cursos, pagamento, aulas e provas, em inglês e espanhol." />}
          />
          <Work
            image="/portfolio/cardcheckout/step1.leads.PNG"
            alt="Package builder with live pricing"
            title={<Intl en="Package builder" pt="Montador de pacotes" />}
            client={<Intl en="Social media agency" pt="Agência de redes sociais" />}
            text={<Intl en="The client builds their own service package and sees the monthly price update as they go." pt="O cliente monta o próprio pacote de serviços e vê o valor mensal mudar na hora." />}
          />
        </SimpleGrid>
      </Section>

      {/* ========== WHO ========== */}
      <Section id="sobre">
        <Grid gap={{ base: 40, md: 72 }} align="center">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Box
              mx="auto"
              maw={rem(380)}
              style={{
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                background: 'linear-gradient(160deg, var(--site-blue-soft), var(--site-accent-soft))',
                border: '1px solid var(--site-border)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <Image src="/brand/icaro.webp" alt="Ícaro Capobianco" w="78%" />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Eyebrow><Intl en="Who's behind it" pt="Quem está por trás" /></Eyebrow>
            <Title order={2} fz={{ base: rem(28), md: rem(34) }} mb="md">Ícaro Capobianco</Title>
            <Text size="lg" c="var(--site-text-body)" lh={1.7} mb="xl">
              <Intl
                en="Asas Virtuais is led by Ícaro Capobianco, a software engineer with seven years of experience building systems for clients in Brazil and the United States, and Top Rated on Upwork."
                pt="A Asas Virtuais é conduzida por Ícaro Capobianco, engenheiro de software com sete anos de experiência construindo sistemas para clientes no Brasil e nos Estados Unidos, e Top Rated no Upwork."
              />
            </Text>
            <Group gap="sm">
              <Intl
                en={<CVButton href={CV.en} label="CV for hiring" />}
                pt={<CVButton href={CV.pt} label="Currículo para contratação" />}
              />
              <Tooltip label="LinkedIn">
                <ActionIcon component="a" href="https://linkedin.com/in/asasvirtuais" target="_blank" variant="default" size={36} radius="md" aria-label="LinkedIn">
                  <FaLinkedin size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="GitHub">
                <ActionIcon component="a" href="https://github.com/asasvirtuais" target="_blank" variant="default" size={36} radius="md" aria-label="GitHub">
                  <FaGithub size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Grid.Col>
        </Grid>
      </Section>

      {/* ========== CONTACT ========== */}
      <Container size="lg" id="contato" pb={{ base: 64, md: 96 }}>
        {/* Navy in both schemes, like the logo's own background; deeper in dark mode so it stands off the page */}
        <Box
          px={{ base: 'xl', md: rem(64) }}
          py={{ base: rem(48), md: rem(72) }}
          style={{ background: 'var(--site-cta-bg)', border: '1px solid var(--site-border)', borderRadius: 'var(--mantine-radius-xl)', textAlign: 'center', color: '#eef0f4' }}
        >
          <Image src="/brand/mark-dark.png" alt="" h={56} w="auto" mx="auto" mb="lg" />
          <Title order={2} c="#ffffff" mb="sm" fz={{ base: rem(28), sm: rem(36) }}>
            <Intl
              en={<>Tell us what your business <Text span c="#fb7a2c" inherit>needs.</Text></>}
              pt={<>Conta para a gente o que o seu negócio <Text span c="#fb7a2c" inherit>precisa.</Text></>}
            />
          </Title>
          <Text c="#a6aab5" size="lg" mb="xl" maw={560} mx="auto">
            <Intl
              en="We reply with a fixed-price proposal. No commitment."
              pt="A gente responde com uma proposta de preço fechado. Sem compromisso."
            />
          </Text>
          <Stack align="center" gap="sm">
            <Button size="lg" radius="md" leftSection={<FaEnvelope size={16} />} component="a" href={CONTACT}>
              <Intl en="Get a quote" pt="Pedir um orçamento" />
            </Button>
            <Anchor href={CONTACT} c="#a6aab5" size="sm">icaro@asasvirtuais.dev</Anchor>
          </Stack>
        </Box>
      </Container>

      {/* Footer */}
      <Box style={{ borderTop: '1px solid var(--site-border)' }}>
        <Container size="lg" py="xl">
          <Group justify="space-between" gap="md">
            <Group gap="md">
              <Logo h={26} />
              <Text size="sm" c="dimmed">© 2026</Text>
            </Group>
            <Group gap="lg">
              <Anchor href={CONTACT} c="dimmed" size="sm">icaro@asasvirtuais.dev</Anchor>
              <Anchor href="https://linkedin.com/in/asasvirtuais" target="_blank" c="dimmed" size="sm">LinkedIn</Anchor>
              <Anchor href="https://github.com/asasvirtuais" target="_blank" c="dimmed" size="sm">GitHub</Anchor>
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <Box
      component="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--site-header-bg)',
        backdropFilter: 'saturate(180%) blur(12px)',
        borderBottom: '1px solid var(--site-border)',
      }}
    >
      <Container size="lg" h={68}>
        <Group justify="space-between" h="100%" wrap="nowrap">
          <Anchor href="/" aria-label="Asas Virtuais" style={{ display: 'flex' }}>
            <Logo h={32} />
          </Anchor>
          <Group gap="xl" visibleFrom="md">
            <NavLink href="#servicos"><Intl en="Services" pt="Serviços" /></NavLink>
            <NavLink href="#como-funciona"><Intl en="How it works" pt="Como funciona" /></NavLink>
            <NavLink href="#portfolio"><Intl en="Work" pt="Portfólio" /></NavLink>
            <NavLink href="#sobre"><Intl en="About" pt="Sobre" /></NavLink>
          </Group>
          <Group gap="xs" wrap="nowrap">
            <LanguageToggle />
            <Intl
              en={<ColorSchemeToggle />}
              pt={<ColorSchemeToggle lightLabel="Modo claro" darkLabel="Modo escuro" />}
            />
            <Button component="a" href={CONTACT} radius="md" size="sm" visibleFrom="sm">
              <Intl en="Get a quote" pt="Pedir orçamento" />
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  )
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return <Anchor href={href} size="sm" fw={500} c="var(--site-text-body)" underline="never">{children}</Anchor>
}

function Section({ id, band, children }: { id?: string, band?: boolean, children: React.ReactNode }) {
  return (
    <Box
      component="section"
      id={id}
      py={{ base: 64, md: 96 }}
      style={{ background: band ? 'var(--site-band)' : undefined, scrollMarginTop: rem(68) }}
    >
      <Container size="lg">{children}</Container>
    </Box>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Text size="sm" fw={600} c="var(--site-accent)" tt="uppercase" mb="sm" style={{ letterSpacing: '0.08em' }}>
      {children}
    </Text>
  )
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: React.ReactNode, title: React.ReactNode, description?: React.ReactNode }) {
  return (
    <Box mb={{ base: 32, md: 48 }} maw={720}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title order={2} fz={{ base: rem(26), md: rem(34) }} lh={1.2} style={{ letterSpacing: '-0.01em' }}>{title}</Title>
      {description && <Text size="lg" c="var(--site-text-body)" mt="sm">{description}</Text>}
    </Box>
  )
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <Group gap={8} wrap="nowrap">
      <FaCheck size={12} color="var(--site-blue)" />
      <Text size="sm" c="var(--site-text-body)">{children}</Text>
    </Group>
  )
}

function Stat({ value, label }: { value: React.ReactNode, label: React.ReactNode }) {
  return (
    <Box>
      <Text ff="heading" fw={700} fz={{ base: rem(22), md: rem(26) }} c="var(--site-text-strong)" lh={1.2}>{value}</Text>
      <Text size="sm" c="dimmed">{label}</Text>
    </Box>
  )
}

function BrowserFrame({ src, alt, url }: { src: string, alt: string, url: string }) {
  return (
    <Box
      style={{
        borderRadius: 'var(--mantine-radius-lg)',
        border: '1px solid var(--site-border)',
        background: 'var(--site-card)',
        overflow: 'hidden',
        boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.35)',
      }}
    >
      <Group gap={6} px="md" h={36} style={{ borderBottom: '1px solid var(--site-border)', background: 'var(--site-band)' }} wrap="nowrap">
        <Box w={10} h={10} style={{ borderRadius: '50%', background: '#ff5f57' }} />
        <Box w={10} h={10} style={{ borderRadius: '50%', background: '#febc2e' }} />
        <Box w={10} h={10} style={{ borderRadius: '50%', background: '#28c840' }} />
        <Text size="xs" c="dimmed" mx="auto" pr={36}>{url}</Text>
      </Group>
      <Image src={src} alt={alt} w="100%" />
    </Box>
  )
}

function CVButton({ href, label }: { href: string, label: string }) {
  return (
    <Button radius="md" variant="default" leftSection={<FaFileDownload size={14} />} component="a" href={href} target="_blank">
      {label}
    </Button>
  )
}

function Feature({ icon, title, text }: { icon: React.ReactNode, title: React.ReactNode, text: React.ReactNode }) {
  return (
    <Box>
      <ThemeIcon size={44} radius="md" mb="md" style={{ background: 'var(--site-accent-soft)', color: 'var(--site-accent)' }}>{icon}</ThemeIcon>
      <Text fw={700} size="lg" mb={6}>{title}</Text>
      <Text size="sm" c="var(--site-text-body)" lh={1.7}>{text}</Text>
    </Box>
  )
}

function Service({ icon, title, text }: { icon: React.ReactNode, title: React.ReactNode, text: React.ReactNode }) {
  return (
    <GlassCard padding="lg">
      <ThemeIcon size={36} radius="md" mb="md" style={{ background: 'var(--site-blue-soft)', color: 'var(--site-blue)' }}>{icon}</ThemeIcon>
      <Text fw={700} mb={4}>{title}</Text>
      <Text size="sm" c="var(--site-text-body)" lh={1.6}>{text}</Text>
    </GlassCard>
  )
}

function Step({ n, title, text }: { n: string, title: React.ReactNode, text: React.ReactNode }) {
  return (
    <Box>
      <Box
        w={40}
        h={40}
        mb="md"
        style={{ borderRadius: '50%', border: '2px solid var(--site-accent)', color: 'var(--site-accent)', display: 'grid', placeItems: 'center' }}
      >
        <Text ff="heading" fw={700}>{n}</Text>
      </Box>
      <Text fw={700} size="lg" mb={6}>{title}</Text>
      <Text size="sm" c="var(--site-text-body)" lh={1.7}>{text}</Text>
    </Box>
  )
}

function Work({ image, alt, title, client, text }: { image: string, alt: string, title: React.ReactNode, client: React.ReactNode, text: React.ReactNode }) {
  return (
    <GlassCard padding={0} style={{ overflow: 'hidden' }}>
      <Box style={{ background: 'var(--site-image-well)', aspectRatio: '16 / 10', overflow: 'hidden', borderBottom: '1px solid var(--site-border)' }}>
        <Image src={image} alt={alt} h="100%" w="100%" fit="cover" style={{ objectPosition: 'top' }} />
      </Box>
      <Box p="lg">
        <Text fw={700} size="lg">{title}</Text>
        <Text size="xs" c="dimmed" mb="sm">{client}</Text>
        <Text size="sm" c="var(--site-text-body)" lh={1.6}>{text}</Text>
      </Box>
    </GlassCard>
  )
}
