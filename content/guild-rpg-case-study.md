## What was built

This is not a small demo. It has an in-game economy, roles and permissions, approval workflows and AI calls throughout. Apps with these parts are usually the first to become hard to change.

- **Guilds**: Five roles, per-guild permission settings, member approval, invite and claim links that work signed out.
- **Characters**: Drafted by the AI from a description, with sheets, portraits, approvals and edits.
- **A card economy**: A store with stock, orders, crafting, training, custom cards, wallets and logs.
- **Missions**: An AI game master writes situations, resolves turns, draws scenes and writes the guild's history.
- **Accounts**: Each player picks their text and image models and their art style.
- **Around it**: Push notifications, a What's New dialog, a landing page with demos that play themselves.

## From specs to code

`SPECS.md` describes the product in plain words. `PLAN.md` splits it into phases, and the agent builds each phase in one or a few commits. Design work was entirely optional: when the spec didn't say how a screen should look, the agent asked, and the answer was added to the spec.

The framework already decides how data, forms and permissions are written, so the only questions left for the human were about the product: what it does and what each screen shows.

A few times, the human changed a rule of the framework itself: one folder per component, each table's permission rules in its own middleware, pages that fetch on the server and pass their rows down. Each time, the agent applied the new rule to the whole app in a day or less.

Bugs were extremely rare. When one appeared, it was obvious which file it was in: a table's rules are in its middleware, its data shape in its schema, its writes in its forms. The agent went straight to that file instead of searching the whole codebase.

- **Oct 1** · Data model and infrastructure, built from the spec *(Phase 1)*
- **Oct 1** · Onboarding, quests and multi-tenant groups with membership and invites *(Phases 2–4)*
- **Oct 1** · An AI game master that runs turn-based sessions for several players *(Phase 5)*
- **Oct 1** · Session wrap-up: reports, review by the group's council, a public history *(Phase 6)*
- **Oct 3** · Sessions run entirely by the AI, on the server *(Phase 7)*
- **Oct 3** · A store, background activities and approval queues *(Phase 8)*
- **Oct 3** · Onboarding presets per tenant and **per-user AI model settings** *(Phases 8.5–9)*
- **Oct 3** · A player-driven marketplace with a catalog, tradeable items, batch orders and discounts *(Phases 10–10.1)*
- **Oct 3** · Multi-step creation flows, review workflows and audit logs *(Phase 10.2)*
- **Oct 4** · Authorization refactored into one middleware per table *(Phase 10.3)*
- **Oct 6** · Role-based permissions per tenant, configurable by the owner, with member approval *(Phase 10.4)*
- **Oct 9** · Inventory with quantities and shared stock, with a data migration *(Phase 11)*
- **Oct 9** · Custom item requests with a review queue and new permissions *(Phase 11.1)*
- **Oct 11** · Notifications with web push *(Phase 11.2)*

## Ten problems this codebase never had

When an agent works on a codebase for weeks, it usually starts solving the same problem in different ways, and the code gets harder to change. Below are ten problems of that kind that this app never had. Each one shows what the code does instead, with trimmed code from the app.

### No type updates by hand across dozens of files after a database change

**Instead:** Each table has one zod schema, and it serves as the TypeScript type, the validation and the form fields. `readable` lists what the app reads, `writable` what a client may send. When a column changes, every hook, form and middleware that uses it gets the new type automatically.

**50 commits** changed the database schema in ten days. Splitting the store's items into cards and owned copies renamed tables across the whole economy, in a single commit.

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

### No pile of server actions, each with its own access to the database

**Instead:** There is one CRUD interface: `find`, `list`, `create`, `update`, `remove`. Each operation passes the call to the middleware of the table it is for. Any other table is refused. To review security, you read this one file and one middleware file per table. There are no scattered endpoints to find.

Adding a table to the app means adding one line to this switch.

*app/actions.ts*

