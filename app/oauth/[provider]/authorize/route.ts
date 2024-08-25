import { handleNextRouteAsync, returnRedirect } from '@/app/next/route/utils'
import { authUrl, clientId, redirectUri } from '@/app/oauth/util'
import { encodeState } from '@/app/oauth/state'

const codeUrl = (provider: string, returnTo: string, scope: string) => {
    const params = new URLSearchParams({
        client_id: clientId(provider) as string,
        redirect_uri: redirectUri(),
        response_type: 'code',
        scope,
        state: encodeState({ provider, returnTo }),
        access_type: 'offline',
        prompt: 'consent'
    })
    return `${authUrl(provider)}?${params}`
}

export const GET = handleNextRouteAsync<{ provider: string }>(
    async (req, { params: { provider } }) => {

        const returnTo = req.nextUrl.searchParams.get('returnTo')
        if (!returnTo)
            throw new Error('Missing returnTo')

        const scope = req.nextUrl.searchParams.get('scope')
        if (!scope)
            throw new Error('Missing scope')

        return returnRedirect(codeUrl(provider, returnTo, scope))
    }
)

export const POST = handleNextRouteAsync<{ provider: string }>(
    async (req, { params: { provider } }) => {
        const { scope, returnTo } = await req.json()
        return returnRedirect(codeUrl(provider, scope, returnTo))
    }
)