# asasvirtuais Framework — AI Reference Guide
> For AI coding assistants. This guide covers building local-first PWA apps (no server, no backend) using the asasvirtuais framework with React, Next.js App Router, and IndexedDB.

---

## INSTALLATION & SETUP

```bash
npm install asasvirtuais
```

`asasvirtuais` is a **TypeScript-source-only package** — it ships `.ts` and `.tsx` files with no pre-compilation step. This means the consuming app is responsible for transpiling it, which requires framework-specific configuration.

### Next.js (App Router)

Add `asasvirtuais` to `transpilePackages` in `next.config.ts`. This tells Next.js to run the package through its own compiler rather than expecting pre-built JS.

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['asasvirtuais'],
}

export default nextConfig
```

### Vite (React SPA / PWA)

Vite's dep optimizer uses esbuild to pre-bundle dependencies, but by default it does not process `.ts` files inside `node_modules`. You need to: (1) tell esbuild to handle TypeScript extensions inside the package, and (2) explicitly include `dexie` (a dependency of `asasvirtuais`) in the optimization boundary so it gets pre-bundled correctly alongside the package.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['asasvirtuais', 'dexie'],
    esbuildOptions: {
      loader: {
        '.ts': 'ts',
        '.tsx': 'tsx',
      },
    },
  },
})
```

### Imports

All framework primitives are imported directly from their source file within the package. There is no barrel `index` re-exporting everything — import from the specific module:

```ts
import { useFields }                    from 'asasvirtuais/fields'
import { useAction }                    from 'asasvirtuais/action'
import { IndexedInterfaceProvider }     from 'asasvirtuais/indexed-interface'
import { InterfaceProvider, useInterface } from 'asasvirtuais/interface-provider'
import {
  TableProvider,
  useTable,
  SingleProvider,
  useSingle,
  CreateForm,
  UpdateForm,
  FilterForm,
} from 'asasvirtuais/react-interface'
```

---

## WHAT WE'RE BUILDING

The target product is a modern web application built using the `asasvirtuais` pattern. The framework is designed to be **database agnostic**. While it provides excellent support for local-first setups using IndexedDB—perfect for standalone apps that require zero configuration or user authentication—it can easily interface with traditional server-side databases via Next.js Server Actions or API routes.

The typical app has three sections:

- A **landing page** that presents the product, its value proposition, and a call to action. This is a marketing/presentation page.
- An **onboarding flow** where the user configures the app for their needs — this might mean entering a name, choosing preferences, or saving an API key for an AI feature.
- The **main app** where the user creates and manages their data. This is a standard CRUD interface with list, detail, create, and edit views.

Use whichever UI component library fits your project (e.g. Mantine, Chakra UI, shadcn/ui, MUI, etc.).

---

## THE MODEL PACKAGE PATTERN

Every data entity is a self-contained package with 5 files:

```
packages/todo/
├── index.ts        # Zod schema + types
├── fields.tsx      # Input components (atoms bound to useFields)
├── forms.tsx       # CRUD forms (compose fields)
├── components.tsx  # Display components (read from useSingle)
└── provider.tsx    # TableProvider wrapper + hook
```

### index.ts — Schema

```ts
import z from 'zod'

export const readable = z.object({
  id: z.string(),
  Title: z.string().optional(),
  Done: z.boolean().optional(),
  Notes: z.string().optional(),
})

export const writable = readable.pick({
  Title: true,
  Done: true,
  Notes: true,
})

export const schema = { readable, writable }

export type Readable = z.infer<typeof readable>
export type Writable = z.infer<typeof writable>

declare global {
  type Todo = Readable
}
```

- `readable` always has `id: z.string()` as first field
- `writable` is always derived from `readable` via `.pick()`
- Always export `schema`, `Readable`, `Writable`
- Add the `declare global { type Todo = Readable }` block for global type access

### fields.tsx — Input Atoms

Each field component reads and writes exactly one field via `useFields()`. They are the smallest building blocks — forms compose them. Use whatever UI primitives your chosen library provides.

