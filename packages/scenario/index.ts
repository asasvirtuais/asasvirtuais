import z from 'zod'

export const readable = z.object({
    id: z.string(),
    chat: z.string().optional(),
    instructions: z.string().optional(),
    character: z.string().optional(),
    venue: z.string().optional(),
})

export const writable = readable.pick({
    chat: true,
    instructions: true,
    character: true,
    venue: true,
})

export const schema = { readable, writable }

export type Readable = z.infer<typeof readable>
export type Writable = z.infer<typeof writable>

declare global {
    type Scenario = Readable
}
