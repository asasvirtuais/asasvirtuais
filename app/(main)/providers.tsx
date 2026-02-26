'use client'
import { InterfaceProvider } from 'asasvirtuais/interface-provider'
import { create, find, list, remove, update } from '../interface'
import { ChatsProvider } from '@/packages/chat/provider'
import { MessagesProvider } from '@/packages/message/provider'
import { CharactersProvider } from '@/packages/character/provider'
import { VenuesProvider } from '@/packages/venue/provider'

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <InterfaceProvider find={find} list={list} create={create} update={update} remove={remove}>
            <ChatsProvider>
                <MessagesProvider>
                    <CharactersProvider>
                        <VenuesProvider>
                            {children}
                        </VenuesProvider>
                    </CharactersProvider>
                </MessagesProvider>
            </ChatsProvider>
        </InterfaceProvider>
    )
}
