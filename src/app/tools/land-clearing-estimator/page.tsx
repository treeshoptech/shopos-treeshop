'use client'

import { useState } from 'react'
import { Trees, Lock, Check, ArrowRight } from 'lucide-react'
import {
  calculateEstimate,
  formatCurrency,
  formatHours,
  DBH_PACKAGES,
  type DBHPackage
} from '@/lib/pricing'

export default function LandClearingEstimatorPage() {
  const [acres, setAcres] = useState('')
  const [dbhPackage, setDbhPackage] = useState<DBHPackage | null>(null)

  const [showGate, setShowGate] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const estimate = acres && dbhPackage ? calculateEstimate({
    service: 'forestry-mulching',
    acres: parseFloat(acres),
    dbhPackage,
  }) : null

  const handleCalculate = () => {
    if (estimate) setShowGate(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        service: 'forestry-mulching',
        propertyDetails: { acres: parseFloat(acres), dbhPackage },
        estimateTotal: estimate?.total,
        productionHours: estimate?.productionHours,
        methodology: estimate?.methodology,
        source: 'land-clearing-estimator',
      }),
    })

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'land-clearing-estimator',
        value: estimate?.total || 0,
        currency: 'USD',
      })
    }

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-2">
          <Trees className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Land Clearing Estimator</h1>
        </div>
        <p className="text-gray-400 mb-8">
          Instant pricing using TreeShop&apos;s MulchingScore formula.
        </p>

        {!showGate && (
          <div className="bg-gray-800 rounded-xl p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Acres to clear</label>
              <input
                type="number"
                step="0.1"
                value={acres}
                onChange={(e) => setAcres(e.target.value)}
                placeholder="e.g., 2.5"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Largest tree diameter (DBH Package)</label>
              <div className="grid grid-cols-4 gap-2">
                {(Object.entries(DBH_PACKAGES) as [string, { range: string }][]).map(([pkg, info]) => (
                  <button
                    key={pkg}
                    onClick={() => setDbhPackage(parseInt(pkg) as DBHPackage)}
                    className={`p-3 rounded-lg text-center ${
                      dbhPackage === parseInt(pkg) ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-650'
                    }`}
                  >
                    <div className="text-xl font-bold">{pkg}&quot;</div>
                    <div className="text-xs text-gray-400">{info.range}</div>
                  </button>
                ))}
              </div>
            </div>

            {estimate && (
              <div className="bg-blue-900/30 border border-blue-600/50 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-sm text-blue-400">Estimated Cost</div>
                  <div className="text-4xl font-bold text-blue-400">
                    {formatCurrency(estimate.total)}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {formatHours(estimate.productionHours)} production + transport
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-mono text-center">
                  {estimate.methodology}
                </div>
              </div>
            )}

            <button
              onClick={handleCalculate}
              disabled={!estimate}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
            >
              Get Detailed Breakdown <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {showGate && !submitted && (
          <div className="space-y-6">
            <div className="bg-blue-900/30 border border-blue-600/50 rounded-xl p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {formatCurrency(estimate!.total)}
                </div>
                <div className="text-gray-300">
                  {acres} acres × {dbhPackage}&quot; DBH = {formatHours(estimate!.productionHours)} @ $475/hr
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold">Get Your Full Quote</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Receive a detailed breakdown with line items, transport costs, and timeline estimate.
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
                  Send My Quote
                </button>
              </form>
            </div>
          </div>
        )}

        {submitted && (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Quote Sent!</h2>
            <p className="text-gray-400 mb-6">We&apos;ll contact you within 2 hours during business hours.</p>
            <a
              href="tel:3868435266"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold"
            >
              Call Now: (386) 843-5266
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
