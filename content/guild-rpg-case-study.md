## How development went

Development stayed flat and predictable from the first commit to the 240th.

- **Exhaustion-free velocity.** Features went in one after another, each wired the exact same way as the one before it. Because new features never introduced competing patterns, the 240th commit was as straightforward to deliver as the first.
- **Zero architectural guesswork.** The framework already decides how data is fetched, how forms mutate the server, how client state updates, and where authorization lives. The only decisions left during development were about the product itself: what it does and what each screen shows.
- **Stateless consistency.** Every coding agent session started with a fresh context window and zero memory of the previous session. Guided only by the framework's conventions and a single `AGENTS.md` file, every session placed code in the exact same places.
- **Obvious debugging.** Bugs were rare, and when one appeared, its location was deterministic: a table's access rules live in its middleware, its data shape in its schema, and its mutations in its forms. There was never a need to grep across the codebase to find where a state bug or permission leak originated.
- **Painless structural pivots.** When the rules of the framework itself were refined mid-project—moving to one folder per component, isolating permissions into per-table middleware, or shifting all initial data fetching to the server—the agent applied the new rule across the entire 19-table codebase in a day or less while features kept shipping.

## Ten things that never happened

In a standard codebase, weeks of rapid feature delivery usually produce diverging patterns: ad-hoc endpoints, duplicated `useState` hooks, scattered permission checks, and stale caches. Because the architecture came solved at the framework level, these ten failure modes never appeared in the codebase.

### 1. No manual state management written on every screen

**Instead:** Every mutation goes through the framework's declarative forms (`CreateForm`, `UpdateForm`, `FilterForm`). Submitting a form writes to the server and automatically updates a shared, in-memory reactive index of that table's rows on the client. Every component reading from that table updates immediately. No component keeps a local `useState` copy of a database row, and nothing ever requires a manual refetch.

Changing a member's role from a dropdown updates the members list across the screen with zero state boilerplate or hand-written optimistic updates.

*members/component.tsx · packages/memberships/forms.tsx*

```typescript
// A member's role, changed from a select: one column, one form
<UpdateMembership id={membership.id}>
  {(change) => (
    <select
      value={membership.role}
      disabled={change.loading}
      onChange={(e) => change.callback({ role: e.target.value as Role })}
    >
      {assignable(actor).map((role) => (
        <option key={role} value={role}>{roleLabel[role]}</option>
      ))}
    </select>
  )}
</UpdateMembership>

// packages/memberships/forms.tsx
export function RemoveMembership({ children }) {
  const { single: membership } = useMembership()
  return (
    <UpdateMembership id={membership.id} defaults={{ status: 'removed' }}>
      {children}
    </UpdateMembership>
  )
}
```

### 2. No pile of loose endpoints accessing the database

**Instead:** There is only one CRUD interface into the database: `find`, `list`, `create`, `update`, `remove`. Every database call passes through a single switch that routes the operation to the target table's middleware. Unregistered tables are rejected. Auditing database access across the entire application means reading this single file and one middleware file per table.

Adding a new table to the backend means adding one line to this switch.

*app/actions.ts*

```typescript
// app/actions.ts: the only gateway into the database
'use server'

function middleware(table?: string) {
  switch (table) {
    case 'users': return users
    case 'guilds': return guilds
    case 'memberships': return memberships
    case 'characters': return characters
    case 'missions': return missions
    // … one line per table, 19 in all
    default: throw new Error('Forbidden')
  }
}

const crud = makeSchemaTableInterface(schema, null, {
  find:   async (props) => middleware(props.table).find(props),
  list:   async (props) => middleware(props.table).list(props),
  create: async (props) => middleware(props.table).create(props),
  update: async (props) => middleware(props.table).update(props),
  remove: async (props) => middleware(props.table).remove(props),
})!

export const find   = action(crud.find)
export const list   = action(crud.list)
export const create = action(crud.create)
export const update = action(crud.update)
export const remove = action(crud.remove)
```

### 3. No permission checks scattered across unrelated files

