'use client'

import { useState } from 'react'
import { Droplets, ArrowRight, ArrowLeft, Check } from 'lucide-react'

const questions = [
  {
    id: 'timing',
    question: 'When does water collect on your property?',
    options: [
      { value: 'always', label: 'Always, even without rain', severity: 3 },
      { value: 'heavy-rain', label: 'After heavy rain (1+ inch)', severity: 2 },
      { value: 'any-rain', label: 'After any rain', severity: 2.5 },
      { value: 'rarely', label: 'Rarely', severity: 1 },
    ],
  },
  {
    id: 'duration',
    question: 'How long does standing water last?',
    options: [
      { value: 'days', label: 'Days', severity: 3 },
      { value: '24-hours', label: '12-24 hours', severity: 2 },
      { value: 'few-hours', label: 'A few hours', severity: 1 },
      { value: 'drains-fast', label: 'Drains within an hour', severity: 0.5 },
    ],
  },
  {
    id: 'areas',
    question: 'How many problem areas do you have?',
    options: [
      { value: '1', label: 'Just one spot', lf: 50 },
      { value: '2-3', label: '2-3 areas', lf: 100 },
      { value: '4+', label: '4 or more areas', lf: 150 },
      { value: 'whole-yard', label: 'Whole yard has issues', lf: 200 },
    ],
  },
  {
    id: 'foundation',
    question: 'Is water near your foundation?',
    options: [
      { value: 'yes-pooling', label: 'Yes, water pools against it', severity: 3 },
      { value: 'yes-close', label: 'Yes, gets within 5 feet', severity: 2 },
      { value: 'no', label: 'No, just in the yard', severity: 1 },
      { value: 'unsure', label: "I'm not sure", severity: 1.5 },
    ],
  },
  {
    id: 'tried',
    question: 'What have you tried?',
    options: [
      { value: 'french-drain', label: 'French drain (failed)', multiplier: 1.2 },
      { value: 'grading', label: 'Re-grading', multiplier: 1 },
      { value: 'nothing', label: 'Nothing yet', multiplier: 1 },
      { value: 'other', label: 'Other solutions', multiplier: 1.1 },
    ],
  },
]

interface Answers {
  [key: string]: string
}

export default function DrainageEstimatePage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const currentQuestion = questions[step]
  const isComplete = step >= questions.length

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setStep(questions.length) // Move to results
    }
  }

  const calculateRecommendation = () => {
    // Estimate LF based on answers
    const areasAnswer = questions[2].options.find(o => o.value === answers.areas)
    const baseLF = (areasAnswer as any)?.lf || 100

    // Severity multiplier
    let severityTotal = 0
    questions.forEach(q => {
      const opt = q.options.find(o => o.value === answers[q.id])
      if ((opt as any)?.severity) severityTotal += (opt as any).severity
    })
    const severityMultiplier = 1 + (severityTotal / 15)

    const estimatedLF = Math.round(baseLF * severityMultiplier)
    const low = estimatedLF * 30
    const high = estimatedLF * 60

    let package_: string
    if (estimatedLF <= 50) package_ = 'Spot Drainage'
    else if (estimatedLF <= 150) package_ = 'Yard Drainage'
    else package_ = 'Complete System'

    return { estimatedLF, low, high, package: package_ }
  }

  const recommendation = isComplete ? calculateRecommendation() : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        service: 'drainage',
        propertyDetails: answers,
        estimateTotal: recommendation?.high,
        notes: `Package: ${recommendation?.package}, LF: ${recommendation?.estimatedLF}`,
        source: 'drainage-estimate-quiz',
      }),
    })

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'drainage-estimate-quiz',
        value: recommendation?.high || 0,
        currency: 'USD',
      })
    }

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Droplets className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Drainage Assessment</h1>
        </div>

        {/* Progress */}
        {!isComplete && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {step + 1} of {questions.length}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Question */}
        {!isComplete && (
          <div className="bg-gray-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="w-full p-4 bg-gray-700 hover:bg-gray-650 rounded-lg text-left flex items-center justify-between group"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400" />
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {isComplete && !submitted && recommendation && (
          <div className="space-y-6">
            <div className="bg-blue-900/30 border border-blue-600/50 rounded-xl p-8">
              <h2 className="text-xl font-semibold mb-2">Your Recommendation</h2>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {recommendation.package}
              </div>
              <div className="text-gray-300 mb-4">
                ~{recommendation.estimatedLF} linear feet of FreedomDrains
              </div>
              <div className="text-2xl font-bold">
                ${recommendation.low.toLocaleString()} - ${recommendation.high.toLocaleString()}
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Includes HydroBlox panels, installation, and lifetime no-clog guarantee
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Get Your Free Site Assessment</h3>
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
                  Schedule My Assessment
                </button>
              </form>
            </div>
          </div>
        )}

        {submitted && (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Assessment Requested!</h2>
            <p className="text-gray-400 mb-6">We&apos;ll contact you within 2 hours to schedule.</p>
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
