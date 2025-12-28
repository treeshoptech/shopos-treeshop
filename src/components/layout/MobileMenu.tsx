'use client'

import Link from 'next/link'
import { X, Phone, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  ctaText: string
  ctaHref: string
}

export function MobileMenu({ isOpen, onClose, navItems, ctaText, ctaHref }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Slide-out panel */}
      <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <span className="text-xl font-bold text-white">Menu</span>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                    className="flex items-center justify-between w-full py-3 text-gray-300 hover:text-white"
                  >
                    {item.label}
                    <ChevronRight className={`w-5 h-5 transition-transform ${expandedItem === item.label ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedItem === item.label && (
                    <div className="pl-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block py-2 text-gray-400 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 text-gray-300 hover:text-white"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Phone CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 space-y-3">
          <a
            href="tel:3868435266"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-800 text-white rounded-lg"
          >
            <Phone className="w-5 h-5" />
            (386) 843-5266
          </a>
          <Link
            href={ctaHref}
            onClick={onClose}
            className="block w-full py-3 bg-green-600 text-white text-center rounded-lg font-medium"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  )
}
