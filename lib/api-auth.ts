import { NextRequest } from 'next/server'
import { auth0 } from './auth0'

/**
 * Verifies the session cookie on an API request.
 * Called from API routes that SPAs hit with `credentials: 'include'`.
 * Returns the session user or null if unauthenticated.
 *
 * Usage in a route:
 *   const user = await getApiUser(request)
 *   if (!user) return corsJson(request, { error: 'Unauthorized' }, 401)
 */
export async function getApiUser(request: NextRequest) {
    const session = await auth0.getSession(request)
    return session?.user ?? null
}
