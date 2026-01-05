import Link from 'next/link'
import { Droplets, CheckCircle, X, Shield, ArrowRight, Phone, AlertTriangle, Home } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

export const metadata = {
  title: 'FreedomDrains - Lifetime No-Clog Drainage | TreeShop',
  description: 'Florida\'s only lifetime-guaranteed drainage solution. Hydroblox technology moves water on flat ground. Never clogs. Serving Volusia, Seminole, Orange, Brevard.',
}

const packages = [
  {
    name: 'Starter',
    footage: '50 LF',
    price: '$1,750 - $2,500',
    description: 'The Spot Fixer',
    features: ['Single problem area', 'Downspout redirect', 'Small puddle elimination'],
    ideal: 'One annoying wet spot or downspout washing out a flowerbed',
  },
  {
    name: 'Standard',
    footage: '100 LF',
    price: '$3,500 - $5,000',
    description: 'The Protector',
    features: ['Foundation perimeter', 'Backyard cutoff drain', 'Multiple problem areas'],
    ideal: 'Worried about foundation integrity or backyard flooding',
    popular: true,
  },
  {
    name: 'Complete',
    footage: '150+ LF',
    price: '$5,250 - $7,500+',
    description: 'The Estate Solution',
    features: ['Septic field protection', 'Pool deck drainage', 'Comprehensive water management'],
    ideal: 'Serious flooding, septic concerns, or large property',
  },
]

const whyFrenchDrainsFail = [
  {
    title: 'Myakka Fine Sand',
    problem: 'Florida\'s fine sand passes through geotextile or blinds the fabric completely',
    result: 'Gravel fills with silt in 3-7 years, becoming a solid "bean bag" mass',
  },
  {
    title: 'Flat Topography',
    problem: 'Pipe drains need 1% slope to flow—hard to achieve in flat Volusia County',
    result: 'Water stagnates, sediment settles, flow capacity decreases to zero',
  },
  {
    title: 'Root Invasion',
    problem: 'Palmettos and Live Oaks aggressively seek moisture in gravel voids',
    result: 'Roots crush pipes and obstruct flow within years',
  },
]

const hydrobloxAdvantages = [
  {
    title: 'Capillary Action',
    description: 'Actively draws water from saturated soil like a sponge—doesn\'t wait for gravity',
  },
  {
    title: 'Works on Flat Ground',
    description: 'Hydrostatic pressure moves water horizontally. Perfect for Florida\'s flat terrain.',
  },
  {
    title: 'Never Clogs',
    description: 'No gravel, no geotextile to blind. Irregular pathways prevent settling.',
  },
  {
    title: '100% Recycled',
    description: 'Recycled thermoplastic. Each install diverts hundreds of pounds from landfills.',
  },
]

