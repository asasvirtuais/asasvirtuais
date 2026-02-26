import z from 'zod';

export const readable = z.object({
    id: z.string(),
    geminiApiKey: z.string().optional(),
    intent: z.string().optional(),
    notificationsEnabled: z.boolean().optional(),
    notificationInterval: z.number().optional(),
    notificationStartHour: z.number().optional(),
    notificationEndHour: z.number().optional(),
    timezone: z.string().optional(),
});

export const writable = readable.pick({
    geminiApiKey: true,
    intent: true,
    notificationsEnabled: true,
    notificationInterval: true,
    notificationStartHour: true,
    notificationEndHour: true,
    timezone: true,
});

export const schema = { readable, writable };

export type Readable = z.infer<typeof readable>;
export type Writable = z.infer<typeof writable>;
