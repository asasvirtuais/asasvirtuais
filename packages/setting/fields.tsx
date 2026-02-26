'use client'
import { TextInput, PasswordInput } from '@mantine/core'
import { useFields } from 'asasvirtuais/fields'

export function GoogleApiKeyField() {
    const { fields, setField } = useFields<{ google_api_key: string }>()
    return (
        <PasswordInput
            label="Google AI Studio API Key"
            placeholder="Paste your API key here..."
            value={fields.google_api_key || ''}
            onChange={(e) => setField('google_api_key', e.currentTarget.value)}
            description="Your key is stored locally on your device or in your personal database."
        />
    )
}
