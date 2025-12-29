import Link from 'next/link'
import { ArrowRight, Trees, Users, ShoppingBag, Shield, Clock, CreditCard } from 'lucide-react'

export const metadata = {
  title: 'TreeShop Store - Book Services & Shop',
  description: 'Book forestry mulching, land clearing, stump grinding, and drainage services. Shop operator tools and merch.',
}

const categories = [
  {
    title: 'Book Services',
    description: 'Schedule forestry mulching, land clearing, stump grinding, or drainage installation.',
    icon: Trees,
    href: '/store/book',
    color: 'bg-green-600',
  },
  {
    title: 'For Operators',
    description: 'ShopOS platform, courses, templates, and business tools for tree service professionals.',
    icon: Users,
    href: '/store/operators',
    color: 'bg-purple-600',
  },
]

const trustSignals = [
  { icon: Shield, text: '16 Years Experience' },
  { icon: Clock, text: 'Same-Week Scheduling' },
  { icon: CreditCard, text: 'Secure Stripe Payments' },
]

export default function StoreHomePage() {
  return (
    <div>
      <section className="py-16 bg-gradient-to-br from-gray-900 via-orange-900/20 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <ShoppingBag className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm">TreeShop Store</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Book Services. Shop Tools. Get Started.
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            From booking your land clearing project to equipping your tree service business –
            everything in one place.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {trustSignals.map((signal) => (
              <div key={signal.text} className="flex items-center gap-2 text-gray-400">
                <signal.icon className="w-5 h-5" />
                <span>{signal.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group bg-gray-800 rounded-2xl p-8 hover:ring-2 hover:ring-orange-500/50 transition-all"
              >
                <div className={`w-14 h-14 ${cat.color} rounded-xl flex items-center justify-center mb-6`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                  {cat.title}
                </h2>
                <p className="text-gray-400 mb-4">{cat.description}</p>
                <span className="inline-flex items-center gap-2 text-orange-400">
                  Browse <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">How Booking Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Choose Service</h3>
              <p className="text-gray-400 text-sm">Select your service type and package</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Pay Deposit</h3>
              <p className="text-gray-400 text-sm">25% deposit secures your spot</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">We Schedule</h3>
              <p className="text-gray-400 text-sm">We contact you within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
