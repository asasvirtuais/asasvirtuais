'use server'
import { cache } from 'react'
import { getSession } from '@auth0/nextjs-auth0'
import { RedirectType, redirect } from 'next/navigation'

type Claims = {
    sub: string
    nickname: string
    name: string
    email: string
    picture: string
    email_verified: boolean
}

export const userOrLogin = cache(
    async (returnTo: string) => {
        const session = await getSession()
        const user = session?.user
        if (!user)
            redirect(`/api/auth/login?returnTo=${returnTo}`, RedirectType.push)
        return user as Claims
    }
)