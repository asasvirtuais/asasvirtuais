'use client'
import { useState, useEffect } from 'react'
import { CreateForm, FilterForm, useTable } from 'asasvirtuais/react-interface'
import { schema } from '.'
import * as Fields from './fields'
import { Stepper, Button, Group, Stack, Card, Text, Badge, Divider, Grid, Box } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { IconCheck, IconSettings, IconBolt, IconMessageReport } from '@tabler/icons-react'
import { Intl } from '@/app/(main)/IntlProvider'

export function ConfigureMachinery() {
    return (
        <CreateForm
            table='machinery'
            schema={schema}
            defaults={{
                type: 'generator',
                power: 100,
                fuelType: 'diesel',
                features: []
            }}
            onSuccess={() => {
                Notifications.show({
                    title: 'Configuration Submitted',
                    message: 'Your custom machinery configuration has been recorded.',
                    color: 'green',
                    icon: <IconCheck size={16} />
                })
            }}
        >
            {form => {
                const [active, setActive] = useState(0)

                const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current))
                const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

                const handleSubmit = async (e: React.FormEvent) => {
                    e.preventDefault()
                    await form.submit()
                    setActive(3) // Move to completed step
                }

                return (
                    <Card shadow="md" padding="xl" radius="md" withBorder>
                        <form onSubmit={handleSubmit}>
                            <Stepper active={active} onStepClick={setActive} mb="xl">
                                <Stepper.Step label={<Intl en="Core Specs" pt="Specs. Principais" />} description={<Intl en="Type & Power" pt="Tipo e Potência" />} icon={<IconSettings size={18} />}>
                                    <Stack mt="xl">
                                        <Fields.TypeField />
                                        <Fields.PowerField />
                                    </Stack>
                                </Stepper.Step>
                                <Stepper.Step label={<Intl en="Environment" pt="Ambiente" />} description={<Intl en="Voltage & Fuel" pt="Voltagem e Combustível" />} icon={<IconBolt size={18} />}>
                                    <Stack mt="xl">
                                        <Fields.VoltageField />
                                        <Fields.FuelTypeField />
                                        <Fields.EnvironmentField />
                                    </Stack>
                                </Stepper.Step>
                                <Stepper.Step label={<Intl en="Finalization" pt="Finalização" />} description={<Intl en="Features & Contact" pt="Recursos e Contato" />} icon={<IconMessageReport size={18} />}>
                                    <Stack mt="xl">
                                        <Fields.FeaturesField />
                                        <Fields.ContactEmailField />
                                    </Stack>
                                </Stepper.Step>
                                <Stepper.Completed>
                                    <Card bg="blue.0" mt="xl" padding="xl" radius="md">
                                        <Text fw={700} ta="center" size="lg" c="blue.7">
                                            <Intl en="Configuration Complete!" pt="Configuração Concluída!" />
                                        </Text>
                                        <Text ta="center" mt="sm">
                                            <Intl en="Your technical specifications have been submitted successfully. Our engineering team will review the requirements." pt="Suas especificações técnicas foram enviadas com sucesso. Nossa equipe de engenharia avaliará os requisitos." />
                                        </Text>
                                        <Group justify="center" mt="md">
                                            <Button variant="light" onClick={() => {
                                                form.setFields({ type: 'generator', power: 100, features: [], fuelType: 'diesel', contactEmail: '', environment: 'indoor', voltage: '' })
                                                setActive(0)
                                            }}>
                                                <Intl en="Configure Another Quote" pt="Configurar Novo Orçamento" />
                                            </Button>
                                        </Group>
                                    </Card>
                                </Stepper.Completed>
                            </Stepper>

                            {active < 3 && (
                                <Group justify="space-between" mt="xl">
                                    <Button variant="default" onClick={prevStep} disabled={active === 0}>
                                        <Intl en="Back" pt="Voltar" />
                                    </Button>
                                    {active < 2 ? (
                                        <Button onClick={nextStep}>
                                            <Intl en="Next step" pt="Próximo" />
                                        </Button>
                                    ) : (
                                        <Button type="submit" loading={form.loading} color="blue">
                                            <Intl en="Request Quote" pt="Solicitar Orçamento" />
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

export function SubmittedQuotesList() {
    const { index, create, array } = useTable('machinery', schema)

    useEffect(() => {
        // Seed database if empty and data is loaded
        if (array.length === 0) {
            const seedData = [
                { type: 'generator', power: 1500, voltage: '480V 3-Phase', fuelType: 'diesel', environment: 'outdoor', features: ['soundproofing', 'auto_transfer'], contactEmail: 'ops@factory.com' },
                { type: 'compressor', power: 250, voltage: '208V 3-Phase', fuelType: 'electric', environment: 'indoor', features: ['vibration_isolation'], contactEmail: 'maintenance@corp.com' },
                { type: 'pump', power: 800, voltage: '600V 3-Phase', fuelType: 'natural_gas', environment: 'hazardous', features: ['remote_monitoring'], contactEmail: 'safety@rig.com' }
            ]
            seedData.forEach(data => create.trigger({ data }))
        }
    }, [array.length])

    return (
        <FilterForm table='machinery' schema={schema} autoTrigger>
            {form => (
                <Stack gap="xl">
                    <Card shadow="sm" radius="md" withBorder p="xl" bg="gray.0">
                        <Stack gap="md">
                            <Text fw={700} size="lg">
                                <Intl en="Search & Filter Specifications" pt="Busca e Filtros de Especificações" />
                            </Text>
                            <Grid align="flex-end">
                                <Grid.Col span={{ base: 12, sm: 4 }}>
                                    <Fields.TypeFilter />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 4 }}>
                                    <Fields.EnvironmentFilter />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 4 }}>
                                    <Button
                                        fullWidth
                                        size="md"
                                        variant="gradient"
                                        gradient={{ from: 'blue', to: 'cyan' }}
                                        onClick={() => form.submit()}
                                        loading={form.loading}
                                    >
                                        <Intl en="Apply Search" pt="Aplicar Busca" />
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Card>

                    <Stack gap="md">
                        <Group justify="space-between">
                            <Text fw={600} c="dimmed">
                                <Intl
                                    en={`${form.result?.length || 0} Technical Matches Found`}
                                    pt={`${form.result?.length || 0} Correspondências Técnicas Encontradas`}
                                />
                            </Text>
                        </Group>

                        {form.result?.map((item: any) => (
                            <Card shadow="sm" padding="md" radius="md" withBorder key={item.id}>
                                <Grid>
                                    <Grid.Col span={{ base: 12, sm: 8 }}>
                                        <Group justify="space-between" mb="xs">
                                            <Group gap="sm">
                                                <Badge color="blue" size="lg">{String(item.type).toUpperCase()}</Badge>
                                                <Text fw={700}>{item.id}</Text>
                                            </Group>
                                            <Badge color="indigo" variant="filled">{item.power} kW</Badge>
                                        </Group>

                                        <Group gap="xs" mb="sm">
                                            <Badge variant="outline" color="gray">{item.voltage}</Badge>
                                            <Badge variant="outline" color="gray">{String(item.fuelType).replace('_', ' ')}</Badge>
                                            <Badge variant="outline" color="gray">{item.environment}</Badge>
                                        </Group>

                                        {item.features?.length > 0 && (
                                            <Text size="sm">
                                                <strong><Intl en="Specifications:" pt="Especificações:" /></strong> {item.features.join(', ').replace('_', ' ')}
                                            </Text>
                                        )}
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, sm: 4 }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Box p="sm" bg="gray.1" style={{ borderRadius: 8 }}>
                                            <Text size="xs" c="dimmed" tt="uppercase" fw={700}><Intl en="Project Context" pt="Contexto do Projeto" /></Text>
                                            <Text size="sm" fw={500}>{item.contactEmail}</Text>
                                            <Button fullWidth variant="light" size="xs" mt="md">
                                                <Intl en="Analyze Quote" pt="Analisar Orçamento" />
                                            </Button>
                                        </Box>
                                    </Grid.Col>
                                </Grid>
                            </Card>
                        ))}

                        {form.result?.length === 0 && (
                            <Text c="dimmed" ta="center" py="xl">
                                <Intl en="No matching records found." pt="Nenhum registro encontrado." />
                            </Text>
                        )}
                    </Stack>
                </Stack>
            )}
        </FilterForm>
    )
}
