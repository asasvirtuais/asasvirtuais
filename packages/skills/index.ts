import { z } from 'zod'

export interface SkillDefinition<TArgs extends z.ZodTypeAny = any, TResult = any> {
    name: string
    description: string
    schema: TArgs
    execute: (args: z.infer<TArgs>, context?: any) => Promise<TResult>
}

// Re-export specific skill suites
export * from './database'

import { databaseSkills } from './database'

// The global registry of all available skills
export const skillsRegistry: Record<string, SkillDefinition> = {
    ...databaseSkills,
}
