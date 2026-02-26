import { base } from '@/app/airtable'
import { authorize } from '@/app/api'
import { NextResponse, NextRequest } from 'next/server'

interface NextHandler {
    (request: NextRequest, context: RouteContext<'/api/v1/airtable/[base]/[table]/[record]'>): Promise<Response>
}

export const GET = (async (_request, context) => {

    try {
        await authorize()
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { record, table, base: baseId } = await context.params
    const airtableInterface = base(baseId, {} as any).interface(table)

    return NextResponse.json(await airtableInterface.find({id: record, table}))
}) as NextHandler

export const PATCH = (async (request, context) => {

    try {
        await authorize()        
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { record, table, base: baseId } = await context.params
    const airtableInterface = base(baseId, {} as any).interface(table)

    const data = await request.json()

    return NextResponse.json(await airtableInterface.update({ id: record, table, data }))
}) as NextHandler

export const DELETE = (async (_request, context) => {

    try {
        await authorize()        
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { record, table, base: baseId } = await context.params
    const airtableInterface = base(baseId, {} as any).interface(table)

    return NextResponse.json(await airtableInterface.remove({ id: record, table }))
}) as NextHandler
