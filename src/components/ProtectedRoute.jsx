
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuthStore } from '@/stores/authStore';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setAuthenticated(!!session);
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      setAuthenticated(true);
      setLoading(false);
    } else {
      checkAuth();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
