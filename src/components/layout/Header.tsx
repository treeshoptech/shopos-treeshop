'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Phone, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { MobileMenu } from './MobileMenu'

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const mainNavItems: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Forestry Mulching', href: '/services/forestry-mulching' },
      { label: 'Land Clearing', href: '/services/land-clearing' },
      { label: 'Stump Grinding', href: '/services/stump-grinding' },
      { label: 'Drainage Solutions', href: '/services/drainage' },
    ],
  },
  { label: 'Areas We Serve', href: '/areas' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const proNavItems: NavItem[] = [
  { label: 'Coaching', href: '/pro/coaching' },
  { label: 'ShopOS', href: '/pro/shopos' },
  { label: 'Resources', href: '/pro/resources' },
  { label: 'Success Stories', href: '/pro/success-stories' },
]

const storeNavItems: NavItem[] = [
  { label: 'Services', href: '/store/services' },
  { label: 'Courses', href: '/store/courses' },
  { label: 'Merch', href: '/store/merch' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Determine which nav to show based on route
  const isPro = pathname.startsWith('/pro')
  const isStore = pathname.startsWith('/store')

  const navItems = isPro ? proNavItems : isStore ? storeNavItems : mainNavItems
  const ctaText = isPro ? 'Apply Now' : isStore ? 'Cart' : 'Get Quote'
  const ctaHref = isPro ? '/pro/apply' : isStore ? '/store/cart' : '/estimate'

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
        {/* Top utility bar */}
        <div className="bg-gray-950 py-2 px-4 text-sm hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4 text-gray-400">
              <a href="tel:3868435266" className="flex items-center gap-1 hover:text-white">
                <Phone className="w-4 h-4" />
                (386) 843-5266
              </a>
              <span>|</span>
              <span>Central Florida&apos;s Land Clearing Experts</span>
            </div>
            <div className="flex items-center gap-4">
              {!isPro && (
                <Link href="/pro" className="text-green-400 hover:text-green-300">
                  For Operators →
                </Link>
              )}
              {isPro && (
                <Link href="/" className="text-gray-400 hover:text-white">
                  ← TreeShop Services
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={isPro ? '/pro' : isStore ? '/store' : '/'} className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">
                {isPro ? 'TreeShop Pro' : isStore ? 'TreeShop Store' : 'TreeShop'}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-gray-300 hover:text-white transition-colors ${
                      pathname === item.href ? 'text-white' : ''
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Dropdown */}
                  {item.children && openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded-lg shadow-xl py-2 min-w-48">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-4">
              <Link
                href={ctaHref}
                className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {ctaText}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-300 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        ctaText={ctaText}
        ctaHref={ctaHref}
      />
    </>
  )
}
