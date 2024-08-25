import { NextResponse } from 'next/server'
import { handleNextRouteAsync } from '@/app/next/route/utils'
import { TokenData } from '@/app/oauth/types'
import { getById, replace, SelectCredential } from '@/app/oauth/credentials'
import { clientId, clientSecret, refreshUrl } from '@/app/oauth/util'

const refreshOAuthAccessToken = async ({
    provider,
    refresh_token,
}: SelectCredential) => {
    const params = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
        client_id: clientId(provider) as string,
        client_secret: clientSecret(provider) as string,
    })

    const response = await fetch(refreshUrl(provider) as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
    })

    const result: TokenData = await response.json()

    if ('error' in result)
        throw result

    return result
}

export const GET = handleNextRouteAsync(
    async (req) => {
        const key = req.headers.get('Authorization')

        if (!key)
            throw new Error('X-X')

        let credential = await getById(key)

        const expiresAt = credential.created_at.getTime() + (credential.expires_in * 1000)
        const expired = Date.now() > expiresAt

        if (expired) {
            const token = await refreshOAuthAccessToken(credential)
            credential = await replace(credential.id, {
                ...credential,
                ...token
            })
        }

        const expires = new Date((new Date(credential.created_at)).getTime() + credential.expires_in).toISOString

        return NextResponse.json({
            expires,
            token: credential.access_token,
            provider: credential.provider,
            scope: credential.scope
        })
    }
)
