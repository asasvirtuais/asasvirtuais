'use client'
import { TableProvider, useTable } from 'asasvirtuais/react-interface'
import { useInterface } from 'asasvirtuais/interface-provider'
import { schema } from '.'

export function useMessages() {
    return useTable('messages', schema)
}

export function MessagesProvider({ children }: { children: React.ReactNode }) {
    const iface = useInterface()
    return (
        <TableProvider table='messages' schema={schema} interface={iface}>
            {children}
        </TableProvider>
    )
}
