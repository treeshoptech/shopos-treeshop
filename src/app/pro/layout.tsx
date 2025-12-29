import Link from 'next/link'
import { Zap } from 'lucide-react'

export const metadata = {
  title: {
    template: '%s | TreeShop Pro',
    default: 'TreeShop Pro - For Tree Service Operators',
  },
}

function ProNav() {
  return (
    <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/pro" className="flex items-center gap-2">
            <img src="/logos/treeshop-logo.svg" alt="TreeShop" className="h-8" />
            <span className="font-bold text-xl text-purple-400">Pro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/pro/founding-member" className="text-gray-300 hover:text-white transition-colors">
              Founding Member
            </Link>
            <Link href="/pro/shopos" className="text-gray-300 hover:text-white transition-colors">
              ShopOS
            </Link>
            <Link href="/pro/resources" className="text-gray-300 hover:text-white transition-colors">
              Resources
            </Link>
            <a href="/" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
              ← Main Site
            </a>
          </nav>

          <Link
            href="/pro/founding-member/apply"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </header>
  )
}

function ProFooter() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logos/treeshop-logo.svg" alt="TreeShop" className="h-7" />
              <span className="font-bold text-purple-400">Pro</span>
            </div>
            <p className="text-gray-400 text-sm">
              The operating system for tree service businesses. Built by an operator, for operators.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/pro/founding-member" className="hover:text-white">Founding Member</Link></li>
              <li><Link href="/pro/shopos" className="hover:text-white">ShopOS Platform</Link></li>
              <li><Link href="/pro/shopos/pricing" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="https://youtube.com/@thetreeshop" className="hover:text-white">YouTube Channel</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><Link href="/pro/resources" className="hover:text-white">Guides</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>jeremiah@treeshop.app</li>
              <li>(386) 843-5266</li>
              <li>New Smyrna Beach, FL</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TreeShop LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <a href="/" className="hover:text-white">treeshop.app</a>
            <span>•</span>
            <span>A TreeShop Product</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <ProNav />
      <main className="flex-1">{children}</main>
      <ProFooter />
    </div>
  )
}
