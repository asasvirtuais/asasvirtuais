'use client'
import { useFields } from 'asasvirtuais/fields'
import { TextInput, Textarea, Select, JsonInput } from '@mantine/core'

export function ContentField() {
    const { fields, setField } = useFields<{ content: string }>()
    return (
        <Textarea
            label='Content'
            placeholder='Message content...'
            value={fields.content || ''}
            onChange={e => setField('content', e.target.value)}
            minRows={2}
        />
    )
}

export function RoleField() {
    const { fields, setField } = useFields<{ role: 'user' | 'assistant' | 'system' }>()
    return (
        <Select
            label='Role'
            data={[
                { value: 'user', label: 'User' },
                { value: 'assistant', label: 'Assistant' },
                { value: 'system', label: 'System' },
            ]}
            value={fields.role || 'user'}
            onChange={val => setField('role', val as any)}
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
    const { fields, setField } = useFields<{ metadata: any }>()
    return (
        <JsonInput
            label='Metadata (Debug Info)'
            placeholder='RAW JSON'
            validationError='Invalid JSON'
            formatOnBlur
            autosize
            minRows={4}
            value={JSON.stringify(fields.metadata || {}, null, 2)}
            onChange={val => {
                try {
                    setField('metadata', JSON.parse(val))
                } catch (e) {
                    // ignore invalid json during typing
                }
            }}
        />
    )
}
