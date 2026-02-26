'use client'
import { IndexedInterfaceProvider } from 'asasvirtuais/indexed-interface'
import { ChatsProvider } from '@/packages/chat/provider'
import { schema } from '@/app/schema'

export default function DemoProviders({ children }: { children: React.ReactNode }) {
    return (
        <IndexedInterfaceProvider dbName='asasvirtuais-demo-v1' schema={schema}>
            <ChatsProvider>
                {children}
            </ChatsProvider>
        </IndexedInterfaceProvider>
    )
}
