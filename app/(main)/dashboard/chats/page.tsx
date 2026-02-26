'use client'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '@/packages/chat'
import { CreateChat, UpdateChat, DeleteChat } from '@/packages/chat/forms'
import { SingleChat, ChatListItem } from '@/packages/chat/components'

import { GenerateChatButton } from '@/packages/generation/components'

export default function ChatsDashboardPage() {
    return (
        <OperationalDashboardLayout
            title='Chats Management'
            tableName='chats'
            schema={schema}
            ListItem={ChatListItem}
            SingleItem={SingleChat}
            CreateForm={CreateChat}
            UpdateForm={UpdateChat}
            DeleteForm={DeleteChat}
            generateButton={<GenerateChatButton onGenerate={() => { }} />}
        />
    )
}
