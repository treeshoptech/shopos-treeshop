'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    location: '',
    yearsInBusiness: '',
    annualRevenue: '',
    biggestChallenge: '',
    whyApplying: '',
    budgetConfirmed: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: 'founding-member-application',
          source: 'pro-founding-member-apply',
          estimateTotal: 30000, // $2.5K × 12 months LTV
        }),
      })

      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'CompleteRegistration', {
          content_name: 'founding-member-application',
          value: 30000,
          currency: 'USD',
        })
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Submit error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Application Received!</h1>
          <p className="text-gray-400 mb-8">
            We&apos;ll review your application and respond within 48 hours.
            Check your email ({formData.email}) for next steps.
          </p>
          <Link href="/pro" className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold">
            Back to Pro Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2 text-center">Founding Member Application</h1>
        <p className="text-gray-400 text-center mb-8">Takes about 5 minutes</p>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Business Name *</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Your Name *</label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location (City, State) *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
              placeholder="Tampa, FL"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Years in Business *</label>
              <select
                value={formData.yearsInBusiness}
                onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
              >
                <option value="">Select...</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Annual Revenue *</label>
              <select
                value={formData.annualRevenue}
                onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
              >
                <option value="">Select...</option>
                <option value="under-100k">Under $100K</option>
                <option value="100k-250k">$100K - $250K</option>
                <option value="250k-500k">$250K - $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m+">Over $1M</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">What&apos;s your biggest challenge right now? *</label>
            <textarea
              value={formData.biggestChallenge}
              onChange={(e) => setFormData({ ...formData, biggestChallenge: e.target.value })}
              required
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
              placeholder="Be specific. What keeps you up at night?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Why are you applying for the Founding Member program? *</label>
            <textarea
              value={formData.whyApplying}
              onChange={(e) => setFormData({ ...formData, whyApplying: e.target.value })}
              required
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
              placeholder="What do you hope to achieve?"
            />
          </div>
          <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.budgetConfirmed}
                onChange={(e) => setFormData({ ...formData, budgetConfirmed: e.target.checked })}
                required
                className="mt-1"
              />
              <span className="text-sm">
                I understand the Founding Member program is $2,500/month with a 3-month minimum
                commitment, and I&apos;m prepared to make this investment in my business. *
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!formData.budgetConfirmed || submitting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
          >
            {submitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
            ) : (
              <>Submit Application <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
