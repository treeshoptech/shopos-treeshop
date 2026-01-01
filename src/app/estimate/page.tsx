'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trees, CircleDot, Droplets, Shovel, ArrowRight, ArrowLeft, MapPin, User, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react'
import { MetaEvents } from '@/components/analytics/MetaPixel'
import { Header, Footer } from '@/components/layout'
import MapboxAddressInput from '@/components/MapboxAddressInput'

const services = [
  { id: 'forestry-mulching', name: 'Forestry Mulching', description: 'Clear brush and trees up to 15" DBH, leave mulch behind', icon: Trees },
  { id: 'land-clearing', name: 'Land Clearing', description: 'Complete lot clearing for construction or development', icon: Shovel },
  { id: 'stump-grinding', name: 'Stump Grinding', description: 'Remove stumps below grade', icon: CircleDot },
  { id: 'freedomdrains', name: 'FreedomDrains', description: 'Lifetime-guaranteed drainage that never clogs', icon: Droplets },
]

const dbhPackages = [
  { value: 2, label: 'Brush Only (no trees)' },
  { value: 4, label: 'Small Saplings (up to 4")' },
  { value: 6, label: 'Young Trees (up to 6") - Most Common' },
  { value: 8, label: 'Established Trees (up to 8")' },
  { value: 10, label: 'Mature Trees (up to 10")' },
  { value: 12, label: 'Large Trees (up to 12")' },
  { value: 15, label: 'Very Large Trees (up to 15")' },
]

const landClearingDBH = [
  { value: 4, label: '4"', description: 'Light - brush & saplings' },
  { value: 8, label: '8"', description: 'Medium - young trees' },
  { value: 12, label: '12"', description: 'Standard - established trees' },
  { value: 18, label: '18"', description: 'Heavy - mature trees' },
  { value: 24, label: '24+"', description: 'Extreme - large trees' },
]

const stumpSizes = [
  { value: 'small', label: 'Small (under 12" diameter)' },
  { value: 'medium', label: 'Medium (12-24" diameter)' },
  { value: 'large', label: 'Large (24-36" diameter)' },
  { value: 'xlarge', label: 'Extra Large (36"+ diameter)' },
]

const drainagePackages = [
  { value: 'starter', label: 'Starter (50 LF) - Single problem area' },
  { value: 'standard', label: 'Standard (100 LF) - Foundation/perimeter' },
  { value: 'complete', label: 'Complete (150+ LF) - Comprehensive system' },
]

type Step = 'service' | 'details' | 'contact' | 'quote'

