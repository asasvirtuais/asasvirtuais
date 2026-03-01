import z from 'zod'

export const readable = z.object({
    id: z.string(),
    type: z.enum(['generator', 'compressor', 'pump']).optional(),
    power: z.number().optional(),
    voltage: z.string().optional(),
    fuelType: z.enum(['diesel', 'natural_gas', 'electric']).optional(),
    environment: z.enum(['indoor', 'outdoor', 'hazardous']).optional(),
    features: z.array(z.string()).optional(),
    contactEmail: z.string().optional(),
    status: z.string().optional()
})

export const writable = readable.pick({
    type: true,
    power: true,
    voltage: true,
    fuelType: true,
    environment: true,
    features: true,
    contactEmail: true,
})

export const schema = { readable, writable }

export type Readable = z.infer<typeof readable>
export type Writable = z.infer<typeof writable>

declare global {
    type Machinery = Readable
}
