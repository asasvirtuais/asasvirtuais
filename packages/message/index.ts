import z from 'zod'

export const readable = z.object({
    id: z.string(),
    chat: z.string(),
    role: z.enum(['user', 'assistant', 'system']).default('user'),
    content: z.string().optional(),
    timestamp: z.number().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
})

export const writable = readable.pick([
    'chat',
    'role',
    'content',
    'timestamp',
    'metadata',
])

export const schema = { readable, writable }

export type Readable = z.infer<typeof readable>
export type Writable = z.infer<typeof writable>

declare global {
    type Message = Readable
}