export default function EstimatePage() {
  const [step, setStep] = useState<Step>('service')
  const [loading, setLoading] = useState(false)
  const [quote, setQuote] = useState<{ total: number } | null>(null)

  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [acres, setAcres] = useState<number>(1)
  const [dbh, setDbh] = useState<number>(6)
  const [stumpCount, setStumpCount] = useState<number>(1)
  const [stumpSize, setStumpSize] = useState<string>('medium')
  const [drainagePackage, setDrainagePackage] = useState<string>('standard')

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (selectedService) {
      MetaEvents.QuoteStarted(selectedService)
    }
  }, [selectedService])

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    if (serviceId === 'land-clearing') {
      setDbh(12)
    }
    setStep('details')
  }

  const handleDetailsSubmit = () => {
    setStep('contact')
  }

  const handleContactSubmit = async () => {
    if (!name || !phone) {
      alert('Please provide your name and phone number')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService,
          address,
          acres,
          dbh,
          stumpCount,
          stumpSize,
          drainagePackage,
          contact: { name, phone, email, notes },
        }),
      })

      const data = await response.json()
      setQuote(data)
      setStep('quote')

      MetaEvents.QuoteCompleted(selectedService!, data.total)
      MetaEvents.Lead(data.total)

    } catch (error) {
      console.error('Quote error:', error)
      alert('Error generating quote. Please call (386) 843-5266')
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => {
    if (step === 'details') setStep('service')
    if (step === 'contact') setStep('details')
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Get Your Free Quote</h1>
            <p className="text-gray-400">Instant pricing. No obligation. No surprises.</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {['service', 'details', 'contact', 'quote'].map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === s ? 'bg-green-600' :
                  ['service', 'details', 'contact', 'quote'].indexOf(step) > i ? 'bg-green-600/50' : 'bg-gray-700'
                }`}>
                  {i + 1}
                </div>
                {i < 3 && <div className={`w-8 h-0.5 ${
                  ['service', 'details', 'contact', 'quote'].indexOf(step) > i ? 'bg-green-600/50' : 'bg-gray-700'
                }`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Service */}
          {step === 'service' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">What service do you need?</h2>
              <div className="space-y-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className="w-full text-left p-6 rounded-xl border-2 border-gray-700 bg-gray-800 hover:border-gray-600 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <service.icon className="w-8 h-8 text-green-400" />
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-gray-400 text-sm">{service.description}</p>
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
              <button onClick={goBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <h2 className="text-xl font-semibold mb-6">Tell us about your project</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Property Address (optional)
                  </label>
                  <MapboxAddressInput
                    value={address}
                    onChange={(addr, coords) => {
                      setAddress(addr)
                      if (coords) setCoordinates(coords)
                    }}
                    placeholder="Start typing your address..."
                  />
                </div>

                {selectedService === 'forestry-mulching' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">How many acres need clearing?</label>
                      <input
                        type="number"
                        min={0.25}
                        step={0.25}
                        value={acres}
                        onChange={(e) => setAcres(Math.max(0.25, parseFloat(e.target.value) || 0.25))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                      />
                      <p className="text-gray-500 text-sm mt-1">Minimum 0.25 acres</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">What's the largest tree size?</label>
                      <select
                        value={dbh}
                        onChange={(e) => setDbh(parseInt(e.target.value))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                      >
                        {dbhPackages.map((pkg) => (
                          <option key={pkg.value} value={pkg.value}>{pkg.label}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {selectedService === 'land-clearing' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">How many acres need clearing?</label>
                      <input
                        type="number"
                        min={0.25}
                        step={0.25}
                        value={acres}
                        onChange={(e) => setAcres(Math.max(0.25, parseFloat(e.target.value) || 0.25))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                      />
                      <p className="text-gray-500 text-sm mt-1">Minimum 0.25 acres</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">What's the largest tree size?</label>
                      <div className="grid grid-cols-5 gap-2">
                        {landClearingDBH.map((pkg) => (
                          <button
                            key={pkg.value}
                            type="button"
                            onClick={() => setDbh(pkg.value)}
                            className={`p-3 rounded-lg text-center transition-all ${
                              dbh === pkg.value
                                ? 'bg-blue-600 ring-2 ring-blue-400'
                                : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                          >
                            <div className="text-xl font-bold">{pkg.label}</div>
                            <div className="text-xs text-gray-400">{pkg.description}</div>
                          </button>
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm mt-2">
                        Measure the largest tree trunk at chest height
                      </p>
                    </div>
                  </>
                )}

                {selectedService === 'stump-grinding' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">How many stumps?</label>
                      <input
                        type="number"
                        min={1}
                        value={stumpCount}
                        onChange={(e) => setStumpCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Average stump size?</label>
                      <select
                        value={stumpSize}
                        onChange={(e) => setStumpSize(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                      >
                        {stumpSizes.map((size) => (
                          <option key={size.value} value={size.value}>{size.label}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {selectedService === 'freedomdrains' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">What size system do you need?</label>
                    <div className="space-y-3">
                      {drainagePackages.map((pkg) => (
                        <button
                          key={pkg.value}
                          onClick={() => setDrainagePackage(pkg.value)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            drainagePackage === pkg.value
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-700 bg-gray-800'
                          }`}
                        >
                          {pkg.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleDetailsSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact (REQUIRED) */}
          {step === 'contact' && (
            <div>
              <button onClick={goBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <h2 className="text-xl font-semibold mb-2">Almost there!</h2>
              <p className="text-gray-400 mb-6">Enter your contact info to see your instant quote.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(386) 555-1234"
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Anything else we should know? (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special access requirements, timeline, etc."
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>

                <button
                  onClick={handleContactSubmit}
                  disabled={!name || !phone || loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Calculating...</>
                  ) : (
                    <>See My Quote <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>

                <p className="text-center text-gray-500 text-sm">
                  We'll never spam you. Your info is used only to deliver your quote.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Quote - THE CLOSER */}
          {step === 'quote' && quote && (
            <div>
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Your Estimate</h2>
                <p className="text-gray-400">For {address || 'your property'}</p>
              </div>

              <div className="bg-gray-800 rounded-xl p-8 mb-6">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-400 mb-2">Estimated Project Cost</div>
                  <div className="text-5xl font-bold text-green-400 mb-2">
                    ${quote.total.toLocaleString()}
                  </div>
                  <p className="text-gray-500 text-sm">Final price confirmed after site visit</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Your Project</h3>
                  <div className="text-white">
                    {selectedService === 'forestry-mulching' && (
                      <p>{acres} acre{acres !== 1 ? 's' : ''} • Trees up to {dbh}" diameter</p>
                    )}
                    {selectedService === 'land-clearing' && (
                      <p>{acres} acre{acres !== 1 ? 's' : ''} • Complete lot clearing</p>
                    )}
                    {selectedService === 'stump-grinding' && (
                      <p>{stumpCount} stump{stumpCount !== 1 ? 's' : ''} • {stumpSize} size</p>
                    )}
                    {selectedService === 'freedomdrains' && (
                      <p>{drainagePackage.charAt(0).toUpperCase() + drainagePackage.slice(1)} package</p>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="font-semibold mb-4">What's Included:</h3>

                  {selectedService === 'forestry-mulching' && (
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">One Machine Does It All</span>
                          <p className="text-gray-400 text-sm">No separate crews for cutting, chipping, and hauling</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">No Hauling Costs</span>
                          <p className="text-gray-400 text-sm">Mulch stays on-site as ground cover (saves you $$)</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Minimal Soil Disturbance</span>
                          <p className="text-gray-400 text-sm">No ruts, no erosion, ready to use immediately</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Usually Done in 1 Day</span>
                          <p className="text-gray-400 text-sm">Most residential lots cleared same-day</p>
                        </div>
                      </li>
                    </ul>
                  )}

                  {selectedService === 'land-clearing' && (
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Complete Site Preparation</span>
                          <p className="text-gray-400 text-sm">Ready for construction, landscaping, or agriculture</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Selective or Full Clearing</span>
                          <p className="text-gray-400 text-sm">We work around trees you want to keep</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Stump Removal Included</span>
                          <p className="text-gray-400 text-sm">No surprise charges for stumps</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">10 Years Experience</span>
                          <p className="text-gray-400 text-sm">500+ projects—we know this land</p>
                        </div>
                      </li>
                    </ul>
                  )}

                  {selectedService === 'stump-grinding' && (
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Ground Below Grade</span>
                          <p className="text-gray-400 text-sm">6-8" below surface—grass grows right over</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Any Size Stump</span>
                          <p className="text-gray-400 text-sm">From small shrubs to massive oaks</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Grindings Cleanup</span>
                          <p className="text-gray-400 text-sm">We rake and level—no pile left behind</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Fill Dirt Available</span>
                          <p className="text-gray-400 text-sm">Optional topsoil for seamless lawn repair</p>
                        </div>
                      </li>
                    </ul>
                  )}

                  {selectedService === 'freedomdrains' && (
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium text-blue-400">LIFETIME No-Clog Guarantee</span>
                          <p className="text-gray-400 text-sm">If it ever clogs, we fix it free. Forever. No other company offers this.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Works on Flat Ground</span>
                          <p className="text-gray-400 text-sm">Hydroblox uses capillary action—no slope needed</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">No Gravel to Clog</span>
                          <p className="text-gray-400 text-sm">French drains fail in 3-7 years in Florida. Ours don't.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Installed in 1 Day</span>
                          <p className="text-gray-400 text-sm">Narrow surgical trench—minimal lawn damage</p>
                        </div>
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">Why TreeShop?</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>10 years in Central Florida</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>500+ projects completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Price = Quote (no surprises)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Licensed & Insured</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 mb-6 text-center">
                <p className="text-green-300">
                  <span className="font-semibold">Currently scheduling:</span> Usually within 1-2 weeks
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:3868435266"
                  className="block w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-semibold text-center text-lg"
                >
                  Call to Schedule: (386) 843-5266
                </a>
              </div>

              <p className="text-center text-gray-500 text-sm mt-6">
                We'll call you within 24 hours to confirm details and schedule.
              </p>

              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  <span className="text-green-400">Our 2026 Promise:</span> From first contact to invoice in 20 days or less.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
