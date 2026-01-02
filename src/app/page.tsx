import Link from 'next/link'
import {
  ArrowRight, Phone, Trees, CircleDot, Droplets, Shovel,
  CheckCircle, Star, MapPin, Clock, Shield, Users,
  Calculator, FileText, Video, Award, Home, Tractor, DollarSign, HelpCircle
} from 'lucide-react'
import { Header, Footer } from '@/components/layout'

export const metadata = {
  title: 'TreeShop - Professional Land Clearing & Forestry Mulching | Central Florida',
  description: 'Central Florida\'s trusted land clearing experts. Forestry mulching, stump grinding, and FreedomDrains. Transparent pricing, free same-day quotes. Serving Volusia, Seminole, Orange, Brevard.',
}

const services = [
  {
    title: 'Forestry Mulching',
    description: 'Clear brush, saplings, and trees up to 15" diameter. One machine does it all—no hauling, no burning. Mulch stays as ground cover.',
    icon: Trees,
    href: '/services/forestry-mulching',
    features: ['Up to 15" diameter', 'No hauling costs', 'Same-day quotes'],
    color: 'green',
  },
  {
    title: 'Land Clearing',
    description: 'Complete lot preparation for construction, agriculture, or property improvement. Selective or full clearing based on your needs.',
    icon: Shovel,
    href: '/services/land-clearing',
    features: ['Residential & commercial', 'Selective clearing', 'Site prep ready'],
    color: 'green',
  },
  {
    title: 'Stump Grinding',
    description: 'Remove stumps below grade with professional equipment. Any size, any quantity. Clean finish ready for landscaping.',
    icon: CircleDot,
    href: '/services/stump-grinding',
    features: ['Any size stump', 'Below grade', 'Debris cleanup'],
    color: 'blue',
  },
  {
    title: 'FreedomDrains',
    description: 'Florida\'s only lifetime-guaranteed drainage. Hydroblox technology that never clogs—even in our sandy soil.',
    icon: Droplets,
    href: '/services/drainage',
    features: ['Lifetime guarantee', 'No gravel', 'Works on flat ground'],
    color: 'blue',
    badge: 'Lifetime Guarantee',
  },
]

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Completed' },
  { value: '67', label: 'Counties Served' },
  { value: '32+', label: 'Cities Served' },
]

const process = [
  { step: '1', title: 'Get Your Quote', description: 'Use our online estimator or call. Same-day quotes, transparent pricing.' },
  { step: '2', title: 'Schedule Service', description: 'Pick a date that works. We confirm within 24 hours.' },
  { step: '3', title: 'We Clear It', description: 'Professional crew, professional equipment. Usually done in one day.' },
  { step: '4', title: 'You Enjoy It', description: 'Clean property, no debris, ready for your next project.' },
]

// Reviews section removed - will use real Google reviews only

const resources = [
  { title: 'Land Clearing Estimator', description: 'Get an instant quote', icon: Calculator, href: '/estimate' },
  { title: 'Cost Calculators', description: '7 free tools', icon: Calculator, href: '/tools' },
  { title: 'Learning Center', description: 'Guides & articles', icon: FileText, href: '/blog' },
  { title: 'YouTube Channel', description: '17K+ subscribers', icon: Video, href: 'https://youtube.com/@thetreeshop', external: true },
]

