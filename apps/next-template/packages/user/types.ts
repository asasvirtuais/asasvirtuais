import z from 'zod' 

export const readable = z.object({
    id: z.string(),
    name: z.string(),
    sub: z.string(),
})

export const writable = readable.pick({
    name: true,
    sub: true,
})

export const schema = { readable, writable }

export type Readable = z.infer<typeof readable>
export type Writable = z.infer<typeof writable>

declare global {
    type User = Readable
}
