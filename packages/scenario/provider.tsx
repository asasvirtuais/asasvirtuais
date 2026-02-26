'use client'
import { TableProvider, useTable } from 'asasvirtuais/react-interface'
import { useInterface } from 'asasvirtuais/interface-provider'
import { schema } from '.'

export function useScenarios() {
    return useTable('scenarios', schema)
}

export function ScenariosProvider({ children }: { children: React.ReactNode }) {
    const iface = useInterface()
    return (
        <TableProvider table="scenarios" schema={schema} interface={iface}>
            {children}
        </TableProvider>
    )
}
