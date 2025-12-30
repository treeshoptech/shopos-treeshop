import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, Leaf, Clock, DollarSign, Shield } from 'lucide-react'

const benefits = [
  { icon: Leaf, title: 'Eco-Friendly', description: 'Mulch returns nutrients to soil. No burning, no hauling.' },
  { icon: Clock, title: 'Fast Results', description: 'Clear acres in hours, not days. Minimal site disruption.' },
  { icon: DollarSign, title: 'Cost-Effective', description: '30-50% less than traditional clearing methods.' },
  { icon: Shield, title: 'Erosion Control', description: 'Mulch layer protects soil and prevents runoff.' },
]

const applications = [
  'Overgrown lot clearing',
  'Fence line maintenance',
  'Fire break creation',
  'Trail and path clearing',
  'Pipeline and utility ROW',
  'Pasture reclamation',
  'Hunting property management',
  'New construction prep',
]

const packages = [
  { dbh: '2', name: 'Brush Only', description: 'Grass, weeds, light brush' },
  { dbh: '4', name: 'Light', description: 'Saplings, light understory' },
  { dbh: '6', name: 'Medium', description: 'Young trees, moderate density', popular: true },
  { dbh: '8', name: 'Standard', description: 'Established trees, standard forest' },
  { dbh: '10', name: 'Heavy', description: 'Mature trees, heavy vegetation' },
  { dbh: '12', name: 'Large', description: 'Large trees, dense hardwood' },
  { dbh: '15', name: 'Extreme', description: 'Heritage/old growth' },
]

const faqs = [
  { q: 'What size trees can you mulch?', a: 'We handle trees up to 15" diameter efficiently. Larger trees can be felled first and then processed.' },
  { q: 'What\'s left after mulching?', a: 'A 2-4" layer of wood chips and organic material spread evenly across the cleared area. It breaks down naturally and enriches the soil.' },
  { q: 'How long does it take?', a: 'Most residential lots (1-3 acres) are completed in a single day. Larger properties may take 2-3 days.' },
  { q: 'Do you remove stumps?', a: 'Forestry mulching cuts trees flush with the ground but doesn\'t grind the stump. For complete stump removal, we offer stump grinding as a separate service—most customers add this for a finished look.' },
]

export const metadata = {
  title: 'Forestry Mulching | TreeShop - Central Florida',
  description: 'Professional forestry mulching in Central Florida. Clear overgrown land, create firebreaks, reclaim pastures. Transparent DBH pricing from $2,240/acre.',
}

export default function ForestryMulchingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="text-blue-400 font-medium mb-2">FORESTRY MULCHING</div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Transform Overgrown Land Into Usable Property
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Our mulcher processes trees, brush, and undergrowth in a single pass—leaving nutrient-rich mulch behind. No burning. No hauling. No mess.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/estimate?service=forestry-mulching"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg"
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

      {/* What Is Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What is Forestry Mulching?</h2>
              <p className="text-gray-300 mb-4">
                Forestry mulching uses a specialized machine with a rotating drum equipped with steel teeth to grind standing trees, brush, and vegetation into mulch—all in one operation.
              </p>
              <p className="text-gray-300 mb-4">
                Unlike traditional land clearing that requires cutting, stacking, burning, and hauling, forestry mulching does it all at once. The mulcher drives through the vegetation, processes everything in its path, and leaves a layer of organic mulch behind.
              </p>
              <p className="text-gray-300">
                The result? Clean, cleared land in hours instead of days, with no debris piles, burn permits, or dump fees.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 gap-1">
                <div className="relative">
                  <img
                    src="/images/forestry-mulching-before.jpg"
                    alt="Forestry mulching before - Citrus Springs residential project"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 px-3 py-1 rounded text-sm font-medium">
                    Before
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="/images/forestry-mulching-after.jpg"
                    alt="Forestry mulching after - Citrus Springs residential project"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 px-3 py-1 rounded text-sm font-medium">
                    After
                  </div>
                </div>
              </div>
              <div className="p-4 text-center text-sm text-gray-400">
                Citrus Springs Residential Project - Before &amp; After
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Forestry Mulching?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <benefit.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ideal Applications</h2>
              <div className="grid grid-cols-2 gap-4">
                {applications.map((app) => (
                  <div key={app} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="text-gray-300">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Transparent DBH Pricing</h2>
          <p className="text-gray-400 text-center mb-12">
            Price based on your property size and tree diameter. No guessing, no surprises.
          </p>

          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-center mb-6">Select Your Largest Tree Size</h3>

            <div className="grid grid-cols-3 md:grid-cols-7 gap-3 mb-8">
              {packages.map((pkg) => (
                <div key={pkg.dbh} className={`${pkg.popular ? 'bg-blue-600' : 'bg-gray-700'} rounded-lg p-4 text-center`}>
                  <div className="text-2xl font-bold">{pkg.dbh}&quot;</div>
                  <div className="text-xs text-gray-400">{pkg.label}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-4">
                Larger trees = more time = higher cost. It&apos;s that simple.
              </p>
              <a
                href="/estimate"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold"
              >
                Get Your Exact Price →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Free Estimate', desc: 'Tell us about your property. Get same-day pricing.' },
              { step: '2', title: 'Site Visit', desc: 'We assess DBH, density, and access for final quote.' },
              { step: '3', title: 'Schedule', desc: '25% deposit locks in your date. Usually within 2 weeks.' },
              { step: '4', title: 'Transform', desc: 'We mulch. You pay balance. Property transformed.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-gray-800 rounded-xl overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer font-medium list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-4 text-gray-400">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Clear Your Property?</h2>
          <p className="text-blue-100 mb-8">Get a transparent quote with no surprises.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate?service=forestry-mulching"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:3868435266"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 px-8 py-4 rounded-lg font-semibold text-lg"
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
