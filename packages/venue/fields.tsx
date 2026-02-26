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

export function CircumstancesField() {
    const { fields, setField } = useFields<{ circumstances: string }>()
    return (
        <Textarea
            label="Circumstances"
            value={fields.circumstances || ''}
            onChange={(e) => setField('circumstances', e.target.value)}
            placeholder="Initial circumstances/system instructions for the AI in this venue"
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
