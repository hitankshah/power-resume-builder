import { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom';
import { supabase } from './utils/supabaseClient'
import AuthComponent from './components/Auth'
import { router } from './routes';

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="app">
      {!session ? (
        <AuthComponent />
      ) : (
        <div>
          <p>Welcome, {session.user.email}</p>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </div>
      )}
      <RouterProvider router={router} />
    </div>
  )
}

export default App
