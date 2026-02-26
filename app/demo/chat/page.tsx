'use client'
import ChatPage from '@/packages/chat/page'
import { SingleChatView } from './SingleChatView'

export default function ChatDemoPage() {
    return <ChatPage CustomView={SingleChatView} />
}
