import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Mike T.',
    location: 'Daytona Beach',
    rating: 5,
    text: 'Jeremiah and his team cleared 3 acres in a single day. The quote was exactly what we paid—no surprises. Highly recommend.',
    service: 'Forestry Mulching',
  },
  {
    name: 'Sarah K.',
    location: 'Orlando',
    rating: 5,
    text: 'Finally, a company that explains their pricing! The DBH system made total sense once Jeremiah walked me through it.',
    service: 'Land Clearing',
  },
  {
    name: 'Tom R.',
    location: 'Port Orange',
    rating: 5,
    text: 'Had 15 stumps ground down. They were in and out in half a day. Professional crew, clean work.',
    service: 'Stump Grinding',
  },
  {
    name: 'Jennifer M.',
    location: 'Sanford',
    rating: 5,
    text: 'Our backyard was a swamp. FreedomDrains fixed the drainage issue that two other companies couldn\'t solve.',
    service: 'Drainage',
  },
  {
    name: 'David L.',
    location: 'Deltona',
    rating: 5,
    text: 'Second time using TreeShop. Same great service. They remember the property and work efficiently.',
    service: 'Forestry Mulching',
  },
  {
    name: 'Amanda P.',
    location: 'Palm Coast',
    rating: 5,
    text: 'Cleared our lot for new construction. On time, on budget. The before/after photos are incredible.',
    service: 'Land Clearing',
  },
]

export const metadata = {
  title: 'Customer Reviews | TreeShop',
  description: 'See what Central Florida homeowners say about TreeShop. 5-star rated forestry mulching and land clearing.',
}

export default function ReviewsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Customer Reviews</h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-xl text-gray-300">
            5.0 rating from 50+ reviews on Google
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400">500+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400">5.0</div>
              <div className="text-gray-400">Google Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400">16+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400">7</div>
              <div className="text-gray-400">Counties Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6">
                <Quote className="w-8 h-8 text-green-500/30 mb-4" />
                <p className="text-gray-300 mb-4">{review.text}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-gray-400 text-sm">{review.location}</div>
                  </div>
                  <div className="text-green-400 text-sm">{review.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews CTA */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">Want to see more? Check out our Google Business Profile.</p>
          <a
            href="https://g.page/treeshop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg"
          >
            <Star className="w-5 h-5 text-yellow-400" />
            View All Google Reviews
          </a>
        </div>
      </section>
    </div>
  )
}
