'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Loader2 } from 'lucide-react'
import { calculateEstimate, formatCurrency, type PricingInput, type PricingResult } from '@/lib/pricing'

type Step = 'service' | 'details' | 'dbh' | 'contact' | 'results'

const services = [
  { id: 'forestry-mulching', name: 'Forestry Mulching', description: 'Clear brush and trees, leave mulch behind' },
  { id: 'land-clearing', name: 'Land Clearing', description: 'Complete lot clearing for construction' },
  { id: 'stump-grinding', name: 'Stump Grinding', description: 'Remove stumps below grade' },
  { id: 'drainage', name: 'Drainage Solutions', description: 'FreedomDrains with HydroBlox' },
]

const dbhPackages = [
  { id: '4', name: '4" Package', description: 'Light brush and saplings', recommended: 'Light vegetation' },
  { id: '6', name: '6" Package', description: 'Young trees, medium brush', recommended: 'Medium density' },
  { id: '8', name: '8" Package', description: 'Mature trees, dense vegetation', recommended: 'Heavy vegetation' },
  { id: '10', name: '10" Package', description: 'Large trees, full clearing', recommended: 'Very heavy / oaks' },
]

export default function EstimatePage() {
  const [step, setStep] = useState<Step>('service')
  const [submitting, setSubmitting] = useState(false)
  const [leadId, setLeadId] = useState<string | null>(null)

  // Form state
  const [service, setService] = useState<PricingInput['service'] | ''>('')
  const [acres, setAcres] = useState('')
  const [dbhPackage, setDbhPackage] = useState<'4' | '6' | '8' | '10' | ''>('')
  const [stumpCount, setStumpCount] = useState('')
  const [stumpDiameter, setStumpDiameter] = useState('')
  const [drainageLinearFeet, setDrainageLinearFeet] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [preferredContact, setPreferredContact] = useState('')
  const [bestTime, setBestTime] = useState('')
  const [notes, setNotes] = useState('')

  const [estimate, setEstimate] = useState<PricingResult | null>(null)

  const calculatePrice = () => {
    if (!service) return null

    const input: PricingInput = {
      service: service as PricingInput['service'],
      acres: acres ? parseFloat(acres) : undefined,
      dbhPackage: dbhPackage as PricingInput['dbhPackage'] || undefined,
      stumpCount: stumpCount ? parseInt(stumpCount) : undefined,
      stumpDiameter: stumpDiameter ? parseInt(stumpDiameter) : undefined,
      drainageLinearFeet: drainageLinearFeet ? parseInt(drainageLinearFeet) : undefined,
    }

    return calculateEstimate(input)
  }

  const handleNext = () => {
    if (step === 'service' && service) {
      setStep('details')
    } else if (step === 'details') {
      if (service === 'forestry-mulching' || service === 'land-clearing') {
        setStep('dbh')
      } else {
        const result = calculatePrice()
        setEstimate(result)
        setStep('contact')
      }
    } else if (step === 'dbh' && dbhPackage) {
      const result = calculatePrice()
      setEstimate(result)
      setStep('contact')
    } else if (step === 'contact' && name && email && phone) {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step === 'details') setStep('service')
    else if (step === 'dbh') setStep('details')
    else if (step === 'contact') {
      if (service === 'forestry-mulching' || service === 'land-clearing') {
        setStep('dbh')
      } else {
        setStep('details')
      }
    }
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
          acres: acres ? parseFloat(acres) : null,
          dbhPackage: dbhPackage || null,
          stumpCount: stumpCount ? parseInt(stumpCount) : null,
          stumpDiameter: stumpDiameter ? parseInt(stumpDiameter) : null,
          drainageLinearFeet: drainageLinearFeet ? parseInt(drainageLinearFeet) : null,
          estimateLow: estimate?.lowEstimate,
          estimateHigh: estimate?.highEstimate,
          preferredContact,
          bestTime,
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
            value: estimate?.highEstimate || 0,
            currency: 'USD',
          })
        }

        // Fire GA4 event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            value: estimate?.highEstimate || 0,
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
    if (step === 'details') {
      if (service === 'forestry-mulching' || service === 'land-clearing') {
        return !!acres && parseFloat(acres) > 0
      }
      if (service === 'stump-grinding') {
        return !!stumpCount && !!stumpDiameter
      }
      if (service === 'drainage') {
        return !!drainageLinearFeet
      }
    }
    if (step === 'dbh') return !!dbhPackage
    if (step === 'contact') return !!name && !!email && !!phone
    return false
  }

  const stepNumber = () => {
    const steps: Step[] = ['service', 'details']
    if (service === 'forestry-mulching' || service === 'land-clearing') {
      steps.push('dbh')
    }
    steps.push('contact', 'results')
    return steps.indexOf(step) + 1
  }

  const totalSteps = () => {
    return (service === 'forestry-mulching' || service === 'land-clearing') ? 5 : 4
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Get Your Free Estimate</h1>
          <p className="text-gray-400">Step {stepNumber()} of {totalSteps()}</p>
          <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(stepNumber() / totalSteps()) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Step 1: Service Selection */}
        {step === 'service' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">What service do you need?</h2>
            <div className="grid gap-4">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setService(s.id as PricingInput['service'])}
                  className={`p-6 rounded-xl text-left transition-all ${
                    service === s.id
                      ? 'bg-green-600 ring-2 ring-green-400'
                      : 'bg-gray-800 hover:bg-gray-750'
                  }`}
                >
                  <div className="font-semibold text-lg">{s.name}</div>
                  <div className={service === s.id ? 'text-green-100' : 'text-gray-400'}>
                    {s.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Property Details */}
        {step === 'details' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Tell us about your property</h2>

            {(service === 'forestry-mulching' || service === 'land-clearing') && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Property Address (optional)</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, Daytona Beach, FL"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">How many acres need clearing? *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={acres}
                    onChange={(e) => setAcres(e.target.value)}
                    placeholder="e.g., 2.5"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                  />
                  <p className="text-gray-400 text-sm mt-2">Not sure? We can help measure during the site visit.</p>
                </div>
              </div>
            )}

            {service === 'stump-grinding' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Property Address (optional)</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, Daytona Beach, FL"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">How many stumps? *</label>
                  <input
                    type="number"
                    min="1"
                    value={stumpCount}
                    onChange={(e) => setStumpCount(e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Average stump diameter (inches)? *</label>
                  <input
                    type="number"
                    min="4"
                    value={stumpDiameter}
                    onChange={(e) => setStumpDiameter(e.target.value)}
                    placeholder="e.g., 24"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                  />
                  <p className="text-gray-400 text-sm mt-2">Measure across the widest part of the stump.</p>
                </div>
              </div>
            )}

            {service === 'drainage' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Property Address (optional)</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, Daytona Beach, FL"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Estimated drainage length needed (feet)? *</label>
                  <input
                    type="number"
                    min="20"
                    value={drainageLinearFeet}
                    onChange={(e) => setDrainageLinearFeet(e.target.value)}
                    placeholder="e.g., 100"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Not sure? Guide: Small yard drainage ~50-100 LF,
                    full yard ~100-200 LF, large property ~200+ LF
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: DBH Package (mulching/clearing only) */}
        {step === 'dbh' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">What&apos;s the largest tree diameter?</h2>
            <p className="text-gray-400 mb-6">
              DBH (Diameter at Breast Height) — measured 4.5 feet from the ground
            </p>
            <div className="grid gap-4">
              {dbhPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setDbhPackage(pkg.id as '4' | '6' | '8' | '10')}
                  className={`p-6 rounded-xl text-left transition-all ${
                    dbhPackage === pkg.id
                      ? 'bg-green-600 ring-2 ring-green-400'
                      : 'bg-gray-800 hover:bg-gray-750'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg">{pkg.name}</div>
                      <div className={dbhPackage === pkg.id ? 'text-green-100' : 'text-gray-400'}>
                        {pkg.description}
                      </div>
                    </div>
                    <div className={`text-sm ${dbhPackage === pkg.id ? 'text-green-100' : 'text-gray-500'}`}>
                      {pkg.recommended}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Not sure? We&apos;ll verify during the site assessment. Pick your best guess.
            </p>
          </div>
        )}

        {/* Step 4: Contact Info + Estimate Preview */}
        {step === 'contact' && (
          <div>
            {/* Estimate Preview */}
            {estimate && (
              <div className="bg-gray-800 rounded-xl p-6 mb-8">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Your Estimate</div>
                  <div className="text-4xl font-bold text-green-400 mt-1">
                    {formatCurrency(estimate.lowEstimate)} - {formatCurrency(estimate.highEstimate)}
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-4 space-y-2">
                  {estimate.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.label}</span>
                      <span>{formatCurrency(item.lowAmount)} - {formatCurrency(item.highAmount)}</span>
                    </div>
                  ))}
                </div>
                {estimate.notes.length > 0 && (
                  <div className="mt-4 text-sm text-gray-400">
                    {estimate.notes.map((note, i) => (
                      <p key={i}>• {note}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            <h2 className="text-xl font-semibold mb-6">How can we reach you?</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                  >
                    <option value="">No preference</option>
                    <option value="phone">Phone call</option>
                    <option value="text">Text message</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Best Time to Call</label>
                  <select
                    value={bestTime}
                    onChange={(e) => setBestTime(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                  >
                    <option value="">Any time</option>
                    <option value="morning">Morning (8am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-5pm)</option>
                    <option value="evening">Evening (5pm-8pm)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Anything else we should know?</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Access issues, timeline, special requests..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Results / Confirmation */}
        {step === 'results' && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Estimate Request Received!</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              We&apos;ll review your request and contact you within 2 hours during business hours.
            </p>

            {estimate && (
              <div className="bg-gray-800 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <div className="text-sm text-gray-400 mb-2">Your Estimate</div>
                <div className="text-3xl font-bold text-green-400">
                  {formatCurrency(estimate.lowEstimate)} - {formatCurrency(estimate.highEstimate)}
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Final price confirmed after site assessment
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="text-gray-400">
                Need it faster?
              </div>
              <a
                href="tel:3868435266"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                <Phone className="w-5 h-5" />
                Call (386) 843-5266
              </a>
            </div>

            <div className="mt-12 text-left bg-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">What Happens Next?</h3>
              <ol className="space-y-3 text-gray-400">
                <li className="flex gap-3">
                  <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">1</span>
                  <span>We review your property details and estimate</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">2</span>
                  <span>We call to discuss your project and schedule a site visit if needed</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">3</span>
                  <span>You receive a written quote with guaranteed pricing</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">4</span>
                  <span>25% deposit schedules your job, balance due on completion</span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step !== 'results' && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
            {step !== 'service' ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed() || submitting}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500 px-6 py-3 rounded-lg font-medium"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : step === 'contact' ? (
                <>
                  Submit Request
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
