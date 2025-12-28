/**
 * TreeShop Pricing System
 *
 * Master Formula:
 *   Production Hours = Score ÷ PPH
 *   Line Item Cost = Production Hours × Billing Rate
 *   Project Total = Sum(Line Items) + Transport + Project Factors
 *
 * All pricing targets 50% margin: Billing Rate = Cost × 2
 */

// ============================================================================
// TYPES
// ============================================================================

export type ServiceType = 'forestry-mulching' | 'land-clearing' | 'stump-grinding' | 'tree-removal' | 'tree-trimming' | 'drainage'

export type DBHPackage = 2 | 4 | 6 | 8 | 10 | 12 | 15

export interface MulchingInput {
  service: 'forestry-mulching'
  acres: number
  dbhPackage: DBHPackage
  projectFactors?: ProjectFactor[]
}

export interface LandClearingInput {
  service: 'land-clearing'
  acres: number
  avgDBH: number       // Average DBH across site (inches)
  avgHeight: number    // Average vegetation height (feet)
  projectFactors?: ProjectFactor[]
}

export interface StumpGrindingInput {
  service: 'stump-grinding'
  stumps: StumpInput[]
  projectFactors?: ProjectFactor[]
}

export interface StumpInput {
  dbh: number          // Diameter at breast height (inches)
  heightAbove: number  // Height above grade (inches)
  depthBelow: number   // Grind depth below grade (inches) - standard 6", deep 12", extra 18"
}

export interface TreeRemovalInput {
  service: 'tree-removal'
  trees: TreeInput[]
  projectFactors?: ProjectFactor[]
}

export interface TreeInput {
  height: number       // Height (feet)
  dbh: number          // DBH (inches)
  crownRadius: number  // Crown radius (feet)
}

export interface DrainageInput {
  service: 'drainage'
  linearFeet: number
  projectFactors?: ProjectFactor[]
}

export type PricingInput =
  | MulchingInput
  | LandClearingInput
  | StumpGrindingInput
  | TreeRemovalInput
  | DrainageInput

export interface ProjectFactor {
  name: string
  percentage: number
}

export interface LineItem {
  description: string
  score: number
  pph: number
  hours: number
  rate: number
  amount: number
}

export interface PricingResult {
  lineItems: LineItem[]
  subtotal: number
  transport: number
  factorAdjustment: number
  totalFactorPercentage: number
  total: number
  productionHours: number
  methodology: string
}

// ============================================================================
// CONSTANTS - TreeShop Rates
// ============================================================================

export const BILLING_RATES = {
  'forestry-mulching': 475,    // $/hr
  'land-clearing': 875,        // $/hr (midpoint of $750-1000)
  'stump-grinding': 400,       // $/hr
  'tree-removal': 1200,        // $/hr
  'tree-trimming': 1200,       // $/hr
  'debris-hauling': 1000,      // $/load
  'transport': 250,            // $/hr round-trip
} as const

export const PPH_RATES = {
  'forestry-mulching': 2.0,
  'land-clearing': 10.6,
  'stump-grinding': 8000,
  'tree-removal': 5400,
  'tree-trimming': 5400,
} as const

// HQ for transport calculations
export const TREESHOP_HQ = '3634 Watermelon Lane, New Smyrna Beach, FL 32168'

// DBH Package descriptions
export const DBH_PACKAGES: Record<DBHPackage, { range: string; vegetation: string }> = {
  2:  { range: 'Brush only', vegetation: 'Grass, weeds, light brush' },
  4:  { range: '0–4"', vegetation: 'Saplings, light understory' },
  6:  { range: '4–6"', vegetation: 'Young trees, moderate density' },
  8:  { range: '6–8"', vegetation: 'Established trees, standard forest' },
  10: { range: '8–10"', vegetation: 'Mature trees, heavy vegetation' },
  12: { range: '10–12"', vegetation: 'Large trees, dense hardwood' },
  15: { range: '12"+', vegetation: 'Heritage/old growth, extreme density' },
}

