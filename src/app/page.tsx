import Link from 'next/link'
import { ArrowRight, Trees, Droplets, CircleDot, Phone, Star, CheckCircle, MapPin } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

export default function HomePage() {
  return (
    <>
      <Header />
      <div>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Central Florida&apos;s Land Clearing & Forestry Mulching Experts
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Transparent Pricing | Free Same-Day Quotes | 32 Communities Served
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/estimate"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                Get Your Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:3868435266"
                className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                <Phone className="w-5 h-5" /> (386) 843-5266
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Forestry Mulching', icon: Trees, href: '/services/forestry-mulching' },
                { name: 'Land Clearing', icon: Trees, href: '/services/land-clearing' },
                { name: 'Stump Grinding', icon: CircleDot, href: '/services/stump-grinding' },
                { name: 'Drainage Solutions', icon: Droplets, href: '/services/drainage' },
              ].map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="group bg-gray-800 rounded-xl p-6 hover:ring-2 hover:ring-green-500/50 transition-all"
                >
                  <service.icon className="w-10 h-10 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold group-hover:text-green-400">{service.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="py-20 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                <p className="text-gray-400">Get an instant quote online. No surprises.</p>
              </div>
              <div className="text-center">
                <Star className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">10 Years Experience</h3>
                <p className="text-gray-400">500+ projects across Central Florida.</p>
              </div>
              <div className="text-center">
                <MapPin className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">32 Communities</h3>
                <p className="text-gray-400">From Daytona to Orlando.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
