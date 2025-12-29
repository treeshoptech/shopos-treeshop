'use client'

import { useState } from 'react'
import { CircleDot, Plus, Trash2, Calculator } from 'lucide-react'
import { calculateEstimate, formatCurrency, formatHours, type StumpInput } from '@/lib/pricing'

export default function StumpCostCalculatorPage() {
  const [stumps, setStumps] = useState<StumpInput[]>([
    { dbh: 0, heightAbove: 6, depthBelow: 6 }
  ])

  const addStump = () => {
    setStumps([...stumps, { dbh: 0, heightAbove: 6, depthBelow: 6 }])
  }

  const removeStump = (index: number) => {
    if (stumps.length > 1) {
      setStumps(stumps.filter((_, i) => i !== index))
    }
  }

  const updateStump = (index: number, field: keyof StumpInput, value: number) => {
    const updated = [...stumps]
    updated[index] = { ...updated[index], [field]: value }
    setStumps(updated)
  }

  const validStumps = stumps.filter(s => s.dbh > 0)

  const estimate = validStumps.length > 0 ? calculateEstimate({
    service: 'stump-grinding',
    stumps: validStumps,
  }) : null

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-2">
          <CircleDot className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Stump Cost Calculator</h1>
        </div>
        <p className="text-gray-400 mb-2">
          Calculate your stump grinding cost using TreeShop&apos;s StumpScore formula.
        </p>
        <div className="text-sm text-gray-500 mb-8 font-mono">
          StumpScore = DBH² × (Height + Depth) ÷ 8,000 PPH × $400/hr
        </div>

        <div className="bg-gray-800 rounded-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Stumps</h2>
            <button
              onClick={addStump}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              <Plus className="w-5 h-5" /> Add Stump
            </button>
          </div>

          <div className="space-y-4">
            {stumps.map((stump, i) => (
              <div key={i} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-400">Stump #{i + 1}</span>
                  {stumps.length > 1 && (
                    <button
                      onClick={() => removeStump(i)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">DBH (inches)</label>
                    <input
                      type="number"
                      value={stump.dbh || ''}
                      onChange={(e) => updateStump(i, 'dbh', parseInt(e.target.value) || 0)}
                      placeholder="24"
                      className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Above grade (in)</label>
                    <input
                      type="number"
                      value={stump.heightAbove}
                      onChange={(e) => updateStump(i, 'heightAbove', parseInt(e.target.value) || 0)}
                      className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Grind depth (in)</label>
                    <select
                      value={stump.depthBelow}
                      onChange={(e) => updateStump(i, 'depthBelow', parseInt(e.target.value))}
                      className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                    >
                      <option value={6}>6&quot; (standard)</option>
                      <option value={12}>12&quot; (deep)</option>
                      <option value={18}>18&quot; (extra)</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {estimate && (
            <div className="mt-8 bg-blue-900/30 border border-blue-600/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-sm text-blue-400">Total Estimate</div>
                  <div className="text-4xl font-bold text-blue-400">
                    {formatCurrency(estimate.total)}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-2">
                {estimate.lineItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.description}</span>
                    <span>{formatCurrency(item.amount)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Transport (round-trip)</span>
                  <span>{formatCurrency(estimate.transport)}</span>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-400">
                Production time: {formatHours(estimate.productionHours)}
              </div>
            </div>
          )}

          {estimate && (
            <div className="mt-6 text-center">
              <a
                href={`/estimate?service=stump-grinding`}
                className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold"
              >
                Get Official Quote
              </a>
            </div>
          )}
        </div>

        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h3 className="font-semibold mb-3">How StumpScore Works</h3>
          <div className="text-gray-400 text-sm space-y-2">
            <p><strong>DBH²</strong> = Diameter affects difficulty exponentially (24&quot; is 4× harder than 12&quot;)</p>
            <p><strong>Height + Depth</strong> = Total material to grind (stump above + below grade)</p>
            <p><strong>÷ 8,000</strong> = Points Per Hour for our Fecon Blackhawk</p>
            <p><strong>× $400/hr</strong> = Billing rate (50% margin target)</p>
          </div>
          <div className="mt-4 p-3 bg-gray-700 rounded-lg text-sm">
            <strong>Example:</strong> 24&quot; DBH, 6&quot; above, 12&quot; deep<br/>
            = 576 × 18 = 10,368 ÷ 8,000 = 1.3 hrs × $400 = <strong>$520</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
