import Link from 'next/link'
import { Trees, CircleDot, Droplets, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Book Services',
  description: 'Book forestry mulching, stump grinding, or drainage installation with TreeShop.',
}

const services = [
  {
    slug: 'forestry-mulching',
    title: 'Forestry Mulching',
    description: 'Clear brush and trees up to 15" DBH. One machine, no hauling.',
    icon: Trees,
    startingAt: '$475/hour',
    depositNote: '25% deposit to book',
  },
  {
    slug: 'stump-grinding',
    title: 'Stump Grinding',
    description: 'Remove stumps below grade with our Fecon Blackhawk.',
    icon: CircleDot,
    startingAt: '$400/hour',
    depositNote: '25% deposit to book',
  },
  {
    slug: 'drainage',
    title: 'FreedomDrains',
    description: 'HydroBlox drainage with lifetime no-clog guarantee.',
    icon: Droplets,
    startingAt: '$30/linear foot',
    depositNote: '25% deposit to book',
  },
]

export default function BookServicesPage() {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Book a Service</h1>
        <p className="text-xl text-gray-400 mb-12">
          Pay 25% deposit to secure your spot. We&apos;ll contact you within 24 hours to schedule.
        </p>

        <div className="grid gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/store/book/${service.slug}`}
              className="group bg-gray-800 rounded-xl p-6 flex items-center gap-6 hover:ring-2 hover:ring-orange-500/50 transition-all"
            >
              <div className="w-16 h-16 bg-green-600/20 rounded-xl flex items-center justify-center shrink-0">
                <service.icon className="w-8 h-8 text-green-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1 group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-400">{service.description}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-lg font-semibold text-green-400">{service.startingAt}</div>
                <div className="text-sm text-gray-500">{service.depositNote}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-gray-800 rounded-xl p-6">
          <h3 className="font-semibold mb-2">Need a Custom Quote?</h3>
          <p className="text-gray-400 mb-4">
            For larger projects or multiple services, use our estimator for a detailed quote.
          </p>
          <a
            href="/estimate"
            className="inline-flex items-center gap-2 text-orange-400 hover:underline"
          >
            Go to Quote Estimator <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