```typescript
// app/actions.ts: the only way into the database
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

### No state management written again on every screen

**Instead:** Writes go through the framework's forms: `CreateForm`, `UpdateForm`, `FilterForm`. A flag or a role is an `UpdateForm` with one field. The saved row goes into a shared, in-memory index of the table's rows, and every component showing that table updates from it. Nobody keeps a `useState` copy of a row that can go out of date.

Changing a member's role from a select updates the members list. No reload and no hand-written optimistic update.

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

### No permission checks scattered across unrelated files

**Instead:** Each table has one `middleware.ts`, next to its schema, with every rule for that table: who can read rows (`find`, `list`), and what is checked before and done after each write (`create`, `update`, `remove`). To know who may change a membership, you read the memberships middleware. Nothing else.

**48 commits** added roles, permissions, approvals and review queues. Each change was made in the middleware of the table it was about.

*packages/memberships/middleware.ts*

```typescript
// packages/memberships/middleware.ts: its shape, rules left out
export const memberships = makeSchemaTableInterface({ memberships: schema }, 'memberships', {
  find: async (props) => {
    const row = await db.find(props)
    // read rules: may this user see this row?
    return row
  },
  list: async (props) => {
    const rows = await db.list(props)
    // read rules: keep the rows this user may see
    return rows
  },
  create: async (props) => {
    // pre-flight: who may write, and is the data valid?
    const row = await db.create(props)
    // side effects: notifications, records that follow
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

### No stale data, and no components fetching their own data

**Instead:** Each page runs on the server, fetches the rows its components show and passes them down. Components read those rows and filter them. They don't fetch anything when they appear. Every save goes through a form that updates the shared rows, so nothing on screen goes stale and no cache needs clearing.

One commit, *Pages fetch on the server and hand rows down with asAbove*, moved the whole app to this pattern.

*guild/\[slug\]/members/page.tsx · components/members*

```typescript
// app/(app)/guild/[slug]/members/page.tsx: a Server Component
export default async function GuildMembersPage({ params }) {
  // … the guild, and the viewer's permission to manage members
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

// components/members/component.tsx: reads the table, never fetches
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

### No business logic mixed with CRUD operations

**Instead:** A table's middleware does three things only: it checks who may do the operation and what was sent, it writes, and it runs what must follow the write. Everything else (AI generation, previews, calls to outside services) is its own server action, kept next to the component that uses it. It returns a result and saves nothing. A form saves the result, through the same CRUD as everything else.

The CRUD stayed small and predictable while the AI features changed constantly. The default text model alone changed six times in ten days, a few lines each time.

*components/describe (trimmed)*

```typescript
// components/describe/actions.tsx: business logic, outside the CRUD
'use server'

export const draftCharacter = action(async (params) => {
  // check who is asking
  const draft = await generateObject({ /* task, prompt, schema */ })
  return draft   // returned, not saved: a form saves it
})

// components/describe/component.tsx: the form that saves it
<CreateCharacter>
  {(character) => (
    <Draft action={draftCharacter} onResult={(draft) => character.setFields(draft)}>
      {/* … */}
    </Draft>
  )}
</CreateCharacter>
```

### No long server-side operations where simple steps would do

**Instead:** When an operation could be split into steps, the steps ran on the client. Each step is a small action nested inside the form that saves the record, and its result fills the form (`onResult`). The user sees each result as soon as it is ready, can change or redo it, and one ordinary save writes the record.

Creating a mission shows the AI's draft first, then its cover, instead of one long request that ends with everything or nothing. Steps stayed on the server only where an interruption could leave a record in a stale state.

*missions/new/components/form/component.tsx*

```typescript
// missions/new: the AI steps nested inside the form that saves
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
          {/* 1. The AI drafts the mission into the form */}
          <PromptFill
            action={(prompt) => draftMission({ prompt, guild: guild.id })}
            onResult={(draft) => mission.setFields({ ...mission.fields, ...draft })}
          />
          <TitleField />
          <PremiseField />

          {/* 2. The AI draws the cover into the form */}
          <button onClick={cover.submit} disabled={cover.loading}>Draw Cover</button>

          {/* 3. One write, through the CRUD */}
          <button onClick={mission.submit} disabled={mission.loading}>Create Mission</button>
        </>
      )}
    </ActionProvider>
  )}
</CreateMission>
```

### No new decision about where code goes, session after session

**Instead:** New code has a fixed place before it is written. Every table gets a package with the same files as every other table. Every page keeps its components in `components/`, one folder per component, with its server actions in the same folder. Each agent session started with no memory of the last one, and each one still put code in the same places.

19 table packages with the same files. Read one, and you know where everything is in the others.

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
  page.tsx                   fetches its rows, provides its tables
  components/
    brief/component.tsx      one directory per component
    closing/component.tsx
    closing/actions.tsx      its server actions, next to it
    engine/actions.tsx
    engine/hooks.tsx
    participants/component.tsx
```

### No different error-handling style in every file

**Instead:** Every server action is wrapped in `action()`. In production, Next.js hides the message of a thrown error, so `action()` returns the message instead and the client throws it again. Every form shows errors the same way. Checks fail with `Forbidden` or `Unauthorized`, and the player sees that message.

One small file handles errors for every action in the app.

*lib/action.ts · app/providers.tsx*

```typescript
// lib/action.ts: every server action is wrapped the same way
export function action(work) {
  return async (...params) => {
    try {
      return await work(...params)
    } catch (error) {
      unstable_rethrow(error)          // redirects and notFound() still throw
      return { error: error.message }  // production would hide the message
    }
  }
}

// app/providers.tsx: the client throws it again, so every form shows it
const crud = unwrap(actions)
<InterfaceProvider {...crud}>{children}</InterfaceProvider>

// in any form
{order.error && <p>{order.error.message}</p>}
```

### No documentation drifting away from the code

**Instead:** Keeping the docs current is one of the rules, so the agent updates them in the same commit as the code. `SPECS.md` says what the product is, in plain words, and every rule in the code can be traced back to it. `PLAN.md` says what comes next, `CHANGELOG.md` what changed, and the in-app What's New tells players.

After ten days, the specification still matches the app in production.

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

## Big changes took a day or less

An architecture is really tested when the product changes its mind. Each of these structural changes was done in a day or less, while new features kept shipping.

- **Oct 2** · The whole app rebuilt with one folder per component: *Rebuild on the component-directory architecture*
- **Oct 4** · Every table's rules moved into its own middleware, in seven steps on one day: *Phase 10.3a to 10.3g*
- **Oct 7** · Every page switched to fetching on the server: *Pages fetch on the server and hand rows down with asAbove*
- **Oct 9** · The economy's core tables renamed and split: *SKUs become cards, owned cards become copies*
- **Oct 9** · Owned items became quantities, with a migration remapping every reference: *Phase 11: copy quantities and guild stock*
