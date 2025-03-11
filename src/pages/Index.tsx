
import React, { useState, useEffect } from "react";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { ResumeData, resumeSchema } from "@/utils/resumeSchema";
import { exportToPdf } from "@/utils/pdfUtils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Save, FileText } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTab, setActiveTab] = useState("edit");
  const [isLoading, setIsLoading] = useState(true);
  
  // On initial load, get saved resume data from localStorage if it exists
  useEffect(() => {
    try {
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
        <header className="text-center space-y-2 mb-8">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            AI-Powered
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Resume Builder</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create a professional resume in minutes with our intuitive builder and AI assistance.
            Get personalized content suggestions and export your resume as a PDF.
          </p>
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
                <ResumeForm
                  initialData={resumeData || undefined}
                  onSubmit={handleSaveResume}
                  onChange={handleFormChange}
                />
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
    </div>
  );
};

export default Index;
