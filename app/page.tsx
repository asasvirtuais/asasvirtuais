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
  Box,
  ThemeIcon,
  Divider,
  Anchor,
  ActionIcon,
  Tooltip,
  rem,
} from '@mantine/core'
import {
  FaGithub,
  FaLinkedin,
  FaFeatherAlt,
  FaArrowRight,
  FaEnvelope,
  FaFileDownload,
  FaCalendarCheck,
  FaKey,
  FaPlug,
  FaInfinity,
} from 'react-icons/fa'

import { IntlProvider, Intl, LanguageToggle } from './IntlProvider'
import { GlassCard } from '@/components/ui/glass-card'
import { ColorSchemeToggle } from '@/components/ui/color-scheme-toggle'
import { gradientText, gradientFill } from '@/components/ui/palette'

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
          background: 'radial-gradient(circle, var(--site-glow-sun) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, var(--site-glow-sea) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <Container size="lg" pt={40} style={{ position: 'relative', zIndex: 1 }}>
        {/* Header/Nav */}
        <Group justify="space-between" mb={80}>
          <Group gap="xs">
            <ThemeIcon size="xl" radius="md" variant="gradient" gradient={gradientFill}>
              <FaFeatherAlt size={20} />
            </ThemeIcon>
            <Text fw={800} size="xl" style={{ letterSpacing: '-0.5px' }}>
              Asas Virtuais
            </Text>
          </Group>
          <Group gap="md">
            <LanguageToggle />
            <Intl
              en={<ColorSchemeToggle />}
              pt={<ColorSchemeToggle lightLabel="Modo claro" darkLabel="Modo escuro" />}
            />
          </Group>
        </Group>

        {/* ========== HERO ========== */}
        <Box mb={120} mt={60} style={{ maxWidth: 820 }}>
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
              en={<>The software your business needs, <Text span variant="gradient" gradient={gradientText} inherit>ready in one week.</Text></>}
              pt={<>O sistema que o seu negócio precisa, <Text span variant="gradient" gradient={gradientText} inherit>pronto em uma semana.</Text></>}
            />
          </Title>
          <Stack gap="xl">
            <Text size="xl" style={{ lineHeight: 1.6, fontWeight: 500 }}>
              <Intl
                en="Custom web software for small businesses, for under R$ 2,000. Connected to the tools you already use, and the code is yours when we deliver."
                pt="Software sob medida para pequenos negócios, por menos de R$ 2.000. Conectado às ferramentas que você já usa, e o código é seu na entrega."
              />
            </Text>
            <Group gap="md" mt="md">
              <Button
                size="lg"
                radius="md"
                variant="gradient"
                gradient={gradientFill}
                rightSection={<FaArrowRight size={16} />}
                component="a"
                href={CONTACT}
              >
                <Intl en="Get a quote" pt="Pedir um orçamento" />
              </Button>
              <Button size="lg" radius="md" variant="default" component="a" href="#como-funciona">
                <Intl en="How it works" pt="Como funciona" />
              </Button>
            </Group>
          </Stack>
        </Box>

        {/* ========== PROMISES ========== */}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb={140}>
          <Pledge
            icon={<FaCalendarCheck size={18} />}
            title={<Intl en="Delivered in one week" pt="Entrega em uma semana" />}
            text={<Intl en="From the first conversation to the system running, in days, not months." pt="Da primeira conversa ao sistema funcionando, em dias, não em meses." />}
          />
          <Pledge
            icon={<FaKey size={18} />}
            title={<Intl en="100% yours" pt="100% seu" />}
            text={<Intl en="You get the full code. Nothing ties you to us: take it to any other professional whenever you want." pt="Você recebe o código completo. Nada te prende à gente: pode levá-lo para qualquer outro profissional quando quiser." />}
          />
          <Pledge
            icon={<FaPlug size={18} />}
            title={<Intl en="Works with what you already use" pt="Funciona com o que você já usa" />}
            text={<Intl en="Payments, spreadsheets, calendars, invoicing, messaging: if it has an integration, we connect it." pt="Pagamentos, planilhas, agenda, emissão de notas, mensagens: se tem integração, a gente conecta." />}
          />
          <Pledge
            icon={<FaInfinity size={18} />}
            title={<Intl en="No charge per feature" pt="Sem cobrança por funcionalidade" />}
            text={<Intl en="The price is set up front. You don't pay extra for each screen or button." pt="O preço é fechado antes de começar. Você não paga a mais por cada tela ou botão." />}
          />
        </SimpleGrid>

        <Divider mb={120} label={<Intl en="What we build" pt="O que fazemos" />} labelPosition="center" />

        {/* ========== WHAT WE BUILD ========== */}
        <Box mb={140}>
          <Title order={2} mb="md" fz={rem(28)} style={{ maxWidth: 700 }}>
            <Intl en="If it's eating your time today, it can probably be a system." pt="Se hoje isso toma o seu tempo, provavelmente dá para virar um sistema." />
          </Title>
          <Text size="lg" c="dimmed" mb={48} style={{ lineHeight: 1.7, maxWidth: 700 }}>
            <Intl
              en="A few examples of what we can build:"
              pt="Alguns exemplos do que dá para fazer:"
            />
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            <Idea title={<Intl en="Online booking" pt="Agendamento online" />} text={<Intl en="Clients pick a time on their own, and you stop scheduling over the phone." pt="O cliente escolhe o horário sozinho, e você para de marcar por telefone." />} />
            <Idea title={<Intl en="Orders and quotes" pt="Pedidos e orçamentos" />} text={<Intl en="Customers build their order and see the price on the spot." pt="O cliente monta o pedido e vê o preço na hora." />} />
            <Idea title={<Intl en="Client area" pt="Área do cliente" />} text={<Intl en="A place for your clients to log in, see their history and download files." pt="Um lugar para o seu cliente entrar, ver o histórico e baixar arquivos." />} />
            <Idea title={<Intl en="Internal dashboard" pt="Painel de gestão" />} text={<Intl en="Sales, inventory or services in one screen, instead of five spreadsheets." pt="Vendas, estoque ou atendimentos em uma tela só, no lugar de cinco planilhas." />} />
            <Idea title={<Intl en="Courses and members" pt="Cursos e membros" />} text={<Intl en="Sell and deliver your content on your own platform." pt="Venda e entregue o seu conteúdo em uma plataforma sua." />} />
            <Idea title={<Intl en="Automations" pt="Automações" />} text={<Intl en="The copy-and-paste between systems you do every day, done by itself." pt="O copia e cola entre sistemas que você faz todo dia, feito sozinho." />} />
          </SimpleGrid>
        </Box>

        <Divider mb={120} label={<Intl en="How it works" pt="Como funciona" />} labelPosition="center" />

        {/* ========== HOW IT WORKS ========== */}
        <Box id="como-funciona" mb={140} style={{ maxWidth: 800 }}>
          <Stack gap={48}>
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
          </Stack>

          <GlassCard mt={64}>
            <Title order={3} mb="sm" fz={rem(22)}>
              <Intl en="How can it be this fast and this affordable?" pt="Como dá para ser tão rápido e tão acessível?" />
            </Title>
            <Text c="dimmed" style={{ lineHeight: 1.7 }}>
              <Intl
                en="We built our own production line with artificial intelligence. It does the repetitive work that used to take weeks, following a method we developed and refined over years of projects. Every system is planned and reviewed by an experienced engineer before it reaches you."
                pt="Montamos uma linha de produção própria com inteligência artificial. Ela faz o trabalho repetitivo que antes levava semanas, seguindo um método que desenvolvemos e refinamos em anos de projetos. Todo sistema é planejado e revisado por um engenheiro experiente antes de chegar até você."
              />
            </Text>
          </GlassCard>
        </Box>

        {/* ========== WHO ========== */}
        <GlassCard mb={120} style={{ maxWidth: 800 }}>
          <Text fw={800} size="lg" mb="xs">
            <Intl en="Who's behind it" pt="Quem está por trás" />
          </Text>
          <Text c="dimmed" mb="lg" style={{ lineHeight: 1.7 }}>
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
              <ActionIcon component="a" href="https://linkedin.com/in/asasvirtuais" target="_blank" variant="subtle" color="gray" size="lg">
                <FaLinkedin size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="GitHub">
              <ActionIcon component="a" href="https://github.com/asasvirtuais" target="_blank" variant="subtle" color="gray" size="lg">
                <FaGithub size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </GlassCard>

        <Divider mb={120} label={<Intl en="Ícaro's past projects" pt="Projetos anteriores do Ícaro" />} labelPosition="center" />

        {/* ========== PAST WORK ========== */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mb={140}>
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

        {/* ========== CONTACT ========== */}
        <Box id="contato" py={80} style={{ textAlign: 'center' }}>
          <Title order={1} mb="md" fz={{ base: rem(32), sm: rem(42) }}>
            <Intl
              en={<>Tell us what your business <Text span variant="gradient" gradient={gradientText} inherit>needs.</Text></>}
              pt={<>Conta para a gente o que o seu negócio <Text span variant="gradient" gradient={gradientText} inherit>precisa.</Text></>}
            />
          </Title>
          <Text mb={40} c="dimmed" size="lg" style={{ maxWidth: 650, margin: '0 auto 40px' }}>
            <Intl
              en="We reply with a fixed-price proposal. No commitment."
              pt="A gente responde com uma proposta de preço fechado. Sem compromisso."
            />
          </Text>
          <Stack align="center" gap="md">
            <Button
              size="xl"
              radius="md"
              variant="gradient"
              gradient={gradientFill}
              leftSection={<FaEnvelope size={18} />}
              component="a"
              href={CONTACT}
            >
              <Intl en="Get a quote" pt="Pedir um orçamento" />
            </Button>
            <Anchor href={CONTACT} c="dimmed" size="sm">icaro@asasvirtuais.dev</Anchor>
          </Stack>
        </Box>

        {/* Footer */}
        <Divider mb="xl" />
        <Group justify="space-between" pb="xl">
          <Text size="sm" c="dimmed">© 2026 Asas Virtuais</Text>
          <Group gap="md">
            <Anchor href="https://linkedin.com/in/asasvirtuais" target="_blank" c="dimmed" size="sm">LinkedIn</Anchor>
            <Anchor href="https://github.com/asasvirtuais" target="_blank" c="dimmed" size="sm">GitHub</Anchor>
          </Group>
        </Group>
      </Container>
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

function Pledge({ icon, title, text }: { icon: React.ReactNode, title: React.ReactNode, text: React.ReactNode }) {
  return (
    <GlassCard>
      <Group gap="sm" mb="xs" wrap="nowrap">
        <ThemeIcon size="lg" radius="md" variant="gradient" gradient={gradientFill}>{icon}</ThemeIcon>
        <Text fw={800} size="lg">{title}</Text>
      </Group>
      <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>{text}</Text>
    </GlassCard>
  )
}

function Idea({ title, text }: { title: React.ReactNode, text: React.ReactNode }) {
  return (
    <Box style={{ borderLeft: '2px solid var(--site-accent-line)', paddingLeft: rem(16) }}>
      <Text fw={700} mb={4}>{title}</Text>
      <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>{text}</Text>
    </Box>
  )
}

function Step({ n, title, text }: { n: string, title: React.ReactNode, text: React.ReactNode }) {
  return (
    <Group align="flex-start" gap="lg" wrap="nowrap">
      <Text fw={900} fz={rem(32)} lh={1} variant="gradient" gradient={gradientText} style={{ minWidth: rem(28) }}>{n}</Text>
      <Box>
        <Text fw={800} size="lg" mb={4}>{title}</Text>
        <Text c="dimmed" style={{ lineHeight: 1.7 }}>{text}</Text>
      </Box>
    </Group>
  )
}

function Work({ image, alt, title, client, text }: { image: string, alt: string, title: React.ReactNode, client: React.ReactNode, text: React.ReactNode }) {
  return (
    <GlassCard padding={0} style={{ overflow: 'hidden' }}>
      <Box style={{ background: 'var(--site-image-well)', aspectRatio: '16 / 10', overflow: 'hidden' }}>
        <Image src={image} alt={alt} h="100%" w="100%" fit="cover" style={{ objectPosition: 'top' }} />
      </Box>
      <Box p="lg">
        <Text fw={800} size="lg">{title}</Text>
        <Text size="xs" c="dimmed" mb="sm">{client}</Text>
        <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>{text}</Text>
      </Box>
    </GlassCard>
  )
}
