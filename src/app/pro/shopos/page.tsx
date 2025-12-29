import Link from 'next/link'
import { ArrowRight, Zap, Calculator, Clock, Users, BarChart3, FileText, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'ShopOS - Tree Service Operating System',
  description: 'Score-based quoting, production tracking, equipment costing, and customer management. Built by operators, for operators.',
}

const features = [
  {
    icon: Calculator,
    title: 'Score-Based Quoting',
    description: 'MulchingScore, StumpScore, TreeScore, ClearingScore. Consistent pricing every time.',
  },
  {
    icon: Clock,
    title: 'Production Tracking',
    description: 'Track actual hours vs quoted. Know your real $/hour by job type.',
  },
  {
    icon: BarChart3,
    title: 'Equipment Costing',
    description: 'Army Corps methodology. True hourly cost for every machine in your fleet.',
  },
  {
    icon: Users,
    title: 'Customer Portal',
    description: 'Professional quotes, approvals, and communication. Stop texting estimates.',
  },
  {
    icon: FileText,
    title: 'Job Documentation',
    description: 'Before/after photos, crew notes, completion records. All in one place.',
  },
  {
    icon: Zap,
    title: 'Instant Estimates',
    description: 'Website integration for lead capture. Automated quote generation.',
  },
]

export default function ShopOSPage() {
  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm">Now in Beta</span>
              </div>

              <h1 className="text-5xl font-bold mb-6">ShopOS</h1>
              <p className="text-2xl text-gray-300 mb-4">
                The Operating System for Tree Service Businesses
              </p>
              <p className="text-gray-400 mb-8">
                Score-based quoting. Production tracking. Equipment costing. Customer management.
                Everything you need to run a systematic tree service operation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pro/founding-member"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg font-semibold transition-colors"
                >
                  Get Access via Founding Member
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Platform Demo Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Built for Tree Service Operators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-800 rounded-xl p-6">
                <feature.icon className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">The Math Nobody Else Has</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">MulchingScore</div>
              <code className="text-sm text-gray-400">DBH × Acres ÷ PPH × Rate</code>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">StumpScore</div>
              <code className="text-sm text-gray-400">DBH² × (H+D) ÷ PPH × Rate</code>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">TreeScore</div>
              <code className="text-sm text-gray-400">H × (D÷12) × R² ÷ PPH × Rate</code>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">ClearingScore</div>
              <code className="text-sm text-gray-400">Acres × (DBH÷12) × H ÷ PPH × Rate</code>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-8">
            These aren&apos;t theoretical. They&apos;re calibrated to actual production data from 500+ jobs.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-900/50 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Systematize?</h2>
          <p className="text-gray-300 mb-8">
            The fastest path to ShopOS is through the Founding Member program.
            Get the platform plus the implementation support to actually use it.
          </p>
          <Link
            href="/pro/founding-member/apply"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Apply for Founding Member
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
