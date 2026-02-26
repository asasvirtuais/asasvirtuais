'use client'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '@/packages/chat'
import { CreateChat, UpdateChat, DeleteChat } from '@/packages/chat/forms'
import { SingleChat, ChatListItem } from '@/packages/chat/components'
import { SingleChatView } from './SingleChatView'

export default function ChatDemoPage() {
    return (
        <OperationalDashboardLayout
            title='Chat Model CRUD'
            tableName='chats'
            schema={schema}
            ListItem={ChatListItem}
            SingleItem={SingleChat}
            CreateForm={CreateChat}
            UpdateForm={UpdateChat}
            DeleteForm={DeleteChat}
            CustomView={SingleChatView}
        />
    )
}
