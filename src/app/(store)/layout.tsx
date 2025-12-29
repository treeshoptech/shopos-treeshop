import Link from 'next/link'
import { ShoppingBag, User, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: {
    template: '%s | TreeShop Store',
    default: 'TreeShop Store',
  },
}

function StoreNav() {
  return (
    <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/store" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl">TreeShop Store</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/store/book" className="text-gray-300 hover:text-white transition-colors">
              Book Services
            </Link>
            <Link href="/store/operators" className="text-gray-300 hover:text-white transition-colors">
              For Operators
            </Link>
            <a href="/" className="text-gray-500 hover:text-gray-300 transition-colors text-sm flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Main Site
            </a>
          </nav>

          <Link
            href="/store/account"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Account</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

function StoreFooter() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TreeShop LLC. Secure payments by Stripe.
          </p>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <a href="/" className="hover:text-white">treeshop.app</a>
            <span>•</span>
            <a href="/pro" className="hover:text-white">TreeShop Pro</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <StoreNav />
      <main className="flex-1">{children}</main>
      <StoreFooter />
    </div>
  )
}