const outcomes = [
  {
    title: 'Build Something',
    description: 'Prepare land for construction, home sites, or new structures',
    icon: Home,
    services: 'Land clearing, site prep, stump grinding',
    goal: 'build',
  },
  {
    title: 'Create Usable Land',
    description: 'Turn overgrown areas into functional outdoor spaces',
    icon: Tractor,
    services: 'Forestry mulching, brush clearing, grading',
    goal: 'usable-land',
  },
  {
    title: 'Clean Up Overgrowth',
    description: 'Remove brush, saplings, and unwanted vegetation',
    icon: Trees,
    services: 'Forestry mulching, selective clearing',
    goal: 'cleanup',
  },
  {
    title: 'Fix Drainage/Flooding',
    description: 'Solve water problems and improve drainage',
    icon: Droplets,
    services: 'FreedomDrains, grading, drainage solutions',
    goal: 'drainage',
  },
  {
    title: 'Increase Property Value',
    description: 'Improve curb appeal and land usability',
    icon: DollarSign,
    services: 'Land clearing, landscaping prep, cleanup',
    goal: 'value',
  },
  {
    title: 'Not Sure Yet',
    description: 'Let us help you figure out what you need',
    icon: HelpCircle,
    services: 'Free consultation and site assessment',
    goal: 'consult',
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <div>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-green-900/20 to-gray-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                From Overgrown to Done. One Project. One Contractor.
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 mb-4">
                Whether you're building, clearing, or just tired of looking at the mess—we handle it all.
              </p>
              <p className="text-gray-400 mb-8 max-w-2xl">
                Central Florida's trusted land clearing experts. No surprises, no runaround.
                Just honest work from start to finish.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/estimate"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  What's Your Goal? <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:3868435266"
                  className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  <Phone className="w-5 h-5" /> (386) 843-5266
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  One contractor, start to finish
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  No surprise next steps
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Transparent, upfront pricing
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-gray-950 py-8 border-y border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-green-400">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Showcase */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Real Projects, Real Results</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                See the transformation. From overgrown lots to clear, usable land.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl overflow-hidden group cursor-pointer">
                <img
                  src="/images/forestry-309-excavator.jpg"
                  alt="CAT 309 excavator with forestry mulching head"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="rounded-xl overflow-hidden group cursor-pointer">
                <img
                  src="/images/land-clearing-2.jpg"
                  alt="Complete land clearing project"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="rounded-xl overflow-hidden group cursor-pointer">
                <img
                  src="/images/excavator-dramatic-sky.jpg"
                  alt="Land clearing equipment in action"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold"
              >
                View All Projects <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* What Do You Want To Do With Your Land? */}
        <section className="py-20 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Do You Want To Do With Your Land?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Start with your goal. We'll figure out what services you need.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {outcomes.map((outcome) => (
                <Link
                  key={outcome.title}
                  href={`/estimate?goal=${outcome.goal}`}
                  className="group bg-gray-900 rounded-xl p-6 hover:ring-2 hover:ring-green-500/50 transition-all hover:bg-gray-800"
                >
                  <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                    <outcome.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                    {outcome.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{outcome.description}</p>
                  <p className="text-xs text-gray-500">
                    May include: <span className="text-gray-400">{outcome.services}</span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Professional land clearing services with transparent, upfront pricing.
                No surprises, no hidden fees.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group bg-gray-800 rounded-2xl p-8 hover:ring-2 hover:ring-blue-500/50 transition-all relative overflow-hidden"
                >
                  {service.badge && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-xs px-3 py-1 rounded-full">
                      {service.badge}
                    </div>
                  )}
                  <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-xs bg-gray-700 px-3 py-1 rounded-full text-gray-300">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-blue-400 font-medium">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/services" className="text-blue-400 hover:underline">
                View All Services →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Why Central Florida Trusts TreeShop
                </h2>
                <p className="text-gray-400 mb-8">
                  We're not just another land clearing company. We built our reputation on
                  transparent pricing, reliable service, and treating every property like our own.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Transparent Pricing</h3>
                      <p className="text-gray-400 text-sm">
                        Get your quote online in minutes. The price we quote is the price you pay.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Fast Turnaround</h3>
                      <p className="text-gray-400 text-sm">
                        Most projects completed in one day. Quote to invoice in 20 days or less.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">10 Years Experience</h3>
                      <p className="text-gray-400 text-sm">
                        500+ projects completed across Central Florida. We know this land.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Local & Family-Owned</h3>
                      <p className="text-gray-400 text-sm">
                        Based in New Smyrna Beach. We live here, we work here, we care.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">What's Your Goal?</h3>
                <p className="text-gray-400 mb-6">
                  Use our instant estimator or call for a personalized quote.
                  Most quotes delivered same-day.
                </p>
                <div className="space-y-4">
                  <Link
                    href="/estimate"
                    className="block text-center bg-green-600 hover:bg-green-700 py-4 rounded-lg font-semibold transition-colors"
                  >
                    Start Your Estimate
                  </Link>
                  <a
                    href="tel:3868435266"
                    className="block text-center bg-gray-700 hover:bg-gray-600 py-4 rounded-lg font-semibold transition-colors"
                  >
                    Call (386) 843-5266
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-400">Simple process, professional results.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <div key={item.step} className="text-center relative">
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-700" />
                  )}
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Google Reviews */}
        <section className="py-20 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">See What Our Customers Say</h2>
            <p className="text-gray-400 mb-8">Read real reviews from Central Florida homeowners on Google.</p>
            <a
              href="https://www.google.com/search?q=TreeShop+LLC+New+Smyrna+Beach+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold"
            >
              Read Reviews on Google <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-20 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Free Resources</h2>
              <p className="text-gray-400">
                Tools, calculators, and guides to help you plan your project.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  target={resource.external ? '_blank' : undefined}
                  rel={resource.external ? 'noopener noreferrer' : undefined}
                  className="bg-gray-800 rounded-xl p-6 hover:ring-2 hover:ring-green-500/50 transition-all group"
                >
                  <resource.icon className="w-10 h-10 text-green-400 mb-4" />
                  <h3 className="font-semibold mb-1 group-hover:text-green-400">{resource.title}</h3>
                  <p className="text-gray-400 text-sm">{resource.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Social Follow */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Follow Our Latest Projects</h2>
            <p className="text-gray-400 text-xl mb-8">
              See our recent work, equipment updates, and project photos on Facebook
            </p>
            <a
              href="https://www.facebook.com/TreeShopFlorida"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              Follow us on Facebook
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-green-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Clear Your Property?
            </h2>
            <p className="text-green-100 text-xl mb-8">
              Get your free quote in minutes. No obligation, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/estimate"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                What's Your Goal? <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:3868435266"
                className="inline-flex items-center justify-center gap-2 border-2 border-white hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                <Phone className="w-5 h-5" /> (386) 843-5266
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
