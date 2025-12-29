import Link from 'next/link'
import { CheckCircle, Phone } from 'lucide-react'

export const metadata = {
  title: 'Booking Confirmed',
}

export default function CheckoutSuccessPage() {
  return (
    <div className="py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-gray-400 mb-8">
          Your deposit has been received. We&apos;ll contact you within 24 hours to schedule your service.
        </p>

        <div className="bg-gray-800 rounded-xl p-6 text-left mb-8">
          <h3 className="font-semibold mb-4">What Happens Next</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</div>
              <div>
                <div className="font-medium">Confirmation Email</div>
                <div className="text-gray-400 text-sm">Check your inbox for receipt and details</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</div>
              <div>
                <div className="font-medium">Scheduling Call</div>
                <div className="text-gray-400 text-sm">We&apos;ll call within 24 hours to confirm date/time</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</div>
              <div>
                <div className="font-medium">Service Day</div>
                <div className="text-gray-400 text-sm">Balance due upon completion</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:3868435266"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
          >
            <Phone className="w-5 h-5" />
            Call Us: (386) 843-5266
          </a>
          <Link
            href="/store"
            className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold"
          >
            Back to Store
          </Link>
        </div>
      </div>
    </div>
  )
}
