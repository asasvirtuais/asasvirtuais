import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'
import inject from 'fnts/inject'

export const handleNextRouteAsync = <
    P = {}
>(handler: NextRouteHandler<P>): NextRouteHandler<P> => (
    (request, params) => (
        handler(request, params).catch(
            inject(console.error)(
                (error: Error) => NextResponse.json(
                    'error' in error ? error : {
                        error: {
                            name: error.name,
                            message: error.message,
                            cause: error.cause,
                            stack: error.stack,
                        }
                    }, { url: request.url, status: 500 }
                )
            )
        )
    )
)

export const returnRedirect = (url: string, auth?: string) => {
    return new NextResponse(null, {
        status: 302,
        headers: {
            Location: url,
            ...(auth ? { Authorization: auth } : {})
        }
    })
}

declare global {
    // Returns NextResponse
    type NextRouteHandler<
        P = {},
        B = any,
    > = (request: NextRequest, params: { params: P }) => Promise<
        NextResponse<B> | Response | ImageResponse
    >
    // Doesn't need to
    type NextRequestHandler<
        P = {},
        R extends any = void
    > = (request: NextRequest, params?: { params: P }) => R
}
