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
              en={<>If you're here, <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>you're probably tired of the same old talk.</Text></>}
              pt={<>Se você chegou até aqui, <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>provavelmente está cansado da mesma conversa de sempre.</Text></>}
            />
          </Title>
          <Stack gap="xl">
            <Text size="xl" style={{ lineHeight: 1.6, fontWeight: 500 }}>
              <Intl
                en="I'm not interested in selling you a project or billing for 'deliverables'. I want to find people who actually care about what they are building. I've spent years refining a way to build software that is honest, fast, and stays out of the way of your business. Now, I'm looking for partners who value that integrity as much as I do."
                pt="Eu não tenho interesse em te vender um projeto ou faturar em cima de 'entregáveis'. O que eu busco são pessoas que realmente se importam com o que estão construindo. Passei anos refinando uma forma de criar software que seja honesta, rápida e que não atrapalhe o seu negócio. Agora, procuro parceiros que valorizem essa integridade tanto quanto eu."
              />
            </Text>
            <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
              <Intl
                en="The code is just the tool. The real work is understanding why your idea matters and making sure the technology supports it without becoming a burden. I treat every project as if it were my own, because if it doesn't work for you, it doesn't work for me."
                pt="O código é apenas a ferramenta. O trabalho real é entender por que a sua ideia importa e garantir que a tecnologia suporte isso sem se tornar um fardo. Eu trato cada projeto como se fosse meu, porque se não funcionar para você, não funciona para mim."
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
                <Intl en="Let's talk like people" pt="Vamos conversar como gente" />
              </Button>
            </Group>
          </Stack>
        </Box>

        {/* ========== THE STATE OF THINGS ========== */}
        <Box mb={140} style={{ maxWidth: 800 }}>
          <Divider mb={80} label={<Intl en="What I actually believe" pt="No que eu realmente acredito" />} labelPosition="center" />
          <Stack gap={80}>
            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Business is about trust, not extraction" pt="Negócios são sobre confiança, não extração" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="The software industry often profits from confusion. I prefer the opposite: total transparency. If something is simple, it should be simple. If something is a bad idea, I'll tell you. I'm looking for entrepreneurs who want a partner, not just a vendor."
                  pt="A indústria de software costuma lucrar com a confusão. Eu prefiro o oposto: transparência total. Se algo é simples, deve ser simples. Se algo for uma ideia ruim, eu vou te falar. Procuro empreendedores que queiram um parceiro, não apenas um fornecedor."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="Your vision is the heartbeat" pt="Sua visão é o que dá vida ao código" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="I can build the best system in the world, but it needs a purpose. You bring the soul of the business, the understanding of your market, and the drive to make it happen. I provide the structural honesty and the technology to get you there faster."
                  pt="Eu posso construir o melhor sistema do mundo, mas ele precisa de um propósito. Você traz a alma do negócio, o entendimento do seu mercado e a vontade de fazer acontecer. Eu entro com a honestidade estrutural e a tecnologia para te levar lá mais rápido."
                />
              </Text>
            </Box>

            <Box>
              <Title order={2} mb="md" fz={rem(28)}>
                <Intl en="I care about what I put my name on" pt="Eu me importo com o que coloco meu nome" />
              </Title>
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                <Intl
                  en="The architecture I've built is my life's work. I don't want to waste it on things that don't matter. I want to see my technology helping real people solve real problems. That's why I only work with people who are as serious about their business as I am about my craft."
                  pt="A arquitetura que desenvolvi é o trabalho da minha vida. Não quero desperdiçá-la com coisas que não importam. Quero ver minha tecnologia ajudando pessoas reais a resolverem problemas reais. É por isso que só trabalho com quem leva o próprio negócio tão a sério quanto eu levo o meu ofício."
                />
              </Text>
            </Box>
          </Stack>
        </Box>

        <Divider mb={120} label={<Intl en="Who I've worked with" pt="Com quem já trabalhei" />} labelPosition="center" />

        {/* ========== PORTFOLIO ========== */}
        <Box id="work" mb={140}>
          <Box mb={60} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <Text size="lg" c="dimmed">
              <Intl
                en="I've helped these entrepreneurs because they knew exactly where they wanted to go, and I knew how to get them there without the usual headaches."
                pt="Ajudei esses empreendedores porque eles sabiam exatamente para onde queriam ir, e eu sabia como levá-los até lá sem as dores de cabeça habituais."
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
              <Intl en="No complex contracts, just common sense." pt="Sem contratos complexos, apenas bom senso." />
            </Title>
            <Text size="lg" c="dimmed">
              <Intl
                en="I believe in skin in the game. I put in the work to build the foundation, and you invest in making the business grow."
                pt="Eu acredito em colocar a mão no fogo pelo que faço. Eu entro com o trabalho para construir a base, e você investe para fazer o negócio crescer."
              />
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <GlassCard>
              <Badge color="cyan" mb="md"><Intl en="Trust" pt="Confiança" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Initial Build" pt="Construção Inicial" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="I'll build the core of your idea with no upfront cost. It's my way of showing I believe in what we are doing."
                  pt="Eu construo o coração da sua ideia sem custo inicial. É a minha forma de mostrar que acredito no que estamos fazendo."
                />
              </Text>
              <Text fw={900} fz={32} mb="md">
                <Intl en="$0" pt="R$ 0" />
              </Text>
              <Button fullWidth variant="light" color="cyan" radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Let's talk" pt="Vamos conversar" />
              </Button>
            </GlassCard>

            <GlassCard style={{ border: '1px solid rgba(121, 80, 242, 0.3)', background: 'rgba(121, 80, 242, 0.05)' }}>
              <Badge color="violet" mb="md"><Intl en="Partnership" pt="Parceria" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Continuous Care" pt="Acompanhamento" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="A monthly commitment where I stay by your side to evolve the technology as the business demands. No surprises."
                  pt="Um compromisso mensal onde fico ao seu lado para evoluir a tecnologia conforme o negócio pedir. Sem surpresas."
                />
              </Text>
              <Text fw={700} fz={24} mb="md">
                <Intl en="To be discussed" pt="Valor a conversar" />
              </Text>
              <Button fullWidth variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Discuss Details" pt="Discutir Detalhes" />
              </Button>
            </GlassCard>

            <GlassCard>
              <Badge color="green" mb="md"><Intl en="Commitment" pt="Comprometimento" /></Badge>
              <Text fw={700} size="xl" mb={4}><Intl en="Dedicated Engineering" pt="Engenharia Dedicada" /></Text>
              <Text size="sm" c="dimmed" mb="lg">
                <Intl
                  en="For projects that need a deeper technical presence. I'll act as your technical partner to ensure everything runs perfectly."
                  pt="Para projetos que precisam de uma presença técnica mais profunda. Atuarei como seu parceiro técnico para garantir que tudo rode perfeito."
                />
              </Text>
              <Text fw={700} fz={rem(24)} mb="md">
                <Intl en="Custom Agreement" pt="Acordo Customizado" />
              </Text>
              <Button fullWidth variant="light" color="green" radius="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Intl en="Talk about scale" pt="Falar sobre escala" />
              </Button>
            </GlassCard>
          </SimpleGrid>
        </Box>

        {/* ========== CONTACT ========== */}
        <Box id="contact" py={80} style={{ textAlign: 'center' }}>
          <Title order={1} mb="md" fz={{ base: rem(32), sm: rem(42) }}>
            <Intl
              en={<>Ready to build <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>something that matters?</Text></>}
              pt={<>Pronto pra construir <Text span variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} inherit>algo que importa?</Text></>}
            />
          </Title>
          <Text mb={40} c="dimmed" size="lg" style={{ maxWidth: 650, margin: '0 auto 40px' }}>
            <Intl
              en="No pitch, no pressure. Just a conversation between two people who want to build something good. If it's a fit, we'll know."
              pt="Sem discurso, sem pressão. Apenas uma conversa entre duas pessoas que querem construir algo bom. Se fizer sentido para ambos, saberemos."
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
