import Link from 'next/link'
import { User } from 'lucide-react'

export const metadata = {
  title: 'Account',
}

export default function AccountPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <User className="w-10 h-10 text-orange-400" />
          <h1 className="text-3xl font-bold">Your Account</h1>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <p className="text-gray-400 mb-6">
            Customer account and order management coming soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/store/book" className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold">
              Book a Service
            </Link>
            <Link href="/auth/test" className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
