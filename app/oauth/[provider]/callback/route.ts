import { handleNextRouteAsync, returnRedirect } from '@/app/next/route/utils'
import { tokenUrl, clientId, clientSecret, redirectUri } from '@/app/oauth/util'
import { decodeState } from '@/app/oauth/state'
import { insert } from '@/app/oauth/credentials'
import { TokenData } from '@/app/oauth/types'

export const dynamic = 'force-dynamic'

const exchangeCodeForToken = async (provider: string, code: string): Promise<TokenData> => {
    const response = await fetch(tokenUrl(provider) as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: clientId(provider) as string,
            client_secret: clientSecret(provider) as string,
            code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri(provider)
        })
    })

    const result = await response.json()

    if (result.error)
        throw result

    return result
}

export const GET = handleNextRouteAsync(
    async (req) => {
        const code = req.nextUrl.searchParams.get('code') as string
        const state = req.nextUrl.searchParams.get('state') as string

        const { provider, returnTo } = decodeState(state)

        const url = new URL(returnTo)

        const token = await exchangeCodeForToken(provider, code)

        const credential = await insert({ provider, ...token })

        return returnRedirect(url.toString(), credential.id)
    }
)