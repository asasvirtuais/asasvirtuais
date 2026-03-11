'use client'
import { useFields } from 'asasvirtuais/fields'
import { TextInput, Textarea, Select, Slider, Stack, Text, TagsInput } from '@mantine/core'

export function TitleField() {
    const { fields, setField } = useFields<{ title: string }>()
    return (
        <TextInput
            label='Title'
            placeholder='System Persona Name'
            value={fields.title || ''}
            onChange={e => setField('title', e.target.value)}
        />
    )
}

export function InstructionsField() {
    const { fields, setField } = useFields<{ instructions: string }>()
    return (
        <Textarea
            label='Instructions'
            placeholder='System instructions for the AI...'
            value={fields.instructions || ''}
            onChange={e => setField('instructions', e.target.value)}
            minRows={4}
        />
    )
}

export function TemperatureField() {
    const { fields, setField } = useFields<{ temperature: number }>()
    return (
        <Stack gap={5}>
            <Text size='sm' fw={500}>Temperature</Text>
            <Slider
                value={fields.temperature ?? 0.7}
                onChange={val => setField('temperature', val)}
                min={0}
                max={2}
                step={0.1}
                label={val => val.toFixed(1)}
                marks={[
                    { value: 0, label: '0' },
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                ]}
                mb='xl'
            />
        </Stack>
    )
}

export function ModelField() {
    const { fields, setField } = useFields<{ model: string }>()
    return (
        <Select
            label='Model'
            placeholder='Select AI Model'
            data={[
                { value: 'gemini-3.1-flash-lite-preview', label: 'Gemini 3.1 Flash Lite Preview' },
            ]}
            value={fields.model || ''}
            onChange={val => setField('model', val || '')}
        />
    )
}

export function ToolsField() {
    const { fields, setField } = useFields<{ tools: string[] }>()
    return (
        <TagsInput
            label="Tools"
            value={fields.tools || []}
            onChange={(value) => setField('tools', value)}
            placeholder="Available tools for this chat"
            clearable
        />
    )
}
