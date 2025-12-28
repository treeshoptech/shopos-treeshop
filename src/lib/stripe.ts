import Stripe from 'stripe'

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
})

// Helper to create checkout session
export async function createCheckoutSession({
  priceId,
  customerId,
  successUrl,
  cancelUrl,
  mode = 'payment',
  metadata = {},
}: {
  priceId?: string
  customerId?: string
  successUrl: string
  cancelUrl: string
  mode?: 'payment' | 'subscription'
  metadata?: Record<string, string>
}) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: priceId ? [{ price: priceId, quantity: 1 }] : undefined,
    mode,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  })
  return session
}

// Helper to get or create customer
export async function getOrCreateStripeCustomer({
  email,
  name,
  metadata = {},
}: {
  email: string
  name?: string
  metadata?: Record<string, string>
}) {
  // Check if customer exists
  const existing = await stripe.customers.list({ email, limit: 1 })
  if (existing.data.length > 0) {
    return existing.data[0]
  }

  // Create new customer
  return stripe.customers.create({
    email,
    name,
    metadata,
  })
}
