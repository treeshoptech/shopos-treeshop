import Link from 'next/link'
import { Zap, ArrowRight, CheckCircle } from 'lucide-react'

export default function ShopOSStorePage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Zap className="w-16 h-16 text-purple-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">ShopOS Platform</h1>
        <p className="text-xl text-gray-400 mb-12">
          The operating system for tree service businesses. Currently available through Founding Member program only.
        </p>

        <div className="bg-gradient-to-br from-purple-900/30 to-gray-900 border border-purple-500/30 rounded-xl p-8 mb-8">
          <div className="text-4xl font-bold text-purple-400 mb-2">$2,500/mo</div>
          <div className="text-gray-400 mb-6">Founding Member (includes weekly coaching)</div>
          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-purple-400" />
              Full ShopOS platform access
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-purple-400" />
              Weekly 1:1 strategy calls
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-purple-400" />
              Direct Slack access to Jeremiah
            </li>
          </ul>
          <a
            href="/pro/founding-member/apply"
            className="block bg-purple-600 hover:bg-purple-700 py-4 rounded-lg font-semibold"
          >
            Apply for Founding Member
          </a>
        </div>

        <p className="text-gray-400">
          <a href="/pro/shopos" className="text-purple-400 hover:underline">
            Learn more about ShopOS →
          </a>
        </p>
      </div>
    </div>
  )
}
