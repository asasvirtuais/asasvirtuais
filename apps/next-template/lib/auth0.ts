import { create, list } from '@/app/interface'
import { Auth0Client } from '@auth0/nextjs-auth0/server'
import { redirect } from 'next/navigation'

declare module '@auth0/nextjs-auth0/server' {
  interface User {
    id: string
  }
}

export const auth0 = new Auth0Client({
    async beforeSessionSaved(session) {
        const user = session.user

        if (! user)
            throw new Error('No user in session')
        let appUser
        const [found] = await list({query: { sub: user.sub }})

        if (found)
            appUser = found
        else
            appUser = await create({data: { name: user.name as string, sub: user.sub }})

        if (!appUser)
            throw new Error('Failed to create profile')

        return {
            ...session,
            user: {
                id: appUser.id,
                ...user,
            }
        }
    }
})

export async function authenticate() {
    const session = await auth0.getSession()
    if (! session?.user)
        return redirect('/auth/login')
    return session.user
}