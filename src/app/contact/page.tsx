'use client'

import { useState } from 'react'
import { Phone, Mail, Clock, MapPin, Send } from 'lucide-react'

const services = [
  'Forestry Mulching',
  'Land Clearing',
  'Stump Grinding',
  'Drainage Solutions',
  'Other',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // TODO: Connect to Supabase + send email
    // For now, simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setStatus('success')
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">
            Questions? Ready to get started? We typically respond within 2 hours.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>

              <div className="space-y-6">
                <a href="tel:3868435266" className="flex items-start gap-4 group">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-green-400">(386) 843-5266</div>
                    <div className="text-gray-400 text-sm">Call or text anytime</div>
                  </div>
                </a>

                <a href="mailto:office@fltreeshop.com" className="flex items-start gap-4 group">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-green-400">office@fltreeshop.com</div>
                    <div className="text-gray-400 text-sm">We respond within 2 hours</div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Business Hours</div>
                    <div className="text-gray-400 text-sm">
                      Mon-Fri: 7am - 6pm<br />
                      Sat: 8am - 2pm<br />
                      Sun: Closed (emergency only)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Service Area</div>
                    <div className="text-gray-400 text-sm">
                      Volusia, Seminole, Orange, Brevard,<br />
                      Lake, Osceola, and Flagler Counties
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 bg-gray-800 rounded-xl h-64 flex items-center justify-center text-gray-500">
                Google Map Embed
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

              {status === 'success' ? (
                <div className="bg-green-600/20 border border-green-600 rounded-lg p-6 text-center">
                  <div className="text-green-400 text-xl font-semibold mb-2">Message Sent!</div>
                  <p className="text-gray-300">We&apos;ll get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Service Interested In</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                    >
                      <option value="">Select a service...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? 'Sending...' : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
