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
  { dbh: '4"', name: 'Light Brush', range: '$2,240 - $2,800', description: 'Saplings, brush, palmetto' },
  { dbh: '6"', name: 'Medium', range: '$3,080 - $3,920', description: 'Young trees, dense brush', popular: true },
  { dbh: '8"', name: 'Heavy', range: '$4,200 - $4,760', description: 'Mature trees, thick vegetation' },
  { dbh: '10"', name: 'Maximum', range: '$4,760 - $5,320', description: 'Large oaks, complete clearing' },
]

const faqs = [
  { q: 'What size trees can you mulch?', a: 'Our FAE mulcher on the CAT 265 handles trees up to 10" diameter efficiently. Larger trees can be felled first and then processed.' },
  { q: 'What\'s left after mulching?', a: 'A 2-4" layer of wood chips and organic material spread evenly across the cleared area. It breaks down naturally and enriches the soil.' },
  { q: 'How long does it take?', a: 'Most residential lots (1-3 acres) are completed in a single day. Larger properties may take 2-3 days.' },
  { q: 'Do you remove stumps?', a: 'Our mulcher takes stumps down to 2-4" below grade. For deeper grinding, we use our dedicated stump grinder at additional cost.' },
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
            <div className="text-green-400 font-medium mb-2">FORESTRY MULCHING</div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Transform Overgrown Land Into Usable Property
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Our mulcher processes trees, brush, and undergrowth in a single pass—leaving nutrient-rich mulch behind. No burning. No hauling. No mess.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/estimate?service=forestry-mulching"
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
            <div className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center text-gray-500">
              Video/Image: Mulcher in action
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
                <benefit.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
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
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-300">{app}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Equipment</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="font-semibold">CAT 265 Skid Steer</div>
                  <div className="text-gray-400 text-sm">Primary platform for the mulcher head. High-flow hydraulics for maximum cutting power.</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="font-semibold">FAE Mulcher Head</div>
                  <div className="text-gray-400 text-sm">Industrial-grade forestry mulcher. Handles trees up to 10" DBH. Fixed carbide teeth for durability.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Transparent DBH Pricing</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Price per acre based on the largest trees on your property. No guessing, no surprises.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.dbh}
                className={`bg-gray-800 rounded-xl p-6 ${pkg.popular ? 'ring-2 ring-green-500' : ''}`}
              >
                {pkg.popular && (
                  <div className="text-green-400 text-sm font-medium mb-2">MOST COMMON</div>
                )}
                <div className="text-3xl font-bold text-green-400 mb-1">{pkg.dbh}</div>
                <div className="font-semibold mb-2">{pkg.name}</div>
                <div className="text-gray-400 text-sm mb-4">{pkg.description}</div>
                <div className="text-xl font-bold">{pkg.range}</div>
                <div className="text-gray-500 text-sm">per acre</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-8">
            + Equipment transport ($153.35/hr) factored into every quote
          </p>
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
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Clear Your Property?</h2>
          <p className="text-green-100 mb-8">Get a transparent quote with no surprises.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate?service=forestry-mulching"
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
