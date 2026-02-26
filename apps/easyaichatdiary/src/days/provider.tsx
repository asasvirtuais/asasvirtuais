'use client';
import { TableProvider, useTable } from 'asasvirtuais/react-interface';
import { useInterface } from 'asasvirtuais/interface-provider';
import { schema } from '.';

export function useDays() {
    return useTable('Days', schema);
}

export function DaysProvider({ children }: { children: React.ReactNode }) {
    const iface = useInterface();
    return (
        <TableProvider table="Days" schema={schema} interface={iface}>
            {children}
        </TableProvider>
    );
}
