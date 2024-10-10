import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'
import inject from 'fnts/inject'
import { FunctionComponent } from 'react'

declare global {
    // Returns NextResponse, handles the request and returns a Response
    type NextRouteHandler<
        P = {},
        B = any,
    > = (request: NextRequest, params: { params: P }) => Promise<
        NextResponse<B> | Response | ImageResponse
    >
    // Doesn't need to return NextResponse, handles the request and returns a result
    type NextRequestHandler<
        P = {},
        R extends any = void
    > = (request: NextRequest, params?: { params: P }) => R

    type NextLayoutHandler<P = any> = FunctionComponent<P>
    type NextPageHandler<P = any> = FunctionComponent<P>
}


export const handleNextRouteAsync = <
    P = {}
>(handler: NextRouteHandler<P>): NextRouteHandler<P> => (
    (request, params) => (
        // Wraps the handler to facilitate debugging errors, worst thing is not knowing what caused a bug (in my experience)
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

export const route = handleNextRouteAsync
export const layout = <P = any>( handler: NextLayoutHandler<P> ) => (
    (props: P) => handler(props)
)
export const page = <P = any>( handler: NextLayoutHandler<P> ) => (
    (props: P) => handler(props)
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
