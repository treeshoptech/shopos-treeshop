'use client'

import { useState } from 'react'
import { Clock, AlertTriangle, Check, Lock } from 'lucide-react'

const symptoms = [
  { id: 'slow-drain', label: 'Water drains slower than before' },
  { id: 'standing-water', label: 'Standing water returns after rain' },
  { id: 'soggy-lawn', label: 'Lawn stays soggy near drain line' },
  { id: 'visible-settle', label: 'Ground has settled over drain' },
  { id: 'roots-near', label: 'Tree roots are near the drain' },
  { id: 'odor', label: 'Musty odor near drain area' },
]

interface Result {
  remainingYears: number
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  recommendation: string
}

export default function FrenchDrainLifespanPage() {
  const [age, setAge] = useState('')
  const [soilType, setSoilType] = useState<'sandy' | 'clay' | 'loam'>('sandy')
  const [fabricUsed, setFabricUsed] = useState<'yes' | 'no' | 'unknown'>('unknown')
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])

  const [result, setResult] = useState<Result | null>(null)
  const [showGate, setShowGate] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const calculate = () => {
    const drainAge = parseInt(age) || 0

    // Base lifespan by soil type (Florida-specific)
    let baseLifespan = soilType === 'sandy' ? 7 : soilType === 'clay' ? 12 : 10

    // Fabric reduces lifespan in Florida
    if (fabricUsed === 'yes') baseLifespan -= 2

    // Each symptom reduces remaining life
    const symptomPenalty = selectedSymptoms.length * 1.5

    // Calculate remaining
    let remaining = Math.max(0, baseLifespan - drainAge - symptomPenalty)

    // Determine risk level
    let riskLevel: Result['riskLevel']
    let recommendation: string

    if (remaining <= 0 || selectedSymptoms.length >= 4) {
      riskLevel = 'critical'
      remaining = 0
      recommendation = 'Your drain has likely failed. Schedule a FreedomDrains assessment immediately.'
    } else if (remaining <= 2 || selectedSymptoms.length >= 2) {
      riskLevel = 'high'
      recommendation = 'Failure is imminent. Plan replacement before rainy season.'
    } else if (remaining <= 4) {
      riskLevel = 'moderate'
      recommendation = 'Monitor closely. Consider FreedomDrains upgrade to prevent future issues.'
    } else {
      riskLevel = 'low'
      recommendation = 'Your drain is likely still functional, but all French drains eventually fail.'
    }

    setResult({ remainingYears: remaining, riskLevel, recommendation })
    setShowGate(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        service: 'drainage',
        propertyDetails: { age, soilType, fabricUsed, symptoms: selectedSymptoms },
        source: 'french-drain-lifespan',
        notes: `Risk: ${result?.riskLevel}, Remaining: ${result?.remainingYears} years`,
      }),
    })

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'FailurePredictor', { risk: result?.riskLevel })
    }

    setSubmitted(true)
  }

  const riskColors = {
    low: 'text-green-400 bg-green-900/30 border-green-600/50',
    moderate: 'text-blue-400 bg-blue-900/30 border-blue-600/50',
    high: 'text-red-300 bg-red-900/30 border-red-600/50',
    critical: 'text-red-400 bg-red-900/30 border-red-600/50',
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">French Drain Failure Predictor</h1>
        </div>
        <p className="text-gray-400 mb-8">
          How much life is left in your French drain? Answer a few questions to find out.
        </p>

        {!result && (
          <div className="bg-gray-800 rounded-xl p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">How old is your French drain?</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Years"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What&apos;s your soil type?</label>
              <div className="grid grid-cols-3 gap-3">
                {(['sandy', 'clay', 'loam'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSoilType(s)}
                    className={`p-3 rounded-lg capitalize ${
                      soilType === s ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-1">Most of Florida has sandy soil</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Was landscape fabric used?</label>
              <div className="grid grid-cols-3 gap-3">
                {(['yes', 'no', 'unknown'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFabricUsed(f)}
                    className={`p-3 rounded-lg capitalize ${
                      fabricUsed === f ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
                  >
                    {f === 'unknown' ? "Don't know" : f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Current symptoms (select all that apply)</label>
              <div className="space-y-2">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`w-full p-3 rounded-lg text-left flex items-center gap-3 ${
                      selectedSymptoms.includes(symptom.id) ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedSymptoms.includes(symptom.id) ? 'bg-white border-white' : 'border-gray-500'
                    }`}>
                      {selectedSymptoms.includes(symptom.id) && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    {symptom.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculate}
              disabled={!age}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-4 rounded-lg font-semibold text-lg"
            >
              Check My Drain
            </button>
          </div>
        )}

        {result && !submitted && (
          <div className="space-y-6">
            <div className={`rounded-xl p-8 border ${riskColors[result.riskLevel]}`}>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8" />
                <div>
                  <div className="text-sm uppercase tracking-wide">Risk Level</div>
                  <div className="text-3xl font-bold capitalize">{result.riskLevel}</div>
                </div>
              </div>

              <div className="text-5xl font-bold mb-2">
                {result.remainingYears} {result.remainingYears === 1 ? 'year' : 'years'}
              </div>
              <div className="text-lg opacity-80">estimated remaining life</div>

              <p className="mt-4 text-lg">{result.recommendation}</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold">Get Your Drain Report Card</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  Send My Report Card
                </button>
              </form>
            </div>
          </div>
        )}

        {submitted && (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Report Card Sent!</h2>
            <p className="text-gray-400 mb-6">
              Ready to upgrade to a drain that never clogs?
            </p>
            <a
              href="/services/drainage"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold"
            >
              Learn About FreedomDrains
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
