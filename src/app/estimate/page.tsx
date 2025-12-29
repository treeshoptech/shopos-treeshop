'use client'

import { useState, useEffect } from 'react'
import { Trees, CircleDot, Droplets, Shovel, ArrowRight, ArrowLeft, MapPin, User, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react'
import { MetaEvents } from '@/components/analytics/MetaPixel'
import { Header, Footer } from '@/components/layout'

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
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, City, FL"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                  />
                </div>

                {(selectedService === 'forestry-mulching' || selectedService === 'land-clearing') && (
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

          {/* Step 4: Quote */}
          {step === 'quote' && quote && (
            <div>
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Your Estimate</h2>
                <p className="text-gray-400">Based on the information you provided</p>
              </div>

              <div className="bg-gray-800 rounded-xl p-8 mb-8">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Estimated Project Cost</div>
                  <div className="text-5xl font-bold text-green-400 mb-4">
                    ${quote.total.toLocaleString()}
                  </div>
                  <p className="text-gray-400 text-sm">
                    Final price confirmed after site visit
                  </p>
                </div>

                <div className="border-t border-gray-700 mt-6 pt-6">
                  <h3 className="font-semibold mb-3">What's Included:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Professional service
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      All equipment & labor
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Debris cleanup
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      No hidden fees
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:3868435266"
                  className="block w-full bg-green-600 hover:bg-green-700 py-4 rounded-lg font-semibold text-center"
                >
                  Call to Schedule: (386) 843-5266
                </a>
                <a
                  href="/store/book"
                  className="block w-full bg-gray-700 hover:bg-gray-600 py-4 rounded-lg font-semibold text-center"
                >
                  Book Online & Pay Deposit
                </a>
              </div>

              <p className="text-center text-gray-500 text-sm mt-6">
                We'll call you within 24 hours to confirm details and schedule.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
