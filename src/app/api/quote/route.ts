import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

const MINIMUMS = {
  'forestry-mulching': 1800,
  'land-clearing': 5000,
  'stump-grinding': 400,
  'freedomdrains': 1750,
}

const STUMP_PRICES = {
  small: 150,
  medium: 250,
  large: 400,
  xlarge: 600,
}

const DRAINAGE_PRICES = {
  starter: 2000,
  standard: 4000,
  complete: 6500,
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      service,
      address,
      acres,
      dbh,
      stumpCount,
      stumpSize,
      drainagePackage,
      contact,
    } = body

    let total = 0

    switch (service) {
      case 'forestry-mulching': {
        const score = dbh * acres
        const productionHours = score / 2.0
        const serviceCost = productionHours * 475
        total = Math.max(MINIMUMS['forestry-mulching'], Math.round(serviceCost + 375))
        break
      }

      case 'land-clearing': {
        const score = acres * (dbh / 12) * 30
        const productionHours = score / 10.6
        const serviceCost = productionHours * 875
        total = Math.max(MINIMUMS['land-clearing'], Math.round(serviceCost + 375))
        break
      }

      case 'stump-grinding': {
        const pricePerStump = STUMP_PRICES[stumpSize as keyof typeof STUMP_PRICES] || 250
        total = Math.max(MINIMUMS['stump-grinding'], pricePerStump * stumpCount + 375)
        break
      }

      case 'freedomdrains': {
        total = DRAINAGE_PRICES[drainagePackage as keyof typeof DRAINAGE_PRICES] || 4000
        break
      }

      default:
        total = 2500
    }

    const supabase = createAdminClient()

    if (contact && contact.name && contact.phone) {
      await supabase.from('leads').insert({
        source: 'estimator',
        service_type: service,
        name: contact.name,
        phone: contact.phone,
        email: contact.email || null,
        property_address: address || null,
        acreage: acres || null,
        dbh_package: dbh ? String(dbh) : null,
        estimated_value: total,
        notes: contact.notes || null,
        status: 'new',
      })
    }

    return NextResponse.json({ total, service })

  } catch (error) {
    console.error('Quote calculation error:', error)
    return NextResponse.json({ error: 'Failed to calculate quote' }, { status: 500 })
  }
}
