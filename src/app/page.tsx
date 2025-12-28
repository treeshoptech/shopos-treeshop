export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">
        Central Florida&apos;s Land Clearing & Forestry Mulching Experts
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        Transparent DBH Pricing | Free Same-Day Quotes | 32 Communities Served
      </p>
      <div className="flex gap-4">
        <a href="/estimate" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium">
          Get Your Free Quote
        </a>
        <a href="tel:3868435266" className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium">
          (386) 843-5266
        </a>
      </div>
    </div>
  )
}
