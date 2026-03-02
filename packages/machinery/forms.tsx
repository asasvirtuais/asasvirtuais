'use client'
import { useState, useEffect } from 'react'
import { CreateForm, FilterForm, useTable } from 'asasvirtuais/react-interface'
import { Form } from 'asasvirtuais/form'
import { ActionProvider } from 'asasvirtuais/action'
import { schema } from '.'
import * as Fields from './fields'
import {
    Stepper, Button, Group, Stack, Card, Text, Badge,
    Divider, Grid, Box, SimpleGrid, Checkbox, Select,
    Paper
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { IconCheck, IconUser, IconSearch, IconReceipt, IconMail } from '@tabler/icons-react'
import { Intl } from '@/app/(main)/IntlProvider'

// ═══════════════════════════════════════════════════════════════
// MOCK DATA — Simulates separate database tables & external APIs
// ═══════════════════════════════════════════════════════════════

// 🔗 "CRM API" — company detection by email domain
const COMPANIES_API: Record<string, { name: string, size: string, employees: number, industry: string }> = {
    'google.com': { name: 'Google LLC', size: 'Enterprise', employees: 180000, industry: 'Technology' },
    'amazon.com': { name: 'Amazon Inc', size: 'Enterprise', employees: 1540000, industry: 'E-Commerce' },
    'shopify.com': { name: 'Shopify Inc', size: 'Mid-Market', employees: 11600, industry: 'E-Commerce' },
    'stripe.com': { name: 'Stripe Inc', size: 'Mid-Market', employees: 8000, industry: 'Fintech' },
    'linear.app': { name: 'Linear Inc', size: 'Startup', employees: 80, industry: 'SaaS' },
}

// 📦 "Product Catalog API" — products grouped by category
const PRODUCT_CATALOG: Record<string, Array<{ id: string, name: string, price: number, unit: string }>> = {
    'CRM': [
        { id: 'crm-basic', name: 'LeadFlow Basic', price: 29, unit: '/user/mo' },
        { id: 'crm-pro', name: 'LeadFlow Pro', price: 79, unit: '/user/mo' },
        { id: 'crm-ai', name: 'LeadFlow AI Add-on', price: 15, unit: '/user/mo' },
    ],
    'Analytics': [
        { id: 'an-dash', name: 'DataPulse Dashboard', price: 49, unit: '/mo' },
        { id: 'an-adv', name: 'DataPulse Advanced', price: 129, unit: '/mo' },
        { id: 'an-rt', name: 'DataPulse Real-time', price: 299, unit: '/mo' },
    ],
    'Marketing': [
        { id: 'mkt-email', name: 'CampaignKit Email', price: 39, unit: '/mo' },
        { id: 'mkt-social', name: 'CampaignKit Social', price: 59, unit: '/mo' },
        { id: 'mkt-suite', name: 'CampaignKit Full Suite', price: 149, unit: '/mo' },
    ],
    'Infrastructure': [
        { id: 'infra-cdn', name: 'EdgeServe CDN', price: 99, unit: '/mo' },
        { id: 'infra-store', name: 'CloudVault Storage', price: 199, unit: '/TB/mo' },
        { id: 'infra-comp', name: 'FlexCompute Instances', price: 349, unit: '/mo' },
    ],
}

// 💰 "Pricing Rules DB" — discounts by company tier
const PRICING_RULES: Record<string, { discount: number, paymentTerms: string }> = {
    'Enterprise': { discount: 20, paymentTerms: 'NET-60' },
    'Mid-Market': { discount: 10, paymentTerms: 'NET-30' },
    'Startup': { discount: 35, paymentTerms: 'Monthly' },
}

// ═══════════════════════════════════════════════════════════════
// ASYNC OPERATIONS — Each simulates a real API/DB call
// ═══════════════════════════════════════════════════════════════

async function lookupCompany(params: { email: string }) {
    await new Promise(r => setTimeout(r, 1200))
    const domain = (params.email || '').split('@')[1] || 'unknown'
    const match = COMPANIES_API[domain]
    if (match) return match
    const name = domain.split('.')[0]
    return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        size: 'Startup',
        employees: 0,
        industry: 'Other'
    }
}