```tsx
'use client'
import { useFields } from 'asasvirtuais/fields'

export function TitleField() {
  const { fields, setField } = useFields<{ Title: string }>()
  return (
    <div>
      <label>Title</label>
      <input
        value={fields.Title || ''}
        onChange={e => setField('Title', e.target.value)}
        placeholder='What needs to be done?'
      />
    </div>
  )
}

export function NotesField() {
  const { fields, setField } = useFields<{ Notes: string }>()
  return (
    <textarea
      value={fields.Notes || ''}
      onChange={e => setField('Notes', e.target.value)}
      placeholder='Optional notes...'
      rows={4}
    />
  )
}

export function DoneField() {
  const { fields, setField } = useFields<{ Done: boolean }>()
  return (
    <label>
      <input
        type='checkbox'
        checked={fields.Done || false}
        onChange={e => setField('Done', e.target.checked)}
      />
      Mark as done
    </label>
  )
}
```

### forms.tsx — CRUD Forms

```tsx
'use client'
import { CreateForm, UpdateForm, useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '.'
import { TitleField, NotesField, DoneField } from './fields'
import { useTodos } from './provider'

// Standalone — does not require any provider
export function CreateTodo({ onSuccess }: { onSuccess?: (todo: Readable) => void }) {
  return (
    <CreateForm table='Todos' schema={schema} onSuccess={onSuccess}>
      {form => (
        <form onSubmit={form.submit}>
          <TitleField />
          <NotesField />
          <button type='submit' disabled={form.loading}>
            {form.loading ? 'Saving...' : 'Add Todo'}
          </button>
        </form>
      )}
    </CreateForm>
  )
}

// Must be inside SingleProvider for the 'Todos' table
export function UpdateTodo({ onSuccess }: { onSuccess?: (todo: Readable) => void }) {
  const { single, id } = useSingle('Todos', schema)
  const todo = single as Readable
  return (
    <UpdateForm
      table='Todos'
      schema={schema}
      id={id}
      defaults={{
        Title: todo.Title || '',
        Notes: todo.Notes || '',
        Done: todo.Done || false,
      }}
      onSuccess={onSuccess}
    >
      {form => (
        <form onSubmit={form.submit}>
          <TitleField />
          <NotesField />
          <DoneField />
          <button type='submit' disabled={form.loading}>
            {form.loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}
    </UpdateForm>
  )
}

// Must be inside SingleProvider for the 'Todos' table
export function DeleteTodo({ onSuccess }: { onSuccess?: () => void }) {
  const { id } = useSingle('Todos', schema)
  const { remove } = useTodos()
  return (
    <button
      onClick={async () => { await remove.trigger({ id }); onSuccess?.() }}
      disabled={remove.loading}
    >
      {remove.loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}
```

### components.tsx — Display Components

These read from `useSingle()` — they never receive record data as props.

```tsx
'use client'
import { useSingle } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '.'

// Compact view for lists — must be inside SingleProvider
export function TodoItem() {
  const { single } = useSingle('Todos', schema)
  const todo = single as Readable
  return (
    <div style={{ opacity: todo.Done ? 0.6 : 1 }}>
      <h3 style={{ textDecoration: todo.Done ? 'line-through' : 'none' }}>
        {todo.Title || 'Untitled'}
      </h3>
      {todo.Notes && <p>{todo.Notes}</p>}
      {todo.Done && <span>Done</span>}
    </div>
  )
}

// Full detail view — must be inside SingleProvider
export function SingleTodo() {
  const { single } = useSingle('Todos', schema)
  const todo = single as Readable
  return (
    <div>
      <h1 style={{ textDecoration: todo.Done ? 'line-through' : 'none' }}>
        {todo.Title}
      </h1>
      {todo.Notes && <p>{todo.Notes}</p>}
    </div>
  )
}
```

### provider.tsx — Table Context Wrapper

