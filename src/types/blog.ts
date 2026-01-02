export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: BlogCategory
  publishedAt: string
  updatedAt?: string
  author: {
    name: string
    role: string
  }
  featuredImage?: string
  youtubeId?: string
  readingTime: number
  tags: string[]
  relatedPosts?: string[]
}

export type BlogCategory =
  | 'land-clearing'
  | 'forestry-education'
  | 'drainage-solutions'
  | 'industry-insights'
  | 'equipment'
  | 'business-operations'

export const categoryLabels: Record<BlogCategory, string> = {
  'land-clearing': 'Land Clearing Tips',
  'forestry-education': 'Forestry Education',
  'drainage-solutions': 'Drainage Solutions',
  'industry-insights': 'Industry Insights',
  'equipment': 'Equipment',
  'business-operations': 'Business Operations',
}

export const categoryColors: Record<BlogCategory, string> = {
  'land-clearing': 'bg-green-600',
  'forestry-education': 'bg-emerald-600',
  'drainage-solutions': 'bg-blue-600',
  'industry-insights': 'bg-purple-600',
  'equipment': 'bg-blue-500',
  'business-operations': 'bg-cyan-600',
}
