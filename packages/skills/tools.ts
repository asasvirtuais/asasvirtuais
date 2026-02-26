import { z } from 'zod'
import { generateCharacter, generateVenue, generateChat } from './action'
import { askSkillAction } from './ask/action'

export function getSkillTools({
    chatId,
    chatTitle,
}: {
    chatId: string
    chatTitle: string
}) {
    return {
        generateCharacter: {
            description: 'Generate a new character based on a description.',
            parameters: z.object({
                prompt: z.string().describe('The description of the character to generate.'),
                system: z.string().optional().describe('Optional system instructions context.'),
            }),
            execute: async (params: { prompt: string; system?: string }) => {
                return generateCharacter(params.prompt, params.system)
            },
        },
        generateVenue: {
            description: 'Generate a new venue (location) based on a description.',
            parameters: z.object({
                prompt: z.string().describe('The description of the venue to generate.'),
                system: z.string().optional().describe('Optional system instructions context.'),
            }),
            execute: async (params: { prompt: string; system?: string }) => {
                return generateVenue(params.prompt, params.system)
            },
        },
        generateChat: {
            description: 'Generate a new chat configuration based on a description.',
            parameters: z.object({
                prompt: z.string().describe('The description of the chat to generate.'),
                system: z.string().optional().describe('Optional system instructions context.'),
            }),
            execute: async (params: { prompt: string; system?: string }) => {
                return generateChat(params.prompt, params.system)
            },
        },
        askOtherChat: {
            description: 'Ask a question to another chat agent and receive a response.',
            parameters: z.object({
                respondingChatInstructions: z.string().describe('The system instructions of the chat that will answer.'),
                respondingChatModel: z.string().optional().describe('The model to be used by the responder (defaults to gemini-3-flash-preview).'),
                respondingChatTemperature: z.number().optional().describe('The temperature for the response (0-1).'),
                question: z.string().describe('The specific question or request to be answered.'),
            }),
            execute: async (params: any) => {
                return askSkillAction({
                    ...params,
                    askingChatId: chatId,
                    askingChatTitle: chatTitle,
                })
            },
        },
    }
}
