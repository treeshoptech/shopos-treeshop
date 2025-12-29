import Link from 'next/link'
import { Users, Truck, Shield, Award, Youtube, ArrowRight } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

const values = [
  { icon: Shield, title: 'Transparency', description: 'Consistent pricing means no surprises. You know the cost before we start.' },
  { icon: Award, title: 'Craftsmanship', description: '10 years refining our process. Every job done right.' },
  { icon: Users, title: 'Family-Owned', description: 'Jeremiah & Lacey run every aspect. You work with owners, not employees.' },
]

export const metadata = {
  title: 'About TreeShop | Central Florida Land Clearing Experts',
  description: 'Meet the team behind TreeShop. 10 years of forestry mulching and land clearing experience in Central Florida. Family-owned, transparent pricing.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              The Team Behind TreeShop
            </h1>
            <p className="text-xl text-gray-300">
              Family-owned. Operator-run. 10 years of transforming Central Florida properties.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  TreeShop started with a simple frustration: why is tree service pricing so inconsistent?
                  Two companies quote the same job, get wildly different numbers. Neither can explain why.
                </p>
                <p>
                  Jeremiah spent 10 years in the field, obsessing over the math. What actually drives job cost?
                  Tree diameter. Density. Access. He built a systematic pricing approach that
                  turns gut-feel estimates into predictable quotes.
                </p>
                <p>
                  Today, TreeShop runs on those systems. Every quote is calculated, not guessed.
                  That&apos;s why our pricing is consistent. That&apos;s why there are no surprises.
                </p>
                <p>
                  Lacey handles operations, keeping jobs on schedule and customers informed.
                  Together, we&apos;ve completed 500+ projects across Central Florida.
                </p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="aspect-video bg-gray-700 rounded-lg mb-6 flex items-center justify-center text-gray-500">
                Team Photo Placeholder
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold">Jeremiah & Lacey Anderson</div>
                <div className="text-gray-400">Owners, TreeShop LLC</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <value.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube / ShopOS Teaser */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl p-8">
              <Youtube className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Watch Us Work</h3>
              <p className="text-gray-400 mb-6">
                17,000+ subscribers follow along as we document jobs, share pricing breakdowns, and teach the business of tree service.
              </p>
              <a
                href="https://youtube.com/@thetreeshop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300"
              >
                Subscribe on YouTube
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="text-2xl font-bold text-green-400 mb-4">ShopOS</div>
              <h3 className="text-2xl font-bold mb-4">For Tree Service Operators</h3>
              <p className="text-gray-400 mb-6">
                The systems we built to run TreeShop? We&apos;re packaging them for other operators.
                Score-based pricing, production tracking, the math nobody else has figured out.
              </p>
              <Link
                href="/pro"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300"
              >
                Learn About ShopOS
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-green-100 mb-8">Get a transparent quote with no surprises.</p>
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg"
          >
            Get Your Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
}