// Drainage pricing (FreedomDrains with HydroBlox)
export const DRAINAGE_RATE_PER_LF = { low: 30, high: 60 } // Includes materials + installation

// ============================================================================
// SCORE FORMULAS
// ============================================================================

/**
 * MulchingScore = DBH_Package × Acres
 * Example: 2 acres × 8" package = 16 score ÷ 2.0 PPH = 8 hrs × $475 = $3,800
 */
export function calculateMulchingScore(acres: number, dbhPackage: DBHPackage): number {
  return dbhPackage * acres
}

/**
 * ClearingScore = Acres × (DBH ÷ 12) × Height
 * Example: 3 acres × (10" ÷ 12) × 40' = 100 ÷ 10.6 = 9.4 hrs × $875 = $8,225
 */
export function calculateClearingScore(acres: number, avgDBH: number, avgHeight: number): number {
  return acres * (avgDBH / 12) * avgHeight
}

/**
 * StumpScore = DBH² × (Height + Depth)
 * Example: 24" DBH, 6" above, 12" depth = 576 × 18 = 10,368 ÷ 8,000 = 1.3 hrs × $400 = $520
 */
export function calculateStumpScore(dbh: number, heightAbove: number, depthBelow: number): number {
  return (dbh * dbh) * (heightAbove + depthBelow)
}

/**
 * TreeScore = H × (D ÷ 12) × R²
 * Example: 60' tall, 24" DBH, 15' radius = 60 × 2 × 225 = 27,000 ÷ 5,400 = 5 hrs × $1,200 = $6,000
 */
export function calculateTreeScore(height: number, dbh: number, crownRadius: number): number {
  return height * (dbh / 12) * (crownRadius * crownRadius)
}

// ============================================================================
// PROJECT FACTORS
// ============================================================================

export const COMMON_PROJECT_FACTORS: Record<string, ProjectFactor[]> = {
  // Universal
  'access': [
    { name: 'No equipment access', percentage: 25 },
    { name: 'Narrow gate (<8ft)', percentage: 8 },
    { name: 'Fenced backyard', percentage: 6 },
  ],
  'terrain': [
    { name: 'Steep slope (>30°)', percentage: 15 },
    { name: 'Moderate slope (15-30°)', percentage: 8 },
    { name: 'Rocky terrain', percentage: 10 },
    { name: 'Sandy/loose soil', percentage: 5 },
  ],
  'ground': [
    { name: 'Wet/muddy conditions', percentage: 12 },
    { name: 'Standing water', percentage: 18 },
  ],
  // Forestry Mulching
  'vegetation': [
    { name: 'Invasive palmetto density', percentage: 30 },
    { name: 'Standard palmetto presence', percentage: 12 },
    { name: 'Heavy vine coverage', percentage: 18 },
    { name: 'Bamboo presence', percentage: 35 },
    { name: 'Mixed hardwood (>6" diameter)', percentage: 15 },
    { name: 'Dense understory (<3ft spacing)', percentage: 20 },
    { name: 'Invasive Brazilian pepper', percentage: 25 },
  ],
  // Stump Grinding
  'stump': [
    { name: 'Diameter >36"', percentage: 12 },
    { name: 'Surface roots >12" wide', percentage: 15 },
    { name: 'Hardwood species', percentage: 8 },
    { name: 'Palm stump', percentage: 15 },
    { name: 'Below grade grinding (>6")', percentage: 20 },
  ],
  // Tree Removal
  'tree-removal': [
    { name: 'Over primary structure', percentage: 20 },
    { name: 'Within 10ft of structure', percentage: 12 },
    { name: 'Requires climbing (no bucket)', percentage: 25 },
    { name: 'Power line clearance', percentage: 30 },
    { name: 'Dead/compromised tree', percentage: 18 },
    { name: 'Requires rigging/lowering', percentage: 20 },
  ],
}

/**
 * Apply project factors to base score
 * Factored Score = Base Score × (1 + Total_Factor_Percentage ÷ 100)
 */
