export interface GalleryProject {
  id: number
  service: 'Forestry Mulching' | 'Land Clearing' | 'Stump Grinding' | 'Drainage'
  title: string
  location: string
  city?: string
  county?: string
  acres: number
  image: string
  description: string
  tags: string[]
  date?: string
  featured?: boolean
}

export const galleryProjects: GalleryProject[] = [
  {
    id: 1,
    service: 'Forestry Mulching',
    title: 'Residential Lot Clearing - Citrus Springs',
    location: 'Citrus Springs, FL',
    city: 'Citrus Springs',
    county: 'Citrus',
    acres: 2,
    image: '/images/forestry-after-citrus.jpg',
    description: 'Complete understory clearing for residential property. Preserved mature oaks while removing palmetto and brush. Mulch left on-site for erosion control.',
    tags: ['residential', 'selective clearing', 'palmetto removal', 'oak preservation', 'citrus springs', 'understory'],
    date: '2024',
    featured: true,
  },
  {
    id: 2,
    service: 'Forestry Mulching',
    title: 'Large Lot Forestry Mulching',
    location: 'Central Florida',
    acres: 3,
    image: '/images/forestry-after-1.jpg',
    description: 'Dense vegetation cleared to create usable yard space. All material mulched in place, no hauling required.',
    tags: ['forestry mulching', 'residential', 'dense vegetation', 'brush clearing', 'no hauling'],
    date: '2024',
  },
  {
    id: 3,
    service: 'Land Clearing',
    title: 'Selective Land Clearing - Aerial View',
    location: 'Volusia County, FL',
    county: 'Volusia',
    acres: 1.5,
    image: '/images/land-clearing-1.jpg',
    description: 'Strategic tree preservation with complete ground clearing. Removed undergrowth while keeping mature canopy trees for shade and aesthetics.',
    tags: ['land clearing', 'selective clearing', 'tree preservation', 'aerial', 'volusia county', 'residential lot'],
    date: '2024',
    featured: true,
  },
  {
    id: 4,
    service: 'Land Clearing',
    title: 'Complete Site Preparation',
    location: 'Central Florida',
    acres: 2,
    image: '/images/land-clearing-2.jpg',
    description: 'Full lot clearing for new construction. All vegetation removed, roots grubbed, site graded and ready for building.',
    tags: ['land clearing', 'site preparation', 'construction ready', 'grubbing', 'grading', 'new construction'],
    date: '2024',
  },
  {
    id: 5,
    service: 'Land Clearing',
    title: 'Residential Lot Strip',
    location: 'Residential',
    acres: 1,
    image: '/images/land-clearing-3.jpg',
    description: 'Lot strip service for new home construction. Complete clearing with debris haul away.',
    tags: ['lot strip', 'residential', 'new home', 'debris removal', 'haul away'],
    date: '2024',
  },
  {
    id: 6,
    service: 'Stump Grinding',
    title: 'Multiple Stump Removal',
    location: 'Volusia County, FL',
    county: 'Volusia',
    acres: 0.5,
    image: '/images/stump-grinding-1.jpg',
    description: 'Professional stump grinding service. All stumps ground below grade, grindings raked and leveled.',
    tags: ['stump grinding', 'stump removal', 'volusia county', 'professional', 'below grade'],
    date: '2024',
  },
]

export function getProjectsByService(service: string): GalleryProject[] {
  if (service === 'All') return galleryProjects
  return galleryProjects.filter(p => p.service === service)
}

export function getFeaturedProjects(): GalleryProject[] {
  return galleryProjects.filter(p => p.featured)
}

export function getProjectsByTag(tag: string): GalleryProject[] {
  return galleryProjects.filter(p => p.tags.includes(tag.toLowerCase()))
}

export const allTags = Array.from(
  new Set(galleryProjects.flatMap(p => p.tags))
).sort()
