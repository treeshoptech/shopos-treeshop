import Link from 'next/link'
import { CheckCircle, ArrowRight, Calculator } from 'lucide-react'
import { DBH_PACKAGES, BILLING_RATES, PPH_RATES, getExampleCalculation } from '@/lib/pricing'

const formulas = [
  {
    service: 'Forestry Mulching',
    formula: 'MulchingScore = DBH_Package × Acres',
    pph: '2.0',
    rate: `$${BILLING_RATES['forestry-mulching']}/hr`,
    example: getExampleCalculation('forestry-mulching'),
  },
  {
    service: 'Land Clearing',
    formula: 'ClearingScore = Acres × (DBH ÷ 12) × Height',
    pph: '10.6',
    rate: `$${BILLING_RATES['land-clearing']}/hr`,
    example: getExampleCalculation('land-clearing'),
  },
  {
    service: 'Stump Grinding',
    formula: 'StumpScore = DBH² × (Height + Depth)',
    pph: '8,000',
    rate: `$${BILLING_RATES['stump-grinding']}/hr`,
    example: getExampleCalculation('stump-grinding'),
  },
  {
    service: 'Tree Removal',
    formula: 'TreeScore = H × (D ÷ 12) × R²',
    pph: '5,400',
    rate: `$${BILLING_RATES['tree-removal']}/hr`,
    example: getExampleCalculation('tree-removal'),
  },
]

export const metadata = {
  title: 'Score-Based Pricing | TreeShop',
  description: 'Transparent, formula-based pricing for forestry mulching, land clearing, and stump grinding. Know the math behind your quote.',
}

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Score-Based Pricing</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            No guessing. No gut-feel estimates. Every quote is calculated from measured inputs using documented formulas.
          </p>
        </div>
      </section>

      {/* Master Formula */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-green-500" />
              <h2 className="text-2xl font-bold">The Master Formula</h2>
            </div>
            <div className="font-mono text-lg space-y-2 text-green-400">
              <div>Production Hours = Score ÷ PPH</div>
              <div>Line Item Cost = Hours × Billing Rate</div>
              <div>Project Total = Line Items + Transport + Factors</div>
            </div>
            <p className="text-gray-400 mt-4">
              All pricing targets <strong className="text-white">50% margin</strong>. We know our costs to the dollar.
            </p>
          </div>
        </div>
      </section>

      {/* Service Formulas */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Service Formulas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {formulas.map((f) => (
              <div key={f.service} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-400">{f.service}</h3>
                <div className="font-mono text-sm bg-gray-900 rounded-lg p-4 mb-4">
                  {f.formula}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">PPH:</span> <span className="font-semibold">{f.pph}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Rate:</span> <span className="font-semibold">{f.rate}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  <strong>Example:</strong> {f.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DBH Packages */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">DBH Packages</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            DBH = Diameter at Breast Height (4.5&apos; from ground). We price based on the largest trees requiring clearing.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {(Object.entries(DBH_PACKAGES) as [string, { range: string; vegetation: string }][]).map(([pkg, info]) => (
              <div key={pkg} className="bg-gray-800 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">{pkg}&quot;</div>
                <div className="text-sm text-gray-400">{info.range}</div>
                <div className="text-xs text-gray-500 mt-2">{info.vegetation}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transport */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Transport Pricing</h2>
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-green-400 mb-2">${BILLING_RATES.transport}/hr</div>
            <div className="text-gray-400 mb-4">Round-trip from base</div>
            <p className="text-sm text-gray-500">
              TreeShop HQ: 3634 Watermelon Lane, New Smyrna Beach, FL 32168<br />
              Transport time calculated via actual route to your property.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">See Your Quote Calculated</h2>
          <p className="text-green-100 mb-8">Enter your property details. Watch the math work.</p>
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg"
          >
            Get Your Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
