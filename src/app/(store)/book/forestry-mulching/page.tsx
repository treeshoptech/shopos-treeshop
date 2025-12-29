'use client'

import { useState } from 'react'
import { Trees, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'

const packages = [
  { id: 'small', name: 'Small Lot', description: 'Up to 0.5 acres, brush/saplings (4" DBH)', price: 950, deposit: 238, hours: '~2 hours' },
  { id: 'medium', name: 'Medium Lot', description: '0.5-1 acre, young trees (6" DBH)', price: 1900, deposit: 475, hours: '~4 hours' },
  { id: 'large', name: 'Large Lot', description: '1-2 acres, established trees (8" DBH)', price: 3800, deposit: 950, hours: '~8 hours' },
  { id: 'custom', name: 'Custom Project', description: '2+ acres or 10"+ DBH', price: null, deposit: null, hours: 'Custom quote' },
]

export default function ForestryMulchingBookingPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!selectedPackage || selectedPackage === 'custom') return

    setLoading(true)

    try {
      const pkg = packages.find(p => p.id === selectedPackage)
      if (!pkg || !pkg.deposit) return

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'forestry-mulching',
          package: pkg.name,
          amount: pkg.deposit * 100,
          description: `Forestry Mulching - ${pkg.name} (25% Deposit)`,
        }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-green-600/20 rounded-xl flex items-center justify-center">
            <Trees className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Forestry Mulching</h1>
            <p className="text-gray-400">Clear brush and trees up to 15&quot; DBH</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Select a Package</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`text-left p-6 rounded-xl border-2 transition-all ${
                selectedPackage === pkg.id
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg">{pkg.name}</h3>
                {selectedPackage === pkg.id && (
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                )}
              </div>
              <p className="text-gray-400 text-sm mb-3">{pkg.description}</p>
              <div className="flex items-baseline gap-2">
                {pkg.price ? (
                  <>
                    <span className="text-2xl font-bold text-green-400">${pkg.price}</span>
                    <span className="text-gray-500">total</span>
                  </>
                ) : (
                  <span className="text-gray-400">Get a custom quote</span>
                )}
              </div>
              {pkg.deposit && (
                <div className="text-sm text-gray-500 mt-1">
                  ${pkg.deposit} deposit ({pkg.hours})
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-gray-950 rounded-xl p-6">
          {selectedPackage === 'custom' ? (
            <div className="text-center">
              <p className="text-gray-400 mb-4">Custom projects need a personalized quote.</p>
              <a
                href="/estimate"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold"
              >
                Get Custom Quote <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          ) : selectedPackage ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">25% Deposit to Book</div>
                <div className="text-3xl font-bold text-orange-400">
                  ${packages.find(p => p.id === selectedPackage)?.deposit}
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <>Pay Deposit <ArrowRight className="w-5 h-5" /></>}
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-400">Select a package above to continue</p>
          )}
        </div>
      </div>
    </div>
  )
}