export function applyProjectFactors(baseScore: number, factors: ProjectFactor[]): { factoredScore: number; totalPercentage: number } {
  const totalPercentage = factors.reduce((sum, f) => sum + f.percentage, 0)
  const factoredScore = baseScore * (1 + totalPercentage / 100)
  return { factoredScore, totalPercentage }
}

// ============================================================================
// MAIN CALCULATION FUNCTION
// ============================================================================

export function calculateEstimate(input: PricingInput, transportHours: number = 1.5): PricingResult {
  const lineItems: LineItem[] = []
  let productionHours = 0
  let methodology = ''
  const factors = input.projectFactors || []

  if (input.service === 'forestry-mulching') {
    const baseScore = calculateMulchingScore(input.acres, input.dbhPackage)
    const { factoredScore, totalPercentage } = applyProjectFactors(baseScore, factors)
    const hours = factoredScore / PPH_RATES['forestry-mulching']
    const amount = hours * BILLING_RATES['forestry-mulching']

    lineItems.push({
      description: `Forestry Mulching: ${input.acres} acres @ ${input.dbhPackage}" DBH Package`,
      score: factoredScore,
      pph: PPH_RATES['forestry-mulching'],
      hours,
      rate: BILLING_RATES['forestry-mulching'],
      amount,
    })

    productionHours = hours
    methodology = `MulchingScore = ${input.dbhPackage} × ${input.acres} = ${baseScore}${totalPercentage > 0 ? ` × ${(1 + totalPercentage/100).toFixed(2)} factors = ${factoredScore.toFixed(2)}` : ''} ÷ ${PPH_RATES['forestry-mulching']} PPH = ${hours.toFixed(2)} hrs × $${BILLING_RATES['forestry-mulching']}/hr`
  }

  if (input.service === 'land-clearing') {
    const baseScore = calculateClearingScore(input.acres, input.avgDBH, input.avgHeight)
    const { factoredScore, totalPercentage } = applyProjectFactors(baseScore, factors)
    const hours = factoredScore / PPH_RATES['land-clearing']
    const amount = hours * BILLING_RATES['land-clearing']

    lineItems.push({
      description: `Land Clearing: ${input.acres} acres, avg ${input.avgDBH}" DBH, ${input.avgHeight}' height`,
      score: factoredScore,
      pph: PPH_RATES['land-clearing'],
      hours,
      rate: BILLING_RATES['land-clearing'],
      amount,
    })

    productionHours = hours
    methodology = `ClearingScore = ${input.acres} × (${input.avgDBH} ÷ 12) × ${input.avgHeight} = ${baseScore.toFixed(2)}${totalPercentage > 0 ? ` × factors` : ''} ÷ ${PPH_RATES['land-clearing']} PPH`
  }

  if (input.service === 'stump-grinding') {
    for (const stump of input.stumps) {
      const baseScore = calculateStumpScore(stump.dbh, stump.heightAbove, stump.depthBelow)
      const hours = baseScore / PPH_RATES['stump-grinding']
      const amount = hours * BILLING_RATES['stump-grinding']

      lineItems.push({
        description: `Stump: ${stump.dbh}" DBH, ${stump.heightAbove}" above, ${stump.depthBelow}" deep`,
        score: baseScore,
        pph: PPH_RATES['stump-grinding'],
        hours,
        rate: BILLING_RATES['stump-grinding'],
        amount,
      })

      productionHours += hours
    }

    const totalScore = input.stumps.reduce((sum, s) => sum + calculateStumpScore(s.dbh, s.heightAbove, s.depthBelow), 0)
    methodology = `StumpScore = DBH² × (Height + Depth) for each stump. Total score: ${totalScore.toFixed(0)} ÷ ${PPH_RATES['stump-grinding']} PPH`
  }

  if (input.service === 'tree-removal') {
    for (const tree of input.trees) {
      const baseScore = calculateTreeScore(tree.height, tree.dbh, tree.crownRadius)
      const hours = baseScore / PPH_RATES['tree-removal']
      const amount = hours * BILLING_RATES['tree-removal']

      lineItems.push({
        description: `Tree: ${tree.height}' tall, ${tree.dbh}" DBH, ${tree.crownRadius}' crown radius`,
        score: baseScore,
        pph: PPH_RATES['tree-removal'],
        hours,
        rate: BILLING_RATES['tree-removal'],
        amount,
      })

      productionHours += hours
    }

    methodology = `TreeScore = H × (D ÷ 12) × R² for each tree ÷ ${PPH_RATES['tree-removal']} PPH × $${BILLING_RATES['tree-removal']}/hr`
  }

  if (input.service === 'drainage') {
    const lowAmount = input.linearFeet * DRAINAGE_RATE_PER_LF.low
    const highAmount = input.linearFeet * DRAINAGE_RATE_PER_LF.high
    const avgAmount = (lowAmount + highAmount) / 2

    lineItems.push({
      description: `FreedomDrains: ${input.linearFeet} LF with HydroBlox`,
      score: input.linearFeet,
      pph: 1, // N/A for drainage
      hours: 0,
      rate: (DRAINAGE_RATE_PER_LF.low + DRAINAGE_RATE_PER_LF.high) / 2,
      amount: avgAmount,
    })

    methodology = `FreedomDrains: ${input.linearFeet} LF × $${DRAINAGE_RATE_PER_LF.low}-${DRAINAGE_RATE_PER_LF.high}/LF. Includes HydroBlox panels + installation + lifetime no-clog guarantee.`
  }

  // Calculate subtotal
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0)

  // Calculate transport (round-trip)
  const transport = transportHours * BILLING_RATES.transport

  // Factor adjustment (for display - already applied to scores above)
  const totalFactorPercentage = factors.reduce((sum, f) => sum + f.percentage, 0)
  const factorAdjustment = 0 // Factors are baked into line item amounts

  // Total
  const total = subtotal + transport

  return {
    lineItems,
    subtotal,
    transport,
    factorAdjustment,
    totalFactorPercentage,
    total,
    productionHours,
    methodology,
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatHours(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} min`
  }
  return `${hours.toFixed(1)} hrs`
}

/**
 * Quick estimate for display purposes (ranges)
 * Returns low/high range based on typical project factors
 */
export function getQuickEstimateRange(service: ServiceType, acres?: number, dbhPackage?: DBHPackage): { low: number; high: number } {
  if (service === 'forestry-mulching' && acres && dbhPackage) {
    const baseScore = calculateMulchingScore(acres, dbhPackage)
    const baseHours = baseScore / PPH_RATES['forestry-mulching']
    const baseAmount = baseHours * BILLING_RATES['forestry-mulching']
    const transport = 1.5 * BILLING_RATES.transport

    // Low: no factors, High: +30% typical factors
    return {
      low: Math.round(baseAmount + transport),
      high: Math.round((baseAmount * 1.30) + transport),
    }
  }

  // Return empty for unsupported quick estimates
  return { low: 0, high: 0 }
}

/**
 * Generate example calculation for educational display
 */
export function getExampleCalculation(service: ServiceType): string {
  if (service === 'forestry-mulching') {
    return '2 acres × 8" DBH = 16 score ÷ 2.0 PPH = 8 hrs × $475/hr = $3,800 + transport'
  }
  if (service === 'stump-grinding') {
    return '24" DBH, 6" above, 12" deep = 576 × 18 = 10,368 ÷ 8,000 = 1.3 hrs × $400/hr = $520'
  }
  if (service === 'land-clearing') {
    return '3 acres × (10" ÷ 12) × 40\' height = 100 score ÷ 10.6 PPH = 9.4 hrs × $875/hr = $8,225'
  }
  if (service === 'tree-removal') {
    return '60\' tall × (24" ÷ 12) × 15² radius = 27,000 ÷ 5,400 = 5 hrs × $1,200/hr = $6,000'
  }
  return ''
}
