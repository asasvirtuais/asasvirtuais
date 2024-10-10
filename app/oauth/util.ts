
const config = {
    google: {
        auth: 'https://accounts.google.com/o/oauth2/v2/auth',
        token: 'https://oauth2.googleapis.com/token',
        refresh: 'https://oauth2.googleapis.com/token',
    }
} as const

export type ProviderConfKey = keyof typeof config

const host = process.env['HOST'] as string

export const clientId = (provider: string) => process.env[`${provider.toUpperCase()}_CLIENT_ID`] as string
export const clientSecret = (provider: string) => process.env[`${provider.toUpperCase()}_CLIENT_SECRET`] as string
export const authUrl = (provider: ProviderConfKey | string) => config[provider as ProviderConfKey].auth
export const tokenUrl = (provider: ProviderConfKey | string) => config[provider as ProviderConfKey].token
export const refreshUrl = (provider: ProviderConfKey | string) => config[provider as ProviderConfKey].refresh
export const redirectUri = (provider: ProviderConfKey | string) => `https://${host}/oauth/${provider}/callback`
