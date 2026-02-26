'use client'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '.'
import { useChats } from './provider'
import { CreateChat, UpdateChat, DeleteChat } from './forms'
import { SingleChat, ChatListItem } from './components'

export default function ChatPage() {
    return (
        <OperationalDashboardLayout
            title='Chat Model CRUD'
            tableName='Chats'
            schema={schema}
            useTableHook={useChats as any}
            ListItem={ChatListItem}
            SingleItem={SingleChat}
            CreateForm={CreateChat}
            UpdateForm={UpdateChat}
            DeleteForm={DeleteChat}
        />
    )
}
