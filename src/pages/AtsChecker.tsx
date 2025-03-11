
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ResumeUploader from "@/components/ResumeUploader";
import { ThemeToggle } from "@/components/ThemeToggle";

const AtsChecker = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Resume Builder
            </Button>
          </Link>
          <ThemeToggle />
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">ATS Score Checker</CardTitle>
            <CardDescription>
              Upload your resume to check its compatibility with Applicant Tracking Systems (ATS)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResumeUploader />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>What is ATS?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Applicant Tracking Systems (ATS) are software applications that employers use to manage their recruitment process. They scan, filter, and rank resumes before a human ever sees them.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips to Pass ATS</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use standard resume formats (PDF, DOCX)</li>
                <li>Include relevant keywords from the job description</li>
                <li>Use standard headings like "Experience" and "Education"</li>
                <li>Avoid tables, headers/footers, and graphics</li>
                <li>Use a clean, simple layout</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AtsChecker;
