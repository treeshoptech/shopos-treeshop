'use client'

import { useState } from 'react'
import { MapPin, Filter } from 'lucide-react'

// Placeholder projects - will be replaced with real data
const projects = [
  { id: 1, service: 'Forestry Mulching', location: 'Daytona Beach', acres: 2.5, before: '/images/gallery/1-before.jpg', after: '/images/gallery/1-after.jpg' },
  { id: 2, service: 'Land Clearing', location: 'Orlando', acres: 5, before: '/images/gallery/2-before.jpg', after: '/images/gallery/2-after.jpg' },
  { id: 3, service: 'Stump Grinding', location: 'Port Orange', acres: 0.5, before: '/images/gallery/3-before.jpg', after: '/images/gallery/3-after.jpg' },
  { id: 4, service: 'Forestry Mulching', location: 'Sanford', acres: 3, before: '/images/gallery/4-before.jpg', after: '/images/gallery/4-after.jpg' },
  { id: 5, service: 'Drainage', location: 'Deltona', acres: 1, before: '/images/gallery/5-before.jpg', after: '/images/gallery/5-after.jpg' },
  { id: 6, service: 'Land Clearing', location: 'Palm Coast', acres: 4, before: '/images/gallery/6-before.jpg', after: '/images/gallery/6-after.jpg' },
]

const services = ['All', 'Forestry Mulching', 'Land Clearing', 'Stump Grinding', 'Drainage']

export default function GalleryPage() {
  const [filter, setFilter] = useState('All')

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.service === filter)

  return (
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
                    ? 'bg-green-600 text-white'
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
              <div key={project.id} className="bg-gray-800 rounded-xl overflow-hidden group">
                {/* Before/After placeholder */}
                <div className="aspect-video bg-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Before / After Slider
                  </div>
                  <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs">
                    Before
                  </div>
                  <div className="absolute top-2 right-2 bg-green-600/90 px-2 py-1 rounded text-xs">
                    After
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-gray-700 px-2 py-1 rounded text-sm">{project.service}</span>
                    <span className="text-gray-400 text-sm">{project.acres} acres</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                </div>
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
  )
}
