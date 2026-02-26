'use client'
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    KeyboardEvent,
    ReactNode,
    TextareaHTMLAttributes,
    ButtonHTMLAttributes,
} from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChatMessage = {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    /** Optional trailing node rendered inside the bubble (e.g. actions, timestamp) */
    footer?: ReactNode
}

// ─── ChatLayout ───────────────────────────────────────────────────────────────
// The outer shell. Full viewport height, flex column.

export type ChatLayoutProps = {
    children: ReactNode
    className?: string
    style?: React.CSSProperties
}

export function ChatLayout({ children, className, style }: ChatLayoutProps) {
    return (
        <div
            data-chat='layout'
            className={className}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100dvh',
                overflow: 'hidden',
                background: 'var(--chat-bg, #050f0e)',
                color: 'var(--chat-fg, #e2e8f0)',
                fontFamily: 'var(--chat-font, system-ui, sans-serif)',
                ...style,
            }}
        >
            {children}
        </div>
    )
}

// ─── ChatNav ─────────────────────────────────────────────────────────────────
// Top navigation bar. Accepts anything as children.

export type ChatNavProps = {
    children: ReactNode
    className?: string
    style?: React.CSSProperties
}

export function ChatNav({ children, className, style }: ChatNavProps) {
    return (
        <header
            data-chat='nav'
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0 16px',
                height: '56px',
                flexShrink: 0,
                borderBottom: '1px solid var(--chat-border, rgba(255,255,255,0.07))',
                background: 'var(--chat-nav-bg, rgba(255,255,255,0.02))',
                ...style,
            }}
        >
            {children}
        </header>
    )
}

// ─── ChatTitle ────────────────────────────────────────────────────────────────
// Title + optional subtitle inside the nav. Grows to fill available space.

export type ChatTitleProps = {
    title?: ReactNode
    subtitle?: ReactNode
    className?: string
    style?: React.CSSProperties
}

export function ChatTitle({ title, subtitle, className, style }: ChatTitleProps) {
    return (
        <div
            data-chat='title'
            className={className}
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minWidth: 0,
                ...style,
            }}
        >
            {title && (
                <span style={{
                    fontWeight: 600,
                    fontSize: '15px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: 'var(--chat-title-color, #e2e8f0)',
                }}>
                    {title}
                </span>
            )}
            {subtitle && (
                <span style={{
                    fontSize: '11px',
                    color: 'var(--chat-subtitle-color, rgba(255,255,255,0.35))',
                    marginTop: '1px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {subtitle}
                </span>
            )}
        </div>
    )
}

// ─── ChatMenu ─────────────────────────────────────────────────────────────────
// Right-side area inside the nav for actions / icon buttons.

export type ChatMenuProps = {
    children: ReactNode
    className?: string
    style?: React.CSSProperties
}

export function ChatMenu({ children, className, style }: ChatMenuProps) {
    return (
        <div
            data-chat='menu'
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
                ...style,
            }}
        >
            {children}
        </div>
    )
}

// ─── ChatBody ─────────────────────────────────────────────────────────────────
// Scrollable messages area. Fills all remaining space.

export type ChatBodyProps = {
    children: ReactNode
    className?: string
    style?: React.CSSProperties
}

export function ChatBody({ children, className, style }: ChatBodyProps) {
    return (
        <div
            data-chat='body'
            className={className}
            style={{
                flex: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                ...style,
            }}
        >
            {children}
        </div>
    )
}

// ─── ChatMessages ─────────────────────────────────────────────────────────────
// Renders a list of ChatMessage objects as styled bubbles.
// Automatically scrolls to bottom on new messages.

export type ChatMessagesProps = {
    messages: ChatMessage[]
    /** Extra node appended after all bubbles — use for a streaming preview bubble */
    streaming?: ReactNode
    empty?: ReactNode
    className?: string
    style?: React.CSSProperties
}

