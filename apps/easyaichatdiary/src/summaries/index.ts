import z from 'zod';

export const readable = z.object({
    id: z.string(), // e.g., '2025-W03', '2025-02', '2025'
    type: z.enum(['weekly', 'monthly', 'yearly']),
    content: z.string().optional(),
});

export const writable = readable.pick({
    type: true,
    content: true,
});

export const schema = { readable, writable };

export type Readable = z.infer<typeof readable>;
export type Writable = z.infer<typeof writable>;
