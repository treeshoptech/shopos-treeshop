import { createClient } from '@/lib/supabase/server'
import AuthTestClient from './AuthTestClient'

export default async function AuthTestPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">🔐 Auth Test Page</h1>

        {/* Server-side user check */}
        <div className="bg-gray-800 p-4 rounded mb-6">
          <h2 className="font-semibold mb-2">Server Component Check:</h2>
          {user ? (
            <div className="text-green-400">
              <p>✅ Logged in as: {user.email}</p>
              <p>User ID: {user.id}</p>
              {profile && (
                <p>Profile Role: {profile.role}</p>
              )}
            </div>
          ) : (
            <p className="text-yellow-400">⚠️ Not logged in (server check)</p>
          )}
        </div>

        {/* Client-side auth form */}
        <AuthTestClient serverUser={user} />
      </div>
    </div>
  )
}
