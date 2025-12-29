'use client'

import { useState } from 'react'
import { Droplets, ArrowRight, Lock, Check, X } from 'lucide-react'
import { formatCurrency } from '@/lib/pricing'

interface CalculationResult {
  linearFeet: number
  freedomDrainsLow: number
  freedomDrainsHigh: number
  frenchDrainLow: number
  frenchDrainHigh: number
  lifetimeSavings: number
}

export default function DrainageCalculatorPage() {
  const [propertySize, setPropertySize] = useState('')
  const [problemAreas, setProblemAreas] = useState('')
  const [distanceToOutlet, setDistanceToOutlet] = useState('')
  const [severity, setSeverity] = useState<'light' | 'moderate' | 'severe'>('moderate')

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [showGate, setShowGate] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const calculate = () => {
    if (!propertySize || !problemAreas) return

    // Estimate linear feet based on inputs
    const areas = parseInt(problemAreas)
    const outlet = parseInt(distanceToOutlet) || 30
    const severityMultiplier = severity === 'light' ? 0.7 : severity === 'severe' ? 1.3 : 1

    // Base: 30-50 LF per problem area + run to outlet
    const baseLF = (areas * 40) + outlet
    const estimatedLF = Math.round(baseLF * severityMultiplier)

    // FreedomDrains: $30-60/LF
    const freedomDrainsLow = estimatedLF * 30
    const freedomDrainsHigh = estimatedLF * 60

    // French drain: $20-35/LF initially, but fails in 5-10 years
    const frenchDrainLow = estimatedLF * 20
    const frenchDrainHigh = estimatedLF * 35

    // Lifetime savings: French drain x2 replacements vs FreedomDrains once
    const frenchDrainLifetime = frenchDrainHigh * 2.5 // 2-3 installs over 25 years
    const lifetimeSavings = frenchDrainLifetime - freedomDrainsHigh

    setResult({
      linearFeet: estimatedLF,
      freedomDrainsLow,
      freedomDrainsHigh,
      frenchDrainLow,
      frenchDrainHigh,
      lifetimeSavings: Math.max(0, lifetimeSavings),
    })
    setShowGate(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Save lead
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        service: 'drainage',
        propertyDetails: { propertySize, problemAreas, distanceToOutlet, severity },
        estimateTotal: result?.freedomDrainsHigh,
        source: 'drainage-calculator',
      }),
    })

    // Fire Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'drainage-calculator',
        value: result?.freedomDrainsHigh || 0,
        currency: 'USD',
      })
    }

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-2">
          <Droplets className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Drainage Cost Calculator</h1>
        </div>
        <p className="text-gray-400 mb-8">
          Compare FreedomDrains vs French drain costs for your property.
        </p>

        {!result && (
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Property size (sq ft)</label>
                <input
                  type="number"
                  value={propertySize}
                  onChange={(e) => setPropertySize(e.target.value)}
                  placeholder="e.g., 10000"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Number of problem areas</label>
                <input
                  type="number"
                  value={problemAreas}
                  onChange={(e) => setProblemAreas(e.target.value)}
                  placeholder="e.g., 2"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
                />
                <p className="text-gray-500 text-sm mt-1">Places where water pools or drains slowly</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Distance to drainage outlet (feet)</label>
                <input
                  type="number"
                  value={distanceToOutlet}
                  onChange={(e) => setDistanceToOutlet(e.target.value)}
                  placeholder="e.g., 50"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
                />
                <p className="text-gray-500 text-sm mt-1">Street, ditch, or low point where water can exit</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Problem severity</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['light', 'moderate', 'severe'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeverity(s)}
                      className={`p-3 rounded-lg capitalize ${
                        severity === s ? 'bg-blue-600' : 'bg-gray-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={calculate}
                disabled={!propertySize || !problemAreas}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
              >
                Calculate Costs <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {result && !submitted && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-8">
              <h2 className="text-xl font-semibold mb-6">Your Estimate: ~{result.linearFeet} Linear Feet</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* FreedomDrains */}
                <div className="bg-blue-900/30 border border-blue-600/50 rounded-xl p-6">
                  <div className="font-semibold text-blue-400 mb-2">FreedomDrains</div>
                  <div className="text-3xl font-bold mb-2">
                    {formatCurrency(result.freedomDrainsLow)} - {formatCurrency(result.freedomDrainsHigh)}
                  </div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Lifetime no-clog guarantee</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Zero maintenance</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> HydroBlox technology</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> One-time install</li>
                  </ul>
                </div>

                {/* French Drain */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <div className="font-semibold text-gray-400 mb-2">Traditional French Drain</div>
                  <div className="text-3xl font-bold mb-2 text-gray-400">
                    {formatCurrency(result.frenchDrainLow)} - {formatCurrency(result.frenchDrainHigh)}
                  </div>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Clogs in 5-10 years</li>
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Needs replacement</li>
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Fabric traps sediment</li>
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Ongoing costs</li>
                  </ul>
                </div>
              </div>

              {result.lifetimeSavings > 0 && (
                <div className="mt-6 bg-green-900/30 border border-green-600/50 rounded-lg p-4 text-center">
                  <div className="text-sm text-green-400">25-Year Savings with FreedomDrains</div>
                  <div className="text-2xl font-bold text-green-400">{formatCurrency(result.lifetimeSavings)}</div>
                  <div className="text-xs text-gray-400">vs. replacing French drains 2-3 times</div>
                </div>
              )}
            </div>

            {showGate && (
              <div className="bg-gray-800 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold">Get Your Full Report</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Enter your email to receive a detailed PDF comparison and schedule a free site assessment.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-semibold"
                  >
                    Send My Report
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {submitted && (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Report Sent!</h2>
            <p className="text-gray-400 mb-6">Check your email for the detailed comparison.</p>
            <a
              href="tel:3868435266"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold"
            >
              Call for Free Assessment: (386) 843-5266
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
