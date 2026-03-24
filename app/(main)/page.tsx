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
              en={<>High-performance Web Development. <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>Architected for growth.</Text></>}
              pt={<>Desenvolvimento Web de alta performance. <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>Arquitetado para o crescimento.</Text></>}
            />
          </Title>
          <Stack gap="xl">
            <Text size="xl" style={{ lineHeight: 1.6, fontWeight: 500 }}>
              <Intl
                en="I built the most efficient framework on the market to eliminate technical waste and deliver results. No bureaucracy, no empty promises—just high-end engineering focused on your business goals."
                pt="Desenvolvi a framework mais eficiente do mercado para eliminar o desperdício técnico e entregar resultados reais. Sem burocracia, sem promessas vazias — apenas engenharia de ponta focada nos seus objetivos."
              />
            </Text>
            <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
              <Intl
                en="The asasvirtuais architecture is the result of 7 years of refinement, designed to be fast, scalable, and stay out of your way. I offer elite technology for partners who demand excellence."
                pt="A arquitetura asasvirtuais é o resultado de 7 anos de refinamento, desenhada para ser rápida, escalável e não atrapalhar sua evolução. Ofereço tecnologia de elite para parceiros que exigem excelência."
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
                <Intl en="Build the future" pt="Vamos construir o futuro" />
              </Button>
            </Group>
          </Stack>
        </Box>

        {/* ========== THE STATE OF THINGS ========== */}
        <Box mb={140} style={{ maxWidth: 800 }}>
          <Divider mb={80} label={<Intl en="My Core Principles" pt="Meus Princípios Fundamentais" />} labelPosition="center" />
          <Stack gap={80}>
            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Efficiency as a Standard" pt="Eficiência como Padrão" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="Software should be a multiplier, not a hidden cost. My approach is built on absolute technical transparency and clean architecture: if it's simple, it stays simple. I deliver lean, powerful systems that solve problems without creating new ones."
                  pt="Software deve ser um multiplicador, não um custo escondido. Minha abordagem é baseada em transparência técnica absoluta e arquitetura limpa: se é simples, deve continuar simples. Entrego sistemas enxutos e poderosos que resolvem problemas sem criar novos."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="High-Performance Strategy" pt="Estratégia de Alta Performance" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="Elite technology at the service of a clear vision. I provide the high-performance engine; you provide the market drive. Together, we accelerate value delivery and scale your business with structural integrity."
                  pt="Tecnologia de elite a serviço de uma visão clara. Eu entro com o motor de alta performance; você entra com a visão de mercado. Juntos, aceleramos a entrega de valor e escalamos seu negócio com integridade estrutural."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Commitment to Excellence" pt="Comprometimento com a Excelência" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="Every line of code in the asasvirtuais framework was crafted to solve real-world problems elegantly. I don't just write code; I build assets. I partner with entrepreneurs who value craft and demand the best technical foundation for their ideas."
                  pt="Cada linha de código na framework asasvirtuais foi pensada para resolver problemas reais de forma elegante. Eu não apenas escrevo código; eu construo ativos. Trabalho com empreendedores que valorizam o ofício e exigem a melhor base técnica para suas ideias."
                />
              </Text>
            </Box>
          </Stack>
        </Box>

        <Divider mb={120} label={<Intl en="Selected Partnerships" pt="Parcerias Selecionadas" />} labelPosition="center" />

        {/* ========== PORTFOLIO ========== */}
        <Box id="work" mb={140}>
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <Text size="lg" c="dimmed">
              <Intl
                en="Proven results for businesses that prioritize speed, clarity, and technical excellence."
                pt="Resultados comprovados para negócios que priorizam velocidade, clareza e excelência técnica."
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
                  <Badge variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} size="lg"><Intl en="A Great Partnership" pt="Uma Grande Parceria" /></Badge>
                  <Badge variant="light" color="blue">USA</Badge>
                </Group>
                <Text fw={800} size="xl" mb="xs">Latham Pools — Lead Qualification System</Text>
                <Text size="sm" c="dimmed" mb="md" style={{ lineHeight: 1.7 }}>
                  <Intl
                    en="We turned a complex product selection into a simple, guided path for their clients. It's not just a form; it's a way for their sales team to work better and for customers to feel understood."
                    pt="Transformamos uma seleção complexa de produtos em um caminho simples e guiado para os clientes deles. Não é apenas um formulário; é uma forma do time de vendas trabalhar melhor e dos clientes se sentirem compreendidos."
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
                <Text fw={700} size="sm" mb="xs">Card Checkout — Direct Payments</Text>
                <Text size="xs" c="dimmed" mb="sm">
                  <Intl
                    en="A payment flow that gets out of the way. Built to be fast, reliable, and easy for the user to finish what they started."
                    pt="Um fluxo de pagamento que não atrapalha. Feito para ser rápido, confiável e fácil para o usuário terminar o que começou."
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
                    en="A space for students to grow. We focused on making the learning experience smooth and the business management simple."
                    pt="Um espaço para alunos crescerem. Focamos em tornar a experiência de aprendizado fluida e a gestão do negócio simples."
                  />
                </Text>
              </Box>
            </GlassCard>
          </SimpleGrid>
        </Box>

        <Divider mb={120} label={<Intl en="How we work together" pt="Como trabalhamos juntos" />} labelPosition="center" />

        {/* ========== PRICING / INVESTMENT ========== */}
        <Box mb={140} id="pricing">
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 750, margin: '0 auto' }}>
            <Title order={2} mb="md" fz={{ base: rem(28), sm: rem(36) }}>
              <Intl en="Performance-First Engagement" pt="Engajamento Focado em Performance" />
            </Title>
            <Text size="lg" c="dimmed">
              <Intl
                en="I invest in the foundation because I know the technology works. You invest in scaling the business upon a rock-solid engine."
                pt="Eu invisto na fundação porque confio na eficiência da minha tecnologia. Você investe em escalar o negócio sobre um motor sólido."
              />
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <GlassCard>
              <Badge color="cyan" mb="md"><Intl en="Validation" pt="Validação" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Technical MVP" pt="MVP Técnico" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="I'll build the technical core of your vision with zero upfront cost. A practical demonstration of the framework's power."
                  pt="Construo o núcleo técnico da sua visão com custo inicial zero. Uma demonstração prática da potência da framework."
                />
              </Text>
              <Text fw={900} fz={32} mb="md">
                <Intl en="$0" pt="R$ 0" />
              </Text>
              <Button fullWidth variant="light" color="cyan" radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Start Validation" pt="Iniciar Validação" />
              </Button>
            </GlassCard>

            <GlassCard style={{ border: '1px solid rgba(121, 80, 242, 0.3)', background: 'rgba(121, 80, 242, 0.05)' }}>
              <Badge color="violet" mb="md"><Intl en="Scale" pt="Escala" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Growth Partnership" pt="Parceria de Crescimento" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="Continuous engineering to evolve the product as your market demands. Dedicated support for scaling operations."
                  pt="Engenharia contínua para evoluir o produto conforme a demanda do mercado. Suporte dedicado para operações em escala."
                />
              </Text>
              <Text fw={700} fz={24} mb="md">
                <Intl en="Strategic Pricing" pt="Investimento Estratégico" />
              </Text>
              <Button fullWidth variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Discuss Strategy" pt="Discutir Estratégia" />
              </Button>
            </GlassCard>

            <GlassCard>
              <Badge color="green" mb="md"><Intl en="Enterprise" pt="Enterprise" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="CTO as a Service" pt="CTO as a Service" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="Deep technical leadership and infrastructure management for complex, high-volume operations."
                  pt="Liderança técnica profunda e gestão de infraestrutura para operações complexas e de alto volume."
                />
              </Text>
              <Text fw={700} fz={rem(24)} mb="md">
                <Intl en="Custom Architecture" pt="Arquitetura Customizada" />
              </Text>
              <Button fullWidth variant="light" color="green" radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Talk Enterprise" pt="Falar sobre Enterprise" />
              </Button>
            </GlassCard>
          </SimpleGrid>
        </Box>

        {/* ========== CONTACT ========== */}
        <Box id="contact" py={80} style={{ textAlign: 'center' }}>
          <Title order={1} mb="md" fz={{ base: rem(32), sm: rem(42) }}>
            <Intl
              en={<>Ready to deploy <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>superior technology?</Text></>}
              pt={<>Pronto para implementar <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>tecnologia superior?</Text></>}
            />
          </Title>
          <Text mb={40} c="dimmed" size="lg" style={{ maxWidth: 650, margin: '0 auto 40px' }}>
            <Intl
              en="Direct and strategic. A conversation to align your business goals with the most efficient technical execution possible."
              pt="Direto ao ponto. Uma conversa estratégica para alinhar seus objetivos de negócio com a execução técnica mais eficiente possível."
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
