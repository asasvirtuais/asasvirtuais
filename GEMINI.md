# asasvirtuais.dev

This project is a website for presenting, developing, demoing and presenting my projects, including and especially the asasvirtuais framework.

Operational Demo Standard

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
   - **Important**: This component belongs to the application layer and should be used in the `app/demo` routes, not inside the `packages` themselves. Rule: never import app modules into the packages, only from packages into the app.

## Creating a Model Dashboard Demo

To create a demo for a model package (e.g., `chats`), use the `OperationalDashboardLayout` directly in the demo route (`app/demo/chat/page.tsx`):

```tsx
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
            tableName='chats' // Standard: all lowercase
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
```

### Component Requirements

For the dashboard to function, the model package must export/provide:

- `ListItem`: Receives an `item` prop for the sidebar list.
- `SingleItem`: A `useSingle` powered detail display.
- `CreateForm`: A `CreateForm` powered creation loop.
- `UpdateForm`: An `UpdateForm` powered update loop.
- `DeleteForm`: A deletion button/trigger.

## The Chat LEGO Layout Pattern

When building chat-like interfaces, use the LEGO components from `packages/chat/layout.tsx`:

- **`<ChatPageLayout>`**: Main outer container.
- **`<ChatHeader>`**: Top bar (use for editable titles and action menus).
- **`<ChatBody>`**: Scrollable message area with sticky support.
- **`<ChatInput>`**: Footer area for message input and quick actions.

## Naming Conventions

- **Table keys**: Always all lowercase (e.g., `chats`, `messages`).
- **Demo Views**: Store high-fidelity demo components (like `SingleChatView`) in the `app/demo/[model]/` workspace, not in the core package, to keep the package library focused on data and logic.


# Composed Layout Pattern (LEGO Blocks)

In the `asasvirtuais` framework, we avoid "God Components" with dozens of boolean props (e.g., `showAvatar`, `isUser`, `borderless`). Instead, we export atomic building blocks that allow developers to compose unique interfaces while keeping logical consistency.

## Core Blocks

- **[MessageLayout](file:///C:/Users/Usu%C3%A1rio/Desktop/asasvirtuais-next/packages/message/layout.tsx#25-40)**: The outer container handling alignment and spacing.
- **[MessageAvatar](file:///C:/Users/Usu%C3%A1rio/Desktop/asasvirtuais-next/packages/message/layout.tsx#41-53)**: Dedicated avatar component with support for various shapes and sizes.
- **[MessagePaper](file:///C:/Users/Usu%C3%A1rio/Desktop/asasvirtuais-next/packages/message/layout.tsx#54-75)**: The "bubble" container, handling backgrounds, borders, and shadows.
- **[MessageText](file:///C:/Users/Usu%C3%A1rio/Desktop/asasvirtuais-next/packages/message/layout.tsx#76-88)**: Styled text component with proper wrap-around and white-space handling.
- **[MessageMenuOptions](file:///C:/Users/Usu%C3%A1rio/Desktop/asasvirtuais-next/packages/message/layout.tsx#118-169)**: Built-in actions (Edit, Delete, Debug Info).
- **[MessageFloatingLayout](file:///C:/Users/Usu%C3%A1rio/Desktop/asasvirtuais-next/packages/message/layout.tsx#89-110)**: High-fidelity specialization for Character AI-style wrapping text.

## Benefits

1. **Flexibility**: Want a rectangular avatar instead of a circle? Just change the `radius` prop on [MessageAvatar](file:///C:/Users/Usu%C3%A1rio/Desktop/asasvirtuais-next/packages/message/layout.tsx#41-53) instead of adding a new prop to a master [MessageView](file:///C:/Users/Usu%C3%A1rio/Desktop/asasvirtuais-next/app/demo/message/SingleMessageView.tsx#15-130).
2. **Prop Spreading**: All blocks extend Mantine's base props (`BoxProps`, `PaperProps`, etc.), allowing immediate access to `bg`, `c`, `mt`, `opacity`, and more.
3. **Clean Code**: Components like [SingleMessage](file:///C:/Users/Usu%C3%A1rio/Desktop/asasvirtuais-next/packages/message/components.tsx#37-71) remain simple and readable by composing these blocks rather than managing complex conditional logic.

## Usage Example

```tsx
<MessageLayout justify="flex-start">
  <MessageAvatar color="teal">A</MessageAvatar>
  <MessagePaper withBorder p="md">
    <MessageText>{content}</MessageText>
    <MessageMenuOptions metadata={metadata} />
  </MessagePaper>
</MessageLayout>
```

Business Logic Interceptors in 

`app/interface.ts`

The app/interface.ts file acts as a secure, server-side middle layer (using 'use server') between your frontend forms and the underlying database adapter (firestoreInterface).

Instead of exporting the database adapter methods directly, it wraps each CRUD operation to inject business logic. Here is how the pattern works:

1. Centralized Authentication Before any database operation occurs, the user is authenticated directly inside the function scope:

```ts
const user = (await authenticate()).id
```
This ensures that every read or write request is strictly authorized.

2. Context Injection (Payload Augmentation) Once the user's ID is retrieved, it is merged into the incoming request parameters using the spread operator before being passed to the actual database adapter:

```ts
return rootInterface.create({ ...props, user })
```
