import { ImageResponse } from 'next/og'
import { LogoIcon } from '@/app/logo'
import { handleNextRouteAsync } from '@/next'

export const GET = handleNextRouteAsync<{ size: string }>(async (request, { params }) => {

    const borderless = request.nextUrl.searchParams.has('borderless')
    let size = Math.min(Math.max(parseInt(params.size) || 16, 16), 1024)

    return new ImageResponse(
        <LogoIcon size={size} borderless={borderless as true} />,
        { width: size, height: size }
    )
})
