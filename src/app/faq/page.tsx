import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

const faqCategories = [
  {
    name: 'Pricing',
    faqs: [
      { q: 'How do you price forestry mulching?', a: 'We use a DBH (Diameter at Breast Height) package system. The price depends on the largest trees on your property, ranging from $2,240/acre for 4" brush to $5,320/acre for 10" trees.' },
      { q: 'Is there a minimum job size?', a: 'Yes, our minimum is typically 0.5 acres for forestry mulching due to equipment mobilization costs. For stump grinding, we have a $300 minimum.' },
      { q: 'Do you offer financing?', a: 'We accept a 25% deposit with the balance due on completion. For larger projects, we can discuss payment schedules.' },
      { q: 'What\'s included in the quote?', a: 'Everything. Equipment, labor, transport, fuel. The price we quote is the price you pay. No surprise fees.' },
    ],
  },
  {
    name: 'Services',
    faqs: [
      { q: 'What\'s the difference between forestry mulching and traditional land clearing?', a: 'Forestry mulching grinds trees and vegetation in place, leaving nutrient-rich mulch. Traditional clearing removes everything (trees, stumps, topsoil) and hauls it away. Mulching is faster, cheaper, and better for the soil.' },
      { q: 'Can you remove trees larger than 10" diameter?', a: 'Our mulcher handles up to 10" efficiently. For larger trees, we can fell and process them, or recommend a tree removal specialist for the largest specimens.' },
      { q: 'What happens to the stumps?', a: 'Our mulcher takes stumps down to 2-4" below grade. For deeper grinding (6-12" below), we use our dedicated stump grinder at additional cost.' },
      { q: 'Do you handle permits?', a: 'We can advise on permit requirements, but the property owner is typically responsible for obtaining permits. Most residential clearing doesn\'t require permits unless you\'re near wetlands or protected areas.' },
    ],
  },
  {
    name: 'Process',
    faqs: [
      { q: 'How long does a typical job take?', a: 'Most residential lots (1-3 acres) are completed in 1-2 days. Larger properties may take longer. We\'ll give you a timeline in your quote.' },
      { q: 'Do I need to be home during the work?', a: 'No, but we do need clear access to the property. Many customers provide gate codes or meet us once at the start.' },
      { q: 'What do I need to do to prepare?', a: 'Mark any areas you want protected (specific trees, structures, utilities). Remove any vehicles or equipment from the work area. That\'s it.' },
      { q: 'How do I pay?', a: '25% deposit secures your spot on our schedule. Balance due on completion. We accept check, card, or ACH transfer.' },
    ],
  },
  {
    name: 'Service Area',
    faqs: [
      { q: 'What areas do you serve?', a: 'We serve Volusia, Seminole, Orange, Brevard, Lake, Osceola, and Flagler counties. Our base is in Port Orange.' },
      { q: 'Do you charge extra for travel?', a: 'Transport cost is included in every quote, calculated based on distance from our base. No hidden travel fees.' },
      { q: 'Do you work outside your main service area?', a: 'For larger projects (5+ acres), we can travel further. Contact us to discuss.' },
    ],
  },
  {
    name: 'FreedomDrains',
    faqs: [
      { q: 'Why do French drains fail?', a: 'Traditional French drains use perforated pipe wrapped in fabric. In Florida\'s sandy soil, fine particles clog the fabric within 5-10 years. The drain stops working but the problem remains.' },
      { q: 'What makes FreedomDrains different?', a: 'We use HydroBlox panels instead of pipe. They can\'t clog—water flows through solid aggregate panels. Lifetime no-clog guarantee.' },
      { q: 'How much do FreedomDrains cost?', a: 'Typical residential systems range from $1,500 to $6,000 depending on linear footage and complexity. We provide exact quotes after assessment.' },
    ],
  },
]

export const metadata = {
  title: 'FAQ | TreeShop Land Clearing',
  description: 'Frequently asked questions about forestry mulching, land clearing, pricing, and our process.',
}

export default function FAQPage() {
  return (
    <>
      <Header />
      <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300">
            Everything you need to know about our services, pricing, and process.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          {faqCategories.map((category) => (
            <div key={category.name} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">{category.name}</h2>
              <div className="space-y-4">
                {category.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="bg-gray-800 rounded-xl overflow-hidden group"
                  >
                    <summary className="px-6 py-4 cursor-pointer font-medium hover:bg-gray-750 list-none flex items-center justify-between">
                      {faq.q}
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-6 pb-4 text-gray-400">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-400 mb-8">
            Can&apos;t find what you&apos;re looking for? We&apos;re happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:3868435266"
              className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium"
            >
              Call (386) 843-5266
            </a>
          </div>
        </div>
      </section>
    </div>
      <Footer />
    </>
  )
}
