'use client'
import { useSingle } from 'asasvirtuais/react-interface'
import { conversationSchema, messageSchema, type ConversationReadable, type MessageReadable } from '.'

// ─── Conversation components ────────────────────────────────────────────────────

/** Compact row for sidebar lists — must be inside SingleProvider for 'Conversations' */
export function ConversationItem() {
    const { single } = useSingle('Conversations', conversationSchema)
    const convo = single as ConversationReadable
    return (
        <div className='conversation-item'>
            <span className='conversation-title'>{convo.title || 'Untitled'}</span>
            {convo.model && <span className='conversation-model'>{convo.model}</span>}
        </div>
    )
}

/** Full header for currently active conversation — must be inside SingleProvider */
export function ConversationHeader() {
    const { single } = useSingle('Conversations', conversationSchema)
    const convo = single as ConversationReadable
    return (
        <div className='conversation-header'>
            <h2>{convo.title || 'Untitled'}</h2>
            {convo.model && <span className='model-badge'>{convo.model}</span>}
        </div>
    )
}

// ─── Message components ─────────────────────────────────────────────────────────

/** Single message bubble — must be inside SingleProvider for 'Messages' */
export function MessageBubble() {
    const { single } = useSingle('Messages', messageSchema)
    const msg = single as MessageReadable
    return (
        <div className={`message-bubble message-${msg.role}`}>
            <div className='message-content'>{msg.content}</div>
        </div>
    )
}
