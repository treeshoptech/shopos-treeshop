export default function StorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">
        TreeShop Store
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        Book services, buy courses, and get gear.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <a href="/store/services" className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Book Services</h2>
          <p className="text-gray-400">Schedule forestry mulching, land clearing, and more.</p>
        </a>
        <a href="/store/courses" className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Courses</h2>
          <p className="text-gray-400">Learn pricing, operations, and business systems.</p>
        </a>
        <a href="/store/merch" className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Merch</h2>
          <p className="text-gray-400">TreeShop gear for operators.</p>
        </a>
      </div>
    </div>
  )
}
