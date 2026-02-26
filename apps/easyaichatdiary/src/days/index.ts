import z from 'zod';

export const messageSchema = z.object({
    id: z.string(),
    role: z.enum(['user', 'assistant']),
    content: z.string(),
    timestamp: z.number(),
});

export const readable = z.object({
    id: z.string(), // YYYYMMDD
    messages: z.array(messageSchema).optional(),
    summary: z.string().optional(),
});

export const writable = readable.pick({
    messages: true,
    summary: true,
});

export const schema = { readable, writable };

export type Message = z.infer<typeof messageSchema>;
export type Readable = z.infer<typeof readable>;
export type Writable = z.infer<typeof writable>;
