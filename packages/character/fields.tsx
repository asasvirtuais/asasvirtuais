'use client'
import { useFields } from 'asasvirtuais/fields'
import { TextInput, Textarea, TagsInput } from '@mantine/core'

export function NameField() {
    const { fields, setField } = useFields<{ name: string }>()
    return (
        <TextInput
            label="Name"
            value={fields.name || ''}
            onChange={(e) => setField('name', e.target.value)}
            placeholder="Character name (e.g., Michael)"
        />
    )
}

export function DefinitionField() {
    const { fields, setField } = useFields<{ definition: string }>()
    return (
        <TextInput
            label="Definition"
            value={fields.definition || ''}
            onChange={(e) => setField('definition', e.target.value)}
            placeholder="Short phrase (e.g., The Office Manager)"
        />
    )
}

export function DetailsField() {
    const { fields, setField } = useFields<{ details: string }>()
    return (
        <Textarea
            label="Details"
            value={fields.details || ''}
            onChange={(e) => setField('details', e.target.value)}
            placeholder="Full character details and characteristics"
            minRows={4}
        />
    )
}

export function AvatarField() {
    const { fields, setField } = useFields<{ avatar: string }>()
    return (
        <TextInput
            label="Avatar URL"
            value={fields.avatar || ''}
            onChange={(e) => setField('avatar', e.target.value)}
            placeholder="URL to avatar image"
        />
    )
}

export function SkillsField() {
    const { fields, setField } = useFields<{ skills: string[] }>()
    return (
        <TagsInput
            label="Skills"
            value={fields.skills || []}
            onChange={(value) => setField('skills', value)}
            placeholder="Add skills relevant to situations"
            clearable
        />
    )
}
