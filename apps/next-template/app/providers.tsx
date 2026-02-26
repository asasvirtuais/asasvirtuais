'use client'
import { InterfaceProvider } from 'asasvirtuais/interface-provider'
import { find, list, create, update, remove } from './interface'
import { UsersProvider } from '@/packages/user/provider'

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <InterfaceProvider find={find} list={list} create={create} update={update} remove={remove}>
            <UsersProvider>
                {children}
            </UsersProvider>
        </InterfaceProvider>
    )
}
