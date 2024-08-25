
const config = {
    google: {
        auth: 'https://accounts.google.com/o/oauth2/v2/auth',
        token: 'https://oauth2.googleapis.com/token',
        refresh: 'https://oauth2.googleapis.com/token',
    }
} as const

export type ProviderConfKey = keyof typeof config

export const clientId = (provider: string) => process.env[`${provider.toUpperCase()}_CLIENT_ID`]
export const clientSecret = (provider: string) => process.env[`${provider.toUpperCase()}_CLIENT_SECRET`]
export const authUrl = (provider: ProviderConfKey | string) => config[provider as ProviderConfKey].refresh
export const tokenUrl = (provider: ProviderConfKey | string) => config[provider as ProviderConfKey].token
export const refreshUrl = (provider: ProviderConfKey | string) => config[provider as ProviderConfKey].auth
export const redirectUri = () => `https://${process.env.HOST}`
