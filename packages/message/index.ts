import z from 'zod'

export const readable = z.object({
    id: z.string(),
    chat: z.string(),
    Role: z.enum(['user', 'assistant', 'system']).default('user'),
    Content: z.string().optional(),
    Timestamp: z.number().optional(),
    Metadata: z.record(z.string(), z.any()).optional(),
})

export const writable = readable.pick([
    'chat',
    'Role',
    'Content',
    'Timestamp',
    'Metadata',
])

export const schema = { readable, writable }

export type Readable = z.infer<typeof readable>
export type Writable = z.infer<typeof writable>

declare global {
    type Message = Readable
}
