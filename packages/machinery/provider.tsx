'use client'
import { TableProvider, useTable } from 'asasvirtuais/react-interface'
import { IndexedInterfaceProvider } from 'asasvirtuais/indexed-interface'
import { useInterface } from 'asasvirtuais/interface-provider'
import { schema } from '.'

export function MachineryProvider({ children }: { children: React.ReactNode }) {
    return (
        <IndexedInterfaceProvider dbName="machinery-demo" schema={{ machinery: schema }}>
            <MachineryTableProvider>
                {children}
            </MachineryTableProvider>
        </IndexedInterfaceProvider>
    )
}

function MachineryTableProvider({ children }: { children: React.ReactNode }) {
    const tableIface = useInterface()
    return (
        <TableProvider table='machinery' schema={schema} interface={tableIface}>
            {children}
        </TableProvider>
    )
}

export function useMachinery() {
    return useTable('machinery', schema)
}
