import { NextResponse, NextRequest } from 'next/server'
import { base } from '@/app/airtable'
import { authorize } from '@/app/api'

interface NextHandler {
    (request: NextRequest, context: RouteContext<'/api/v1/airtable/[base]/[table]'>): Promise<Response>
}

export const GET = (async (request, context) => {

    try {
        await authorize()        
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { table, base: baseId } = await context.params
    const airtableInterface = base(baseId, {} as any).interface(table)
    const query = Object.fromEntries(request.nextUrl.searchParams.entries())

    return NextResponse.json(await airtableInterface.list({ table, query }))
}) as NextHandler

export const POST = (async (request, context) => {

    try {
        await authorize()        
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { table, base: baseId } = await context.params
    const airtableInterface = base(baseId, {} as any).interface(table)

    const data = await request.json()

    return NextResponse.json(await airtableInterface.create({ table, data }))
}) as NextHandler
