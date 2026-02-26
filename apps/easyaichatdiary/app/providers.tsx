'use client';
import { IndexedInterfaceProvider } from 'asasvirtuais/indexed-interface';
import { SettingsProvider } from '@/src/settings/provider';
import { DaysProvider } from '@/src/days/provider';
import { SummariesProvider } from '@/src/summaries/provider';
import { schema } from './schema';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <IndexedInterfaceProvider dbName="easyaidiary" schema={schema}>
            <SettingsProvider>
                <DaysProvider>
                    <SummariesProvider>
                        {children}
                    </SummariesProvider>
                </DaysProvider>
            </SettingsProvider>
        </IndexedInterfaceProvider>
    );
}
