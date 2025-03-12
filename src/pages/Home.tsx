import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user?.name || 'User'}!</h1>
      <p className="text-muted-foreground mb-8">You are now logged in. Enjoy our services!</p>
      <div className="flex space-x-4">
        <Link to="/resume-builder">
          <Button variant="primary">Go to Resume Builder</Button>
        </Link>
        <Link to="/profile">
          <Button variant="outline">Profile</Button>
        </Link>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Home;
