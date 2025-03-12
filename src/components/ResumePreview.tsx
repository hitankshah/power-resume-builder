import React from "react";
import { ResumeData } from "@/utils/resumeSchema";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import MinimalTemplate from "./templates/MinimalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedFont: string;
  fontSize: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, selectedFont, fontSize }) => {
  const renderTemplate = () => {
    switch (resumeData.template.style) {
      case "minimal":
        return <MinimalTemplate resumeData={resumeData} />;
      case "modern":
      case "creative":
      case "bold":
        return <ModernTemplate resumeData={resumeData} />;
      case "professional":
      case "academic":
      case "executive":
      case "technical":
      case "elegant":
      case "simple":
        return <ProfessionalTemplate resumeData={resumeData} />;
      default:
        return <MinimalTemplate resumeData={resumeData} />;
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <Card 
        className={cn(
          "w-full bg-white dark:bg-gray-800 shadow-md transition-all duration-500 ease-apple",
          "hover:shadow-lg"
        )}
      >
        <div 
          id="resume-preview-container" 
          className="w-full aspect-[1/1.414] overflow-auto" // A4 aspect ratio
          style={{ fontFamily: selectedFont, fontSize: `${fontSize}px` }}
        >
          {renderTemplate()}
        </div>
      </Card>
    </div>
  );
};

export default ResumePreview;
