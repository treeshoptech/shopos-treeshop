'use client'

// GA4 Events
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA4_ID, {
      page_path: url,
    })
  }
}

export function trackEvent(action: string, params: Record<string, any> = {}) {
  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, params)
  }

  // Meta Pixel - map GA4 events to Meta events
  if (typeof window !== 'undefined' && (window as any).fbq) {
    const metaEventMap: Record<string, string> = {
      'generate_lead': 'Lead',
      'begin_checkout': 'InitiateCheckout',
      'purchase': 'Purchase',
      'add_to_cart': 'AddToCart',
      'contact': 'Contact',
      'view_item': 'ViewContent',
    }

    const metaEvent = metaEventMap[action]
    if (metaEvent) {
      (window as any).fbq('track', metaEvent, params)
    }
  }
}

// Lead tracking with value
export function trackLead({
  value,
  contentName,
  contentCategory,
}: {
  value: number
  contentName: string
  contentCategory: string
}) {
  // GA4
  trackEvent('generate_lead', {
    value,
    currency: 'USD',
    content_name: contentName,
  })

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      value,
      currency: 'USD',
      content_name: contentName,
      content_category: contentCategory,
    })
  }
}

// Phone click tracking
export function trackPhoneClick(location: string) {
  trackEvent('contact', {
    method: 'phone',
    location,
  })
}
