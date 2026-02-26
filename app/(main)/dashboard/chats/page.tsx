'use client'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '@/packages/chat'
import { CreateChat, UpdateChat, DeleteChat } from '@/packages/chat/forms'
import { SingleChat, ChatListItem } from '@/packages/chat/components'

export default function FirebaseDashboardPage() {
    return (
        <OperationalDashboardLayout
            title='Firebase Data Management'
            tableName='chats'
            schema={schema}
            ListItem={ChatListItem}
            SingleItem={SingleChat}
            CreateForm={CreateChat}
            UpdateForm={UpdateChat}
            DeleteForm={DeleteChat}
        />
    )
}
