'use client'

import { Facebook } from 'lucide-react'

interface FacebookShareProps {
  url?: string
  title?: string
}

export function FacebookShare({ url, title }: FacebookShareProps) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  const handleShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      aria-label="Share on Facebook"
    >
      <Facebook className="w-5 h-5" />
      Share on Facebook
    </button>
  )
}
