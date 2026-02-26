'use client'
import { TableProvider, useTable } from 'asasvirtuais/react-interface'
import { useInterface } from 'asasvirtuais/interface-provider'
import { schema } from '.'

export function useCharacters() {
    return useTable('characters', schema)
}

export function CharactersProvider({ children }: { children: React.ReactNode }) {
    const iface = useInterface()
    return (
        <TableProvider table="characters" schema={schema} interface={iface}>
            {children}
        </TableProvider>
    )
}
