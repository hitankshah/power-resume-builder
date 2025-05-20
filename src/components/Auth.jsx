import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const MAX_RETRIES = 3
const RETRY_DELAY = 1000

const createSupabaseClient = async (retries = 0) => {
  try {
    if (!navigator.onLine) {
      throw new Error('No internet connection')
    }

    const client = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          detectSessionInUrl: true,
          autoRefreshToken: true,
        },
      }
    )

    // Test the connection
    await client.auth.getSession()
    return client
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.log(`Retrying connection... Attempt ${retries + 1}`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      return createSupabaseClient(retries + 1)
    }
    throw error
  }
}

export default function AuthComponent() {
  const [supabase, setSupabase] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        setIsLoading(true)
        const client = await createSupabaseClient()
        setSupabase(client)
      } catch (err) {
        console.error('Failed to initialize Supabase:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    initializeSupabase()

    // Add network status listeners
    window.addEventListener('online', initializeSupabase)
    window.addEventListener('offline', () => setError('No internet connection'))

    return () => {
      window.removeEventListener('online', initializeSupabase)
      window.removeEventListener('offline', () => setError('No internet connection'))
    }
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !supabase) {
    return (
      <div className="auth-error">
        <p>Authentication service is currently unavailable</p>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#52525b',
              },
            },
          },
        }}
        providers={['google']}
        redirectTo={`${window.location.origin}/dashboard`}
        onError={(error) => {
          console.error('Auth error:', error)
          setError(error.message)
        }}
      />
    </div>
  )
}
