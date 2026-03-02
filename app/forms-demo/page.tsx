'use client'

import { Container, Title, Text, Box, rem, Paper, SimpleGrid, ThemeIcon, Badge, Group, Button, Divider, Stack, Anchor } from '@mantine/core'
import { IntlProvider, Intl, LanguageToggle } from '@/app/(main)/IntlProvider'
import { MachineryProvider } from '@/packages/machinery/provider'
import { ConfigureMachinery, SubmittedQuotesList } from '@/packages/machinery/forms'
import { IconArrowLeft } from '@tabler/icons-react'
import { FaCode, FaWhatsapp } from 'react-icons/fa'
import { IconPlugConnected, IconArrowsShuffle, IconStack2 } from '@tabler/icons-react'

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
                    <Container size="lg" pt={40}>
                        {/* Header */}
                        <Group justify="space-between" mb={60}>
                            <Group gap="xs">
                                <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ from: 'violet', to: 'cyan' }}>
                                    <FaCode size={20} />
                                </ThemeIcon>
                                <Text fw={800} size="xl" style={{ letterSpacing: '-0.5px' }} component="a" href="/" c="white" td="none">
                                    asasvirtuais<Text span c="violet" inherit>.dev</Text>
                                </Text>
                            </Group>
                            <Group gap="md">
                                <LanguageToggle />
                                <Button variant="subtle" color="gray" component="a" href="/" leftSection={<IconArrowLeft size={16} />} size="sm">
                                    <Intl en="Back to Home" pt="Voltar ao Início" />
                                </Button>
                            </Group>
                        </Group>

                        {/* Hero Context */}
                        <Box mb={60} style={{ maxWidth: 800 }}>
                            <Badge variant="dot" color="blue" size="lg" mb="sm">
                                <Intl en="Live Demo" pt="Demonstração ao Vivo" />
                            </Badge>
                            <Title
                                order={1}
                                fz={{ base: rem(32), sm: rem(44) }}
                                style={{ lineHeight: 1.1, fontWeight: 900, marginBottom: rem(16) }}
                            >
                                <Intl
                                    en={<>Lead qualification with <Text span variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>3 async data sources</Text> in one form.</>}
                                    pt={<>Qualificação de lead com <Text span variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>3 fontes de dados assíncronas</Text> em um formulário.</>}
                                />
                            </Title>
                            <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                                <Intl
                                    en="This form detects a company from an email domain (CRM API), loads a product catalog by category (Catalog API), and generates a custom quote with tier-based discounts (Pricing Engine). Three separate async services, zero page reloads, one cohesive flow."
                                    pt="Este formulário detecta uma empresa pelo domínio do email (API CRM), carrega um catálogo de produtos por categoria (API Catálogo), e gera um orçamento personalizado com descontos por segmento (Motor de Preços). Três serviços assíncronos separados, zero recarregamentos, um fluxo coeso."
                                />
                            </Text>
                        </Box>

                        {/* What this demonstrates */}
                        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mb={60}>
                            <GlassCard>
                                <ThemeIcon variant="light" color="blue" size="lg" radius="md" mb="sm">
                                    <IconPlugConnected size={20} />
                                </ThemeIcon>
                                <Text fw={600} size="md" mb={4}>
                                    <Intl en="Third-Party Integration" pt="Integração com Terceiros" />
                                </Text>
                                <Text size="sm" c="dimmed">
                                    <Intl
                                        en="The company detection queries an external CRM API using only the email domain. Data enrichment happens automatically — no manual input needed."
                                        pt="A detecção de empresa consulta uma API CRM externa usando apenas o domínio do email. O enriquecimento de dados acontece automaticamente — sem entrada manual."
                                    />
                                </Text>
                            </GlassCard>

                            <GlassCard>
                                <ThemeIcon variant="light" color="cyan" size="lg" radius="md" mb="sm">
                                    <IconArrowsShuffle size={20} />
                                </ThemeIcon>
                                <Text fw={600} size="md" mb={4}>
                                    <Intl en="Cross-Table Data Flow" pt="Fluxo de Dados Entre Tabelas" />
                                </Text>
                                <Text size="sm" c="dimmed">
                                    <Intl
                                        en="The quote engine reads from Products, applies rules from the Pricing table, and uses the company tier detected in a previous step. Data flows between sources seamlessly."
                                        pt="O motor de orçamento lê da tabela Produtos, aplica regras da tabela Preços, e usa o segmento da empresa detectado no passo anterior. Os dados fluem entre fontes sem fricção."
                                    />
                                </Text>
                            </GlassCard>

                            <GlassCard>
                                <ThemeIcon variant="light" color="violet" size="lg" radius="md" mb="sm">
                                    <IconStack2 size={20} />
                                </ThemeIcon>
                                <Text fw={600} size="md" mb={4}>
                                    <Intl en="Nested Async Forms" pt="Formulários Assíncronos Aninhados" />
                                </Text>
                                <Text size="sm" c="dimmed">
                                    <Intl
                                        en="The product search is a form inside a form — its own async action that feeds results into the parent. This pattern scales to any level of complexity."
                                        pt="A busca de produtos é um formulário dentro de outro — com sua própria ação assíncrona que alimenta o formulário pai. Esse padrão escala para qualquer nível de complexidade."
                                    />
                                </Text>
                            </GlassCard>
                        </SimpleGrid>

                        <Divider mb={60} label={<Intl en="Try It" pt="Experimente" />} labelPosition="center" />

                        {/* The actual demo */}
                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60} mb={60} style={{ alignItems: 'flex-start' }}>
                            {/* The Form */}
                            <Box style={{ color: 'black' }}>
                                <ConfigureMachinery />
                            </Box>

                            {/* Context sidebar */}
                            <Stack gap="xl">
                                <GlassCard>
                                    <Text fw={700} size="lg" mb="xs">
                                        <Intl en="What Each Step Does" pt="O Que Cada Etapa Faz" />
                                    </Text>
                                    <Stack gap="xs">
                                        <Group gap="xs" wrap="nowrap" align="flex-start">
                                            <Text c="violet" fw={700} size="sm" style={{ flexShrink: 0 }}>01</Text>
                                            <Text size="sm">
                                                <Intl
                                                    en="Lead enters email + phone. No other data needed."
                                                    pt="Lead informa email + telefone. Nenhum outro dado necessário."
                                                />
                                            </Text>
                                        </Group>
                                        <Group gap="xs" wrap="nowrap" align="flex-start">
                                            <Text c="violet" fw={700} size="sm" style={{ flexShrink: 0 }}>02</Text>
                                            <Text size="sm">
                                                <Intl
                                                    en="System auto-detects company via CRM API (async). Company name, size, industry — all populated from an external source."
                                                    pt="Sistema auto-detecta empresa via API CRM (assíncrono). Nome, porte, indústria — tudo populado de fonte externa."
                                                />
                                            </Text>
                                        </Group>
                                        <Group gap="xs" wrap="nowrap" align="flex-start">
                                            <Text c="violet" fw={700} size="sm" style={{ flexShrink: 0 }}>03</Text>
                                            <Text size="sm">
                                                <Intl
                                                    en="User searches the product catalog (async fetch). A nested form queries the Catalog API and returns products for the selected category."
                                                    pt="Usuário busca no catálogo de produtos (fetch assíncrono). Um formulário aninhado consulta a API do Catálogo e retorna produtos da categoria selecionada."
                                                />
                                            </Text>
                                        </Group>
                                        <Group gap="xs" wrap="nowrap" align="flex-start">
                                            <Text c="violet" fw={700} size="sm" style={{ flexShrink: 0 }}>04</Text>
                                            <Text size="sm">
                                                <Intl
                                                    en="Quote auto-generates (async). The pricing engine reads Products + Pricing Rules tables, applies the company-tier discount, and returns a full breakdown."
                                                    pt="Orçamento auto-gerado (assíncrono). O motor de preços lê tabelas de Produtos + Regras de Preço, aplica desconto por segmento, e retorna o detalhamento completo."
                                                />
                                            </Text>
                                        </Group>
                                    </Stack>
                                </GlassCard>

                                <GlassCard style={{ background: 'linear-gradient(135deg, rgba(121, 80, 242, 0.06) 0%, rgba(21, 170, 191, 0.06) 100%)', border: '1px solid rgba(121, 80, 242, 0.2)' }}>
                                    <Text fw={700} size="lg" mb="xs">
                                        <Intl en="This Applied to Any Business" pt="Isso Aplicado a Qualquer Negócio" />
                                    </Text>
                                    <Text size="sm" c="dimmed" mb="lg">
                                        <Intl
                                            en="Lead qualification, product catalogs, quote generation — every B2B company needs this. This demo uses mock data, but in production, these are real APIs: Salesforce, HubSpot, Stripe, or the client's own backend. The architecture stays the same."
                                            pt="Qualificação de leads, catálogos de produtos, geração de orçamentos — toda empresa B2B precisa disso. Esta demo usa mock data, mas em produção, são APIs reais: Salesforce, HubSpot, Stripe, ou o backend do próprio cliente. A arquitetura permanece a mesma."
                                        />
                                    </Text>
                                    <Group gap="sm">
                                        <Button
                                            variant="gradient"
                                            gradient={{ from: 'violet', to: 'cyan' }}
                                            radius="md"
                                            size="sm"
                                            leftSection={<FaWhatsapp size={14} />}
                                            component="a"
                                            href="https://wa.me/5511999999999"
                                            target="_blank"
                                        >
                                            <Intl en="Get in Touch" pt="Entrar em Contato" />
                                        </Button>
                                        <Button variant="subtle" color="violet" size="sm" component="a" href="/#pricing">
                                            <Intl en="See Pricing" pt="Ver Preços" />
                                        </Button>
                                    </Group>
                                </GlassCard>
                            </Stack>
                        </SimpleGrid>

                        {/* Submitted Leads */}
                        {/* Removed because it didn't look good and was poorly explained */}
                        {/* <Box mt={80}>
                            <Title order={2} mb="md">
                                <Intl en="Qualified Leads" pt="Leads Qualificados" />
                            </Title>
                            <Text size="sm" c="dimmed" mb="xl">
                                <Intl
                                    en="Each lead below went through the full async pipeline: CRM lookup, catalog search, and quote generation. Data persists and is filterable — a complete, working data flow."
                                    pt="Cada lead abaixo passou pelo pipeline assíncrono completo: consulta CRM, busca no catálogo, e geração de orçamento. Os dados persistem e são filtráveis — um fluxo de dados completo e funcional."
                                />
                            </Text>
                            <Box style={{ color: 'black' }}>
                                <SubmittedQuotesList />
                            </Box>
                        </Box> */}

                        {/* Footer */}
                        <Divider mt={80} mb="xl" />
                        <Group justify="space-between" pb="xl">
                            <Text size="sm" c="dimmed">
                                © 2026 Ícaro C. Capobianco
                            </Text>
                            <Group gap="md">
                                <Anchor href="/" c="dimmed" size="sm"><Intl en="Home" pt="Início" /></Anchor>
                                <Anchor href="https://github.com/asasvirtuais" target="_blank" c="dimmed" size="sm">GitHub</Anchor>
                                <Anchor href="https://linkedin.com/in/asasvirtuais" target="_blank" c="dimmed" size="sm">LinkedIn</Anchor>
                            </Group>
                        </Group>

                    </Container>
                </Box>
            </MachineryProvider>
        </IntlProvider>
    )
}
