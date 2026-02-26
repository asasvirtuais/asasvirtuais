'use client'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '.'
import { CreateChat, UpdateChat, DeleteChat } from './forms'
import { SingleChat, ChatListItem } from './components'
export default function ChatDashboardPage({ CustomView }: { CustomView?: React.ComponentType }) {
    return (
        <OperationalDashboardLayout
            title='Chat Model Package'
            tableName='chats'
            schema={schema}
            ListItem={ChatListItem}
            SingleItem={SingleChat}
            CreateForm={CreateChat}
            UpdateForm={UpdateChat}
            DeleteForm={DeleteChat}
            CustomView={CustomView}
        />
    )
}
