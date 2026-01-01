'use client'

import { useState } from 'react'
import { MapPin, Filter } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

const projects = [
  { id: 1, service: 'Forestry Mulching', location: 'Citrus Springs', acres: 2, image: '/images/forestry-after-citrus.jpg', description: 'Residential lot cleared' },
  { id: 2, service: 'Forestry Mulching', location: 'Central Florida', acres: 3, image: '/images/forestry-after-1.jpg', description: 'Complete understory clearing' },
  { id: 3, service: 'Land Clearing', location: 'Volusia County', acres: 1.5, image: '/images/land-clearing-1.jpg', description: 'Selective clearing with tree preservation' },
  { id: 4, service: 'Land Clearing', location: 'Central Florida', acres: 2, image: '/images/land-clearing-2.jpg', description: 'Complete site preparation' },
  { id: 5, service: 'Land Clearing', location: 'Residential', acres: 1, image: '/images/land-clearing-3.jpg', description: 'Lot strip for new construction' },
  { id: 6, service: 'Stump Grinding', location: 'Volusia County', acres: 0.5, image: '/images/stump-grinding-1.jpg', description: 'Multiple stump removal' },
  { id: 7, service: 'Forestry Mulching', location: 'Central Florida', acres: 2, image: '/images/forestry-309-excavator.jpg', description: '309 excavator with diamond forestry mulching head' },
  { id: 8, service: 'Land Clearing', location: 'Central Florida', acres: 1.5, image: '/images/land-clearing-ground-level.jpg', description: 'Ground-level clearing with new growth' },
  { id: 9, service: 'Forestry Mulching', location: 'Central Florida', acres: 3, image: '/images/forestry-after-19.jpg', description: 'Complete forestry mulching project' },
  { id: 10, service: 'Land Clearing', location: 'Central Florida', acres: 2, image: '/images/project-7473.jpg', description: 'Land clearing project' },
]

const services = ['All', 'Forestry Mulching', 'Land Clearing', 'Stump Grinding', 'Drainage']

export default function GalleryPage() {
  const [filter, setFilter] = useState('All')

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.service === filter)

  return (
    <>
      <Header />
      <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Project Gallery</h1>
          <p className="text-xl text-gray-300">
            500+ projects completed across Central Florida. See the transformations.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-gray-950 sticky top-[73px] z-40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-400 shrink-0" />
            {services.map((service) => (
              <button
                key={service}
                onClick={() => setFilter(service)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  filter === service
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={project.image}
                  alt={`${project.service} - ${project.location}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No projects found for this filter.
            </div>
          )}
        </div>
      </section>
    </div>
      <Footer />
    </>
  )
}
