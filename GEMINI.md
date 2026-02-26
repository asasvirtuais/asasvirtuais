# asasvirtuais Framework — Operational Demo Standard

This repository uses a strict pattern for demonstrating data model packages using purely local database features via IndexedDB. This ensures that any model can be tested, demoed, or interacted with securely and offline, without requiring a functioning backend.

## The Architecture

1. **The `app/demo` Workspace**
   - The `/demo` path acts as an isolated section of the app.
   - It is wrapped in its own layout (`app/demo/layout.tsx`) with an `IndexedInterfaceProvider` instead of the standard remote interface.
   - Any model package component rendered within this tree writes exclusively to an IndexedDB database (e.g., `asasvirtuais-demo-v1`).

2. **The `OperationalDashboardLayout` Component**
   - Located at `components/OperationalDashboardLayout.tsx`.
   - All package CRUD operational dashboards MUST use this layout.
   - It is an opinionated, strict container that wires primitive components into a side-by-side CRUD dashboard.
   - Supports a `CustomView` prop to inject a dedicated "Interface Demo" tab alongside the technical "CRUD Dashboard".

## Creating a Model Dashboard

Inside your specific package folder (e.g., `packages/chat/page.tsx`), use the `OperationalDashboardLayout` to assemble your primitives:

```tsx
'use client'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '.'
import { useChats } from './provider'
import { CreateChat, UpdateChat, DeleteChat } from './forms'
import { SingleChat, ChatListItem } from './components'

export default function ChatPage({ CustomView }: { CustomView?: React.ComponentType }) {
    return (
        <OperationalDashboardLayout
            title='Chat Model CRUD'
            tableName='chats' // Standard: all lowercase
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
```

### Component Requirements

For the dashboard to function, the model package must export/provide:

- `ListItem`: Receives an `item` prop for the sidebar list.
- `SingleItem`: A `useSingle` powered detail display.
- `CreateForm`: A `CreateForm` powered creation loop.
- `UpdateForm`: An `UpdateForm` powered update loop.
- `DeleteForm`: A deletion button/trigger.
- **Optional `CustomView`**: A component for a high-fidelity interface demonstration (e.g., a chat UI).

## The Chat LEGO Layout Pattern

When building chat-like interfaces, use the LEGO components from `packages/chat/layout.tsx`:

- **`<ChatPageLayout>`**: Main outer container.
- **`<ChatHeader>`**: Top bar (use for editable titles and action menus).
- **`<ChatBody>`**: Scrollable message area with sticky support.
- **`<ChatInput>`**: Footer area for message input and quick actions.

## Naming Conventions

- **Table keys**: Always all lowercase (e.g., `chats`, `messages`).
- **Demo Views**: Store high-fidelity demo components (like `SingleChatView`) in the `app/demo/[model]/` workspace, not in the core package, to keep the package library focused on data and logic.

## Exposing the Demo

Import the package's unified `page.tsx` and pass any demo-specific views:

```tsx
// app/demo/chat/page.tsx
'use client'
import ChatPage from '@/packages/chat/page'
import { SingleChatView } from './SingleChatView'

export default function ChatDemoPage() {
    return <ChatPage CustomView={SingleChatView} />
}
```
