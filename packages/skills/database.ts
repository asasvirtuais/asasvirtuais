import { z } from 'zod'
import { SkillDefinition } from './index'
import { TableInterface } from 'asasvirtuais/interface'

// Define the arguments schemas
const QueryRecordArgs = z.object({
    tableName: z.string().describe('The name of the database table to query'),
    query: z.record(z.any()).optional().describe('Filter criteria object. Omit to return all records.'),
})

const CreateRecordArgs = z.object({
    tableName: z.string().describe('The name of the database table to insert into'),
    data: z.record(z.any()).describe('The data payload for the new record'),
})

const UpdateRecordArgs = z.object({
    tableName: z.string().describe('The name of the database table to update'),
    id: z.string().describe('The ID of the record to update'),
    data: z.record(z.any()).describe('The attributes to change on the existing record'),
})

const RemoveRecordArgs = z.object({
    tableName: z.string().describe('The name of the database table to delete from'),
    id: z.string().describe('The ID of the record to remove'),
})

// Define the implementation map
export const databaseSkills: Record<string, SkillDefinition> = {
    'list_records': {
        name: 'list_records',
        description: 'Query records from a specific table matching optional filters',
        schema: QueryRecordArgs,
        execute: async (args, context: { db: TableInterface<any, any> }) => {
            if (!context?.db) throw new Error('Database context required')
            return context.db.list({ table: args.tableName, query: args.query || {} })
        },
    },
    'create_record': {
        name: 'create_record',
        description: 'Insert a new item into a specific table',
        schema: CreateRecordArgs,
        execute: async (args, context: { db: TableInterface<any, any> }) => {
            if (!context?.db) throw new Error('Database context required')
            return context.db.create({ table: args.tableName, data: args.data })
        },
    },
    'update_record': {
        name: 'update_record',
        description: 'Update specified fields on an existing record',
        schema: UpdateRecordArgs,
        execute: async (args, context: { db: TableInterface<any, any> }) => {
            if (!context?.db) throw new Error('Database context required')
            return context.db.update({ table: args.tableName, id: args.id, data: args.data })
        },
    },
    'remove_record': {
        name: 'remove_record',
        description: 'Delete a single record by its ID',
        schema: RemoveRecordArgs,
        execute: async (args, context: { db: TableInterface<any, any> }) => {
            if (!context?.db) throw new Error('Database context required')
            return context.db.remove({ table: args.tableName, id: args.id })
        },
    },
}
