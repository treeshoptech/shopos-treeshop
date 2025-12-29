'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, X } from 'lucide-react'

interface MapboxAddressInputProps {
  value: string
  onChange: (address: string, coordinates?: { lat: number; lng: number }) => void
  placeholder?: string
  required?: boolean
  className?: string
}

interface MapboxSuggestion {
  place_name: string
  center: [number, number] // [lng, lat]
  text: string
}

export default function MapboxAddressInput({
  value,
  onChange,
  placeholder = 'Enter address',
  required = false,
  className = '',
}: MapboxAddressInputProps) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<MapboxSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!query || query.length < 3) {
      setSuggestions([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${MAPBOX_TOKEN}&country=US&types=address,place&limit=5&proximity=-81.0228,29.2108`
        )

        const data = await response.json()
        if (data.features) {
          setSuggestions(data.features)
          setShowSuggestions(true)
        }
      } catch (error) {
        console.error('Mapbox geocoding error:', error)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, MAPBOX_TOKEN])

  const handleSelect = (suggestion: MapboxSuggestion) => {
    const address = suggestion.place_name
    const coordinates = {
      lng: suggestion.center[0],
      lat: suggestion.center[1],
    }

    setQuery(address)
    setSuggestions([])
    setShowSuggestions(false)
    onChange(address, coordinates)
  }

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
    onChange('')
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <MapPin className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (e.target.value !== value) {
              onChange(e.target.value)
            }
          }}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-10 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {loading && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <div className="animate-spin w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-400 mt-1 shrink-0" />
                <div>
                  <div className="font-medium text-white">{suggestion.text}</div>
                  <div className="text-sm text-gray-400">{suggestion.place_name}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
