import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
})

export async function ensureStripeCustomer({
    email,
    name,
    auth0Sub,
}: {
    email: string
    name?: string
    auth0Sub: string
}): Promise<string> {
    // Check if a customer already exists with this email
    const existing = await stripe.customers.list({ email, limit: 1 })
    if (existing.data.length > 0) return existing.data[0].id

    const customer = await stripe.customers.create({
        email,
        name,
        metadata: { auth0Sub },
    })
    return customer.id
}

export async function getCustomerSubscriptions(customerId: string) {
    const subs = await stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        limit: 10,
        expand: ['data.items.data.price.product'],
    })
    return subs.data
}

export async function createBillingPortalSession(
    customerId: string,
    returnUrl: string
): Promise<string> {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    })
    return session.url
}
