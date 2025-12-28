import Link from 'next/link'
import { ArrowRight, Trees, Shovel, CircleDot, Droplets, HelpCircle } from 'lucide-react'

const services = [
  {
    id: 'forestry-mulching',
    name: 'Forestry Mulching',
    description: 'Transform overgrown land into usable property. Our mulcher processes trees up to 10" diameter, leaving nutrient-rich mulch behind.',
    icon: Trees,
    priceRange: '$2,240 - $5,320/acre',
    href: '/services/forestry-mulching',
  },
  {
    id: 'land-clearing',
    name: 'Land Clearing',
    description: 'Complete lot preparation for construction, agriculture, or property improvement. Includes stumps and debris.',
    icon: Shovel,
    priceRange: '$2,240 - $5,320/acre',
    href: '/services/land-clearing',
  },
  {
    id: 'stump-grinding',
    name: 'Stump Grinding',
    description: 'Remove unsightly stumps below grade. Our Fecon Blackhawk handles any size stump with precision.',
    icon: CircleDot,
    priceRange: '$150 - $500+ per stump',
    href: '/services/stump-grinding',
  },
  {
    id: 'drainage',
    name: 'FreedomDrains',
    description: 'Lifetime no-clog drainage solutions using HydroBlox technology. Solves problems French drains can\'t.',
    icon: Droplets,
    priceRange: '$1,500 - $6,000',
    href: '/services/drainage',
  },
]

export const metadata = {
  title: 'Services | TreeShop Land Clearing & Forestry Mulching',
  description: 'Professional forestry mulching, land clearing, stump grinding, and drainage solutions in Central Florida. Transparent DBH pricing.',
}

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            From clearing overgrown lots to solving drainage nightmares—we handle every aspect of land transformation with transparent pricing.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all hover:ring-2 hover:ring-green-500/50"
              >
                <service.icon className="w-12 h-12 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  {service.name}
                </h2>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-semibold">{service.priceRange}</span>
                  <span className="flex items-center gap-1 text-gray-400 group-hover:text-green-400 transition-colors">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Not Sure CTA */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <HelpCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Tell us about your property and goals. We&apos;ll recommend the right approach and give you transparent pricing.
          </p>
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg"
          >
            Get a Free Estimate
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