```tsx
'use client'
import { TableProvider, useTable } from 'asasvirtuais/react-interface'
import { useInterface } from 'asasvirtuais/interface-provider'
import { schema, Readable } from '.'

export function useTodos() {
  return useTable('Todos', schema)
}

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const iface = useInterface()
  return (
    <TableProvider table='Todos' schema={schema} interface={iface}>
      {children}
    </TableProvider>
  )
}
```

---

## APP WIRING

### app/schema.ts

Assembles all model schemas into the database definition. Each key is an IndexedDB table name.

```ts
import * as TodoModule from '@/packages/todo'
// import * as SettingsModule from '@/packages/settings'

export const schema = {
  'Todos': TodoModule.schema,
  // 'Settings': SettingsModule.schema,
}
```

### app/providers.tsx

```tsx
'use client'
import { IndexedInterfaceProvider } from 'asasvirtuais/indexed-interface'
import { TodosProvider } from '@/packages/todo/provider'
import { schema } from '@/app/schema'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <IndexedInterfaceProvider dbName='my-todo-app-v1' schema={schema}>
      <TodosProvider>
        {children}
      </TodosProvider>
    </IndexedInterfaceProvider>
  )
}
```

For multiple models, nest providers:
```tsx
<IndexedInterfaceProvider dbName='my-app-v1' schema={schema}>
  <TodosProvider>
    <SettingsProvider>
      {children}
    </SettingsProvider>
  </TodosProvider>
</IndexedInterfaceProvider>
```

### app/layout.tsx

```tsx
import AppProviders from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
```

---

## PAGE PATTERNS

### List Page — useTable hook (preferred)

`useTodos().array` is the canonical reactive list. Any `create`, `update`, or `remove` triggered anywhere in the app automatically reflects in `array` and `index`. This is the preferred approach for lists that need to stay in sync with user actions.

```tsx
'use client'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '@/packages/todo'
import { TodoItem } from '@/packages/todo/components'
import { useTodos } from '@/packages/todo/provider'
import Link from 'next/link'
import { useEffect } from 'react'

export default function TodoListPage() {
  const { list, array } = useTodos()

  useEffect(() => { list.trigger({}) }, [])

  if (list.loading) return <p>Loading...</p>

  return (
    <div>
      <Link href='/todos/new'><button>New Todo</button></Link>

      {array.length === 0 && <p>No todos yet.</p>}

      {array.map((todo: Readable) => (
        <SingleProvider key={todo.id} id={todo.id} table='Todos' schema={schema}>
          <Link href={`/todos/${todo.id}`}>
            <TodoItem />
          </Link>
        </SingleProvider>
      ))}
    </div>
  )
}
```

### List Page — FilterForm alternative

`FilterForm` with `autoTrigger` is a convenient alternative to `useEffect` + `list.trigger`. However, `form.result` is a local snapshot — it does **not** update when data changes elsewhere in the app (e.g., when another component creates or updates a todo). To work around this, wrap each result item in a `SingleProvider`. The `SingleProvider` reads from the app-level index (which does update reactively), not from `form.result`. This way the displayed data stays current even if `form.result` is stale.

```tsx
'use client'
import { FilterForm, SingleProvider } from 'asasvirtuais/react-interface'
import { schema, type Readable } from '@/packages/todo'
import { TodoItem } from '@/packages/todo/components'
import Link from 'next/link'

export default function TodoListPage() {
  return (
    <FilterForm table='Todos' schema={schema} autoTrigger>
      {form => (
        <div>
          {form.loading && <p>Loading...</p>}
          {(form.result || []).map((todo: Readable) => (
            <SingleProvider key={todo.id} id={todo.id} table='Todos' schema={schema}>
              <Link href={`/todos/${todo.id}`}>
                <TodoItem />
              </Link>
            </SingleProvider>
          ))}
        </div>
      )}
    </FilterForm>
  )
}
```

### Detail / Edit Page

