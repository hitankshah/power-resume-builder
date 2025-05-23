import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Github, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../supabaseClient";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (userData: { name: string; email: string }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (activeTab === "login") {
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        if (!user) throw new Error('No user returned from auth');
        
        setUser(user);
        navigate('/resume-builder');
      } else {
        const { data: { user }, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        
        if (error) throw error;
        if (!user) throw new Error('No user returned from auth');
        
        toast.success("Please check your email to verify your account");
        navigate('/resume-builder');
      }
      
      onClose();
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubAuth = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) throw error;
      
      // GitHub auth success handling will be done through onAuthStateChange
    } catch (error: any) {
      console.error("GitHub auth error:", error);
      toast.error(error.message || "GitHub authentication failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {activeTab === "login" ? "Welcome back" : "Create your account"}
          </DialogTitle>
          <DialogDescription>
            {activeTab === "login" 
              ? "Sign in to your account to continue" 
              : "Sign up to save and manage your resumes"}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 py-2">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input 
                  id="email-login" 
                  type="email" 
                  placeholder="email@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-login">Password</Label>
                  <Button variant="link" className="px-0 h-auto text-xs" type="button">
                    Forgot password?
                  </Button>
                </div>
                <Input 
                  id="password-login" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" disabled={isLoading}>
                <Mail className="mr-2 h-4 w-4" />
                Gmail
              </Button>
              <Button variant="outline" type="button" onClick={handleGithubAuth} disabled={isLoading}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4 py-2">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name-signup">Full Name</Label>
                <Input 
                  id="name-signup" 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input 
                  id="email-signup" 
                  type="email" 
                  placeholder="email@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input 
                  id="password-signup" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" disabled={isLoading}>
                <Mail className="mr-2 h-4 w-4" />
                Gmail
              </Button>
              <Button variant="outline" type="button" onClick={handleGithubAuth} disabled={isLoading}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
