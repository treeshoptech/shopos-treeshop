import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, Calendar, MessageSquare, Zap, DollarSign } from 'lucide-react'

export const metadata = {
  title: 'Founding Member Program',
  description: 'Weekly 1:1 coaching with Jeremiah, full ShopOS access, and direct implementation support. $2,500/month. Limited spots.',
}

const included = [
  {
    icon: Calendar,
    title: 'Weekly Strategy Calls',
    description: 'Friday calls to review your week, solve problems, and plan ahead. Direct access to 16 years of experience.',
  },
  {
    icon: Zap,
    title: 'Full ShopOS Access',
    description: 'The complete platform: quoting, production tracking, equipment costing, customer portal. $5,000/mo value included.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Slack Access',
    description: 'Message Jeremiah directly. Get answers when you need them, not when a support queue clears.',
  },
  {
    icon: DollarSign,
    title: 'Pricing Formula Setup',
    description: 'We\'ll configure your MulchingScore, StumpScore, and equipment costs for your specific operation.',
  },
]

export default function FoundingMemberPage() {
  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm">Limited to 10 Members</span>
            </div>

            <h1 className="text-5xl font-bold mb-6">Founding Member Program</h1>

            <p className="text-xl text-gray-300 mb-6">
              Weekly 1:1 coaching with Jeremiah. Full ShopOS access. Direct implementation support.
              Everything you need to systematize your tree service business.
            </p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold text-purple-400">$2,500</span>
              <span className="text-xl text-gray-400">/month</span>
            </div>

            <Link
              href="/pro/founding-member/apply"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What&apos;s Included</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {included.map((item) => (
              <div key={item.title} className="bg-gray-800 rounded-xl p-8">
                <item.icon className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
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
