import Link from 'next/link'
import { Calculator, Droplets, Clock, CloudRain, Trees, CircleDot } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

const tools = [
  {
    category: 'Drainage Tools',
    items: [
      {
        id: 'drainage-calculator',
        name: 'Drainage Cost Calculator',
        description: 'Estimate FreedomDrains cost vs French drain for your property',
        icon: Droplets,
        href: '/tools/drainage-calculator',
        gated: true,
      },
      {
        id: 'drainage-estimate',
        name: 'Drainage Assessment Quiz',
        description: '5 questions to get your personalized drainage recommendation',
        icon: Droplets,
        href: '/tools/drainage-estimate',
        gated: true,
      },
      {
        id: 'french-drain-lifespan',
        name: 'French Drain Failure Predictor',
        description: 'How much life is left in your French drain?',
        icon: Clock,
        href: '/tools/french-drain-lifespan',
        gated: true,
      },
      {
        id: 'rainwater-calculator',
        name: 'Stormwater Runoff Calculator',
        description: 'See how many gallons your property handles in a storm',
        icon: CloudRain,
        href: '/tools/rainwater-calculator',
        gated: false,
      },
    ],
  },
  {
    category: 'Cost Estimators',
    items: [
      {
        id: 'land-clearing-estimator',
        name: 'Land Clearing Estimator',
        description: 'Get instant DBH-based pricing for forestry mulching',
        icon: Trees,
        href: '/tools/land-clearing-estimator',
        gated: true,
      },
      {
        id: 'stump-cost-calculator',
        name: 'Stump Grinding Calculator',
        description: 'Calculate cost per stump with StumpScore formula',
        icon: CircleDot,
        href: '/tools/stump-cost-calculator',
        gated: false,
      },
    ],
  },
]

export const metadata = {
  title: 'Free Tools | TreeShop',
  description: 'Free calculators for drainage, land clearing, and stump grinding costs. Get instant estimates using TreeShop\'s proprietary formulas.',
}

export default function ToolsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900">
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl font-bold">Free Tools</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl">
            Calculate costs, predict failures, and plan projects with the same formulas we use every day.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {tools.map((category) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-300">{category.category}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all hover:ring-2 hover:ring-blue-500/50"
                  >
                    <div className="flex items-start gap-4">
                      <tool.icon className="w-10 h-10 text-blue-500 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                            {tool.name}
                          </h3>
                          {tool.gated && (
                            <span className="text-xs bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded">
                              Email required
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 mt-1">{tool.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
      <Footer />
    </>
  )
}
