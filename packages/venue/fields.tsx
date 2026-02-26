'use client'
import { useFields } from 'asasvirtuais/fields'
import { TextInput, Textarea, TagsInput } from '@mantine/core'

export function TitleField() {
    const { fields, setField } = useFields<{ title: string }>()
    return (
        <TextInput
            label="Title"
            value={fields.title || ''}
            onChange={(e) => setField('title', e.target.value)}
            placeholder="Venue or situation (e.g., at the Office)"
        />
    )
}

export function SystemField() {
    const { fields, setField } = useFields<{ system: string }>()
    return (
        <Textarea
            label="System Prompt"
            value={fields.system || ''}
            onChange={(e) => setField('system', e.target.value)}
            placeholder="Initial instructions for the AI in this venue"
            minRows={4}
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
            placeholder="Tools available in this venue"
            clearable
        />
    )
}
