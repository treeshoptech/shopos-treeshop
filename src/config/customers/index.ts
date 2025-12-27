import treeshopConfig from './treeshop.json'
import templateConfig from './_template.json'

export interface CustomerConfig {
  customerRef: string
  companyName: string
  domains: {
    main: string
    pro: string
    store: string
  }
  branding: {
    primaryColor: string
    secondaryColor: string
    logo: string
    favicon: string
  }
  features: {
    b2c: boolean
    b2b: boolean
    ecommerce: boolean
    blog: boolean
    booking: boolean
  }
  contact: {
    email: string
    phone: string
    address: {
      street: string
      city: string
      state: string
      zip: string
      country: string
    }
  }
  social: {
    facebook: string
    instagram: string
    twitter: string
    linkedin: string
    youtube: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export const customerConfigs: Record<string, CustomerConfig> = {
  treeshop: treeshopConfig,
  template: templateConfig,
}

/**
 * Get customer configuration based on environment variable or default
 */
export function getCustomerConfig(): CustomerConfig {
  const customerRef = process.env.NEXT_PUBLIC_CUSTOMER_REF || 'treeshop'
  return customerConfigs[customerRef] || customerConfigs.treeshop
}

/**
 * Get customer configuration by reference
 */
export function getCustomerConfigByRef(ref: string): CustomerConfig | undefined {
  return customerConfigs[ref]
}
