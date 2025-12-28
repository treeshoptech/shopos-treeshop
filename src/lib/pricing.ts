// TreeShop DBH Pricing Methodology

export interface PricingInput {
  service: 'forestry-mulching' | 'land-clearing' | 'stump-grinding' | 'drainage'
  acres?: number
  dbhPackage?: '4' | '6' | '8' | '10'
  stumpCount?: number
  stumpDiameter?: number
  drainageLinearFeet?: number
}

export interface PricingResult {
  lowEstimate: number
  highEstimate: number
  breakdown: {
    label: string
    lowAmount: number
    highAmount: number
  }[]
  notes: string[]
}

// DBH Package rates per acre (low - high)
const DBH_RATES: Record<string, { low: number; high: number }> = {
  '4': { low: 2240, high: 2800 },
  '6': { low: 3080, high: 3920 },
  '8': { low: 4200, high: 4760 },
  '10': { low: 4760, high: 5320 },
}

// Stump grinding base rates
const STUMP_BASE = 150
const STUMP_PER_INCH = 8

// Drainage rates per linear foot
const DRAINAGE_PER_LF = { low: 15, high: 25 }

// Transport rate
const TRANSPORT_RATE = 153.35
const TRANSPORT_HOURS_ESTIMATE = 1.5 // Average round trip

export function calculateEstimate(input: PricingInput): PricingResult {
  const breakdown: PricingResult['breakdown'] = []
  const notes: string[] = []
  let lowTotal = 0
  let highTotal = 0

  if (input.service === 'forestry-mulching' || input.service === 'land-clearing') {
    if (!input.acres || !input.dbhPackage) {
      return { lowEstimate: 0, highEstimate: 0, breakdown: [], notes: ['Missing acreage or DBH package'] }
    }

    const rates = DBH_RATES[input.dbhPackage]
    const workLow = input.acres * rates.low
    const workHigh = input.acres * rates.high

    breakdown.push({
      label: `${input.dbhPackage}" DBH Package (${input.acres} acres)`,
      lowAmount: workLow,
      highAmount: workHigh,
    })

    lowTotal += workLow
    highTotal += workHigh

    // Add transport
    const transport = TRANSPORT_RATE * TRANSPORT_HOURS_ESTIMATE
    breakdown.push({
      label: 'Equipment Transport',
      lowAmount: transport,
      highAmount: transport,
    })
    lowTotal += transport
    highTotal += transport

    notes.push('Final price depends on site access and terrain')
    if (input.dbhPackage === '10') {
      notes.push('Trees over 10" may require additional equipment')
    }
  }

  if (input.service === 'stump-grinding') {
    if (!input.stumpCount || !input.stumpDiameter) {
      return { lowEstimate: 0, highEstimate: 0, breakdown: [], notes: ['Missing stump count or diameter'] }
    }

    const perStump = STUMP_BASE + (input.stumpDiameter * STUMP_PER_INCH)
    const stumpTotal = perStump * input.stumpCount

    breakdown.push({
      label: `${input.stumpCount} stumps @ ~${input.stumpDiameter}" avg diameter`,
      lowAmount: stumpTotal * 0.85,
      highAmount: stumpTotal * 1.15,
    })

    lowTotal += stumpTotal * 0.85
    highTotal += stumpTotal * 1.15

    // Minimum charge
    if (lowTotal < 300) {
      lowTotal = 300
      highTotal = Math.max(highTotal, 350)
      notes.push('$300 minimum for stump grinding')
    }

    notes.push('Access and root spread affect final price')
  }

  if (input.service === 'drainage') {
    if (!input.drainageLinearFeet) {
      return { lowEstimate: 0, highEstimate: 0, breakdown: [], notes: ['Missing linear feet estimate'] }
    }

    const drainLow = input.drainageLinearFeet * DRAINAGE_PER_LF.low
    const drainHigh = input.drainageLinearFeet * DRAINAGE_PER_LF.high

    breakdown.push({
      label: `FreedomDrains (~${input.drainageLinearFeet} LF)`,
      lowAmount: drainLow,
      highAmount: drainHigh,
    })

    lowTotal += drainLow
    highTotal += drainHigh

    notes.push('Includes HydroBlox panels with lifetime no-clog guarantee')
    notes.push('Final footage determined by site assessment')
  }

  return {
    lowEstimate: Math.round(lowTotal),
    highEstimate: Math.round(highTotal),
    breakdown,
    notes,
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
