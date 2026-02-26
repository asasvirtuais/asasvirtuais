'use client'
import { useFields } from 'asasvirtuais/fields'

// ─── Conversation fields ────────────────────────────────────────────────────────

export function TitleField() {
    const { fields, setField } = useFields<{ title: string }>()
    return (
        <input
            value={fields.title || ''}
            onChange={e => setField('title', e.target.value)}
            placeholder='Conversation title…'
        />
    )
}

export function ModelField() {
    const { fields, setField } = useFields<{ model: string }>()
    return (
        <select
            value={fields.model || 'gemini-2.0-flash'}
            onChange={e => setField('model', e.target.value)}
        >
            <option value='gemini-2.0-flash'>Gemini 2.0 Flash</option>
            <option value='gemini-2.0-pro'>Gemini 2.0 Pro</option>
            <option value='gemini-1.5-flash'>Gemini 1.5 Flash</option>
        </select>
    )
}

// ─── Message fields ─────────────────────────────────────────────────────────────

export function ContentField({ placeholder = 'Type a message…' }: { placeholder?: string }) {
    const { fields, setField } = useFields<{ content: string }>()
    return (
        <textarea
            value={fields.content || ''}
            onChange={e => setField('content', e.target.value)}
            placeholder={placeholder}
            rows={1}
        />
    )
}
