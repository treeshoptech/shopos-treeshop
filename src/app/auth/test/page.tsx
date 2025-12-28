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
              <p className="text-xs text-gray-400">ID: {user.id}</p>
              {profile && <p>Role: {profile.role}</p>}
            </div>
          ) : (
            <p className="text-yellow-400">⚠️ Not logged in</p>
          )}
        </div>

        {/* Client-side auth form */}
        <AuthTestClient serverUser={user} />

        {/* Integration Status */}
        <div className="mt-6 p-4 bg-gray-800 rounded">
          <h2 className="font-semibold mb-3">🔌 Integration Status</h2>
          <div className="space-y-1 text-sm">
            <p>Supabase: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌'}</p>
            <p>Stripe: {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? '✅' : '❌'}</p>
            <p>GA4: {process.env.NEXT_PUBLIC_GA4_ID ? '✅' : '❌'}</p>
            <p>GTM: {process.env.NEXT_PUBLIC_GTM_ID ? '✅' : '❌'}</p>
            <p>Meta Pixel: {process.env.NEXT_PUBLIC_META_PIXEL_ID ? '✅' : '❌'}</p>
            <p>Mapbox: {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? '✅' : '❌'}</p>
            <p>Resend: {process.env.RESEND_API_KEY ? '✅' : '❌'}</p>
            <p>Google Maps: {process.env.MAPS_SERVER_API_KEY ? '✅' : '❌'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
