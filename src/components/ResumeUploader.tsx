import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ResumeUploaderProps {
  onResumeDataExtracted?: (data: any) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onResumeDataExtracted }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [atsResults, setAtsResults] = useState<{ category: string; score: number; feedback: string }[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        toast.success("File uploaded successfully!");
      }
    }
  });

  const simulateResumeUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload process
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            simulateATSScoring();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const simulateATSScoring = () => {
    // Simulate ATS analysis
    const randomScore = Math.floor(Math.random() * 31) + 70; // Random score between 70-100
    setAtsScore(randomScore);
    
    // Generate random feedback
    setAtsResults([
      {
        category: "Keyword Matching",
        score: Math.floor(Math.random() * 31) + 70,
        feedback: "Your resume contains many of the keywords from the job description."
      },
      {
        category: "Format Compatibility",
        score: Math.floor(Math.random() * 21) + 80,
        feedback: "Your resume format is compatible with most ATS systems."
      },
      {
        category: "Experience Relevance",
        score: Math.floor(Math.random() * 41) + 60,
        feedback: "Your experience section could be more aligned with the target position."
      },
      {
        category: "Overall Readability",
        score: Math.floor(Math.random() * 26) + 75,
        feedback: "Your resume is well-structured and easy to read."
      }
    ]);
    
    setIsUploading(false);
    
    // You could also extract data from the resume here in a real implementation
    if (onResumeDataExtracted) {
      onResumeDataExtracted({
        personalInfo: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "(123) 456-7890",
          location: "New York, NY"
        },
        // Other sections would be included here in a real implementation
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-emerald-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? "Drop your resume here..."
              : "Drag and drop your resume, or click to select a file"}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Supported formats: PDF, DOC, DOCX
          </p>
        </div>

        {file && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center text-sm">
              <FileText className="h-4 w-4 mr-2 text-blue-500" />
              <span className="font-medium">{file.name}</span>
              <span className="ml-auto text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>

            {isUploading ? (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-center text-gray-500">
                  {uploadProgress < 100
                    ? "Analyzing your resume..."
                    : "Checking ATS compatibility..."}
                </p>
              </div>
            ) : (
              <Button
                onClick={simulateResumeUpload}
                className="w-full"
                disabled={isUploading}
              >
                Analyze Resume for ATS Compatibility
              </Button>
            )}
          </div>
        )}

        {atsScore !== null && (
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-gray-100 p-3 mb-2">
                {atsScore >= 80 ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-500" />
                )}
              </div>
              <h3 className="text-xl font-bold">ATS Compatibility Score</h3>
              <div className={`text-3xl font-bold mt-2 ${getScoreColor(atsScore)}`}>
                {atsScore}%
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {atsScore >= 90
                  ? "Excellent! Your resume is highly compatible with ATS systems."
                  : atsScore >= 80
                  ? "Good job! Your resume is well-optimized for ATS systems."
                  : atsScore >= 70
                  ? "Your resume passes most ATS checks but could use some improvements."
                  : "Your resume needs significant improvements to pass ATS screenings."}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <h4 className="font-medium text-sm">Detailed Results</h4>
              {atsResults.map((result, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{result.category}</span>
                    <span className={`font-bold text-sm ${getScoreColor(result.score)}`}>
                      {result.score}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{result.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeUploader;