export function ChatMessages({
    messages,
    streaming,
    empty,
    className,
    style,
}: ChatMessagesProps) {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length, streaming])

    return (
        <div
            data-chat='messages'
            className={className}
            style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 16px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                ...style,
            }}
        >
            {messages.length === 0 && !streaming && (empty ?? null)}

            {messages.map(msg => (
                <ChatBubble key={msg.id} message={msg} />
            ))}

            {streaming}

            <div ref={bottomRef} style={{ height: 1, flexShrink: 0 }} />
        </div>
    )
}

// ─── ChatBubble ───────────────────────────────────────────────────────────────
// Individual message bubble. Used internally by ChatMessages and exposed
// so developers can render custom messages or streaming previews.

export type ChatBubbleProps = {
    message: ChatMessage
    className?: string
    style?: React.CSSProperties
}

export function ChatBubble({ message, className, style }: ChatBubbleProps) {
    const isUser = message.role === 'user'
    const isSystem = message.role === 'system'

    return (
        <div
            data-chat='bubble'
            data-role={message.role}
            className={className}
            style={{
                alignSelf: isUser ? 'flex-end' : isSystem ? 'center' : 'flex-start',
                maxWidth: isSystem ? '100%' : '78%',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                animation: 'chat-fadein 0.18s ease',
                ...style,
            }}
        >
            <div style={{
                padding: isSystem ? '4px 12px' : '11px 15px',
                borderRadius: isUser
                    ? '18px 18px 4px 18px'
                    : isSystem
                        ? '100px'
                        : '18px 18px 18px 4px',
                background: isUser
                    ? 'var(--chat-user-bg, #0d9488)'
                    : isSystem
                        ? 'var(--chat-system-bg, rgba(255,255,255,0.04))'
                        : 'var(--chat-assistant-bg, rgba(255,255,255,0.06))',
                color: isUser
                    ? 'var(--chat-user-fg, #fff)'
                    : isSystem
                        ? 'var(--chat-system-fg, rgba(255,255,255,0.35))'
                        : 'var(--chat-assistant-fg, #cbd5e1)',
                border: isUser ? 'none' : '1px solid var(--chat-bubble-border, rgba(255,255,255,0.07))',
                fontSize: isSystem ? '11px' : '14px',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
            }}>
                {message.content}
            </div>
            {message.footer}
        </div>
    )
}

// ─── ChatFooter ───────────────────────────────────────────────────────────────
// Bottom bar that holds the input row.

export type ChatFooterProps = {
    children: ReactNode
    className?: string
    style?: React.CSSProperties
}

export function ChatFooter({ children, className, style }: ChatFooterProps) {
    return (
        <footer
            data-chat='footer'
            className={className}
            style={{
                flexShrink: 0,
                padding: '10px 12px 14px',
                borderTop: '1px solid var(--chat-border, rgba(255,255,255,0.07))',
                background: 'var(--chat-footer-bg, rgba(255,255,255,0.01))',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                ...style,
            }}
        >
            {children}
        </footer>
    )
}

// ─── InputMenu ────────────────────────────────────────────────────────────────
// Left or right area within the footer for extra action buttons.

export type InputMenuProps = {
    children: ReactNode
    className?: string
    style?: React.CSSProperties
}

export function InputMenu({ children, className, style }: InputMenuProps) {
    return (
        <div
            data-chat='input-menu'
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
                ...style,
            }}
        >
            {children}
        </div>
    )
}

// ─── ChatInput ────────────────────────────────────────────────────────────────
// Auto-resizing textarea. Submits on Enter (Shift+Enter = newline).
// Controlled: pass value + onChange from parent.

export type ChatInputHandle = {
    focus: () => void
    clear: () => void
}

export type ChatInputProps = {
    value: string
    onChange: (value: string) => void
    onSubmit?: () => void
    placeholder?: string
    disabled?: boolean
    maxRows?: number
    className?: string
    style?: React.CSSProperties
}

