import z from 'zod'

export const readable = z.object({
    id: z.string(),
    google_api_key: z.string().optional(),
})

export const writable = readable.pick({
    google_api_key: true,
})

export const schema = { readable, writable }

export type Readable = z.infer<typeof readable>
export type Writable = z.infer<typeof writable>

declare global {
    type Setting = Readable
}