async function fetchProductsByCategory(params: { category: string }) {
    await new Promise(r => setTimeout(r, 800))
    return PRODUCT_CATALOG[params.category] || []
}

async function generateQuote(params: { selectedProductIds: string[], companySize: string }) {
    await new Promise(r => setTimeout(r, 1000))
    const allProducts = Object.values(PRODUCT_CATALOG).flat()
    const selected = allProducts.filter(p => params.selectedProductIds.includes(p.id))
    const rules = PRICING_RULES[params.companySize] || { discount: 0, paymentTerms: 'Monthly' }
    const subtotal = selected.reduce((sum, p) => sum + p.price, 0)
    const discountAmount = subtotal * (rules.discount / 100)
    const total = subtotal - discountAmount
    return {
        items: selected.map(p => ({
            ...p,
            discountedPrice: +(p.price * (1 - rules.discount / 100)).toFixed(2),
        })),
        subtotal,
        discount: rules.discount,
        discountAmount: +discountAmount.toFixed(2),
        total: +total.toFixed(2),
        paymentTerms: rules.paymentTerms,
        quoteId: `QT-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    }
}

// ═══════════════════════════════════════════════════════════════
// MAIN FORM — Lead Qualification Flow
// ═══════════════════════════════════════════════════════════════

export function ConfigureMachinery() {
    return (
        <CreateForm
            table='machinery'
            schema={schema}
            defaults={{
                email: '',
                phone: '',
                companyName: '',
                companySize: '',
                category: '',
                selectedProducts: [],
                quoteTotal: 0,
            }}
            onSuccess={() => {
                Notifications.show({
                    title: 'Lead Qualified',
                    message: 'Lead data saved with quote. Ready for sales team.',
                    color: 'green',
                    icon: <IconCheck size={16} />
                })
            }}
        >
            {form => {
                const [active, setActive] = useState(0)
                const nextStep = () => setActive(c => c + 1)
                const prevStep = () => setActive(c => Math.max(0, c - 1))

                const handleSubmit = async (e: React.FormEvent) => {
                    e.preventDefault()
                    await form.submit()
                    setActive(4)
                }

                return (
                    <Card shadow="md" padding="xl" radius="md" withBorder>
                        <form onSubmit={handleSubmit}>
                            <Stepper active={active} mb="xl">

                                {/* ── STEP 0: Lead Capture ── */}
                                <Stepper.Step
                                    label={<Intl en="Lead" pt="Lead" />}
                                    description={<Intl en="Contact info" pt="Dados de contato" />}
                                    icon={<IconMail size={18} />}
                                >
                                    <Stack mt="xl">
                                        <Fields.EmailField />
                                        <Fields.PhoneField />
                                        <Text size="xs" c="dimmed">
                                            <Intl
                                                en="Try: name@google.com, name@shopify.com, or any email"
                                                pt="Teste: name@google.com, name@shopify.com, ou qualquer email"
                                            />
                                        </Text>
                                    </Stack>
                                </Stepper.Step>

                                {/* ── STEP 1: Company Detection (auto-triggered async) ── */}
                                <Stepper.Step
                                    label={<Intl en="Company" pt="Empresa" />}
                                    description={<Intl en="CRM Lookup" pt="Consulta CRM" />}
                                    icon={<IconUser size={18} />}
                                >
                                    <Stack mt="xl">
                                        <ActionProvider
                                            params={{ email: form.fields.email }}
                                            action={lookupCompany}
                                            onResult={(result) => {
                                                form.setField('companyName', result.name)
                                                form.setField('companySize', result.size)
                                            }}
                                            autoTrigger
                                        >
                                            {({ loading, result }) => (
                                                <Stack gap="md">
                                                    {loading && (
                                                        <Stack align="center" gap="xs" py="xl">
                                                            <Text size="sm" fw={700} c="blue">
                                                                <Intl en="Querying CRM API..." pt="Consultando API CRM..." />
                                                            </Text>
                                                            <Text size="xs" c="dimmed">
                                                                <Intl
                                                                    en={`Looking up domain: ${form.fields.email?.split('@')[1] || '...'}`}
                                                                    pt={`Buscando domínio: ${form.fields.email?.split('@')[1] || '...'}`}
                                                                />
                                                            </Text>
                                                            <Button loading variant="subtle" mt="xs">...</Button>
                                                        </Stack>
                                                    )}
                                                    {result && (
                                                        <Card withBorder radius="md" p="lg" bg="blue.0">
                                                            <Badge color="blue" variant="filled" size="lg" mb="md">
                                                                <Intl en="Company Detected" pt="Empresa Detectada" />
                                                            </Badge>
                                                            <SimpleGrid cols={2} spacing="sm">
                                                                <Box>
                                                                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}><Intl en="Company" pt="Empresa" /></Text>
                                                                    <Text size="sm" fw={600}>{result.name}</Text>
                                                                </Box>
                                                                <Box>
                                                                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}><Intl en="Tier" pt="Segmento" /></Text>
                                                                    <Badge
                                                                        color={result.size === 'Enterprise' ? 'violet' : result.size === 'Mid-Market' ? 'blue' : 'green'}
                                                                        variant="light"
                                                                    >
                                                                        {result.size}
                                                                    </Badge>
                                                                </Box>
                                                                <Box>
                                                                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}><Intl en="Employees" pt="Funcionários" /></Text>
                                                                    <Text size="sm">{result.employees > 0 ? result.employees.toLocaleString() : '—'}</Text>
                                                                </Box>
                                                                <Box>
                                                                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}><Intl en="Industry" pt="Indústria" /></Text>
                                                                    <Text size="sm">{result.industry}</Text>
                                                                </Box>
                                                            </SimpleGrid>
                                                            <Text size="xs" c="dimmed" mt="md" fs="italic">
                                                                <Intl
                                                                    en="↑ Retrieved from external CRM API by email domain. This data now flows into pricing rules."
                                                                    pt="↑ Obtido de API CRM externa pelo domínio do email. Esses dados alimentam as regras de preço."
                                                                />
                                                            </Text>
                                                        </Card>
                                                    )}
                                                </Stack>
                                            )}
                                        </ActionProvider>
                                    </Stack>
                                </Stepper.Step>

                                {/* ── STEP 2: Product Catalog (nested Form with async search) ── */}
                                <Stepper.Step
                                    label={<Intl en="Products" pt="Produtos" />}
                                    description={<Intl en="Catalog search" pt="Busca no catálogo" />}
                                    icon={<IconSearch size={18} />}
                                >
                                    <Stack mt="xl">
                                        <Form
                                            defaults={{ category: form.fields.category || '' }}
                                            action={async (fields: { category: string }) => fetchProductsByCategory(fields)}
                                        >
                                            {(catalogForm) => (
                                                <Stack gap="md">
                                                    <Group gap="sm" align="flex-end">
                                                        <Select
                                                            label={<Intl en="Product Category" pt="Categoria de Produto" />}
                                                            placeholder="Select..."
                                                            data={Object.keys(PRODUCT_CATALOG).map(k => ({ value: k, label: k }))}
                                                            value={catalogForm.fields.category}
                                                            onChange={val => {
                                                                catalogForm.setField('category', val || '')
                                                                form.setField('category', val || '')
                                                            }}
                                                            style={{ flex: 1 }}
                                                        />
                                                        <Button
                                                            onClick={() => catalogForm.submit()}
                                                            loading={catalogForm.loading}
                                                            leftSection={<IconSearch size={16} />}
                                                        >
                                                            <Intl en="Search Catalog" pt="Buscar no Catálogo" />
                                                        </Button>
                                                    </Group>

                                                    {catalogForm.loading && (
                                                        <Text size="xs" c="blue" fw={600}>
                                                            <Intl
                                                                en="Querying Product Catalog API..."
                                                                pt="Consultando API do Catálogo de Produtos..."
                                                            />
                                                        </Text>
                                                    )}

                                                    {catalogForm.result && catalogForm.result.length > 0 && (
                                                        <Card withBorder radius="md" p="md">
                                                            <Text size="sm" fw={700} mb="sm">
                                                                <Intl
                                                                    en={`${catalogForm.result.length} products in "${catalogForm.fields.category}"`}
                                                                    pt={`${catalogForm.result.length} produtos em "${catalogForm.fields.category}"`}
                                                                />
                                                            </Text>
                                                            <Stack gap="xs">
                                                                {catalogForm.result.map((product: any) => (
                                                                    <Checkbox
                                                                        key={product.id}
                                                                        label={
                                                                            <Group gap="xs">
                                                                                <Text size="sm">{product.name}</Text>
                                                                                <Badge size="sm" variant="outline" color="gray">
                                                                                    ${product.price}{product.unit}
                                                                                </Badge>
                                                                            </Group>
                                                                        }
                                                                        checked={form.fields.selectedProducts?.includes(product.id) || false}
                                                                        onChange={(e) => {
                                                                            const current = form.fields.selectedProducts || []
                                                                            if (e.currentTarget.checked) {
                                                                                form.setField('selectedProducts', [...current, product.id])
                                                                            } else {
                                                                                form.setField('selectedProducts', current.filter((id: string) => id !== product.id))
                                                                            }
                                                                        }}
                                                                    />
                                                                ))}
                                                            </Stack>
                                                            <Text size="xs" c="dimmed" mt="md" fs="italic">
                                                                <Intl
                                                                    en="↑ Products fetched from Catalog API. Selections sync with the parent form state."
                                                                    pt="↑ Produtos obtidos da API do Catálogo. Seleções sincronizam com o estado do formulário pai."
                                                                />
                                                            </Text>
                                                        </Card>
                                                    )}
                                                </Stack>
                                            )}
                                        </Form>
                                    </Stack>
                                </Stepper.Step>

                                {/* ── STEP 3: Quote Generation (auto-triggered async) ── */}
                                <Stepper.Step
                                    label={<Intl en="Quote" pt="Orçamento" />}
                                    description={<Intl en="Price report" pt="Relatório de preços" />}
                                    icon={<IconReceipt size={18} />}
                                >
                                    <Stack mt="xl">
                                        <ActionProvider
                                            params={{
                                                selectedProductIds: form.fields.selectedProducts || [],
                                                companySize: form.fields.companySize || '',
                                            }}
                                            action={generateQuote}
                                            onResult={(result) => {
                                                form.setField('quoteTotal', result.total)
                                            }}
                                            autoTrigger
                                        >
                                            {({ loading, result }) => (
                                                <Stack gap="md">
                                                    {loading && (
                                                        <Stack align="center" gap="xs" py="xl">
                                                            <Text size="sm" fw={700} c="blue">
                                                                <Intl en="Generating quote..." pt="Gerando orçamento..." />
                                                            </Text>
                                                            <Text size="xs" c="dimmed">
                                                                <Intl
                                                                    en="Products DB → Pricing Rules DB → Quote Engine"
                                                                    pt="DB Produtos → DB Regras de Preço → Motor de Orçamento"
                                                                />
                                                            </Text>
                                                            <Button loading variant="subtle">...</Button>
                                                        </Stack>
                                                    )}
                                                    {result && (
                                                        <Card withBorder radius="md" p="lg" bg="green.0">
                                                            <Group justify="space-between" mb="md">
                                                                <Badge color="green" variant="filled" size="lg">
                                                                    <Intl en="Quote Ready" pt="Orçamento Pronto" />
                                                                </Badge>
                                                                <Text size="xs" ff="monospace" c="dimmed">{result.quoteId}</Text>
                                                            </Group>

                                                            <Stack gap="xs" mb="md">
                                                                {result.items.map((item: any) => (
                                                                    <Group key={item.id} justify="space-between">
                                                                        <Text size="sm">{item.name}</Text>
                                                                        <Group gap="xs">
                                                                            <Text size="sm" td="line-through" c="dimmed">${item.price}</Text>
                                                                            <Text size="sm" fw={700} c="green">${item.discountedPrice}{item.unit}</Text>
                                                                        </Group>
                                                                    </Group>
                                                                ))}
                                                            </Stack>

                                                            <Divider mb="sm" />

                                                            <SimpleGrid cols={3} spacing="sm">
                                                                <Box>
                                                                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}><Intl en="Subtotal" pt="Subtotal" /></Text>
                                                                    <Text size="sm">${result.subtotal.toFixed(2)}</Text>
                                                                </Box>
                                                                <Box>
                                                                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}><Intl en="Discount" pt="Desconto" /></Text>
                                                                    <Text size="sm" c="green">-{result.discount}% (${result.discountAmount})</Text>
                                                                </Box>
                                                                <Box>
                                                                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}><Intl en="Total" pt="Total" /></Text>
                                                                    <Text size="lg" fw={900} c="blue">${result.total}</Text>
                                                                </Box>
                                                            </SimpleGrid>

                                                            <Badge variant="light" color="gray" mt="md">
                                                                <Intl en={`Payment: ${result.paymentTerms}`} pt={`Pagamento: ${result.paymentTerms}`} />
                                                            </Badge>

                                                            <Text size="xs" c="dimmed" mt="md" fs="italic">
                                                                <Intl
                                                                    en="↑ Pricing from Products table + discount from Pricing Rules table (applied by company tier detected in step 2)"
                                                                    pt="↑ Preço da tabela Produtos + desconto da tabela Regras de Preço (aplicado pelo segmento da empresa detectado no passo 2)"
                                                                />
                                                            </Text>
                                                        </Card>
                                                    )}
                                                </Stack>
                                            )}
                                        </ActionProvider>
                                    </Stack>
                                </Stepper.Step>

                                {/* ── COMPLETED ── */}
                                <Stepper.Completed>
                                    <Card bg="green.0" mt="xl" padding="xl" radius="md">
                                        <Text fw={700} ta="center" size="lg" c="green.7">
                                            <Intl en="Lead Qualified & Saved" pt="Lead Qualificado e Salvo" />
                                        </Text>
                                        <Text ta="center" mt="sm" size="sm">
                                            <Intl
                                                en="Company detected via CRM, products selected from catalog, quote generated from pricing engine — all from separate async data sources, all in one form."
                                                pt="Empresa detectada via CRM, produtos selecionados do catálogo, orçamento gerado pelo motor de preços — tudo de fontes de dados assíncronas separadas, tudo em um formulário."
                                            />
                                        </Text>
                                        <Group justify="center" mt="md">
                                            <Button variant="light" onClick={() => {
                                                form.setFields({
                                                    email: '', phone: '', companyName: '', companySize: '',
                                                    category: '', selectedProducts: [], quoteTotal: 0
                                                })
                                                setActive(0)
                                            }}>
                                                <Intl en="Qualify Another Lead" pt="Qualificar Outro Lead" />
                                            </Button>
                                        </Group>
                                    </Card>
                                </Stepper.Completed>
                            </Stepper>

                            {active < 4 && (
                                <Group justify="space-between" mt="xl">
                                    <Button variant="default" onClick={prevStep} disabled={active === 0}>
                                        <Intl en="Back" pt="Voltar" />
                                    </Button>
                                    {active < 3 ? (
                                        <Button
                                            onClick={nextStep}
                                            disabled={
                                                (active === 0 && (!form.fields.email || !form.fields.phone)) ||
                                                (active === 2 && (!form.fields.selectedProducts?.length))
                                            }
                                        >
                                            <Intl en="Next step" pt="Próximo" />
                                        </Button>
                                    ) : (
                                        <Button type="submit" loading={form.loading} color="green">
                                            <Intl en="Save Qualified Lead" pt="Salvar Lead Qualificado" />
                                        </Button>
                                    )}
                                </Group>
                            )}
                        </form>
                    </Card>
                )
            }}
        </CreateForm>
    )
}

// ═══════════════════════════════════════════════════════════════
// SUBMITTED LEADS LIST
// ═══════════════════════════════════════════════════════════════

export function SubmittedQuotesList() {
    const { create, array } = useTable('machinery', schema)

    useEffect(() => {
        if (array.length === 0) {
            const seedData = [
                { email: 'ops@google.com', phone: '+1 650 253 0000', companyName: 'Google LLC', companySize: 'Enterprise', category: 'Analytics', selectedProducts: ['an-dash', 'an-rt'], quoteTotal: 278.40 },
                { email: 'eng@shopify.com', phone: '+1 613 241 2828', companyName: 'Shopify Inc', companySize: 'Mid-Market', category: 'CRM', selectedProducts: ['crm-pro', 'crm-ai'], quoteTotal: 84.60 },
                { email: 'hello@startup.io', phone: '+1 415 555 0199', companyName: 'Startup', companySize: 'Startup', category: 'Marketing', selectedProducts: ['mkt-suite'], quoteTotal: 96.85 },
            ]
            seedData.forEach(data => create.trigger({ data }))
        }
    }, [array.length])

    return (
        <FilterForm table='machinery' schema={schema} autoTrigger>
            {form => (
                <Stack gap="xl">
                    <Paper
                        p="xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: 'var(--mantine-radius-lg)',
                        }}
                    >
                        <Stack gap="md">
                            <Text fw={700} size="lg" c="gray.3">
                                <Intl en="Filter Qualified Leads" pt="Filtrar Leads Qualificados" />
                            </Text>
                            <Grid align="flex-end">
                                <Grid.Col span={{ base: 12, sm: 4 }}>
                                    <Fields.CategoryFilter />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 4 }}>
                                    <Fields.CompanySizeFilter />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 4 }}>
                                    <Button
                                        fullWidth
                                        size="md"
                                        variant="gradient"
                                        gradient={{ from: 'violet', to: 'cyan' }}
                                        onClick={() => form.submit()}
                                        loading={form.loading}
                                    >
                                        <Intl en="Apply Filters" pt="Aplicar Filtros" />
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Paper>

                    <Stack gap="md">
                        <Text fw={600} c="dimmed">
                            <Intl
                                en={`${form.result?.length || 0} qualified leads`}
                                pt={`${form.result?.length || 0} leads qualificados`}
                            />
                        </Text>

                        {form.result?.map((item: any) => (
                            <Paper
                                key={item.id}
                                p="lg"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    borderRadius: 'var(--mantine-radius-lg)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                }}
                            >
                                <Grid align="center">
                                    <Grid.Col span={{ base: 12, sm: 8 }}>
                                        <Group justify="space-between" mb="sm">
                                            <Group gap="sm">
                                                <Badge color="violet" size="lg" variant="light">{item.companyName || '—'}</Badge>
                                                <Badge variant="outline" color={
                                                    item.companySize === 'Enterprise' ? 'violet' :
                                                        item.companySize === 'Mid-Market' ? 'blue' : 'green'
                                                }>
                                                    {item.companySize || '—'}
                                                </Badge>
                                            </Group>
                                            {item.quoteTotal > 0 && (
                                                <Badge color="cyan" variant="filled" size="lg">${item.quoteTotal?.toFixed(2)}/mo</Badge>
                                            )}
                                        </Group>
                                        <Group gap="xs" mb="md">
                                            <Badge variant="dot" color="gray" size="sm">{item.email}</Badge>
                                            <Badge variant="dot" color="gray" size="sm">{item.category || '—'}</Badge>
                                        </Group>
                                        {item.selectedProducts?.length > 0 && (
                                            <Text size="sm" c="dimmed">
                                                <Text span fw={600} c="gray.4"><Intl en="Products:" pt="Produtos:" /></Text> {item.selectedProducts.join(', ')}
                                            </Text>
                                        )}
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, sm: 4 }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Box p="md" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--mantine-radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            <Text size="xs" c="dimmed" tt="uppercase" fw={700}><Intl en="Contact" pt="Contato" /></Text>
                                            <Text size="sm" fw={500} c="gray.3" mb="xs">{item.phone || item.email}</Text>
                                            <Button fullWidth variant="light" color="cyan" size="xs" mt="sm">
                                                <Intl en="Open in CRM" pt="Abrir no CRM" />
                                            </Button>
                                        </Box>
                                    </Grid.Col>
                                </Grid>
                            </Paper>
                        ))}

                        {form.result?.length === 0 && (
                            <Text c="dimmed" ta="center" py="xl">
                                <Intl en="No matching leads found." pt="Nenhum lead encontrado." />
                            </Text>
                        )}
                    </Stack>
                </Stack>
            )}
        </FilterForm>
    )
}
