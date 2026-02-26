import z from 'zod'

export const readable = z.object({
    id: z.string(),
    name: z.string().optional(),
    definition: z.string().optional(),
    details: z.string().optional(),
    avatar: z.string().optional(),
    skills: z.array(z.string()).optional(),
})

export const writable = readable.pick({
    name: true,
    definition: true,
    details: true,
    avatar: true,
    skills: true,
})

export const schema = { readable, writable }

export type Readable = z.infer<typeof readable>
export type Writable = z.infer<typeof writable>

declare global {
    type Character = Readable
}
