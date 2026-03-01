'use client'

import { Container, Title, Text, Box, rem, Paper, SimpleGrid, ThemeIcon, Badge, Group } from '@mantine/core'
import { IntlProvider, Intl, LanguageToggle } from '@/app/(main)/IntlProvider'
import { MachineryProvider } from '@/packages/machinery/provider'
import { ConfigureMachinery, SubmittedQuotesList } from '@/packages/machinery/forms'
import { IconSettings, IconServerCog } from '@tabler/icons-react'

const GlassCard = ({ children, padding = 'xl', ...props }: { children: React.ReactNode, padding?: any } & any) => (
    <Paper
        {...props}
        p={padding}
        style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--mantine-radius-lg)',
            ...props.style
        }}
    >
        {children}
    </Paper>
)

export default function DemoFormsPage() {
    return (
        <IntlProvider>
            <MachineryProvider>
                <Box
                    style={{
                        backgroundColor: '#0a0a0b',
                        minHeight: '100vh',
                        color: '#f8f9fa',
                        paddingBottom: rem(80)
                    }}
                >
                    <Container size="lg" pt={80}>
                        <Group justify="space-between" mb={60}>
                            <Group gap="xs">
                                <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ from: 'violet', to: 'cyan' }}>
                                    <IconSettings size={20} />
                                </ThemeIcon>
                                <Text fw={800} size="xl" style={{ letterSpacing: '-0.5px' }} component="a" href="/" color="white">
                                    asasvirtuais<Text span c="violet" inherit>.dev</Text>
                                </Text>
                            </Group>
                            <Group gap="md">
                                <LanguageToggle />
                            </Group>
                        </Group>

                        <Box mb={60} style={{ textAlign: 'center' }}>
                            <Badge variant="dot" color="blue" size="lg" mb="sm">
                                <Intl en="AI Framework Demo" pt="Demonstração do Framework com IA" />
                            </Badge>
                            <Title
                                order={1}
                                fz={{ base: rem(36), sm: rem(48) }}
                                style={{ lineHeight: 1.1, fontWeight: 900, marginBottom: rem(16) }}
                            >
                                <Intl
                                    en={<>Build Technical Forms in <Text span variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>Hours, Not Weeks.</Text></>}
                                    pt={<>Construa Formulários Técnicos em <Text span variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>Horas, não Semanas.</Text></>}
                                />
                            </Title>
                            <Text size="xl" c="dimmed" style={{ maxWidth: 800, margin: '0 auto' }}>
                                <Intl
                                    en="This advanced 3-step machinery configuration form was generated entirely by AI using the asasvirtuais framework. By empowering A.I. with predictable patterns, any qualified developer or AI agent can rapidly build, maintain, and expand enterprise-grade UIs without being locked into legacy architectures."
                                    pt="Este formulário avançado de configuração de maquinário foi inteiramente gerado por IA usando o framework asasvirtuais. Usando abstrações previsíveis, qualquer desenvolvedor qualificado ou agente de IA pode rapidamente criar e evoluir projetos colossais sem ficar preso a dívidas técnicas."
                                />
                            </Text>
                        </Box>

                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60} mb={60} style={{ alignItems: 'flex-start' }}>
                            <Box>
                                <GlassCard mb="xl">
                                    <ThemeIcon variant="light" color="blue" size="xl" radius="md" mb="md">
                                        <IconSettings size={24} />
                                    </ThemeIcon>
                                    <Title order={3} mb="xs">
                                        <Intl en="Ultra-Fast Implementation" pt="Implementação Ultra-Rápida" />
                                    </Title>
                                    <Text size="sm" c="dimmed">
                                        <Intl
                                            en="We can build intricate, multi-step configuration flows in hours, not weeks. Your operations don't stop because 'the tech is hard' anymore."
                                            pt="Construímos fluxos de configuração complexos em horas, não semanas. Suas operações não param mais porque 'a tecnologia é difícil de implementar'."
                                        />
                                    </Text>
                                </GlassCard>

                                <GlassCard>
                                    <ThemeIcon variant="light" color="cyan" size="xl" radius="md" mb="md">
                                        <IconServerCog size={24} />
                                    </ThemeIcon>
                                    <Title order={3} mb="xs">
                                        <Intl en="Zero Vendor Lock-in" pt="Sua Empresa Independente" />
                                    </Title>
                                    <Text size="sm" c="dimmed">
                                        <Intl
                                            en="Because the framework is extremely lean and built using standards that Artificial Intelligence understands perfectly, any qualified professional or AI agent can take over your project immediately. You are never held hostage by a software agency."
                                            pt="Como a infraestrutura é enxuta e feita em padrões que IAs entendem perfeitamente, qualquer profissional qualificado ou sistema de Inteligência Artificial pode assumir e expandir seu projeto a qualquer momento. Você nunca mais refém de agência de desenvolvimento."
                                        />
                                    </Text>
                                </GlassCard>
                            </Box>

                            {/* The Form */}
                            <Box style={{ color: 'black' }}>
                                <ConfigureMachinery />
                            </Box>
                        </SimpleGrid>

                        <Box mt={80}>
                            <Title order={2} mb="xl">
                                <Intl en="Recent Quotes & Filters (Demo)" pt="Orçamentos Recentes (Fictícios)" />
                            </Title>
                            <Box style={{ color: 'black' }}>
                                <SubmittedQuotesList />
                            </Box>
                        </Box>

                    </Container>
                </Box>
            </MachineryProvider>
        </IntlProvider>
    )
}
