import { Header, Footer } from '@/components/layout'

const projects = [
  { id: 1, image: '/images/forestry-after-citrus.jpg' },
  { id: 2, image: '/images/forestry-after-1.jpg' },
  { id: 3, image: '/images/land-clearing-1.jpg' },
  { id: 4, image: '/images/land-clearing-2.jpg' },
  { id: 5, image: '/images/land-clearing-3.jpg' },
  { id: 6, image: '/images/stump-grinding-1.jpg' },
  { id: 7, image: '/images/forestry-309-excavator.jpg' },
  { id: 8, image: '/images/land-clearing-ground-level.jpg' },
  { id: 9, image: '/images/forestry-after-19.jpg' },
  { id: 10, image: '/images/project-7473.jpg' },
  { id: 11, image: '/images/excavator-dramatic-sky.jpg' },
  { id: 12, image: '/images/team-equipment.jpg' },
  { id: 13, image: '/images/company-truck-equipment.jpg' },
  { id: 14, image: '/images/project-4.jpg' },
]

export default function GalleryPage() {

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

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={project.image}
                  alt="TreeShop project"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
      <Footer />
    </>
  )
}
