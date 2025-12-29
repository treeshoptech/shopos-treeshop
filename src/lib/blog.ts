import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost, BlogCategory } from '@/types/blog'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      slug: data.slug || filename.replace('.md', ''),
      title: data.title,
      excerpt: data.excerpt,
      content,
      category: data.category as BlogCategory,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      author: data.author || { name: 'Jeremiah Anderson', role: 'Owner, TreeShop LLC' },
      featuredImage: data.featuredImage,
      youtubeId: data.youtubeId,
      readingTime: calculateReadingTime(content),
      tags: data.tags || [],
      relatedPosts: data.relatedPosts || [],
    } as BlogPost
  })

  // Sort by date, newest first
  return posts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find(p => p.slug === slug) || null
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter(p => p.category === category)
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  const allPosts = getAllPosts()
  if (!post.relatedPosts) return []
  return post.relatedPosts
    .map(slug => allPosts.find(p => p.slug === slug))
    .filter((p): p is BlogPost => p !== undefined)
    .slice(0, 3)
}

export function getAllCategories(): { category: BlogCategory; count: number }[] {
  const posts = getAllPosts()
  const counts: Record<string, number> = {}

  posts.forEach(post => {
    counts[post.category] = (counts[post.category] || 0) + 1
  })

  return Object.entries(counts).map(([category, count]) => ({
    category: category as BlogCategory,
    count,
  }))
}
