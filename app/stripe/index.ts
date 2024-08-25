import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SK as string)

export default stripe