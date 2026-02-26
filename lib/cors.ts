import { NextRequest, NextResponse } from 'next/server'

/**
 * Allowed origins. Add each SPA app domain here.
 * Credentials (cookies) require an explicit, non-wildcard origin.
 */
const ALLOWED_ORIGINS = (process.env.CORS_ALLOWED_ORIGINS || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean)

function corsHeaders(origin: string | null) {
    const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
    return {
        'Access-Control-Allow-Origin': allowed || '',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
}

export function withCors(request: NextRequest, response: NextResponse): NextResponse {
    const origin = request.headers.get('origin')
    const headers = corsHeaders(origin)
    Object.entries(headers).forEach(([k, v]) => {
        if (v) response.headers.set(k, v)
    })
    return response
}

export function corsOptions(request: NextRequest): NextResponse {
    const origin = request.headers.get('origin')
    return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
}

export function corsJson(request: NextRequest, data: unknown, status = 200): NextResponse {
    const origin = request.headers.get('origin')
    return NextResponse.json(data, { status, headers: corsHeaders(origin) })
}
