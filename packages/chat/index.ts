import z from 'zod'

// ─── Conversation ──────────────────────────────────────────────────────────────

export const conversationReadable = z.object({
  id: z.string(),
  title: z.string().optional(),
  model: z.string().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
})

export const conversationWritable = conversationReadable.pick({
  title: true,
  model: true,
  createdAt: true,
  updatedAt: true,
})

export const conversationSchema = {
  readable: conversationReadable,
  writable: conversationWritable,
}

export type ConversationReadable = z.infer<typeof conversationReadable>
export type ConversationWritable = z.infer<typeof conversationWritable>

declare global {
  type Conversation = ConversationReadable
}

// ─── Message ───────────────────────────────────────────────────────────────────

export const messageReadable = z.object({
  id: z.string(),
  conversationId: z.string(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  createdAt: z.number().optional(),
})

export const messageWritable = messageReadable.pick({
  conversationId: true,
  role: true,
  content: true,
  createdAt: true,
})

export const messageSchema = {
  readable: messageReadable,
  writable: messageWritable,
}

export type MessageReadable = z.infer<typeof messageReadable>
export type MessageWritable = z.infer<typeof messageWritable>

declare global {
  type Message = MessageReadable
}
