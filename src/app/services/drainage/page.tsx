import Link from 'next/link'
import { CheckCircle, X, ArrowRight, Phone, Droplets, AlertTriangle, ShieldCheck } from 'lucide-react'

const problems = [
  'Standing water after rain',
  'Soggy lawn that won\'t dry',
  'Water pooling near foundation',
  'Mosquito breeding grounds',
  'Landscape erosion',
  'Basement/crawlspace moisture',
]

const comparison = [
  { feature: 'Clog potential', french: 'High - fabric clogs in 5-10 years', freedom: 'None - no fabric or pipe to clog' },
  { feature: 'Lifespan', french: '5-10 years typical', freedom: 'Lifetime (50+ years)' },
  { feature: 'Maintenance', french: 'Regular cleaning/replacement', freedom: 'Zero maintenance' },
  { feature: 'Florida soil performance', french: 'Poor - fine sand infiltrates', freedom: 'Excellent - designed for sandy soil' },
  { feature: 'Warranty', french: '1-2 years typical', freedom: 'Lifetime no-clog guarantee' },
]

const packages = [
  { name: 'Spot Drainage', lf: '20-50 LF', price: '$1,500 - $2,000', description: 'Single problem area' },
  { name: 'Yard Drainage', lf: '50-100 LF', price: '$2,000 - $3,500', description: 'Multiple areas or full yard' },
  { name: 'Complete System', lf: '100-200 LF', price: '$3,500 - $6,000', description: 'Whole property drainage' },
]

export const metadata = {
  title: 'FreedomDrains | Drainage Solutions - TreeShop',
  description: 'Lifetime no-clog drainage with HydroBlox technology. Solves standing water problems French drains can\'t. From $1,500 in Central Florida.',
}

export default function DrainagePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-400 font-medium mb-2">
              <Droplets className="w-5 h-5" />
              FREEDOMDRAINS
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Drainage That Actually Works—Forever
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              HydroBlox technology solves the problems French drains can&apos;t. No fabric to clog. No pipe to fail. Lifetime no-clog guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/estimate?service=drainage"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                Get Drainage Assessment
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

      {/* Problem */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Sound Familiar?</h2>
              <div className="space-y-4">
                {problems.map((problem) => (
                  <div key={problem} className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span className="text-gray-300">{problem}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 mt-6">
                If you&apos;ve tried French drains and they failed—or you&apos;re researching before you waste money on them—keep reading.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <AlertTriangle className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-red-400">Why French Drains Fail in Florida</h3>
              <p className="text-gray-300 mb-4">
                Traditional French drains use perforated pipe wrapped in landscape fabric. In theory, water flows through the fabric into the pipe.
              </p>
              <p className="text-gray-300 mb-4">
                In Florida&apos;s sandy soil, fine particles infiltrate the fabric within 5-10 years. The drain clogs. Water backs up. You&apos;re back to square one—except now you&apos;ve buried a failed system.
              </p>
              <p className="text-gray-400 text-sm">
                We see this constantly. Homeowners spend $3,000-5,000 on French drains, only to call us when they fail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <ShieldCheck className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">The FreedomDrains Solution</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              HydroBlox panels are solid aggregate blocks—no pipe, no fabric, nothing to clog. Water flows through the aggregate itself.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">0</div>
              <div className="text-gray-300">Clogs ever</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-300">Year lifespan</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">∞</div>
              <div className="text-gray-300">Maintenance required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FreedomDrains vs French Drains</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4 text-gray-400">Feature</th>
                  <th className="text-center py-4 px-4 text-red-400">French Drain</th>
                  <th className="text-center py-4 px-4 text-blue-400">FreedomDrains</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-800">
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-gray-400">
                      <X className="w-5 h-5 text-red-500 inline mr-2" />
                      {row.french}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircle className="w-5 h-5 text-blue-500 inline mr-2" />
                      {row.freedom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Pricing Packages</h2>
          <p className="text-gray-400 text-center mb-12">Final price based on site assessment</p>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.name} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <div className="text-gray-400 text-sm mb-4">{pkg.lf}</div>
                <div className="text-3xl font-bold text-blue-400 mb-2">{pkg.price}</div>
                <p className="text-gray-400 text-sm">{pkg.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            Includes HydroBlox panels, installation, and lifetime no-clog guarantee
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stop Living With Standing Water</h2>
          <p className="text-blue-100 mb-8">Get a free drainage assessment. We&apos;ll show you exactly what&apos;s causing the problem.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate?service=drainage"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              Get Free Assessment
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
