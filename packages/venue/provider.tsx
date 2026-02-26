'use client'
import { TableProvider, useTable } from 'asasvirtuais/react-interface'
import { useInterface } from 'asasvirtuais/interface-provider'
import { schema } from '.'

export function useVenues() {
    return useTable('venues', schema)
}

export function VenuesProvider({ children }: { children: React.ReactNode }) {
    const iface = useInterface()
    return (
        <TableProvider table="venues" schema={schema} interface={iface}>
            {children}
        </TableProvider>
    )
}
