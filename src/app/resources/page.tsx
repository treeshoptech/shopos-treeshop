import Link from 'next/link'
import { Calculator, FileText, Video, Wrench, ArrowRight, BookOpen } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

export const metadata = {
  title: 'Free Resources | TreeShop',
  description: 'Free tools, calculators, guides, and videos to help plan your land clearing project.',
}

const tools = [
  { name: 'Land Clearing Estimator', description: 'Get an instant quote for your project', href: '/estimate', icon: Calculator },
  { name: 'Drainage Cost Calculator', description: 'Calculate FreedomDrains pricing', href: '/tools/drainage-calculator', icon: Calculator },
  { name: 'French Drain Failure Predictor', description: 'How long until your drain clogs?', href: '/tools/french-drain-lifespan', icon: Wrench },
  { name: 'Stump Cost Calculator', description: 'Price by stump size', href: '/tools/stump-cost-calculator', icon: Calculator },
  { name: 'Rainwater Calculator', description: 'How much water hits your property?', href: '/tools/rainwater-calculator', icon: Calculator },
  { name: 'Drainage Quiz', description: '5 questions to get drainage recommendation', href: '/tools/drainage-estimate', icon: Calculator },
  { name: 'Land Clearing Tool', description: 'Acreage-based clearing estimates', href: '/tools/land-clearing-estimator', icon: Calculator },
]

const articles = [
  { title: 'Why 82% of Tree Service Businesses Fail', href: '/blog/82-percent-failure-rate', category: 'Business' },
  { title: 'Land Clearing Cost in Florida: Complete Guide', href: '/blog/land-clearing-cost-florida', category: 'Pricing' },
  { title: 'Why French Drains Fail in Florida', href: '/blog/french-drain-problems-florida', category: 'Drainage' },
  { title: 'What is DBH and Why It Matters', href: '/blog/what-is-dbh', category: 'Education' },
  { title: 'Forestry Mulching vs Traditional Clearing', href: '/blog/forestry-mulching-vs-traditional', category: 'Services' },
]

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Free Resources</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tools, calculators, guides, and videos to help you plan your land clearing project.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Link
              href="/estimate"
              className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-center transition-colors"
            >
              <Calculator className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Get a Quote</h3>
              <p className="text-blue-100">Instant online estimate</p>
            </Link>
            <Link
              href="/tools"
              className="bg-gray-800 hover:ring-2 hover:ring-blue-500/50 rounded-xl p-6 text-center transition-all"
            >
              <Wrench className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">All Calculators</h3>
              <p className="text-gray-400">7 free tools</p>
            </Link>
            <a
              href="https://youtube.com/@thetreeshop"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 rounded-xl p-6 text-center transition-colors"
            >
              <Video className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">YouTube Channel</h3>
              <p className="text-red-100">17,000+ subscribers</p>
            </a>
          </div>

          {/* Tools Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Free Calculators & Tools</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="bg-gray-800 rounded-xl p-6 hover:ring-2 hover:ring-blue-500/50 transition-all group"
                >
                  <tool.icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="font-semibold mb-2 group-hover:text-blue-400">{tool.name}</h3>
                  <p className="text-gray-400 text-sm">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Articles */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Guides & Articles</h2>
              <Link href="/blog" className="text-blue-400 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.title}
                  href={article.href}
                  className="bg-gray-800 rounded-xl p-6 hover:ring-2 hover:ring-blue-500/50 transition-all group flex items-start gap-4"
                >
                  <BookOpen className="w-8 h-8 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-xs text-blue-400 uppercase tracking-wide">{article.category}</span>
                    <h3 className="font-semibold group-hover:text-blue-400 mt-1">{article.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* YouTube CTA */}
          <section className="bg-red-900/20 border border-red-500/30 rounded-xl p-8 text-center">
            <Video className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Learn on YouTube</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              17,000+ subscribers learning about land clearing, tree service business,
              and property improvement. New videos weekly.
            </p>
            <a
              href="https://youtube.com/@thetreeshop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-semibold"
            >
              Subscribe on YouTube <ArrowRight className="w-5 h-5" />
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
