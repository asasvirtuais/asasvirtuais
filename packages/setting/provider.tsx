'use client'
import { TableProvider, useTable } from 'asasvirtuais/react-interface'
import { useInterface } from 'asasvirtuais/interface-provider'
import { schema } from '.'

export function useSettings() {
    return useTable('settings', schema)
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const iface = useInterface()
    return (
        <TableProvider table='settings' schema={schema} interface={iface}>
            {children}
        </TableProvider>
    )
}
