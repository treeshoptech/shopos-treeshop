import Link from 'next/link'
import { MapPin, Phone, ArrowRight } from 'lucide-react'
import { locations, counties, HQ_LOCATION } from '@/data/locations'
import { Header, Footer } from '@/components/layout'

export const metadata = {
  title: 'Service Areas | TreeShop Central Florida',
  description: 'TreeShop serves 32+ cities across 7 Central Florida counties. Forestry mulching, land clearing, stump grinding, and drainage solutions from Daytona to Orlando.',
}

export default function AreasPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-10 h-10 text-green-500" />
            <h1 className="text-4xl font-bold">Service Areas</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mb-6">
            We serve 32+ cities across 7 Central Florida counties. Based in New Smyrna Beach,
            we bring professional forestry mulching and land clearing to the entire region.
          </p>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-5 h-5" />
            <span>HQ: {HQ_LOCATION.address}</span>
          </div>
        </div>
      </section>

      {/* Counties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {counties.map((county) => {
            const countyLocations = locations.filter(l => l.county === county.name)
            return (
              <div key={county.name} className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{county.name} County</h2>
                    <p className="text-gray-400">{county.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{countyLocations.length} cities</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {countyLocations.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/areas/${location.slug}`}
                      className="group bg-gray-800 hover:bg-gray-750 rounded-lg p-4 transition-all hover:ring-2 hover:ring-green-500/50"
                    >
                      <div className="font-medium group-hover:text-green-400 transition-colors">
                        {location.city}
                      </div>
                      {location.distanceFromHQ > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {location.distanceFromHQ} mi from base
                        </div>
                      )}
                      {location.tier === 1 && (
                        <div className="text-xs text-green-500 mt-1">Primary</div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Service Area Map</h3>
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Interactive map coming soon</span>
            </div>
            <p className="text-gray-400 mt-4">
              From Flagler County to Osceola, we cover the Central Florida region.
            </p>
          </div>
        </div>
      </section>

      {/* Don't See Your Area */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Don&apos;t See Your Area?</h2>
          <p className="text-gray-400 mb-6">
            We may still be able to help. Contact us to discuss your project location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:3868435266"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
            >
              <Phone className="w-5 h-5" />
              (386) 843-5266
            </a>
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold"
            >
              Get a Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
      <Footer />
    </>
  )
}
