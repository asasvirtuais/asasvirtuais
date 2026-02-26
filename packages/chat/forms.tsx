'use client'
import { CreateForm, useSingle } from 'asasvirtuais/react-interface'
import { conversationSchema, messageSchema, type ConversationReadable, type MessageReadable } from '.'
import { TitleField, ModelField, ContentField } from './fields'
import { useConversations, useMessages } from './provider'

// ─── Conversation forms ─────────────────────────────────────────────────────────

export function CreateConversation({ onSuccess }: { onSuccess?: (c: ConversationReadable) => void }) {
    return (
        <CreateForm table='Conversations' schema={conversationSchema} onSuccess={onSuccess}>
            {form => (
                <form onSubmit={form.submit}>
                    <TitleField />
                    <ModelField />
                    <button type='submit' disabled={form.loading}>
                        {form.loading ? 'Creating…' : 'New Chat'}
                    </button>
                </form>
            )}
        </CreateForm>
    )
}

export function DeleteConversation({ onSuccess }: { onSuccess?: () => void }) {
    const { id } = useSingle('Conversations', conversationSchema)
    const { remove } = useConversations()
    return (
        <button
            onClick={async () => { await remove.trigger({ id }); onSuccess?.() }}
            disabled={remove.loading}
        >
            {remove.loading ? 'Deleting…' : 'Delete'}
        </button>
    )
}

// ─── Message forms ──────────────────────────────────────────────────────────────

/** Sends a user message to a conversation. Does NOT call AI — that's handled by the app layer. */
export function SendMessage({
    conversationId,
    onSuccess,
}: {
    conversationId: string
    onSuccess?: (m: MessageReadable) => void
}) {
    return (
        <CreateForm
            table='Messages'
            schema={messageSchema}
            defaults={{ conversationId, role: 'user', createdAt: Date.now() }}
            onSuccess={onSuccess}
        >
            {form => (
                <form onSubmit={form.submit}>
                    <ContentField />
                    <button type='submit' disabled={form.loading}>
                        {form.loading ? '…' : 'Send'}
                    </button>
                </form>
            )}
        </CreateForm>
    )
}

export function DeleteMessage({ onSuccess }: { onSuccess?: () => void }) {
    const { id } = useSingle('Messages', messageSchema)
    const { remove } = useMessages()
    return (
        <button
            onClick={async () => { await remove.trigger({ id }); onSuccess?.() }}
            disabled={remove.loading}
        >
            Delete
        </button>
    )
}
