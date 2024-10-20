'use server'

import { genRandomId } from '@/app/kysely'
import { findDashboardChat, insert } from '.'
import { userOrLogin } from '@/app/auth/actions'

export const initDashboardChat = async () => {

    const user = await userOrLogin('/dashboard')

    const existing = await findDashboardChat(user.sub)

    if ( existing )
        return existing
    else
        return insert({
            id: genRandomId(),
            user: user.sub,
            type: 'dashboard'
        })
}
