# asasvirtuais Framework — Operational Demo Standard

This repository uses a strict pattern for demonstrating data model packages using purely local database features via IndexedDB. This ensures that any model can be tested, demoed, or interacted with securely and offline, without requiring a functioning backend.

## The Architecture

1. **The `app/demo` Workspace**
   - The `/demo` path acts as an isolated section of the app.
   - It is wrapped in its own layout (`app/demo/layout.tsx`) with an `IndexedInterfaceProvider` instead of the standard remote interface.
   - Any model package component rendered within this tree writes exclusively to an IndexedDB database (e.g., `asasvirtuais-demo-v1`), rather than Firestore or Supabase.

2. **The `OperationalDashboardLayout` Component**
   - Located at `components/OperationalDashboardLayout.tsx`.
   - All package CRUD operational dashboards must use this layout.
   - It is an opinionated, strict container that accepts the primitive components generated inside a model package, and wires them into a side-by-side CRUD dashboard with state-based navigation (no page reloads).

## Creating a Model Dashboard

Inside your specific package folder (e.g., `packages/todo/page.tsx`), use the `OperationalDashboardLayout` to assemble your primitives:

```tsx
'use client'
import { OperationalDashboardLayout } from '@/components/OperationalDashboardLayout'
import { schema } from '.'
import { useTodos } from './provider'
import { CreateTodo, UpdateTodo, DeleteTodo } from './forms'
import { SingleTodo, TodoListItem } from './components'

export default function TodoPage() {
    return (
        <OperationalDashboardLayout
            title='Todo Model CRUD'
            tableName='Todos'
            schema={schema}
            useTableHook={useTodos as any}
            ListItem={TodoListItem}
            SingleItem={SingleTodo}
            CreateForm={CreateTodo}
            UpdateForm={UpdateTodo}
            DeleteForm={DeleteTodo}
        />
    )
}
```

### Component Requirements

For the dashboard to function, the model package must export the following primitive blocks:

- `useTableHook`: The primary hook exporting `list` and `array` (e.g., `useTodos`).
- `ListItem`: A simple non-isolated component that receives an `item` prop and determines how it looks in the sidebar list.
- `SingleItem`: A `useSingle` powered component that displays the model's details.
- `CreateForm`: A `CreateForm` powered creation loop (takes an `onSuccess` callback).
- `UpdateForm`: An `UpdateForm` powered update loop.
- `DeleteForm`: The button that runs the deletion process (takes an `onSuccess` callback).

## Exposing the Demo

To actually make the page viewable, you just import the package's unified `page.tsx` file inside an `app/demo/[model]/page.tsx` route:

```tsx
// app/demo/todo/page.tsx
'use client'
import TodoPage from '@/packages/todo/page'

export default function TodoDemoPage() {
    return <TodoPage />
}
```

Because this route is under `/demo`, it automatically inherits the `IndexedInterfaceProvider` from `app/demo/providers.tsx`.
