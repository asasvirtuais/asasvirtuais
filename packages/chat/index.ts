import z from 'zod'

export const readable = z.object({
    id: z.string(),
    title: z.string().optional(),
    instructions: z.string().optional(),
    temperature: z.number().optional(),
    model: z.string().optional(),
    tools: z.array(z.string()).optional(),
})

export const writable = readable.pick({
    title: true,
    instructions: true,
    temperature: true,
    model: true,
    tools: true,
})

export const schema = { readable, writable }

export type Readable = z.infer<typeof readable>
export type Writable = z.infer<typeof writable>

declare global {
    type Chat = Readable
}
