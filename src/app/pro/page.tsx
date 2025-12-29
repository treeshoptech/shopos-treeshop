import Link from 'next/link'
import { ArrowRight, CheckCircle, Zap } from 'lucide-react'

export const metadata = {
  title: 'TreeShop Pro - The Operating System for Tree Service Operators',
  description: 'Stop guessing, start systematizing. Join the 18% of tree service businesses that survive. Founding Member program and ShopOS platform.',
}

const stats = [
  { value: '16', label: 'Years in Industry' },
  { value: '500+', label: 'Projects Completed' },
  { value: '17K+', label: 'YouTube Subscribers' },
  { value: '82%', label: 'Industry Failure Rate' },
]

export default function ProHomePage() {
  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm">For Tree Service Operators</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The Operating System for Tree Service Businesses
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              82% of tree service businesses fail within 5 years. We&apos;re building the systems
              that separate the survivors from the statistics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pro/founding-member"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Become a Founding Member
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pro/shopos"
                className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Explore ShopOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-red-400">The Problem</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span className="text-gray-300">Pricing by gut feel destroys margins</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span className="text-gray-300">Owner is the single point of failure</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span className="text-gray-300">No systems = no scalability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span className="text-gray-300">Knowledge trapped in founder&apos;s head</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span className="text-gray-300">One bad month = potential bankruptcy</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-green-400">The Solution</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-gray-300">Score-based pricing (MulchingScore, StumpScore, TreeScore)</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-gray-300">Documented processes anyone can execute</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-gray-300">Equipment costing with Army Corps methodology</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-gray-300">Production tracking for continuous improvement</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-gray-300">Financial discipline with weekly reviews</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-900/50 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join the 18%?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Applications are open for Founding Members. Limited spots available.
          </p>
          <Link
            href="/pro/founding-member/apply"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
