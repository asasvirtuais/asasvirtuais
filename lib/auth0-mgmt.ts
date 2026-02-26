/**
 * Auth0 Management API helpers.
 * These run server-side only. They read/write user_metadata, which is
 * our substitute for a database — all user profile data lives in Auth0.
 */

interface Auth0Metadata {
    stripeCustomerId?: string
    name?: string
    picture?: string
    apiKey?: string
}

/** Cache a management token in-process for its lifetime */
let cachedToken: { token: string; exp: number } | null = null

async function getManagementToken(): Promise<string> {
    const now = Date.now() / 1000
    if (cachedToken && cachedToken.exp > now + 60) return cachedToken.token

    const domain = process.env.AUTH0_DOMAIN!
    const res = await fetch(`https://${domain}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: process.env.AUTH0_MGMT_CLIENT_ID!,
            client_secret: process.env.AUTH0_MGMT_CLIENT_SECRET!,
            audience: `https://${domain}/api/v2/`,
        }),
    })

    if (!res.ok) throw new Error(`Failed to get management token: ${res.statusText}`)

    const data = await res.json()
    cachedToken = { token: data.access_token, exp: now + data.expires_in }
    return data.access_token
}

export async function getManagementClient() {
    return { token: await getManagementToken(), domain: process.env.AUTH0_DOMAIN! }
}

export async function getUserMetadata(sub: string): Promise<Auth0Metadata> {
    const { token, domain } = await getManagementClient()
    const encodedSub = encodeURIComponent(sub)
    const res = await fetch(`https://${domain}/api/v2/users/${encodedSub}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return {}
    const data = await res.json()
    return { ...data.user_metadata, ...data.app_metadata } as Auth0Metadata
}

export async function setUserMetadata(
    sub: string,
    metadata: Partial<Auth0Metadata>
): Promise<void> {
    const { token, domain } = await getManagementClient()
    const encodedSub = encodeURIComponent(sub)
    await fetch(`https://${domain}/api/v2/users/${encodedSub}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_metadata: metadata }),
    })
}

export async function setAppMetadata(
    sub: string,
    metadata: Partial<Auth0Metadata>
): Promise<void> {
    const { token, domain } = await getManagementClient()
    const encodedSub = encodeURIComponent(sub)
    await fetch(`https://${domain}/api/v2/users/${encodedSub}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ app_metadata: metadata }),
    })
}
