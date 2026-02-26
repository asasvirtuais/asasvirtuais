'use client';
import { TableProvider, useTable } from 'asasvirtuais/react-interface';
import { useInterface } from 'asasvirtuais/interface-provider';
import { schema } from '.';

export function useSummaries() {
    return useTable('Summaries', schema);
}

export function SummariesProvider({ children }: { children: React.ReactNode }) {
    const iface = useInterface();
    return (
        <TableProvider table="Summaries" schema={schema} interface={iface}>
            {children}
        </TableProvider>
    );
}
