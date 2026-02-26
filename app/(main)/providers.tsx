'use client'
import { InterfaceProvider } from 'asasvirtuais/interface-provider'
import { create, find, list, remove, update } from '../interface'
import { ChatsProvider } from '@/packages/chat/provider'
import { MessagesProvider } from '@/packages/message/provider'

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <InterfaceProvider find={find} list={list} create={create} update={update} remove={remove}>
            <ChatsProvider>
                <MessagesProvider>
                    {children}
                </MessagesProvider>
            </ChatsProvider>
        </InterfaceProvider>
    )
}
