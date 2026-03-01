'use client'
import { useFields } from 'asasvirtuais/fields'
import { TextInput, SegmentedControl, Slider, Select, MultiSelect, Stack, Text, Group } from '@mantine/core'
import { Writable } from '.'

export function TypeField() {
    const { fields, setField } = useFields<Writable>()
    return (
        <Stack gap={5}>
            <Text size="sm" fw={500}>Equipment Type</Text>
            <SegmentedControl
                data={[
                    { label: 'Generator', value: 'generator' },
                    { label: 'Compressor', value: 'compressor' },
                    { label: 'Pump System', value: 'pump' },
                ]}
                value={fields.type || 'generator'}
                onChange={val => setField('type', val as Writable['type'])}
                fullWidth
            />
        </Stack>
    )
}

export function PowerField() {
    const { fields, setField } = useFields<Writable>()
    return (
        <Stack gap={5}>
            <Text size="sm" fw={500}>Power Capacity (kW)</Text>
            <Slider
                value={fields.power ?? 100}
                onChange={val => setField('power', val)}
                min={50}
                max={2000}
                step={50}
                label={val => `${val} kW`}
                marks={[
                    { value: 50, label: '50' },
                    { value: 1000, label: '1000' },
                    { value: 2000, label: '2000' },
                ]}
                mb="xl"
            />
        </Stack>
    )
}

export function VoltageField() {
    const { fields, setField } = useFields<Writable>()
    return (
        <Select
            label="Operating Voltage"
            placeholder="Select Voltage Rating"
            data={[
                { value: '120/240V 1-Phase', label: '120/240V 1-Phase' },
                { value: '208V 3-Phase', label: '208V 3-Phase' },
                { value: '480V 3-Phase', label: '480V 3-Phase' },
                { value: '600V 3-Phase', label: '600V 3-Phase' },
            ]}
            value={fields.voltage || ''}
            onChange={val => setField('voltage', val || '')}
        />
    )
}

export function FuelTypeField() {
    const { fields, setField } = useFields<Writable>()
    return (
        <Stack gap={5}>
            <Text size="sm" fw={500}>Fuel / Energy Source</Text>
            <SegmentedControl
                data={[
                    { label: 'Diesel', value: 'diesel' },
                    { label: 'Natural Gas', value: 'natural_gas' },
                    { label: 'Electric', value: 'electric' },
                ]}
                value={fields.fuelType || 'diesel'}
                onChange={val => setField('fuelType', val as Writable['fuelType'])}
                fullWidth
            />
        </Stack>
    )
}

export function EnvironmentField() {
    const { fields, setField } = useFields<Writable>()
    return (
        <Select
            label="Installation Environment"
            placeholder="Select Environment"
            data={[
                { value: 'indoor', label: 'Indoor Facility' },
                { value: 'outdoor', label: 'Outdoor Enclosure' },
                { value: 'hazardous', label: 'Hazardous Location (Class 1 Div 2)' },
            ]}
            value={fields.environment || ''}
            onChange={val => setField('environment', val as Writable['environment'])}
        />
    )
}

export function FeaturesField() {
    const { fields, setField } = useFields<Writable>()
    return (
        <MultiSelect
            label="Required Features"
            placeholder="Select features"
            data={[
                { value: 'soundproofing', label: 'Soundproof Enclosure' },
                { value: 'remote_monitoring', label: 'SCADA Remote Monitoring' },
                { value: 'auto_transfer', label: 'Automatic Transfer Switch' },
                { value: 'cold_weather', label: 'Cold Weather Kit' },
                { value: 'vibration_isolation', label: 'Vibration Isolation Mounts' },
            ]}
            value={fields.features || []}
            onChange={val => setField('features', val)}
            clearable
        />
    )
}

export function ContactEmailField() {
    const { fields, setField } = useFields<Writable>()
    return (
        <TextInput
            label="Engineering Contact Email"
            placeholder="eng@example.com"
            type="email"
            value={fields.contactEmail || ''}
            onChange={e => setField('contactEmail', e.target.value)}
        />
    )
}
