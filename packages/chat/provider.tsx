'use client'
import { TableProvider, useTable } from 'asasvirtuais/react-interface'
import { useInterface } from 'asasvirtuais/interface-provider'
import { conversationSchema, messageSchema } from '.'

// ─── Conversations ─────────────────────────────────────────────────────────────

export function useConversations() {
    return useTable('Conversations', conversationSchema)
}

export function ConversationsProvider({ children }: { children: React.ReactNode }) {
    const iface = useInterface()
    return (
        <TableProvider table='Conversations' schema={conversationSchema} interface={iface}>
            {children}
        </TableProvider>
    )
}

// ─── Messages ──────────────────────────────────────────────────────────────────

export function useMessages() {
    return useTable('Messages', messageSchema)
}

export function MessagesProvider({ children }: { children: React.ReactNode }) {
    const iface = useInterface()
    return (
        <TableProvider table='Messages' schema={messageSchema} interface={iface}>
            {children}
        </TableProvider>
    )
}
