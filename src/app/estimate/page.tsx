'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Loader2, Info, Calculator } from 'lucide-react'
import {
  calculateEstimate,
  formatCurrency,
  formatHours,
  DBH_PACKAGES,
  BILLING_RATES,
  PPH_RATES,
  COMMON_PROJECT_FACTORS,
  type DBHPackage,
  type ServiceType,
  type PricingInput,
  type ProjectFactor,
  type StumpInput,
} from '@/lib/pricing'

type Step = 'service' | 'details' | 'factors' | 'contact' | 'results'

const services = [
  { id: 'forestry-mulching' as ServiceType, name: 'Forestry Mulching', description: 'Clear brush and trees up to 15" DBH, leave mulch behind', rate: `$${BILLING_RATES['forestry-mulching']}/hr` },
  { id: 'land-clearing' as ServiceType, name: 'Land Clearing', description: 'Complete lot clearing for construction', rate: `$${BILLING_RATES['land-clearing']}/hr` },
  { id: 'stump-grinding' as ServiceType, name: 'Stump Grinding', description: 'Remove stumps below grade', rate: `$${BILLING_RATES['stump-grinding']}/hr` },
  { id: 'drainage' as ServiceType, name: 'FreedomDrains', description: 'HydroBlox drainage with lifetime no-clog guarantee', rate: '$30-60/LF' },
]

