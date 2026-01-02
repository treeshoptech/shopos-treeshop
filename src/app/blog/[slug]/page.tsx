import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from 'lucide-react'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { categoryLabels, categoryColors } from '@/types/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return {}

  return {
    title: `${post.title} | TreeShop Blog`,
    description: post.excerpt,
  }
}

// Simple markdown to HTML (basic conversion)
function renderContent(content: string): string {
  let html = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-10 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-1 rounded">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-400 hover:underline">$1</a>')
    // Lists
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 mb-2">$2</li>')

  // Wrap tables
  if (html.includes('|')) {
    html = html.replace(/\|(.+)\|/g, (match, p1) => {
      const cells = match.split('|').filter(Boolean)
      const isHeader = cells.some(c => c.includes('---'))
      if (isHeader) return ''
      return `<tr>${cells.map(c => `<td class="border border-gray-700 px-4 py-2">${c.trim()}</td>`).join('')}</tr>`
    })
    html = html.replace(/(<tr>[\s\S]*?<\/tr>)+/g, '<table class="w-full my-6 border-collapse">$&</table>')
  }

  // Paragraphs
  html = html.split('\n\n').map(para => {
    if (para.startsWith('<')) return para
    if (para.trim().length === 0) return ''
    return `<p class="mb-4 text-gray-300">${para}</p>`
  }).join('\n')

  return html
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post)

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <span className={`${categoryColors[post.category]} text-sm px-3 py-1 rounded inline-block mb-4`}>
            {categoryLabels[post.category]}
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div
          className="max-w-4xl mx-auto px-4 text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />
      </article>

      {/* Tags */}
      {post.tags.length > 0 && (
        <section className="py-8 border-t border-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-gray-950">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="bg-gray-800 rounded-lg p-4 hover:ring-2 hover:ring-green-500/50 transition-all"
                >
                  <h3 className="font-semibold mb-2 hover:text-green-400">
                    {related.title}
                  </h3>
                  <span className="text-gray-500 text-sm">
                    {related.readingTime} min read
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-6">
            Get a quote using the same formulas we discussed in this article.
          </p>
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg"
          >
            What's Your Goal?
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            author: {
              '@type': 'Person',
              name: post.author.name,
            },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            publisher: {
              '@type': 'Organization',
              name: 'TreeShop LLC',
              url: 'https://treeshop.app',
            },
          }),
        }}
      />
    </div>
  )
}
