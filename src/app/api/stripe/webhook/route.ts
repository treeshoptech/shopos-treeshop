import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      console.log('✅ Checkout completed:', session.id)

      // Update payment record in database
      if (session.metadata?.job_id) {
        await supabase
          .from('payments')
          .insert({
            job_id: session.metadata.job_id,
            amount: (session.amount_total || 0) / 100,
            method: 'stripe',
            status: 'completed',
            stripe_checkout_session_id: session.id,
            stripe_payment_id: session.payment_intent as string,
          })
      }
      break
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('✅ Payment succeeded:', paymentIntent.id)
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('❌ Payment failed:', paymentIntent.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