**Instead:** Each table has a single `middleware.ts` file sitting next to its schema. It defines every rule for that domain: who can read rows (`find`, `list`), what pre-flight authorization is checked before a write (`create`, `update`, `remove`), and what side effects must follow a write inside the same operation. To know who is allowed to modify a membership, you read the memberships middleware—nothing else.

**48 commits** added roles, tenant permissions, approval workflows, and review queues. Every change stayed confined to the middleware of the table it governed.

*packages/memberships/middleware.ts*

```typescript
// packages/memberships/middleware.ts: domain rules in one place
export const memberships = makeSchemaTableInterface({ memberships: schema }, 'memberships', {
  find: async (props) => {
    const row = await db.find(props)
    // read rules: may this user see this row?
    return row
  },
  list: async (props) => {
    const rows = await db.list(props)
    // read rules: keep only the rows this user may see
    return rows
  },
  create: async (props) => {
    // pre-flight: who may write, and is the data valid?
    const row = await db.create(props)
    // side effects: notifications, records that must follow
    return row
  },
  update: async (props) => {
    // pre-flight
    const row = await db.update(props)
    // side effects
    return row
  },
  remove: forbidden,
})!
```

### 4. No stale data, and no client components fetching on mount

**Instead:** Every page runs as a Server Component, fetches the exact rows its tree needs, and hands them down to the client table providers via `asAbove`. Client components read and filter that shared index synchronously—they never trigger their own fetches when they mount. Because every subsequent save goes through a form that mutates that same shared index, nothing on screen goes out of date and no route cache needs clearing.

*guild/[slug]/members/page.tsx · components/members*

```typescript
// app/(app)/guild/[slug]/members/page.tsx: Server Component hydrates the index
export default async function GuildMembersPage({ params }) {
  // … resolves guild and viewer permissions
  const memberships = ok(await list({ table: 'memberships', query: { guild: guild.id, status: { $in: ['active', 'pending'] } } }))
  const users = ok(await list({ table: 'users', query: { id: { $in: memberships.map((row) => row.user) } } }))

  return (
    <MembershipsProvider asAbove={index(memberships)}>
      <UsersProvider asAbove={index(users)}>
        <Applications />
        <MembersList />
      </UsersProvider>
    </MembershipsProvider>
  )
}

// components/members/component.tsx: reads the index synchronously, never fetches
export function MembersList() {
  const { single: guild } = useGuild()
  const { single: actor } = useMembership()
  const { array } = useMemberships()
  const members = array.filter((m) => m.guild === guild.id && m.status === 'active')

  return members.map((membership) => (
    <MembershipProvider key={membership.id} id={membership.id}>
      <UserProvider id={membership.user}>
        <MemberItem actor={actor.role} />
      </UserProvider>
    </MembershipProvider>
  ))
}
```

### 5. No manual type updates across dozens of files after a schema change

**Instead:** Each table defines one Zod schema split into `readable` (what the database returns) and `writable` (what a client is permitted to submit). That single definition drives the TypeScript types, the runtime validation, the reactive hooks, and the form fields. When a column changes, every hook, form, and middleware referencing that table inherits the updated type automatically.

**50 commits** modified the database schema in ten days—including splitting the store's core items into separate cards and owned copies tables across the entire economy in a single commit.

*packages/memberships/schema.ts*

```typescript
// packages/memberships/schema.ts
export const roles = ['owner', 'staff', 'counselor', 'emissary', 'member'] as const

export const readable = z.object({
  id: z.string(),
  guild: z.string(),
  user: z.string(),
  role: z.enum(roles),
  status: z.enum(['pending', 'active', 'rejected', 'removed']),
  treasure: z.number().int(),
  created: z.date(),
  updated: z.date(),
})

// What a client may send
export const writable = readable.pick({
  guild: true, user: true, role: true, status: true,
}).partial({ role: true, status: true })

export const schema = { readable, writable }
export type Readable = z.infer<typeof readable>
```

### 6. No business logic mixed into CRUD operations

