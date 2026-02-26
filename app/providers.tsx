'use client'
import { InterfaceProvider } from '@/packages/asasvirtuais/packages/interface-provider'
import { create, find, list, remove, update } from './interface'

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <InterfaceProvider find={find} list={list} create={create} update={update} remove={remove}>
            {children}
        </InterfaceProvider>
    )
}
