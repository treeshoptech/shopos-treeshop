import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, Building, TreePine, Tractor, FileText } from 'lucide-react'

const types = [
  { icon: Building, title: 'Residential Lot Clearing', description: 'Prepare your lot for new home construction. Remove all vegetation down to grade.' },
  { icon: TreePine, title: 'Selective Clearing', description: 'Keep the trees you want, remove the rest. Perfect for building while preserving mature oaks.' },
  { icon: Tractor, title: 'Agricultural Clearing', description: 'Convert wooded land to pasture or cropland. Full root removal available.' },
  { icon: FileText, title: 'Commercial Site Prep', description: 'Large-scale clearing for commercial development. We work with your contractors.' },
]

const included = [
  'Tree and brush removal',
  'Stump grinding (2-4" below grade)',
  'Debris mulching on-site',
  'Grade-level cleanup',
  'Erosion control measures',
  'Site accessibility assessment',
]

const timeline = [
  { acres: '< 1 acre', time: '1 day' },
  { acres: '1-3 acres', time: '1-2 days' },
  { acres: '3-5 acres', time: '2-3 days' },
  { acres: '5+ acres', time: 'Custom timeline' },
]

export const metadata = {
  title: 'Land Clearing | TreeShop - Central Florida',
  description: 'Complete land clearing services in Central Florida. Residential lots, commercial sites, agricultural conversion. DBH pricing from $2,240/acre.',
}

export default function LandClearingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="text-green-400 font-medium mb-2">LAND CLEARING</div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Complete Lot Clearing for Your Project
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Whether you&apos;re building a home, preparing a commercial site, or converting land to agriculture—we clear it completely with transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/estimate?service=land-clearing"
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

      {/* Types */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Types of Land Clearing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {types.map((type) => (
              <div key={type.title} className="bg-gray-800 rounded-xl p-6">
                <type.icon className="w-10 h-10 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-gray-400">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What&apos;s Included</h2>
              <div className="space-y-4">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 mt-6">
                Need deeper stump grinding or root removal? Available at additional cost.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Typical Timelines</h3>
              <div className="space-y-4">
                {timeline.map((t) => (
                  <div key={t.acres} className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <span className="text-gray-300">{t.acres}</span>
                    <span className="text-green-400 font-semibold">{t.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Actual timeline depends on vegetation density and access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Permits */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">About Permits</h2>
          <div className="bg-gray-800 rounded-xl p-8">
            <p className="text-gray-300 mb-4">
              Most residential land clearing in Central Florida does not require permits. However, you may need permits if:
            </p>
            <ul className="space-y-2 text-gray-400 mb-6">
              <li>• Property is within 25 feet of wetlands</li>
              <li>• Protected species habitat is present</li>
              <li>• County-specific tree ordinances apply</li>
              <li>• Commercial development is planned</li>
            </ul>
            <p className="text-gray-300">
              We can advise on requirements, but the property owner is responsible for obtaining necessary permits. When in doubt, check with your county&apos;s building department.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Clear Your Land?</h2>
          <p className="text-green-100 mb-8">Tell us about your project. Get transparent pricing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate?service=land-clearing"
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
