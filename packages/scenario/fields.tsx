'use client'
import { useFields } from 'asasvirtuais/fields'
import { TextInput, Textarea, Select } from '@mantine/core'
import { useCharacters } from '@/packages/character/provider'
import { useVenues } from '@/packages/venue/provider'
import { useChats } from '@/packages/chat/provider'
import { useEffect } from 'react'

export function ChatField() {
    const { fields, setField } = useFields<{ chat: string }>()
    const { array, list } = useChats()

    useEffect(() => { list.trigger({}) }, [])

    return (
        <Select
            label="Chat"
            placeholder="Select a chat"
            data={array.map(c => ({ value: c.id, label: c.title || c.id }))}
            value={fields.chat || null}
            onChange={(value) => setField('chat', value || '')}
            searchable
            clearable
        />
    )
}

export function InstructionsField() {
    const { fields, setField } = useFields<{ instructions: string }>()
    return (
        <Textarea
            label="Instructions"
            placeholder="Specific instructions for this scenario"
            value={fields.instructions || ''}
            onChange={(e) => setField('instructions', e.target.value)}
            minRows={3}
        />
    )
}

export function CharacterField() {
    const { fields, setField } = useFields<{ character: string }>()
    const { array, list } = useCharacters()

    useEffect(() => { list.trigger({}) }, [])

    return (
        <Select
            label="Character"
            placeholder="Select a character"
            data={array.map(c => ({ value: c.id, label: c.name || c.id }))}
            value={fields.character || null}
            onChange={(value) => setField('character', value || '')}
            searchable
            clearable
        />
    )
}

export function VenueField() {
    const { fields, setField } = useFields<{ venue: string }>()
    const { array, list } = useVenues()

    useEffect(() => { list.trigger({}) }, [])

    return (
        <Select
            label="Venue"
            placeholder="Select a venue"
            data={array.map(v => ({ value: v.id, label: v.title || v.id }))}
            value={fields.venue || null}
            onChange={(value) => setField('venue', value || '')}
            searchable
            clearable
        />
    )
}