export const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(function ChatInput(
    {
        value,
        onChange,
        onSubmit,
        placeholder = 'Message…',
        disabled = false,
        maxRows = 8,
        className,
        style,
    },
    ref
) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => ({
        focus: () => textareaRef.current?.focus(),
        clear: () => {
            onChange('')
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }
        },
    }))

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        onChange(e.target.value)
        autoResize(e.target)
    }

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSubmit?.()
        }
    }

    function autoResize(el: HTMLTextAreaElement) {
        el.style.height = 'auto'
        const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 22
        const max = lineHeight * maxRows
        el.style.height = `${Math.min(el.scrollHeight, max)}px`
    }

    return (
        <textarea
            ref={textareaRef}
            data-chat='input'
            className={className}
            rows={1}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            style={{
                flex: 1,
                resize: 'none',
                background: 'var(--chat-input-bg, rgba(255,255,255,0.05))',
                border: '1px solid var(--chat-input-border, rgba(255,255,255,0.1))',
                borderRadius: '14px',
                padding: '11px 14px',
                color: 'var(--chat-fg, #e2e8f0)',
                fontSize: '14px',
                lineHeight: '1.5',
                fontFamily: 'inherit',
                outline: 'none',
                overflowY: 'auto',
                transition: 'border-color 0.2s',
                ...style,
            }}
        />
    )
})

// ─── SendButton ───────────────────────────────────────────────────────────────
// The submit button. Disabled automatically when value is empty or loading.

export type SendButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean
    icon?: ReactNode
}

export function SendButton({
    loading = false,
    icon,
    disabled,
    children,
    style,
    ...rest
}: SendButtonProps) {
    return (
        <button
            data-chat='send'
            type='button'
            disabled={disabled || loading}
            style={{
                width: '40px',
                height: '40px',
                flexShrink: 0,
                alignSelf: 'flex-end',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: disabled || loading
                    ? 'var(--chat-send-disabled, rgba(255,255,255,0.06))'
                    : 'var(--chat-send-bg, #0d9488)',
                color: disabled || loading
                    ? 'rgba(255,255,255,0.2)'
                    : 'var(--chat-send-fg, #fff)',
                border: 'none',
                borderRadius: '12px',
                cursor: disabled || loading ? 'not-allowed' : 'pointer',
                fontSize: '18px',
                transition: 'background 0.2s, transform 0.1s',
                ...style,
            }}
            {...rest}
        >
            {loading
                ? <LoadingDots />
                : icon ?? <ArrowUp />
            }
        </button>
    )
}

// ─── Inline helpers ───────────────────────────────────────────────────────────

function ArrowUp() {
    return (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path d='M8 13V3M3 8l5-5 5 5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    )
}

function LoadingDots() {
    return (
        <span style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            {[0, 1, 2].map(i => (
                <span
                    key={i}
                    style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'currentColor',
                        animation: `chat-bounce 1s ${i * 0.15}s ease-in-out infinite`,
                    }}
                />
            ))}
        </span>
    )
}

// ─── Global keyframe injection ────────────────────────────────────────────────
// Injects once — safe to call multiple times.

let injected = false
export function injectChatStyles() {
    if (typeof document === 'undefined' || injected) return
    injected = true
    const style = document.createElement('style')
    style.textContent = `
        @keyframes chat-fadein {
            from { opacity: 0; transform: translateY(6px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chat-bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40%            { transform: translateY(-4px); }
        }
        [data-chat='input']:focus {
            border-color: var(--chat-input-focus-border, #0d9488) !important;
        }
        [data-chat='send']:not(:disabled):hover {
            background: var(--chat-send-hover, #0f766e) !important;
            transform: scale(1.06);
        }
        [data-chat='messages']::-webkit-scrollbar { width: 4px; }
        [data-chat='messages']::-webkit-scrollbar-track { background: transparent; }
        [data-chat='messages']::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.08);
            border-radius: 4px;
        }
    `
    document.head.appendChild(style)
}
