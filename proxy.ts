import { NextResponse, type NextRequest } from 'next/server'
import { auth0 } from '@/lib/auth0'

export async function proxy(request: NextRequest) {
    // 1. Specify the allowed origin
    const origin = request.headers.get('origin')

    // 2. Handle the preflight OPTIONS request
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': origin || 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400',
            },
        })
    }

    // 3. Handle actual requests
    const response = NextResponse.next()
    response.headers.set('Access-Control-Allow-Origin', origin || 'http://localhost:3000')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    return await auth0.middleware(request)
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    ]
}
