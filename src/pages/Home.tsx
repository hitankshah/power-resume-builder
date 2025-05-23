
import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Settings, LogOut, PlusCircle, Clock, Award, CheckCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Home = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Mock data for recent resumes
  const recentResumes = [
    { id: 1, name: "Software Engineer Resume", lastEdited: "2 days ago", progress: 85 },
    { id: 2, name: "Product Manager Application", lastEdited: "1 week ago", progress: 70 },
    { id: 3, name: "UX Designer Portfolio", lastEdited: "3 weeks ago", progress: 100 }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ResumeBuilder</span>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="icon" asChild>
              <Link to="/profile">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content - left 2 columns */}
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Welcome, {user?.user_metadata?.full_name || 'User'}</h1>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Create New Resume</CardTitle>
                    <CardDescription>Start from scratch with our templates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center py-4">
                      <PlusCircle className="h-12 w-12 text-primary/50" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link to="/resume-builder">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Check ATS Score</CardTitle>
                    <CardDescription>Optimize for Applicant Tracking Systems</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center py-4">
                      <CheckCircle className="h-12 w-12 text-primary/50" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline" asChild>
                      <Link to="/ats-checker">Analyze Resume</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <Clock className="mr-2 h-5 w-5" /> Recent Resumes
                </h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <div className="space-y-2">
                {recentResumes.map((resume) => (
                  <Card key={resume.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{resume.name}</h3>
                        <p className="text-xs text-muted-foreground">Last edited: {resume.lastEdited}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {resume.progress === 100 ? 'Complete' : `${resume.progress}%`}
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - right column */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary" /> Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profile Completeness</span>
                    <span className="font-medium">70%</span>
                  </div>
                  <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Basic Information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Education Details</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Work Experience</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-4 w-4 rounded-full border-2 border-muted" />
                    <span>Skills & Certifications</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-4 w-4 rounded-full border-2 border-muted" />
                    <span>Projects & Achievements</span>
                  </li>
                </ul>
                
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/profile">Complete Your Profile</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Use action verbs to describe your experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Quantify your achievements with numbers when possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Tailor your resume to each job application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Keep your resume to one page if possible</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
