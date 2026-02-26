'use client'
import { useFields } from 'asasvirtuais/fields'
import { TextInput, Textarea, Select, JsonInput } from '@mantine/core'

export function ContentField() {
    const { fields, setField } = useFields<{ Content: string }>()
    return (
        <Textarea
            label='Content'
            placeholder='Message content...'
            value={fields.Content || ''}
            onChange={e => setField('Content', e.target.value)}
            minRows={2}
        />
    )
}

export function RoleField() {
    const { fields, setField } = useFields<{ Role: 'user' | 'assistant' | 'system' }>()
    return (
        <Select
            label='Role'
            data={[
                { value: 'user', label: 'User' },
                { value: 'assistant', label: 'Assistant' },
                { value: 'system', label: 'System' },
            ]}
            value={fields.Role || 'user'}
            onChange={val => setField('Role', val as any)}
        />
    )
}

export function ChatField() {
    const { fields, setField } = useFields<{ chat: string }>()
    return (
        <TextInput
            label='Chat ID'
            placeholder='Parent chat id'
            value={fields.chat || ''}
            onChange={e => setField('chat', e.target.value)}
        />
    )
}

export function MetadataField() {
    const { fields, setField } = useFields<{ Metadata: any }>()
    return (
        <JsonInput
            label='Metadata (Debug Info)'
            placeholder='RAW JSON'
            validationError='Invalid JSON'
            formatOnBlur
            autosize
            minRows={4}
            value={JSON.stringify(fields.Metadata || {}, null, 2)}
            onChange={val => {
                try {
                    setField('Metadata', JSON.parse(val))
                } catch (e) {
                    // ignore invalid json during typing
                }
            }}
        />
    )
}
