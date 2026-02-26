'use client'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '@/packages/message'
import { CreateMessage, UpdateMessage, DeleteMessage } from '@/packages/message/forms'
import { SingleMessage, MessageListItem } from '@/packages/message/components'
import { SingleMessageView } from '@/app/demo/message/SingleMessageView'

export default function MessageDashboardPage() {
    return (
        <OperationalDashboardLayout
            title='Messages Data Management'
            tableName='messages'
            schema={schema}
            ListItem={MessageListItem}
            SingleItem={SingleMessage}
            CreateForm={CreateMessage}
            UpdateForm={UpdateMessage}
            DeleteForm={DeleteMessage}
            CustomView={SingleMessageView}
        />
    )
}
