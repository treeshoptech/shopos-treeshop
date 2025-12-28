import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, AlertTriangle } from 'lucide-react'

const reasons = [
  'Eliminate tripping hazards',
  'Stop pest infestations',
  'Prevent root regrowth',
  'Enable new landscaping',
  'Improve property appearance',
  'Allow construction/paving',
]

const depthOptions = [
  { depth: '2-4" below grade', description: 'Standard for lawn and landscaping', price: 'Included' },
  { depth: '6-8" below grade', description: 'For planting trees or shrubs', price: '+ $50-100' },
  { depth: '12"+ below grade', description: 'For construction or paving', price: '+ $100-200' },
]

export const metadata = {
  title: 'Stump Grinding | TreeShop - Central Florida',
  description: 'Professional stump grinding in Central Florida. Any size stump removed below grade. From $150 per stump.',
}

export default function StumpGrindingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="text-green-400 font-medium mb-2">STUMP GRINDING</div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Remove Stumps Cleanly & Completely
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Our Fecon Blackhawk grinds any size stump below grade. No excavation, no mess, no trace—just level ground ready for whatever&apos;s next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/estimate?service=stump-grinding"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                Get Your Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:3868435266"
                className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                <Phone className="w-5 h-5" />
                (386) 843-5266
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Remove */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Remove Stumps?</h2>
              <div className="grid grid-cols-2 gap-4">
                {reasons.map((reason) => (
                  <div key={reason} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-300">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <AlertTriangle className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">The Hidden Problem</h3>
              <p className="text-gray-400">
                Left alone, stumps attract termites, carpenter ants, and wood-boring beetles. Once established, these pests can spread to your home. Stump grinding eliminates the food source.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-gray-400 text-center mb-12">
            Based on stump diameter and depth required
          </p>

          <div className="bg-gray-800 rounded-xl p-8 mb-8">
            <div className="text-center mb-6">
              <div className="text-sm text-gray-400 uppercase">Starting at</div>
              <div className="text-5xl font-bold text-green-400">$150</div>
              <div className="text-gray-400">per stump</div>
            </div>
            <div className="border-t border-gray-700 pt-6">
              <div className="text-center text-gray-300 mb-4">Base price + $8 per inch of diameter</div>
              <div className="text-center text-gray-400 text-sm">
                Example: 24&quot; stump = $150 + (24 × $8) = $342
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Grinding Depth Options</h3>
          <div className="space-y-4">
            {depthOptions.map((opt) => (
              <div key={opt.depth} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">{opt.depth}</div>
                  <div className="text-gray-400 text-sm">{opt.description}</div>
                </div>
                <div className="text-green-400 font-semibold">{opt.price}</div>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm text-center mt-6">
            $300 minimum applies • Volume discounts for 5+ stumps
          </p>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center text-gray-500">
              Fecon Blackhawk Image
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Equipment</h2>
              <h3 className="text-xl font-semibold text-green-400 mb-3">Fecon Blackhawk</h3>
              <p className="text-gray-300 mb-4">
                Purpose-built stump grinder with carbide teeth that chew through any wood species. Compact enough for backyard access, powerful enough for the biggest stumps.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Handles stumps of any diameter</li>
                <li>• Grinds 12&quot;+ below grade when needed</li>
                <li>• Minimal ground disturbance</li>
                <li>• Fits through 36&quot; gate openings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Remove Those Stumps?</h2>
          <p className="text-green-100 mb-8">Count your stumps, measure the biggest one, and get a quote.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate?service=stump-grinding"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:3868435266"
              className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
