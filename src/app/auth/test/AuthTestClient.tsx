'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AuthTestClientProps {
  serverUser: any
}

export default function AuthTestClient({ serverUser }: AuthTestClientProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        })
        if (error) throw error
        setMessage('✅ Signed up! Check your email or refresh page.')
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
        setMessage('✅ Signed in!')
        router.refresh()
      }
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if (serverUser) {
    return (
      <div className="bg-gray-800 p-4 rounded">
        <h2 className="font-semibold mb-4">Logged In</h2>
        <p className="mb-4">Email: {serverUser.email}</p>
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 p-4 rounded">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('signin')}
          className={`flex-1 py-2 rounded ${mode === 'signin' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`flex-1 py-2 rounded ${mode === 'signup' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm">{message}</p>
      )}
    </div>
  )
}