**Instead:** Table middleware is strictly for authorization, persistence, and transactional side effects. Everything else—AI generation, previews, calls to external services—lives in a dedicated server action placed next to the component that triggers it. Those actions compute and return a result without touching the database, and a standard form saves the result through the unified CRUD.

The CRUD layer stayed small and stable while AI features evolved rapidly. The default text model changed six times in ten days, requiring only a few lines each time.

*components/describe*

```typescript
// components/describe/actions.tsx: stateless business logic outside the CRUD
'use server'

export const draftCharacter = action(async (params) => {
  // verify caller
  const draft = await generateObject({ /* task, prompt, schema */ })
  return draft   // returned to the client, not saved; the form saves it
})

// components/describe/component.tsx: the form receives the draft and saves it
<CreateCharacter>
  {(character) => (
    <Draft action={draftCharacter} onResult={(draft) => character.setFields(draft)}>
      {/* … */}
    </Draft>
  )}
</CreateCharacter>
```

### 7. No monolithic server operations where composable steps belong

**Instead:** Multi-step workflows are orchestrated declaratively on the client by nesting `ActionProvider` or inner `Form` blocks inside the outer persistence form. Each step runs its own async action and pipes its output into the parent form's fields via `onResult`. The user sees each intermediate result immediately, can edit or regenerate it, and commits the final record with one ordinary save.

Creating a mission drafts the text with AI first, then generates the cover art into the form, rather than blocking on a single brittle server request. Operations only stayed bundled on the server when an interruption would leave data in a corrupted state.

*missions/new/components/form/component.tsx*

```typescript
// missions/new: AI steps nested declaratively inside the persistence form
<CreateMission
  defaults={{ guild: guild.id, title: '', premise: '', goal: '', cover: null }}
  onSuccess={(mission) => router.push(`/mission/${mission.id}`)}
>
  {(mission) => (
    <ActionProvider
      action={drawCover}
      params={{ title: mission.fields.title, premise: mission.fields.premise }}
      onResult={(cover) => mission.setField('cover', cover)}
    >
      {(cover) => (
        <>
          {/* 1. The AI drafts the mission fields into the form */}
          <PromptFill
            action={(prompt) => draftMission({ prompt, guild: guild.id })}
            onResult={(draft) => mission.setFields({ ...mission.fields, ...draft })}
          />
          <TitleField />
          <PremiseField />

          {/* 2. The AI draws the cover into the form */}
          <button onClick={cover.submit} disabled={cover.loading}>Draw Cover</button>

          {/* 3. One ordinary write through the CRUD */}
          <button onClick={mission.submit} disabled={mission.loading}>Create Mission</button>
        </>
      )}
    </ActionProvider>
  )}
</CreateMission>
```

### 8. No recurring decisions about where files belong

**Instead:** Every piece of code has a fixed location before it is written. Every table gets a package in `packages/{table}/` with the exact same six files. Every route keeps its UI components in `components/`, one directory per component, with component-specific server actions colocated right beside it.

There are 19 table packages with identical structure. Understand one, and you know where every file lives across the entire repository.

