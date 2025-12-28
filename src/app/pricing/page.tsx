import Link from 'next/link'
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react'

const packages = [
  {
    dbh: '4"',
    name: 'Light Brush',
    priceRange: '$2,240 - $2,800',
    perAcre: true,
    description: 'Saplings, brush, and light vegetation',
    includes: ['Trees up to 4" diameter', 'Light brush clearing', 'Ground cover mulching'],
  },
  {
    dbh: '6"',
    name: 'Medium Clearing',
    priceRange: '$3,080 - $3,920',
    perAcre: true,
    description: 'Young trees and moderate vegetation',
    includes: ['Trees up to 6" diameter', 'Medium density vegetation', 'Stump grinding included'],
    popular: true,
  },
  {
    dbh: '8"',
    name: 'Heavy Clearing',
    priceRange: '$4,200 - $4,760',
    perAcre: true,
    description: 'Mature trees and dense vegetation',
    includes: ['Trees up to 8" diameter', 'Heavy brush and undergrowth', 'Full site mulching'],
  },
  {
    dbh: '10"',
    name: 'Maximum Clearing',
    priceRange: '$4,760 - $5,320',
    perAcre: true,
    description: 'Large trees and complete lot clearing',
    includes: ['Trees up to 10" diameter', 'Complete lot transformation', 'Debris hauling if needed'],
  },
]

const factors = [
  { title: 'Tree Size (DBH)', description: 'Larger diameter = more time to process' },
  { title: 'Vegetation Density', description: 'How tightly packed the trees and brush are' },
  { title: 'Access', description: 'Can our equipment reach the work area easily?' },
  { title: 'Terrain', description: 'Flat vs. sloped, wet vs. dry conditions' },
  { title: 'Distance', description: 'Transport time from our base in Port Orange' },
  { title: 'Obstacles', description: 'Fences, structures, utilities to work around' },
]

const faqs = [
  {
    q: 'What is DBH?',
    a: 'DBH stands for "Diameter at Breast Height" — the standard forestry measurement taken 4.5 feet from the ground. We use it to categorize the largest trees on your property.',
  },
  {
    q: 'Why price by DBH instead of acreage alone?',
    a: 'An acre of 4" saplings is completely different from an acre of 10" oaks. DBH-based pricing reflects the actual work required, not just square footage.',
  },
  {
    q: 'What if my property has mixed tree sizes?',
    a: 'We price based on the largest trees that need clearing. If you have mostly 6" trees with a few 10" oaks, we\'ll quote at the 10" rate for those areas.',
  },
  {
    q: 'Is the quote guaranteed?',
    a: 'Yes. Once we assess the property and provide a written quote, that\'s the price. No surprise charges, no "we found more than expected" upsells.',
  },
]

export const metadata = {
  title: 'Pricing | TreeShop Land Clearing & Forestry Mulching',
  description: 'Transparent DBH-based pricing for forestry mulching and land clearing in Central Florida. See our packages and get an instant estimate.',
}

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Transparent Pricing</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            No guessing. No surprises. Our DBH package system gives you exact pricing based on the actual work required.
          </p>
        </div>
      </section>

      {/* DBH Explanation */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-800 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">What is DBH Pricing?</h2>
              <p className="text-gray-300">
                DBH (Diameter at Breast Height) is how we measure trees. Instead of vague &quot;per acre&quot; quotes
                that ignore what&apos;s actually on your land, we price based on the largest trees needing removal.
                A property full of 4&quot; saplings costs less than one with 10&quot; oaks — because it takes less work.
              </p>
            </div>
            <div className="w-48 h-48 bg-gray-700 rounded-xl flex items-center justify-center text-gray-500">
              DBH Diagram
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Forestry Mulching Packages</h2>
          <p className="text-gray-400 text-center mb-12">Pricing per acre based on maximum tree diameter</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.dbh}
                className={`bg-gray-800 rounded-xl p-6 relative ${pkg.popular ? 'ring-2 ring-green-500' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-sm px-3 py-1 rounded-full font-medium">
                    Most Common
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-400 mb-1">{pkg.dbh}</div>
                  <div className="text-lg font-semibold">{pkg.name}</div>
                  <div className="text-gray-400 text-sm">{pkg.description}</div>
                </div>
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold">{pkg.priceRange}</div>
                  <div className="text-gray-400 text-sm">per acre</div>
                </div>
                <ul className="space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Stump Grinding</h3>
              <div className="text-2xl font-bold text-green-400 mb-4">$150 - $500+</div>
              <p className="text-gray-400 text-sm">Per stump, based on diameter and access. Volume discounts available.</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">FreedomDrains</h3>
              <div className="text-2xl font-bold text-green-400 mb-4">$1,500 - $6,000</div>
              <p className="text-gray-400 text-sm">HydroBlox drainage systems with lifetime no-clog guarantee.</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Transport</h3>
              <div className="text-2xl font-bold text-green-400 mb-4">$153.35/hr</div>
              <p className="text-gray-400 text-sm">Equipment mobilization. Factored into all quotes based on distance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Factors */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What Affects Your Price?</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Beyond DBH, these factors determine your final quote:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {factors.map((factor) => (
              <div key={factor.title} className="bg-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-2">{factor.title}</h3>
                <p className="text-gray-400 text-sm">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing FAQ</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-gray-400">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Exact Price</h2>
          <p className="text-green-100 mb-8">Tell us about your property. We&apos;ll calculate a quote you can count on.</p>
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg"
          >
            Get Your Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
