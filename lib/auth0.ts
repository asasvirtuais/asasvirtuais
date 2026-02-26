import { Auth0Client } from '@auth0/nextjs-auth0/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

declare module '@auth0/nextjs-auth0/server' {
    interface User {
        id: string
    }
}

export const auth0 = new Auth0Client({
    async beforeSessionSaved(session) {
        const user = session.user

        return {
            ...session,
            user: {
                id: user.sub,
                ...user,
            }
        }
    }
})

export async function authenticate() {
    const session = await auth0.getSession()
    if (session?.user) return session.user

    const cookieStore = await cookies()
    let guestId = cookieStore.get('guest-id')?.value

    if (!guestId) {
        guestId = crypto.randomUUID()
        try {
            cookieStore.set('guest-id', guestId, {
                maxAge: 60 * 60 * 24 * 365, // 1 year
                path: '/',
            })
        } catch (e) {
            console.warn('[AUTH] Could not set guest-id cookie during render')
        }
    }

    return { id: `guest:${guestId}` }
}