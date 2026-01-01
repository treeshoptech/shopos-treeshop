import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

const serviceLinks = [
  { label: 'Forestry Mulching', href: '/services/forestry-mulching' },
  { label: 'Land Clearing', href: '/services/land-clearing' },
  { label: 'Stump Grinding', href: '/services/stump-grinding' },
  { label: 'Drainage Solutions', href: '/services/drainage' },
]

const areaLinks = [
  { label: 'Daytona Beach', href: '/areas/daytona-beach' },
  { label: 'Orlando', href: '/areas/orlando' },
  { label: 'Port Orange', href: '/areas/port-orange' },
  { label: 'Sanford', href: '/areas/sanford' },
  { label: 'All Areas →', href: '/areas' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Government Contracting', href: '/government' },
]

// Operator links removed - B2C focus only

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img src="/logos/treeshop-logo.png" alt="TreeShop" className="h-10" />
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Professional forestry mulching and land clearing in Central Florida.
              Transparent DBH pricing. No surprises.
            </p>
            <div className="mt-6 space-y-2">
              <a href="tel:3868435266" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Phone className="w-4 h-4" />
                (386) 843-5266
              </a>
              <a href="mailto:office@fltreeshop.com" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Mail className="w-4 h-4" />
                office@fltreeshop.com
              </a>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Serving Central Florida<br />Volusia • Seminole • Orange • Brevard • Lake</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.facebook.com/TreeShopFlorida"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/fltreeshop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@TheTreeShop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="font-semibold text-white mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {areaLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TreeShop LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
