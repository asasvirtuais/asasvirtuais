'use client'
import { TableProvider, useTable } from 'asasvirtuais/react-interface'
import { useInterface } from 'asasvirtuais/interface-provider'
import { schema } from '.'

export function useChats() {
    return useTable('chats', schema)
}

export function ChatsProvider({ children }: { children: React.ReactNode }) {
    const iface = useInterface()
    return (
        <TableProvider table='chats' schema={schema} interface={iface}>
            {children}
        </TableProvider>
    )
}
