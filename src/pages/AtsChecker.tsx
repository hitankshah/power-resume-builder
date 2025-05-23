
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ResumeUploader from "@/components/ResumeUploader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const AtsChecker = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const [resumeData, setResumeData] = useState<any>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [matchingKeywords, setMatchingKeywords] = useState<{keyword: string, matched: boolean}[]>([]);

  const handleResumeDataExtracted = (data: any) => {
    setResumeData(data);
    // Simulate ATS scoring based on job description
    if (jobDescription) {
      analyzeResumeWithJobDescription();
    }
  };

  const analyzeResumeWithJobDescription = () => {
    // This is a simplified simulation of keyword matching
    // In a real app, you would use more sophisticated NLP techniques
    if (!jobDescription) return;
    
    // Extract common keywords from job description
    const keywordsToFind = extractKeywords(jobDescription);
    
    // Simulate matching with resume content
    const resumeText = JSON.stringify(resumeData || {}).toLowerCase();
    
    const matches = keywordsToFind.map(keyword => ({
      keyword,
      matched: resumeText.includes(keyword.toLowerCase())
    }));
    
    setMatchingKeywords(matches);
    
    // Calculate match percentage
    const matchedCount = matches.filter(m => m.matched).length;
    const matchPercentage = Math.floor((matchedCount / matches.length) * 100);
    
    // Adjust ATS score based on matching
    const baseScore = Math.floor(Math.random() * 31) + 70; // Random score between 70-100
    const finalScore = Math.min(100, Math.floor((baseScore + matchPercentage) / 2));
    
    setAtsScore(finalScore);
  };

  const extractKeywords = (text: string) => {
    // This is a simplified approach to extract potential keywords from job description
    // In a real-world scenario, you would use NLP techniques for better extraction
    const commonWords = ["and", "the", "a", "an", "in", "on", "at", "for", "to", "of", "with", "as", "by"];
    return text.split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.includes(word.toLowerCase()))
      .map(word => word.replace(/[^\w]/g, ''))
      .filter(Boolean)
      .reduce<string[]>((unique, item) => 
        unique.includes(item) ? unique : [...unique, item], 
      [])
      .slice(0, 15); // Limit to 15 keywords for demo
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-emerald-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Resume Builder
            </Button>
          </Link>
          <ThemeToggle />
        </header>

        <Card className="border border-b-4 border-b-primary">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              ATS Score Checker
            </CardTitle>
            <CardDescription className="text-base">
              Analyze your resume against job descriptions to maximize your chances of getting past Applicant Tracking Systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description</Label>
                  <div className="relative">
                    <Textarea
                      id="job-description"
                      placeholder="Paste the job description here to compare with your resume"
                      className="min-h-[200px] resize-none"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                    {jobDescription && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="absolute bottom-2 right-2 text-xs"
                        onClick={() => setJobDescription("")}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    For best results, include the full job description
                  </p>
                </div>

                <div className="bg-primary/5 rounded-lg p-4 border">
                  <h4 className="font-medium mb-2">Why is this important?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Up to 75% of resumes are rejected by ATS software before a human even sees them. 
                    Tailoring your resume to match the job description significantly increases your chances.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-2 items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-xs">Keyword optimization</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-xs">Format compatibility</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-xs">Skills matching</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-xs">Experience relevance</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                    <TabsTrigger value="paste">Paste Resume</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="mt-4">
                    <ResumeUploader onResumeDataExtracted={handleResumeDataExtracted} />
                  </TabsContent>
                  
                  <TabsContent value="paste" className="mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="resume-content">Resume Content</Label>
                      <Textarea 
                        id="resume-content"
                        placeholder="Paste your resume content here for ATS analysis"
                        className="min-h-[200px] resize-none"
                      />
                      <Button 
                        onClick={() => {
                          // Simulate data extraction and analysis
                          setResumeData({ content: "Pasted resume content" });
                          analyzeResumeWithJobDescription();
                        }}
                        className="w-full mt-4"
                      >
                        Analyze Resume
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>

        {atsScore !== null && (
          <Card className="overflow-hidden">
            <div className={`h-2 ${getScoreColor(atsScore).replace('text-', 'bg-')}`}></div>
            <CardHeader>
              <CardTitle>ATS Analysis Results</CardTitle>
              <CardDescription>
                How well your resume matches the job description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center py-4">
                <div className={`text-5xl font-bold mb-2 ${getScoreColor(atsScore)}`}>
                  {atsScore}%
                </div>
                <p className="text-muted-foreground mb-4">
                  {atsScore >= 90
                    ? "Excellent! Your resume is highly compatible with this job."
                    : atsScore >= 80
                    ? "Good job! Your resume matches well with this position."
                    : atsScore >= 70
                    ? "Fair match. Consider optimizing your resume further."
                    : "Your resume needs significant improvements to match this job."}
                </p>
                
                <div className="w-full max-w-md">
                  <Progress value={atsScore} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Poor Match</span>
                    <span>Excellent Match</span>
                  </div>
                </div>
              </div>
              
              {matchingKeywords.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Keyword Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Key terms from the job description and whether they appear in your resume:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {matchingKeywords.map((item, index) => (
                      <Badge 
                        key={index}
                        variant={item.matched ? "default" : "outline"} 
                        className={item.matched ? "" : "text-muted-foreground"}
                      >
                        {item.matched ? (
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {item.keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <h3 className="font-semibold">Recommendations</h3>
                <div className="space-y-2">
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Improve keyword matching</p>
                      <p className="text-sm text-muted-foreground">
                        Include more relevant keywords from the job description in your resume.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Quantify achievements</p>
                      <p className="text-sm text-muted-foreground">
                        Use numbers and metrics to showcase the impact of your work.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Use standard section headings</p>
                      <p className="text-sm text-muted-foreground">
                        Use clear section headers like "Experience," "Skills," and "Education."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t bg-muted/50 py-4">
              <Button>
                Apply These Improvements to My Resume
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">ATS Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Use standard resume formats (PDF, DOCX)</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Include relevant keywords from the job description</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Use standard headings like "Experience" and "Education"</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Avoid tables, headers/footers, and graphics</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Use a clean, simple layout</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Common ATS Mistakes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Using images, logos, or icons that ATS can't read</span>
                </li>
                <li className="flex gap-2">
                  <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Submitting resumes in non-standard formats</span>
                </li>
                <li className="flex gap-2">
                  <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Using creative layouts with multiple columns</span>
                </li>
                <li className="flex gap-2">
                  <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Including information in headers or footers</span>
                </li>
                <li className="flex gap-2">
                  <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Using uncommon section headers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AtsChecker;
