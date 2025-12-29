import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, ArrowRight, Clock, Trees, Droplets, CheckCircle } from 'lucide-react'
import { locations, getLocationBySlug, getNearbyLocations, HQ_LOCATION } from '@/data/locations'
import { BILLING_RATES } from '@/lib/pricing'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) return {}

  return {
    title: `Forestry Mulching & Land Clearing in ${location.city}, FL | TreeShop`,
    description: `Professional forestry mulching, land clearing, stump grinding, and drainage solutions in ${location.city}, ${location.county} County, Florida. Score-based pricing. Free estimates.`,
  }
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) {
    notFound()
  }

  const nearbyLocations = getNearbyLocations(slug)
  const transportCost = Math.round(location.transportTime * 2 * BILLING_RATES.transport) // Round trip

  const services = [
    {
      name: 'Forestry Mulching',
      description: 'Clear brush and trees up to 15" DBH, leave nutrient-rich mulch',
      icon: Trees,
      rate: `$${BILLING_RATES['forestry-mulching']}/hr`,
      href: '/services/forestry-mulching',
    },
    {
      name: 'Land Clearing',
      description: 'Complete lot preparation for construction',
      icon: Trees,
      rate: `$${BILLING_RATES['land-clearing']}/hr`,
      href: '/services/land-clearing',
    },
    {
      name: 'Stump Grinding',
      description: 'Remove stumps below grade with our Fecon Blackhawk',
      icon: Trees,
      rate: `$${BILLING_RATES['stump-grinding']}/hr`,
      href: '/services/stump-grinding',
    },
    {
      name: 'FreedomDrains',
      description: 'HydroBlox drainage with lifetime no-clog guarantee',
      icon: Droplets,
      rate: '$30-60/LF',
      href: '/services/drainage',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-green-400 mb-4">
            <Link href="/areas" className="hover:underline">Service Areas</Link>
            <span>/</span>
            <span>{location.county} County</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Forestry Mulching & Land Clearing in {location.city}, FL
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            {location.description}
          </p>

          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>{location.county} County, Florida</span>
            </div>
            {location.distanceFromHQ > 0 && (
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-5 h-5" />
                <span>{location.distanceFromHQ} miles from base • ~{location.transportTime}hr transport</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href={`/estimate?location=${location.slug}`}
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-4 rounded-lg font-semibold text-lg"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:3868435266"
              className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-4 rounded-lg font-semibold text-lg"
            >
              <Phone className="w-5 h-5" />
              (386) 843-5266
            </a>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Services in {location.city}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="group bg-gray-800 rounded-xl p-6 hover:ring-2 hover:ring-green-500/50 transition-all"
              >
                <service.icon className="w-10 h-10 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                <div className="text-green-400 font-semibold">{service.rate}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local Conditions */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">{location.city} Vegetation & Terrain</h2>
              <p className="text-gray-300 mb-6">{location.vegetationNotes}</p>

              <h3 className="text-xl font-semibold mb-4">Local Features We Work With</h3>
              <ul className="space-y-2">
                {location.localFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Common Projects in {location.city}</h2>
              <div className="space-y-4">
                {location.commonProjects.map((project, i) => (
                  <div key={i} className="bg-gray-800 rounded-lg p-4">
                    <div className="font-medium">{project}</div>
                  </div>
                ))}
              </div>

              {transportCost > 0 && (
                <div className="mt-8 bg-gray-800 rounded-xl p-6">
                  <h3 className="font-semibold mb-2">Transport to {location.city}</h3>
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ${transportCost}
                  </div>
                  <p className="text-gray-400 text-sm">
                    Round-trip from our base in New Smyrna Beach ({location.distanceFromHQ} miles each way).
                    Billed at $250/hr transport rate.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      {nearbyLocations.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">We Also Serve Nearby</h2>
            <div className="flex flex-wrap gap-3">
              {nearbyLocations.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/areas/${nearby.slug}`}
                  className="bg-gray-800 hover:bg-gray-750 px-4 py-2 rounded-lg transition-colors"
                >
                  {nearby.city}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Clear Your {location.city} Property?</h2>
          <p className="text-green-100 mb-8">
            Get a score-based quote in minutes. No guessing, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/estimate?location=${location.slug}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              Get Your Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:3868435266"
              className="inline-flex items-center justify-center gap-2 border-2 border-white hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              <Phone className="w-5 h-5" />
              (386) 843-5266
            </a>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'TreeShop LLC',
            description: `Forestry mulching and land clearing services in ${location.city}, Florida`,
            url: `https://treeshop.app/areas/${location.slug}`,
            telephone: '+1-386-843-5266',
            email: 'office@fltreeshop.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '3634 Watermelon Lane',
              addressLocality: 'New Smyrna Beach',
              addressRegion: 'FL',
              postalCode: '32168',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: location.coordinates.lat,
              longitude: location.coordinates.lng,
            },
            areaServed: {
              '@type': 'City',
              name: location.city,
              containedInPlace: {
                '@type': 'State',
                name: 'Florida',
              },
            },
            priceRange: '$',
            openingHours: 'Mo-Fr 07:00-18:00',
            sameAs: [
              'https://www.youtube.com/@thetreeshop',
            ],
          }),
        }}
      />
    </div>
  )
}
