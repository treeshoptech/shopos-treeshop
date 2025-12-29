'use client'

import { useState } from 'react'
import { CloudRain, Droplets } from 'lucide-react'

export default function RainwaterCalculatorPage() {
  const [roofSqFt, setRoofSqFt] = useState('')
  const [rainfall, setRainfall] = useState('1') // inches

  // Calculate gallons: 1 inch of rain on 1 sq ft = 0.623 gallons
  const gallons = roofSqFt ? Math.round(parseFloat(roofSqFt) * parseFloat(rainfall) * 0.623) : 0

  // Fun comparisons
  const bathtubs = Math.round(gallons / 40)
  const swimmingPools = (gallons / 20000).toFixed(2)

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-2">
          <CloudRain className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Stormwater Runoff Calculator</h1>
        </div>
        <p className="text-gray-400 mb-8">
          See how much water your roof sheds during a storm. Where does it all go?
        </p>

        <div className="bg-gray-800 rounded-xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Roof area (sq ft)</label>
            <input
              type="number"
              value={roofSqFt}
              onChange={(e) => setRoofSqFt(e.target.value)}
              placeholder="e.g., 2000"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
            />
            <p className="text-gray-500 text-sm mt-1">
              Average Florida home: 1,500-2,500 sq ft
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rainfall amount (inches)</label>
            <input
              type="number"
              step="0.1"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
            />
            <p className="text-gray-500 text-sm mt-1">
              Typical Florida afternoon storm: 1-2 inches
            </p>
          </div>

          {gallons > 0 && (
            <div className="bg-blue-900/30 border border-blue-600/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-10 h-10 text-blue-400" />
                <div>
                  <div className="text-sm text-blue-400">Your roof sheds</div>
                  <div className="text-4xl font-bold">{gallons.toLocaleString()} gallons</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400">{bathtubs}</div>
                  <div className="text-sm text-gray-400">bathtubs full</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400">{swimmingPools}</div>
                  <div className="text-sm text-gray-400">swimming pools</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">Where does all this water go?</h3>
                <p className="text-gray-400 text-sm">
                  If your gutters and drainage aren&apos;t designed to handle this volume,
                  it pools around your foundation, saturates your lawn, and creates
                  the standing water problems you might be dealing with.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h3 className="font-semibold mb-3">Having drainage issues?</h3>
          <p className="text-gray-400 mb-4">
            FreedomDrains with HydroBlox technology handles any volume without clogging.
          </p>
          <a
            href="/tools/drainage-calculator"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            Calculate Your Drainage Cost
          </a>
        </div>
      </div>
    </div>
  )
}
