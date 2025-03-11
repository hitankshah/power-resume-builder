
import React, { useState, useEffect } from "react";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { ResumeData, resumeSchema } from "@/utils/resumeSchema";
import { exportToPdf } from "@/utils/pdfUtils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Download, 
  Save, 
  FileText, 
  User, 
  Moon, 
  Sun, 
  CheckCircle, 
  Upload,
  Github
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import ResumeUploader from "@/components/ResumeUploader";
import AuthModal from "@/components/AuthModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import HobbiesSection from "@/components/HobbiesSection";
import AchievementsSection from "@/components/AchievementsSection";
import CertificatesSection from "@/components/CertificatesSection";

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTab, setActiveTab] = useState("edit");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  // On initial load, get saved resume data from localStorage if it exists
  useEffect(() => {
    try {
      // Check if user is logged in
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      const savedResume = localStorage.getItem("savedResume");
      if (savedResume) {
        const parsedData = JSON.parse(savedResume);
        // Validate the data against our schema
        const result = resumeSchema.safeParse(parsedData);
        if (result.success) {
          setResumeData(result.data);
        } else {
          // If invalid, just start with a fresh form
          console.error("Invalid saved resume data:", result.error);
          localStorage.removeItem("savedResume");
        }
      }
    } catch (error) {
      console.error("Error loading saved resume:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleSaveResume = (data: ResumeData) => {
    setResumeData(data);
    try {
      localStorage.setItem("savedResume", JSON.stringify(data));
      toast.success("Your resume has been saved!");
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume. Please try again.");
    }
  };
  
  const handleFormChange = (partialData: Partial<ResumeData>) => {
    if (resumeData) {
      const updatedData = { ...resumeData, ...partialData };
      setResumeData(updatedData);
    } else {
      setResumeData(partialData as ResumeData);
    }
  };
  
  const handleExportPDF = async () => {
    await exportToPdf("resume-preview-container", "resume.pdf");
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success(`Welcome, ${userData.name}!`);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Signed out successfully");
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <FileText className="h-12 w-12 text-primary mb-4" />
          <span className="text-muted-foreground">Loading resume builder...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              AI-Powered
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Resume Builder</h1>
            <p className="text-muted-foreground max-w-2xl">
              Create a professional resume in minutes with our intuitive builder and AI assistance.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/ats-checker">
              <Button variant="outline" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                ATS Checker
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium hidden md:inline-block">
                  {user.name}
                </span>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <User className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <User className="h-4 w-4" />
                <span className="hidden md:inline-block">Sign In</span>
              </Button>
            )}
            
            <ThemeToggle />
          </div>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="edit" className="transition-all duration-300 ease-apple">Edit</TabsTrigger>
              <TabsTrigger value="preview" className="transition-all duration-300 ease-apple">Preview</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="edit" className="space-y-6 mt-0">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-3/5">
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Resume Builder</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setActiveTab("preview")}>
                          Preview
                        </Button>
                        <Button onClick={handleExportPDF}>
                          <Download className="h-4 w-4 mr-2" /> Export PDF
                        </Button>
                      </div>
                    </div>
                    
                    <Tabs defaultValue="form">
                      <TabsList className="w-full mb-4">
                        <TabsTrigger value="form" className="flex-1">Build Resume</TabsTrigger>
                        <TabsTrigger value="upload" className="flex-1">Upload Resume</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="form">
                        <ResumeForm
                          initialData={resumeData || undefined}
                          onSubmit={handleSaveResume}
                          onChange={handleFormChange}
                        />
                      </TabsContent>
                      
                      <TabsContent value="upload">
                        <ResumeUploader 
                          onResumeDataExtracted={(data) => {
                            toast.success("Resume data extracted successfully!");
                            handleFormChange(data);
                          }} 
                        />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Additional Sections</h2>
                    
                    <Tabs defaultValue="hobbies">
                      <TabsList className="w-full mb-4">
                        <TabsTrigger value="hobbies" className="flex-1">Hobbies</TabsTrigger>
                        <TabsTrigger value="achievements" className="flex-1">Achievements</TabsTrigger>
                        <TabsTrigger value="certificates" className="flex-1">Certificates</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="hobbies">
                        <HobbiesSection form={resumeData} />
                      </TabsContent>
                      
                      <TabsContent value="achievements">
                        <AchievementsSection form={resumeData} />
                      </TabsContent>
                      
                      <TabsContent value="certificates">
                        <CertificatesSection form={resumeData} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              <div className="w-full lg:w-2/5 hidden lg:block">
                {resumeData && (
                  <div className="sticky top-8">
                    <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
                    <ResumePreview resumeData={resumeData} />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-8 mt-0">
            {resumeData ? (
              <div className="flex flex-col items-center">
                <div className="max-w-2xl w-full">
                  <div className="flex justify-end space-x-4 mb-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab("edit")}
                      className="transition-all duration-300 ease-apple"
                    >
                      Back to Edit
                    </Button>
                    <Button 
                      onClick={handleExportPDF}
                      className="transition-all duration-300 ease-apple"
                    >
                      <Download className="mr-2 h-4 w-4" /> Export PDF
                    </Button>
                  </div>
                  
                  <Card className="mb-8 neomorphic">
                    <CardContent className="p-0">
                      <ResumePreview resumeData={resumeData} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <h3 className="text-xl mb-2">No resume data yet</h3>
                <p className="text-muted-foreground mb-4">Start by filling out your information in the Edit tab.</p>
                <Button onClick={() => setActiveTab("edit")}>Go to Edit</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
