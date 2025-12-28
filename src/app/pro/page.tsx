export default function ProPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">
        The Operating System for Tree Service Operators
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        82% of tree service businesses fail. ShopOS is how the other 18% win.
      </p>
      <div className="flex gap-4">
        <a href="/pro/apply" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium">
          Apply for Founding Membership
        </a>
        <a href="/pro/shopos" className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium">
          Explore ShopOS
        </a>
      </div>
    </div>
  )
}
