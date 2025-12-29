import Link from 'next/link'
import { Zap, BookOpen, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'For Operators',
  description: 'ShopOS platform, courses, and tools for tree service professionals.',
}

const products = [
  {
    slug: 'shopos',
    title: 'ShopOS Platform',
    description: 'The operating system for tree service businesses. Score-based quoting, production tracking, and more.',
    icon: Zap,
    price: 'From $500/mo',
    badge: 'Founding Member Only',
    href: '/store/operators/shopos',
  },
  {
    slug: 'courses',
    title: 'Operator Courses',
    description: 'Learn pricing, equipment costing, and business systems from 16 years of experience.',
    icon: BookOpen,
    price: 'Coming Soon',
    badge: null,
    href: '/store/operators/courses',
  },
]

export default function OperatorsPage() {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">For Tree Service Operators</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tools, training, and systems to help you join the 18% that survive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={product.href}
              className="group bg-gray-800 rounded-xl p-8 hover:ring-2 hover:ring-purple-500/50 transition-all relative"
            >
              {product.badge && (
                <div className="absolute top-4 right-4 bg-purple-600 text-xs px-3 py-1 rounded-full">
                  {product.badge}
                </div>
              )}
              <product.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                {product.title}
              </h2>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-purple-400">{product.price}</span>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-red-900/20 border border-red-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Free Content on YouTube</h3>
          <p className="text-gray-400 mb-6">
            17,000+ subscribers learning the business side of tree service. New videos weekly.
          </p>
          <a
            href="https://youtube.com/@thetreeshop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
          >
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </div>
  )
}
