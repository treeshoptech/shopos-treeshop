import Link from 'next/link'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import { getAllPosts, getAllCategories } from '@/lib/blog'
import { categoryLabels, categoryColors } from '@/types/blog'

export const metadata = {
  title: 'Blog | TreeShop',
  description: 'Land clearing tips, forestry education, drainage solutions, and business insights from 16 years in the tree service industry.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl font-bold">TreeShop Blog</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl">
            16 years of land clearing knowledge. Pricing formulas, equipment insights,
            and business lessons from 500+ projects.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            <span className="text-gray-400 py-2">Filter:</span>
            {categories.map(({ category, count }) => (
              <Link
                key={category}
                href={`/blog/category/${category}`}
                className={`${categoryColors[category]} px-4 py-2 rounded-full text-sm hover:opacity-80 transition-opacity`}
              >
                {categoryLabels[category]} ({count})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500/50 transition-all group"
              >
                {post.featuredImage && (
                  <div className="aspect-video bg-gray-700">
                    {/* Image placeholder */}
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`${categoryColors[post.category]} text-xs px-2 py-1 rounded`}>
                      {categoryLabels[post.category]}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readingTime} min read
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-400 text-sm flex items-center gap-1 hover:underline"
                    >
                      Read more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Want More Like This?</h2>
          <p className="text-gray-400 mb-6">
            Subscribe to our YouTube channel for weekly videos on forestry, equipment, and business.
          </p>
          <a
            href="https://youtube.com/@thetreeshop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
          >
            Subscribe on YouTube
          </a>
        </div>
      </section>
    </div>
  )
}