*packages/ · app/*

```plaintext
packages/memberships/        one table, one directory
  schema.ts                  readable / writable
  middleware.ts              read rules, pre-flight, side effects
  providers.tsx              MembershipsProvider, MembershipProvider
  hooks.tsx                  useMemberships(), useMembership()
  forms.tsx                  UpdateMembership, RemoveMembership
  fields.tsx                 inputs for the forms

app/(app)/mission/[id]/      one route
  page.tsx                   fetches its rows, hydrates its table providers
  components/
    brief/component.tsx      one directory per component
    closing/component.tsx
    closing/actions.tsx      its server actions, colocated next to it
    engine/actions.tsx
    engine/hooks.tsx
    participants/component.tsx
```

### 9. No competing error-handling styles

**Instead:** Every server action is wrapped in a single `action()` helper. Because Next.js strips error messages from thrown server errors in production, `action()` catches application errors and returns `{ error: message }` while rethrowing framework redirects and `notFound()` calls. On the client, the provider unwraps the response and throws the message so every form surfaces `.error.message` identically.

*lib/action.ts · app/providers.tsx*

```typescript
// lib/action.ts: every server action is wrapped identically
export function action(work) {
  return async (...params) => {
    try {
      return await work(...params)
    } catch (error) {
      unstable_rethrow(error)          // redirects and notFound() still throw
      return { error: error.message }  // preserves the message in production
    }
  }
}

// app/providers.tsx: the client unwraps and rethrows so forms catch it uniformly
const crud = unwrap(actions)
<InterfaceProvider {...crud}>{children}</InterfaceProvider>

// inside any form
{order.error && <p>{order.error.message}</p>}
```

### 10. No documentation drifting away from the code

**Instead:** Updating the documentation in the same commit as the code is an enforced workflow rule. `SPECS.md` defines the product behavior in plain language, and every domain rule in the codebase traces back to it. `PLAN.md` sequences upcoming phases, `CHANGELOG.md` records completed work, and an in-app What's New dialog surfaces changes to players. After 240 commits, the written specification still matches the live production system.

*SPECS.md (excerpt)*

````markdown
### 3.3 Approvals

Anything that needs approval is created as a row in a waiting state,
on the table where it will eventually live. Approving it moves that
same row to its final state, and rejecting it moves it to `rejected`.
There is no separate approvals table.

| What        | Row created as        | On approval                 |
|-------------|-----------------------|-----------------------------|
| New mission | mission `pending`     | mission `open`              |
| Card order  | card `requested`      | `offered` to the player     |
| Sheet edit  | revision `pending`    | the sheet is replaced       |
````

## Five full-app refactors, each done in a day or less

An architecture proves its resilience when the structure or domain model changes mid-flight. Each of these codebase-wide changes was completed in a day or less while feature delivery continued uninterrupted:

- **Oct 2 — Component-directory refactor:** The entire UI layer was reorganized into one directory per component with colocated server actions.
- **Oct 4 — Per-table middleware isolation:** Authorization rules across the entire application were extracted and unified into isolated `middleware.ts` files per table across seven sequential commits in a single day.
- **Oct 7 — Server-first data hydration:** Every page across the app was switched to fetch rows in Server Components and hydrate client table providers via `asAbove`.
- **Oct 9 — Economy table split:** The store's core tables were renamed and split mid-flight—turning SKUs into cards and owned items into copies across the whole economy.
- **Oct 9 — Inventory quantity migration:** Owned items were converted into stackable quantities with guild-wide shared stock, including a data migration remapping every existing reference.

## The production app: Guild RPG

The test application built on asasvirtuais is Guild RPG, a multiplayer play-by-post role-playing platform with an in-game economy, multi-tenant permissions, approval workflows, and AI orchestration throughout:

- **Multi-tenant guilds:** Five role tiers, per-guild configurable permissions, member approval queues, and invite/claim links that work while signed out.
- **AI-drafted characters:** Character sheets and portraits generated from plain-text descriptions, complete with revision approval flows.
- **A card economy:** A guild store with shared stock, batch orders, crafting, training, custom card requests, player wallets, and transaction logs.
- **Autonomous AI missions:** An AI game master that sets scenes, resolves multi-player turns, illustrates moments, and compiles the guild's canon history.
- **Player model routing:** Per-user selection of text models, image generation models, and visual art styles.
- **Platform features:** Web push notifications, an automated What's New feed, and interactive self-playing demos on the landing page.

Delivery timeline across 14 phases:

- **Oct 1 (Phases 1–6):** Core data model, onboarding, multi-tenant guilds, turn-based AI game master sessions, council review workflows, and public guild histories.
- **Oct 3 (Phases 7–10.2):** Server-autonomous AI sessions, store and background activities, per-tenant onboarding presets, player marketplace with batch orders, multi-step creation flows, and audit logs.
- **Oct 4–6 (Phases 10.3–10.4):** Full refactoring of authorization into per-table middleware and owner-configurable role permissions per guild.
- **Oct 9–11 (Phases 11–11.2):** Inventory quantity and shared stock migration, custom item review queues, and web push notifications.