export default function DrainagePage() {
  return (
    <>
      <Header />
      <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm">Lifetime No-Clog Guarantee</span>
            </div>

            <h1 className="text-5xl font-bold mb-6">FreedomDrains</h1>
            <p className="text-2xl text-blue-400 mb-4">
              The Last Drainage System You&apos;ll Ever Install
            </p>
            <p className="text-xl text-gray-300 mb-8">
              French drains clog in 3-7 years in Florida soil. We guarantee ours won&apos;t. Ever.
              If it clogs, we fix it free. For life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/estimate?service=drainage"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                What's Your Goal? <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:3868435266"
                className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                <Phone className="w-5 h-5" /> (386) 843-5266
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome Callout */}
      <section className="py-8 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
              <p className="text-green-400 font-medium mb-2">Part of Your Complete Solution</p>
              <p className="text-gray-300 text-sm">
                Drainage is one tool we use to transform your land. Most projects combine
                multiple services into one seamless project. <Link href="/estimate" className="text-green-400 underline">Tell us your goal</Link> and
                we'll recommend exactly what you need.
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <p className="text-gray-400 font-medium mb-2">Equipment Transport & Delivery</p>
              <p className="text-gray-300 text-sm">
                Equipment transport quoted separately based on your location. Typical range: <span className="text-white font-semibold">$375-$750</span>.
                Included in your final quote—no surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why French Drains Fail */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why French Drains Die in Florida</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              That pipe-and-gravel system your landscaper installed? It&apos;s designed to fail in our soil.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {whyFrenchDrainsFail.map((item) => (
              <div key={item.title} className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <X className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-red-400">{item.title}</h3>
                <p className="text-gray-300 mb-3">{item.problem}</p>
                <p className="text-red-300 text-sm">Result: {item.result}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-2xl mb-4">
              "A French drain is a <span className="text-red-400">rental</span>.
              You&apos;re renting a solution for a few years."
            </p>
            <p className="text-xl text-blue-400">
              FreedomDrains is a <span className="font-bold">purchase</span>.
              Pay once, stay dry forever.
            </p>
          </div>
        </div>
      </section>

      {/* Hydroblox Technology */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Hydroblox Difference</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              100% recycled thermoplastic planks that move water through capillary action—not gravity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {hydrobloxAdvantages.map((adv) => (
              <div key={adv.title} className="bg-gray-800 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-bold mb-2">{adv.title}</h3>
                <p className="text-gray-400 text-sm">{adv.description}</p>
              </div>
            ))}
          </div>

          {/* Comparison */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 bg-red-900/20 border-r border-gray-700">
                <h3 className="text-xl font-bold mb-4 text-red-400">French Drains</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">Clogs in 3-7 years</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">Requires slope to work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">Tons of gravel delivered</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">Heavy equipment tears up lawn</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">No real warranty</span>
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-green-900/20">
                <h3 className="text-xl font-bold mb-4 text-green-400">FreedomDrains</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">Lifetime no-clog guarantee</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">Works on flat ground</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">No gravel—lightweight planks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">Surgical 4&quot; trench—minimal damage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300">&quot;If it clogs, we fix it free. Forever.&quot;</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Septic Protection */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-600/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-6">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-300 text-sm">Septic System Protection</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Protect Your $20,000 Septic System
              </h2>
              <p className="text-gray-300 mb-6">
                When stormwater saturates your yard, your septic drain field drowns.
                The result? Slow drains, backups, and raw sewage surfacing in your yard.
              </p>
              <p className="text-gray-300 mb-6">
                A septic replacement costs <span className="text-red-400 font-bold">$15,000 to $30,000</span>.
              </p>
              <p className="text-xl text-blue-400 mb-8">
                FreedomDrains diverts roof runoff and surface water away from your drain field.
                It&apos;s a <span className="font-bold">$3,500 insurance policy</span> for your septic system.
              </p>
              <Link
                href="/estimate?service=drainage&concern=septic"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
              >
                What's Your Goal? <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="font-bold mb-4">High-Risk Areas for Septic Flooding</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-yellow-400" />
                  <span>Ormond-by-the-Sea (coastal sand, high water table)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-yellow-400" />
                  <span>New Smyrna Beach (older neighborhoods)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-yellow-400" />
                  <span>Deltona (rapid development, grade changes)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-yellow-400" />
                  <span>Port Orange (Sugar Forest, Sleepy Hollow areas)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">FreedomDrains Packages</h2>
            <p className="text-gray-400">
              Clear pricing. No surprises. Installed in one day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-xl p-8 ${
                  pkg.popular
                    ? 'bg-blue-900/30 border-2 border-blue-500 relative'
                    : 'bg-gray-800 border border-gray-700'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-sm px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                <p className="text-gray-400 mb-4">{pkg.description}</p>
                <div className="text-3xl font-bold text-blue-400 mb-2">{pkg.price}</div>
                <div className="text-sm text-gray-500 mb-6">{pkg.footage}</div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-400 mb-6">
                  <span className="font-semibold">Ideal for:</span> {pkg.ideal}
                </p>
                <Link
                  href={`/estimate?service=drainage&package=${pkg.name.toLowerCase()}`}
                  className={`block text-center py-3 rounded-lg font-semibold ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8">
            All packages include: Lifetime no-clog guarantee • Same-day install • Minimal lawn disruption
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Free Satellite Analysis', desc: 'We analyze your property from aerial imagery to identify problem areas and discharge points.' },
              { step: '2', title: 'Custom Design', desc: 'We design a FreedomDrains system specific to your property\'s topography and water flow.' },
              { step: '3', title: 'Surgical Install', desc: 'Narrow 4" trench. No gravel trucks. No lawn destruction. Usually done in one day.' },
              { step: '4', title: 'Stay Dry Forever', desc: 'Your yard drains. Your foundation stays safe. Your septic stays protected. Guaranteed.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            The Lifetime No-Clog Guarantee
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            If your FreedomDrains system ever clogs, we fix it free. Forever.
            No other drainage company in Florida can make this promise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate?service=drainage"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              What's Your Goal? <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:3868435266"
              className="inline-flex items-center justify-center gap-2 border-2 border-white hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              <Phone className="w-5 h-5" /> (386) 843-5266
            </a>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
}
