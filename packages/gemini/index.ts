import { z } from 'zod'

export * from './hooks'
export * from './components'

export const geminiChatSchema = {
    readable: z.object({
        id: z.string(),
        messages: z.array(z.any()),
        instructions: z.string().optional(),
    }),
    writable: z.object({
        messages: z.array(z.any()),
        instructions: z.string().optional(),
    }),
}

export type GeminiChatReadable = z.infer<typeof geminiChatSchema.readable>
export type GeminiChatWritable = z.infer<typeof geminiChatSchema.writable>

export const geminiImageSchema = {
    readable: z.object({
        id: z.string(),
        prompt: z.string(),
        url: z.string(),
    }),
    writable: z.object({
        prompt: z.string(),
    }),
}

export type GeminiImageReadable = z.infer<typeof geminiImageSchema.readable>
export type GeminiImageWritable = z.infer<typeof geminiImageSchema.writable>

