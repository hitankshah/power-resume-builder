
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { CheckCircle, FileText, User, Briefcase, Award, ChevronRight, MonitorSmartphone, Shield } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const LandingPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 md:px-8 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ResumeBuilder</span>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/resume-builder">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <Link to="/profile">
                  <Button size="sm">Profile</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/auth">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16 md:py-28 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Create Standout Resumes That <span className="text-primary">Get Noticed</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Our AI-powered resume builder helps you create professional resumes in minutes. ATS-friendly templates, expert suggestions, and more.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to={user ? "/resume-builder" : "/auth"}>
                <Button size="lg" className="gap-2">
                  Get Started <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/ats-checker">
                <Button size="lg" variant="outline" className="gap-2">
                  Check ATS Score <CheckCircle className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-12 -right-6 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-8 -left-6 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-background to-background/80 border rounded-lg shadow-xl p-1">
              <img 
                src="/placeholder.svg" 
                alt="Resume Builder Preview" 
                className="rounded-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Features Designed for Success</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create a professional resume and improve your chances of getting hired.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6 bg-background hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Templates</h3>
              <p className="text-muted-foreground">Choose from a wide range of modern, ATS-friendly resume templates suited for every industry.</p>
            </div>
            
            <div className="border rounded-lg p-6 bg-background hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ATS Score Checker</h3>
              <p className="text-muted-foreground">Analyze your resume against job descriptions to ensure it passes through Applicant Tracking Systems.</p>
            </div>
            
            <div className="border rounded-lg p-6 bg-background hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Job-Specific Content</h3>
              <p className="text-muted-foreground">Get tailored content suggestions based on the job description to highlight your relevant skills.</p>
            </div>
            
            <div className="border rounded-lg p-6 bg-background hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <MonitorSmartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Format Export</h3>
              <p className="text-muted-foreground">Download your resume in PDF, DOCX, or other formats to suit different application requirements.</p>
            </div>
            
            <div className="border rounded-lg p-6 bg-background hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Achievement Tracking</h3>
              <p className="text-muted-foreground">Showcase your achievements, certifications, and skills in a structured, impactful way.</p>
            </div>
            
            <div className="border rounded-lg p-6 bg-background hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Cloud Storage</h3>
              <p className="text-muted-foreground">Save your resumes securely and access them from anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Professional Resume?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of job seekers who've found success with our platform</p>
          <Link to={user ? "/resume-builder" : "/auth"}>
            <Button size="lg" className="gap-2">
              Get Started Now <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-bold">ResumeBuilder</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Contact</a>
              <a href="#" className="hover:text-primary">About</a>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
