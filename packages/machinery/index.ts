import z from 'zod'

export const readable = z.object({
    id: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
    companyName: z.string().optional(),
    companySize: z.string().optional(),
    category: z.string().optional(),
    selectedProducts: z.array(z.string()).optional(),
    quoteTotal: z.number().optional(),
    status: z.string().optional(),
})

export const writable = readable.pick({
    email: true,
    phone: true,
    companyName: true,
    companySize: true,
    category: true,
    selectedProducts: true,
    quoteTotal: true,
})

export const schema = { readable, writable }

export type Readable = z.infer<typeof readable>
export type Writable = z.infer<typeof writable>

declare global {
    type Lead = Readable
}