```tsx
'use client'
import { SingleProvider } from 'asasvirtuais/react-interface'
import { schema } from '@/packages/todo'
import { SingleTodo } from '@/packages/todo/components'
import { UpdateTodo, DeleteTodo } from '@/packages/todo/forms'
import { useParams, useRouter } from 'next/navigation'

export default function TodoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  return (
    <SingleProvider id={id} table='Todos' schema={schema}>
      <SingleTodo />
      <UpdateTodo onSuccess={() => router.push('/todos')} />
      <DeleteTodo onSuccess={() => router.push('/todos')} />
    </SingleProvider>
  )
}
```

### Create Page

```tsx
'use client'
import { CreateTodo } from '@/packages/todo/forms'
import { useRouter } from 'next/navigation'

export default function NewTodoPage() {
  const router = useRouter()
  return (
    <CreateTodo onSuccess={(todo) => router.push(`/todos/${todo.id}`)} />
  )
}
```

---

## HOOKS REFERENCE

```tsx
// Table-level operations — reactive, always in sync
const { list, array, index, find, create, update, remove } = useTodos()

list.trigger({})                              // fetch all
list.trigger({ query: { Done: false } })      // with filter
create.trigger({ data: { Title: 'Buy milk' } })
update.trigger({ id, data: { Done: true } })
remove.trigger({ id })

// array — reactive array of all records, updates on any CRUD
// index — reactive map of id → record

// Single record — must be inside SingleProvider
const { single, id } = useSingle('Todos', schema)

// Field state — inside CreateForm or UpdateForm
const { fields, setField } = useFields<{ Title: string }>()
```

---

## FILTERING & QUERY DSL

The `list.trigger` and `FilterForm` accept a `query` object with these operators:

```tsx
// Equality
list.trigger({ query: { Done: false } })

// Comparison operators
list.trigger({ query: { Priority: { $gt: 3 } } })
list.trigger({ query: { Status: { $in: ['active', 'pending'] } } })
list.trigger({ query: { Title: { $ne: 'placeholder' } } })

// Pagination & sorting
list.trigger({ query: { $limit: 10, $skip: 0, $sort: { Title: 1 } } })
// $sort: { field: 1 } = ascending, { field: -1 } = descending
```

Available operators: `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$nin`, `$limit`, `$skip`, `$sort`

---

## NAMING CONVENTIONS

| Thing | Pattern | Example |
|---|---|---|
| Table name | PascalCase plural | `'Todos'` |
| Schema export | `{ readable, writable, schema }` | — |
| Types | `Readable`, `Writable` | `type Readable = z.infer<...>` |
| Field component | `{FieldName}Field` | `TitleField` |
| Hook | `use{Model}s()` | `useTodos()` |
| Provider | `{Model}sProvider` | `TodosProvider` |
| Create form | `Create{Model}` | `CreateTodo` |
| Update form | `Update{Model}` | `UpdateTodo` |
| Delete | `Delete{Model}` | `DeleteTodo` |
| Item component | `{Model}Item` | `TodoItem` |
| Single component | `Single{Model}` | `SingleTodo` |

---

## MULTI-MODEL TEMPLATE

```
packages/
  todo/         index.ts, fields.tsx, forms.tsx, components.tsx, provider.tsx
  settings/     index.ts, fields.tsx, forms.tsx, components.tsx, provider.tsx
app/
  schema.ts     { 'Todos': todoSchema, 'Settings': settingsSchema }
  providers.tsx  IndexedInterfaceProvider > TodosProvider > SettingsProvider
  layout.tsx    imports AppProviders
  todos/
    page.tsx    list
    new/page.tsx create
    [id]/page.tsx detail + edit
```

IDs or ids of linked records should be always inferred to be an id attribute, for example instead of character.userId which is redundant the user object obviously isn't an attribute of the character, use character.user without the redundancy of the "Id" sufix.

Never put functions, methods or objects containing either functons or methods inside the dependency array of useEffect or useMemo hooks, doing so will cause memory leak with infinite re-renders looping.

Phase 1: Data Modeling (asasvirtuais Pattern)
Step 1.1: Plan Data Models

