/** Logo Generator */
import { handleNextRouteAsync } from '@/next'
import { logoSvgString } from '@/app/logo'

export const GET = handleNextRouteAsync<{ size: string }>(async (request, { params }) => {
    const borderless = request.nextUrl.searchParams.has('borderless')
    let size = Math.min(Math.max(parseInt(params.size) || 16, 16), 1024)
    const svg = logoSvgString({ borderless, size })
    return new Response(svg, {
        headers: { 'Content-Type': 'image/svg+xml' }
    })
})
