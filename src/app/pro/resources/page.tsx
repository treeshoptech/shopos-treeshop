import Link from 'next/link'
import { BookOpen, Youtube, FileText } from 'lucide-react'

export const metadata = {
  title: 'Resources for Operators',
  description: 'Guides, videos, and tools for tree service business owners.',
}

export default function ResourcesPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Resources</h1>
        <p className="text-gray-400 mb-12">
          Guides, videos, and tools for tree service business owners.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <a
            href="https://youtube.com/@thetreeshop"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-6 hover:ring-2 hover:ring-red-500/50"
          >
            <Youtube className="w-10 h-10 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">YouTube Channel</h3>
            <p className="text-gray-400">17,000+ subscribers learning the business side of tree service.</p>
          </a>

          <Link href="/blog" className="bg-gray-800 rounded-xl p-6 hover:ring-2 hover:ring-green-500/50">
            <BookOpen className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Blog</h3>
            <p className="text-gray-400">Articles on pricing, equipment, and operations.</p>
          </Link>

          <Link href="/tools" className="bg-gray-800 rounded-xl p-6 hover:ring-2 hover:ring-blue-500/50">
            <FileText className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Calculators</h3>
            <p className="text-gray-400">Free tools using our production formulas.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