Identify Entities: Define the core objects of your application (e.g., Todos, UserSettings, Project).
Define Schemas: For each entity, outline the readable (full record) and writable (fields the user can edit) Zod schemas.
Map Relationships: Define how entities relate. Remember the convention: use the entity name without the "Id" suffix (e.g., character.user instead of character.userId).
Output: A list of models with their respective fields and types.
Step 1.2: Implement Models

Create Packages: For each model, create a folder in packages/ with:
index.ts: Zod schemas and TypeScript types.
fields.tsx: Atomic input components.
forms.tsx: Create, Update, and Delete form components.
components.tsx: Display components (Item and Single views) that consume useSingle.
provider.tsx: A TableProvider wrapper and a custom hook (e.g., useTodos).
Wire the App:
Register all schemas in app/schema.ts.
Wrap the application in app/providers.tsx with IndexedInterfaceProvider and your model-specific providers.
Phase 2: Designing the App
Step 2.1: Setup Design System (Mantine)

Installation: Setup Mantine and its dependencies (hooks, notifications, etc.).
Theme Configuration: Configure the MantineProvider with a premium, vibrant color palette and modern typography (e.g., Inter or Outfit).
Visual Direction: Plan the "Wow" factor—glassmorphism, subtle gradients, and micro-animations to ensure the app feels premium.
Step 2.2: Implement Layout & Mock Functionality

Core Layout: Build the main application shell with responsive navigation.
Landing & Onboarding: Create the marketing landing page and the initial onboarding flow to capture user preferences in IndexedDB.
Mock UI: Use the display components from Phase 1 to build out the main screens. Use FilterForm or static arrays to visualize the layout before all logic is "wired" shut.
Phase 3: Develop App Specific Features
Step 3.1: Feature Planning & Environment

Advanced Logic: Plan advanced features like AI integrations (Gemini), data exports (YAML/JSON), or PWA notifications.
Libraries & Resources: Identify needed external libraries (e.g., @google/genai) and define required .env variables for API keys.
Interface Hooks: Map out any custom actions or complex triggers needed outside of standard CRUD.
Step 3.2: Implementation

Basic Features: Complete the CRUD loops (connecting forms to the UI) and ensure reactive updates via the asasvirtuais hooks.
Advanced Features: Implement the heavy-lifting logic (e.g., AI chat processing, automated summaries, complex filtering).
Optimization: Review useEffect and useMemo hooks to ensure no objects with functions or functions are in dependency arrays that could cause infinite loops, as per framework rules.

Code style:
No semi-colons
Single quotes


Example of server side server actions being used in Next.js

```.ts
'use server'
import { somebackendInterface } from 'asasvirtuais/somebackend-interface'
import { schema } from './schema'
import { CreateProps, FindProps, ListProps, RemoveProps, UpdateProps } from 'asasvirtuais/interface'

const rootInterface = somebackendInterface('next-template-db', schema)

export async function find(props: FindProps) {
    return rootInterface.find(props)
}

export async function list(props: ListProps) {
    return rootInterface.list(props)
}

export async function create(props: CreateProps) {
    return rootInterface.create(props)
}

export async function update(props: UpdateProps) {
    return rootInterface.update(props)
}

export async function remove(props: RemoveProps) {
    return rootInterface.remove(props)
}
```

Then apply in the interface provider:

```.tsx
'use client'
import { InterfaceProvider } from 'asasvirtuais/interface-provider'
import { find, list, create, update, remove } from './interface'

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <InterfaceProvider find={find} list={list} create={create} update={update} remove={remove}>
          {children}
        </InterfaceProvider>
    )
}
```

# asasvirtuais.dev

This project is a website for presenting, developing, demoing and presenting my projects, including and especially the asasvirtuais framework.


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

Rule of thumb, don't pass the data object as a prop to the view components, rely on SingleProvider and useSingle instead.

Trying to run linting or tsc for checks is dumb and delays development, the IDE already tells you of any errors and I personally inform you of any unchecked errors as well.