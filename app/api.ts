import { headers } from 'next/headers'

export const authorize = async () => {
    const authorized = (await headers()).get('authorization') === process.env.API_KEY
    if (!authorized)
        throw new Error('Unauthorized')
}
