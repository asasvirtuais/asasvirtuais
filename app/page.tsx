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
            <Eyebrow><Intl en="Custom software development" pt="Desenvolvimento de software sob medida" /></Eyebrow>
            <Title order={1} fz={{ base: rem(32), sm: rem(40), md: rem(46) }} lh={1.12} fw={800} mb="lg" style={{ letterSpacing: '-0.02em' }}>
              <Intl
                en={<>Custom software for small businesses, <Text span c="var(--site-accent)" inherit>with short timelines and a clear scope.</Text></>}
                pt={<>Sistemas sob medida para pequenas empresas, <Text span c="var(--site-accent)" inherit>com prazos curtos e escopo claro.</Text></>}
              />
            </Title>
            <Text size="lg" c="var(--site-text-body)" lh={1.65} mb="xl" maw={540}>
              <Intl
                en="We build web systems that integrate with the tools you already use. Scope, timeline and cost are agreed before work begins, and the source code is handed over to you at the end of the project."
                pt="Desenvolvemos sistemas web integrados às ferramentas que você já utiliza. Escopo, prazo e valor são definidos antes do início, e o código-fonte é entregue a você ao final do projeto."
              />
            </Text>
            <Group gap="sm" mb="xl">
              <Button size="lg" radius="md" rightSection={<FaArrowRight size={14} />} component="a" href={CONTACT}>
                <Intl en="Request a quote" pt="Solicitar orçamento" />
              </Button>
              <Button size="lg" radius="md" variant="default" component="a" href="#como-funciona">
                <Intl en="How we work" pt="Como trabalhamos" />
              </Button>
            </Group>
            <Group gap="lg">
              <Check><Intl en="Scope and cost agreed upfront" pt="Escopo e valor definidos antes do início" /></Check>
              <Check><Intl en="Source code handed over" pt="Código-fonte entregue ao cliente" /></Check>
              <Check><Intl en="Integrated with your tools" pt="Integração com as suas ferramentas" /></Check>
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
            <Stat value={<Intl en="7 years" pt="7 anos" />} label={<Intl en="of software development" pt="de experiência em desenvolvimento" />} />
            <Stat value="Top Rated" label={<Intl en="on Upwork" pt="no Upwork" />} />
            <Stat value={<Intl en="Brazil & US" pt="Brasil e EUA" />} label={<Intl en="clients served" pt="clientes atendidos" />} />
            <Stat value={<Intl en="1 week" pt="1 semana" />} label={<Intl en="typical delivery time" pt="prazo típico de entrega" />} />
          </SimpleGrid>
        </Container>
      </Box>

      {/* ========== PROMISES ========== */}
      <Section>
        <SectionHeading
          eyebrow={<Intl en="Why work with us" pt="Diferenciais" />}
          title={<Intl en="A transparent process, from first contact to delivery." pt="Um processo transparente, do primeiro contato à entrega." />}
        />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          <Feature
            icon={<FaCalendarCheck size={18} />}
            title={<Intl en="Short timelines" pt="Prazos curtos" />}
            text={<Intl en="Projects are planned to go live in days, not months." pt="Projetos planejados para entrar em produção em dias, não em meses." />}
          />
          <Feature
            icon={<FaKey size={18} />}
            title={<Intl en="The code is yours" pt="O código é seu" />}
            text={<Intl en="You receive the complete source code and every access. Maintaining or extending the system does not depend on us." pt="Você recebe o código-fonte completo e todos os acessos. A manutenção e a evolução do sistema não dependem da Asas Virtuais." />}
          />
          <Feature
            icon={<FaPlug size={18} />}
            title={<Intl en="Integrations" pt="Integrações" />}
            text={<Intl en="Payment providers, spreadsheets, calendars, invoicing and messaging, wherever an integration is available." pt="Meios de pagamento, planilhas, agendas, emissão de notas fiscais e mensageria, sempre que houver integração disponível." />}
          />
          <Feature
            icon={<FaInfinity size={18} />}
            title={<Intl en="Defined scope" pt="Escopo definido" />}
            text={<Intl en="Features are defined with you and recorded in the proposal, with a fixed cost agreed before development begins." pt="As funcionalidades são definidas com você e registradas na proposta, com valor fechado antes do início do desenvolvimento." />}
          />
        </SimpleGrid>
      </Section>

      {/* ========== WHAT WE BUILD ========== */}
      <Section id="servicos" band>
        <SectionHeading
          eyebrow={<Intl en="Services" pt="Serviços" />}
          title={<Intl en="Systems for the processes that take up your team's time." pt="Sistemas para os processos que hoje consomem o tempo da sua equipe." />}
          description={<Intl en="Some examples of what we build:" pt="Alguns exemplos do que desenvolvemos:" />}
        />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          <Service icon={<FaCalendarAlt size={16} />} title={<Intl en="Online booking" pt="Agendamento online" />} text={<Intl en="Clients book appointments directly, without scheduling by phone." pt="Clientes reservam horários diretamente, sem depender de contato por telefone." />} />
          <Service icon={<FaFileInvoiceDollar size={16} />} title={<Intl en="Orders and quotes" pt="Pedidos e orçamentos" />} text={<Intl en="Customers put together their order and see the price immediately." pt="Clientes montam o pedido e consultam o valor no mesmo momento." />} />
          <Service icon={<FaUserCircle size={16} />} title={<Intl en="Client area" pt="Área do cliente" />} text={<Intl en="Individual access for clients to review their history, documents and files." pt="Acesso individual para clientes consultarem histórico, documentos e arquivos." />} />
          <Service icon={<FaChartBar size={16} />} title={<Intl en="Internal dashboard" pt="Painel de gestão" />} text={<Intl en="Sales, inventory and services in a single dashboard, replacing scattered spreadsheets." pt="Vendas, estoque e atendimentos reunidos em um único painel, no lugar de várias planilhas." />} />
          <Service icon={<FaGraduationCap size={16} />} title={<Intl en="Courses and member areas" pt="Cursos e áreas de membros" />} text={<Intl en="Sell and deliver content on a platform you own." pt="Venda e distribuição de conteúdo em uma plataforma própria." />} />
          <Service icon={<FaSyncAlt size={16} />} title={<Intl en="Automations" pt="Automações" />} text={<Intl en="Repetitive tasks between systems, carried out automatically." pt="Tarefas repetitivas entre sistemas executadas automaticamente." />} />
        </SimpleGrid>
      </Section>

      {/* ========== HOW IT WORKS ========== */}
      <Section id="como-funciona">
        <SectionHeading
          eyebrow={<Intl en="Process" pt="Processo" />}
          title={<Intl en="Four steps, from discovery to delivery." pt="Quatro etapas, do diagnóstico à entrega." />}
        />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" mb="xl">
          <Step
            n="1"
            title={<Intl en="Discovery" pt="Diagnóstico" />}
            text={<Intl en="A conversation to understand how your business works today and what needs to change. No technical knowledge is required." pt="Uma conversa para entender como o seu negócio funciona hoje e o que precisa mudar. Não é necessário conhecimento técnico." />}
          />
          <Step
            n="2"
            title={<Intl en="Proposal" pt="Proposta" />}
            text={<Intl en="You receive the scope, timeline and cost in writing before any payment." pt="Você recebe o escopo, o prazo e o valor por escrito, antes de qualquer pagamento." />}
          />
          <Step
            n="3"
            title={<Intl en="Development" pt="Desenvolvimento" />}
            text={<Intl en="You follow the progress and can request adjustments along the way." pt="Você acompanha o andamento e pode solicitar ajustes ao longo do processo." />}
          />
          <Step
            n="4"
            title={<Intl en="Delivery" pt="Entrega" />}
            text={<Intl en="The system goes live and you receive the source code and every access." pt="O sistema é publicado e você recebe o código-fonte e todos os acessos." />}
          />
        </SimpleGrid>

        <GlassCard style={{ borderLeft: '3px solid var(--site-blue)' }}>
          <Title order={3} mb="xs" fz={rem(20)}>
            <Intl en="Why the timelines are short" pt="Por que os prazos são curtos" />
          </Title>
          <Text c="var(--site-text-body)" lh={1.7}>
            <Intl
              en="We use our own AI-assisted development process to automate the repetitive parts of the work. It follows a method refined over years of client projects, and every system is planned and reviewed by an experienced software engineer before delivery."
              pt="Utilizamos um processo de desenvolvimento próprio, apoiado por inteligência artificial, que automatiza as etapas repetitivas do trabalho. Ele segue um método refinado ao longo de anos de projetos, e todo sistema é planejado e revisado por um engenheiro de software experiente antes da entrega."
            />
          </Text>
        </GlassCard>
      </Section>

      {/* ========== WORK ========== */}
      <Section id="portfolio" band>
        <SectionHeading
          eyebrow={<Intl en="Work" pt="Portfólio" />}
          title={<Intl en="Projects in production." pt="Projetos em produção." />}
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
                  <Intl en="A complete platform, developed in ten working days." pt="Uma plataforma completa, desenvolvida em dez dias úteis." />
                </Title>
                <Text c="var(--site-text-body)" mb="xl" lh={1.7}>
                  <Intl
                    en="User accounts, groups with roles and permissions, and AI-generated content, running in production. Since launch, the platform has gone through five structural changes, each completed in a day or less without regressions."
                    pt="Contas de usuário, grupos com papéis e permissões e conteúdo gerado por IA, em produção. Desde o lançamento, a plataforma passou por cinco mudanças estruturais, cada uma concluída em até um dia, sem regressões."
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
          <Intl en="Previous client projects by Ícaro Capobianco" pt="Projetos anteriores de Ícaro Capobianco para clientes" />
        </Text>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          <Work
            image="/portfolio/latham-estimator/latham1.webp"
            alt="Pool price estimator"
            title={<Intl en="Online price estimator" pt="Orçamento online" />}
            client="Latham Pools (EUA)"
            text={<Intl en="Visitors choose model, size and options and receive an estimate; the company receives a qualified lead." pt="O visitante escolhe modelo, tamanho e opcionais e recebe uma estimativa; a empresa recebe um contato qualificado." />}
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
            text={<Intl en="Clients assemble their own service package and see the monthly price update in real time." pt="O cliente monta o próprio pacote de serviços e acompanha o valor mensal em tempo real." />}
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
                en="Asas Virtuais is led by Ícaro Capobianco, a software engineer with seven years of experience developing systems for clients in Brazil and the United States. He holds Top Rated status on Upwork."
                pt="A Asas Virtuais é conduzida por Ícaro Capobianco, engenheiro de software com sete anos de experiência no desenvolvimento de sistemas para clientes no Brasil e nos Estados Unidos. É Top Rated no Upwork."
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
              en={<>Let's talk about <Text span c="#fb7a2c" inherit>your project.</Text></>}
              pt={<>Vamos conversar sobre <Text span c="#fb7a2c" inherit>o seu projeto.</Text></>}
            />
          </Title>
          <Text c="#a6aab5" size="lg" mb="xl" maw={560} mx="auto">
            <Intl
              en="Describe what your business needs and we will reply with a proposal covering scope, timeline and cost, with no obligation."
              pt="Descreva o que o seu negócio precisa e responderemos com uma proposta de escopo, prazo e valor, sem compromisso."
            />
          </Text>
          <Stack align="center" gap="sm">
            <Button size="lg" radius="md" leftSection={<FaEnvelope size={16} />} component="a" href={CONTACT}>
              <Intl en="Request a quote" pt="Solicitar orçamento" />
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
            <NavLink href="#como-funciona"><Intl en="Process" pt="Processo" /></NavLink>
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
              <Intl en="Contact us" pt="Fale conosco" />
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
