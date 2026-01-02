import Link from 'next/link'
import { Star, ArrowRight, ExternalLink } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

export const metadata = {
  title: 'Customer Reviews | TreeShop',
  description: 'See what Central Florida homeowners say about TreeShop land clearing and forestry mulching services.',
}

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Customer Reviews</h1>
            <p className="text-xl text-gray-400">
              See what Central Florida homeowners say about TreeShop
            </p>
          </div>

          {/* Google Reviews Card */}
          <div className="bg-gray-800 rounded-2xl p-12 text-center">
            <div className="flex justify-center gap-2 text-yellow-400 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-10 h-10 fill-current" />
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Read Our Real Google Reviews</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              See what our customers actually say about their experience with TreeShop.
              Real reviews from real projects across Central Florida.
            </p>

            <a
              href="https://www.google.com/search?q=TreeShop+LLC+New+Smyrna+Beach+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              View Reviews on Google <ExternalLink className="w-5 h-5" />
            </a>

            <p className="text-gray-500 text-sm mt-6">
              Honest reviews from homeowners we've served across Volusia, Seminole, Orange, and Brevard counties.
            </p>
          </div>

          {/* Why Trust Us */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">10</div>
              <div className="text-gray-400">Years in Business</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">32</div>
              <div className="text-gray-400">Cities Served</div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-green-600 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-green-100 mb-6">Join the hundreds of satisfied customers across Central Florida.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/estimate"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold"
              >
                What's Your Goal? <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:3868435266"
                className="inline-flex items-center justify-center gap-2 border-2 border-white hover:bg-green-700 px-8 py-4 rounded-lg font-semibold"
              >
                Call (386) 843-5266
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
