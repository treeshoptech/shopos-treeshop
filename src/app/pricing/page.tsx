import Link from 'next/link'
import { CheckCircle, ArrowRight, Shield } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

const services = [
  {
    service: 'Forestry Mulching',
    description: 'Clear brush and trees up to 15" diameter',
    typical: '1-8 hours depending on acreage and tree size',
  },
  {
    service: 'Land Clearing',
    description: 'Complete lot preparation for construction',
    typical: 'Custom quote based on property assessment',
  },
  {
    service: 'Stump Grinding',
    description: 'Remove stumps below grade',
    typical: 'Priced per stump based on diameter',
  },
  {
    service: 'FreedomDrains',
    description: 'HydroBlox drainage with lifetime guarantee',
    typical: '$30-60 per linear foot',
  },
]

export const metadata = {
  title: 'Transparent Pricing | TreeShop',
  description: 'Fair, consistent pricing for forestry mulching, land clearing, and stump grinding in Central Florida.',
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Transparent Pricing</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Every quote is calculated from measured inputs. No guessing, no hidden fees.
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl font-bold">How We Price</h2>
            </div>
            <p className="text-gray-300 mb-4">
              We use a systematic approach based on 10 years of production data. Every quote considers:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• Property acreage</li>
              <li>• Tree diameter and density</li>
              <li>• Site access and terrain</li>
              <li>• Distance from our base</li>
            </ul>
            <p className="text-gray-400 mt-4">
              The result? Consistent, fair pricing that reflects the actual work required.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s) => (
              <div key={s.service} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">{s.service}</h3>
                <p className="text-gray-300 mb-4">{s.description}</p>
                <div className="text-gray-400 text-sm">
                  <strong>Typical project:</strong> {s.typical}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">The Price We Quote Is the Price You Pay</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            No surprise fees. No "we found more than expected" upsells. Your written quote is guaranteed.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">$1,800</div>
              <div className="text-gray-400 text-sm">Minimum project size</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">25%</div>
              <div className="text-gray-400 text-sm">Deposit to book</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
              <div className="text-gray-400 text-sm">Hidden fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">See Your Quote Calculated</h2>
          <p className="text-blue-100 mb-8">Enter your property details. Watch the math work.</p>
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg"
          >
            Get Your Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
      <Footer />
    </>
  )
}