export default function EstimatePage() {
  const [step, setStep] = useState<Step>('service')
  const [submitting, setSubmitting] = useState(false)
  const [leadId, setLeadId] = useState<string | null>(null)

  // Service selection
  const [service, setService] = useState<ServiceType | ''>('')

  // Forestry Mulching inputs
  const [acres, setAcres] = useState('')
  const [dbhPackage, setDbhPackage] = useState<DBHPackage | null>(null)

  // Land Clearing inputs
  const [avgDBH, setAvgDBH] = useState('')
  const [avgHeight, setAvgHeight] = useState('')

  // Stump Grinding inputs
  const [stumps, setStumps] = useState<StumpInput[]>([{ dbh: 0, heightAbove: 6, depthBelow: 6 }])

  // Drainage inputs
  const [linearFeet, setLinearFeet] = useState('')

  // Project Factors
  const [selectedFactors, setSelectedFactors] = useState<ProjectFactor[]>([])

  // Contact info
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  // Calculate estimate in real-time
  const estimate = useMemo(() => {
    if (!service) return null

    let input: PricingInput

    if (service === 'forestry-mulching' && acres && dbhPackage) {
      input = {
        service: 'forestry-mulching',
        acres: parseFloat(acres),
        dbhPackage,
        projectFactors: selectedFactors,
      }
    } else if (service === 'land-clearing' && acres && avgDBH && avgHeight) {
      input = {
        service: 'land-clearing',
        acres: parseFloat(acres),
        avgDBH: parseFloat(avgDBH),
        avgHeight: parseFloat(avgHeight),
        projectFactors: selectedFactors,
      }
    } else if (service === 'stump-grinding' && stumps.some(s => s.dbh > 0)) {
      input = {
        service: 'stump-grinding',
        stumps: stumps.filter(s => s.dbh > 0),
        projectFactors: selectedFactors,
      }
    } else if (service === 'drainage' && linearFeet) {
      input = {
        service: 'drainage',
        linearFeet: parseFloat(linearFeet),
        projectFactors: selectedFactors,
      }
    } else {
      return null
    }

    return calculateEstimate(input)
  }, [service, acres, dbhPackage, avgDBH, avgHeight, stumps, linearFeet, selectedFactors])

  const handleNext = () => {
    if (step === 'service' && service) setStep('details')
    else if (step === 'details' && estimate) setStep('factors')
    else if (step === 'factors') setStep('contact')
    else if (step === 'contact' && name && email && phone) handleSubmit()
  }

  const handleBack = () => {
    if (step === 'details') setStep('service')
    else if (step === 'factors') setStep('details')
    else if (step === 'contact') setStep('factors')
  }

  const toggleFactor = (factor: ProjectFactor) => {
    setSelectedFactors(prev => {
      const exists = prev.find(f => f.name === factor.name)
      if (exists) {
        return prev.filter(f => f.name !== factor.name)
      }
      return [...prev, factor]
    })
  }

  const addStump = () => {
    setStumps([...stumps, { dbh: 0, heightAbove: 6, depthBelow: 6 }])
  }

  const updateStump = (index: number, field: keyof StumpInput, value: number) => {
    const updated = [...stumps]
    updated[index] = { ...updated[index], [field]: value }
    setStumps(updated)
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          service,
          propertyDetails: {
            acres: acres ? parseFloat(acres) : null,
            dbhPackage,
            avgDBH: avgDBH ? parseFloat(avgDBH) : null,
            avgHeight: avgHeight ? parseFloat(avgHeight) : null,
            stumps: service === 'stump-grinding' ? stumps.filter(s => s.dbh > 0) : null,
            linearFeet: linearFeet ? parseFloat(linearFeet) : null,
          },
          projectFactors: selectedFactors,
          estimateTotal: estimate?.total,
          productionHours: estimate?.productionHours,
          methodology: estimate?.methodology,
          notes,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setLeadId(data.leadId)
        setStep('results')

        // Fire Meta Pixel Lead event
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: service,
            value: estimate?.total || 0,
            currency: 'USD',
          })
        }

        // Fire GA4 event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            value: estimate?.total || 0,
            currency: 'USD',
            service_type: service,
          })
        }
      }
    } catch (error) {
      console.error('Submit error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const canProceed = () => {
    if (step === 'service') return !!service
    if (step === 'details') return !!estimate
    if (step === 'factors') return true
    if (step === 'contact') return !!name && !!email && !!phone
    return false
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Get Your Quote</h1>
          <p className="text-gray-400">TreeShop Score-Based Pricing</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Step 1: Service */}
        {step === 'service' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">What service do you need?</h2>
            <div className="grid gap-4">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setService(s.id)}
                  className={`p-6 rounded-xl text-left transition-all ${
                    service === s.id
                      ? 'bg-green-600 ring-2 ring-green-400'
                      : 'bg-gray-800 hover:bg-gray-750'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-lg">{s.name}</div>
                      <div className={service === s.id ? 'text-green-100' : 'text-gray-400'}>
                        {s.description}
                      </div>
                    </div>
                    <div className={`text-sm ${service === s.id ? 'text-green-100' : 'text-green-400'}`}>
                      {s.rate}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 'details' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Property Details</h2>

            {/* Forestry Mulching */}
            {service === 'forestry-mulching' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Property Address (optional)</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, Daytona Beach, FL"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">How many acres? *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={acres}
                    onChange={(e) => setAcres(e.target.value)}
                    placeholder="e.g., 2.5"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Largest tree diameter (DBH Package)? *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(Object.entries(DBH_PACKAGES) as [string, { range: string; vegetation: string }][]).map(([pkg, info]) => (
                      <button
                        key={pkg}
                        onClick={() => setDbhPackage(parseInt(pkg) as DBHPackage)}
                        className={`p-3 rounded-lg text-center transition-all ${
                          dbhPackage === parseInt(pkg)
                            ? 'bg-green-600 ring-2 ring-green-400'
                            : 'bg-gray-800 hover:bg-gray-750'
                        }`}
                      >
                        <div className="text-2xl font-bold">{pkg}"</div>
                        <div className="text-xs text-gray-400">{info.range}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 bg-gray-800 rounded-lg p-4 flex gap-3">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-400">
                      <strong>DBH = Diameter at Breast Height</strong> (4.5 feet from ground).
                      Select the package matching the largest trees you need cleared.
                    </div>
                  </div>
                </div>

                {/* Live Calculation Display */}
                {estimate && (
                  <div className="bg-gray-800 border border-green-600/50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Calculator className="w-5 h-5 text-green-400" />
                      <span className="font-semibold">Live Calculation</span>
                    </div>
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {formatCurrency(estimate.total)}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">
                      {estimate.methodology}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Land Clearing */}
            {service === 'land-clearing' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Acres to clear *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={acres}
                    onChange={(e) => setAcres(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Average tree DBH (inches) *</label>
                  <input
                    type="number"
                    value={avgDBH}
                    onChange={(e) => setAvgDBH(e.target.value)}
                    placeholder="e.g., 10"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Average vegetation height (feet) *</label>
                  <input
                    type="number"
                    value={avgHeight}
                    onChange={(e) => setAvgHeight(e.target.value)}
                    placeholder="e.g., 40"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>

                {estimate && (
                  <div className="bg-gray-800 border border-green-600/50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Calculator className="w-5 h-5 text-green-400" />
                      <span className="font-semibold">Live Calculation</span>
                    </div>
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {formatCurrency(estimate.total)}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">
                      {estimate.methodology}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stump Grinding */}
            {service === 'stump-grinding' && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium">Enter each stump</label>
                    <button
                      onClick={addStump}
                      className="text-sm text-green-400 hover:text-green-300"
                    >
                      + Add another stump
                    </button>
                  </div>

                  {stumps.map((stump, i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-4 mb-4">
                      <div className="text-sm text-gray-400 mb-3">Stump #{i + 1}</div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs mb-1">DBH (inches)</label>
                          <input
                            type="number"
                            value={stump.dbh || ''}
                            onChange={(e) => updateStump(i, 'dbh', parseInt(e.target.value) || 0)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-xs mb-1">Above grade (in)</label>
                          <input
                            type="number"
                            value={stump.heightAbove}
                            onChange={(e) => updateStump(i, 'heightAbove', parseInt(e.target.value) || 0)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-xs mb-1">Depth below (in)</label>
                          <select
                            value={stump.depthBelow}
                            onChange={(e) => updateStump(i, 'depthBelow', parseInt(e.target.value))}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                          >
                            <option value={6}>6" (standard)</option>
                            <option value={12}>12" (deep)</option>
                            <option value={18}>18" (extra deep)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">
                    <strong>Formula:</strong> StumpScore = DBH² × (Height + Depth)
                  </div>
                  <div className="text-xs text-gray-500">
                    Example: 24" DBH, 6" above, 12" deep = 576 × 18 = 10,368 ÷ 8,000 PPH = 1.3 hrs × $400/hr = $520
                  </div>
                </div>

                {estimate && (
                  <div className="bg-gray-800 border border-green-600/50 rounded-xl p-6">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {formatCurrency(estimate.total)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {estimate.lineItems.length} stump(s) • {formatHours(estimate.productionHours)} production
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Drainage */}
            {service === 'drainage' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Estimated linear feet needed *</label>
                  <input
                    type="number"
                    value={linearFeet}
                    onChange={(e) => setLinearFeet(e.target.value)}
                    placeholder="e.g., 100"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Guide: Spot fix ~30-50 LF • Yard drainage ~100-150 LF • Full property ~200+ LF
                  </p>
                </div>

                <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-4">
                  <div className="font-semibold text-blue-400 mb-2">FreedomDrains with HydroBlox</div>
                  <p className="text-gray-300 text-sm">
                    Unlike French drains that clog in 5-10 years, HydroBlox panels have no fabric or pipe to fail.
                    Lifetime no-clog guarantee.
                  </p>
                </div>

                {estimate && (
                  <div className="bg-gray-800 border border-blue-600/50 rounded-xl p-6">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {formatCurrency(estimate.total)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {linearFeet} LF × $30-60/LF includes materials, installation, and guarantee
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Project Factors */}
        {step === 'factors' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Site Conditions</h2>
            <p className="text-gray-400 mb-6">Select any factors that apply. These adjust the estimate based on real-world complexity.</p>

            {service === 'forestry-mulching' && (
              <>
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">Vegetation</h3>
                  <div className="grid gap-2">
                    {COMMON_PROJECT_FACTORS.vegetation.map((factor) => (
                      <button
                        key={factor.name}
                        onClick={() => toggleFactor(factor)}
                        className={`flex justify-between items-center p-3 rounded-lg transition-all ${
                          selectedFactors.find(f => f.name === factor.name)
                            ? 'bg-green-600'
                            : 'bg-gray-800 hover:bg-gray-750'
                        }`}
                      >
                        <span>{factor.name}</span>
                        <span className="text-sm">+{factor.percentage}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">Access & Terrain</h3>
              <div className="grid gap-2">
                {[...COMMON_PROJECT_FACTORS.access, ...COMMON_PROJECT_FACTORS.terrain].map((factor) => (
                  <button
                    key={factor.name}
                    onClick={() => toggleFactor(factor)}
                    className={`flex justify-between items-center p-3 rounded-lg transition-all ${
                      selectedFactors.find(f => f.name === factor.name)
                        ? 'bg-green-600'
                        : 'bg-gray-800 hover:bg-gray-750'
                    }`}
                  >
                    <span>{factor.name}</span>
                    <span className="text-sm">+{factor.percentage}%</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Updated Estimate */}
            {estimate && (
              <div className="bg-gray-800 border border-green-600/50 rounded-xl p-6 mt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-gray-400">Updated Estimate</div>
                    <div className="text-3xl font-bold text-green-400">
                      {formatCurrency(estimate.total)}
                    </div>
                  </div>
                  {estimate.totalFactorPercentage > 0 && (
                    <div className="text-right">
                      <div className="text-sm text-yellow-400">+{estimate.totalFactorPercentage}% factors</div>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-700 pt-4">
                  {estimate.lineItems.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{item.description}</span>
                      <span>{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Transport (round-trip)</span>
                    <span>{formatCurrency(estimate.transport)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Contact */}
        {step === 'contact' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Your Information</h2>

            {/* Estimate Summary */}
            {estimate && (
              <div className="bg-gray-800 rounded-xl p-6 mb-8">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Your Quote</div>
                  <div className="text-4xl font-bold text-green-400">{formatCurrency(estimate.total)}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    {formatHours(estimate.productionHours)} production + transport
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Property Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Results */}
        {step === 'results' && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Quote Submitted!</h2>
            <p className="text-gray-400 mb-8">We&apos;ll contact you within 2 hours during business hours.</p>

            {estimate && (
              <div className="bg-gray-800 rounded-xl p-6 mb-8 max-w-md mx-auto text-left">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-400">Your Quote</div>
                  <div className="text-3xl font-bold text-green-400">{formatCurrency(estimate.total)}</div>
                </div>
                <div className="border-t border-gray-700 pt-4 space-y-2 text-sm">
                  {estimate.lineItems.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-gray-400">{item.description}</span>
                      <span>{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transport</span>
                    <span>{formatCurrency(estimate.transport)}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="text-xs text-gray-500 font-mono">{estimate.methodology}</div>
                </div>
              </div>
            )}

            <a
              href="tel:3868435266"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              <Phone className="w-5 h-5" />
              Call (386) 843-5266
            </a>
          </div>
        )}

        {/* Navigation */}
        {step !== 'results' && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
            {step !== 'service' ? (
              <button onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
            ) : <div />}
            <button
              onClick={handleNext}
              disabled={!canProceed() || submitting}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 px-6 py-3 rounded-lg font-medium"
            >
              {submitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
              ) : step === 'contact' ? (
                <>Submit Quote Request <ArrowRight className="w-5 h-5" /></>
              ) : (
                <>Continue <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
