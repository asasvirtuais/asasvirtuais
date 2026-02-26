'use client'
import { SingleProvider, TableProvider, useSingle, useTable } from 'asasvirtuais/react-interface'
import { useInterface } from 'asasvirtuais/interface-provider'
import { schema } from './types'
import { Readable } from './types'
import { useUser as useAuth0 } from '@auth0/nextjs-auth0'

export function useUsers() {
    return useTable('Users', schema)
}

export function useUser() {
    const auth0 = useAuth0()
    const single = useSingle('users', schema)
    return {
        ...auth0,
        ...single,
    }
}

export function UsersProvider({ children, initialData }: { children: React.ReactNode, initialData?: Record<string, Readable> }) {
    const iface = useInterface()
    const auth0 = useAuth0()
    return (
        <TableProvider table='Users' schema={schema} interface={iface} asAbove={initialData}>
            <SingleProvider id={auth0.user?.id} table='users' schema={schema} nullIfNotFound>
                {children}
            </SingleProvider>
        </TableProvider>
    )
}
