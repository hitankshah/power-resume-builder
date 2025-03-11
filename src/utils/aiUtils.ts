
import { toast } from "sonner";

export interface AISuggestionOptions {
  role?: string;
  industry?: string;
  yearsOfExperience?: number;
  tone?: "professional" | "conversational" | "confident";
  length?: "short" | "medium" | "long";
}

// Placeholder for AI integration
// In a real app, this would connect to an API
export const generateSummary = async (
  resumeData: any,
  options: AISuggestionOptions = {}
): Promise<string> => {
  try {
    // In a real implementation, we would call an AI API here
    // For now, we'll return placeholder text based on the data
    console.log("Generating AI suggestion with options:", options);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const { role, industry, yearsOfExperience, tone = "professional", length = "medium" } = options;
    
    let experienceLevel = "experienced";
    if (yearsOfExperience) {
      if (yearsOfExperience < 2) experienceLevel = "entry-level";
      else if (yearsOfExperience < 5) experienceLevel = "mid-level";
      else if (yearsOfExperience >= 10) experienceLevel = "senior";
    }
    
    const experiences = resumeData.experiences || [];
    const skills = resumeData.skills || [];
    const skillsText = skills.map((s: any) => s.name).slice(0, 3).join(", ");
    
    let summary = "";
    
    if (length === "short") {
      summary = `${experienceLevel} ${role || "professional"} with expertise in ${skillsText}.`;
    } else {
      const lastPosition = experiences[0]?.position || role || "professional";
      const lastCompany = experiences[0]?.company || "";
      summary = `${experienceLevel} ${lastPosition} ${lastCompany ? `with experience at ${lastCompany}` : ""} specializing in ${skillsText}. Proven track record of delivering results through innovative solutions and strategic thinking.`;
      
      if (length === "long") {
        summary += ` Dedicated to continuous learning and applying ${skillsText} to solve complex problems. Looking to leverage my skills in a challenging ${role || "role"} ${industry ? `in the ${industry} industry` : ""}.`;
      }
    }
    
    return summary;
  } catch (error) {
    console.error("Error generating AI suggestion:", error);
    toast.error("Failed to generate AI suggestion. Please try again.");
    return "";
  }
};

export const generateBulletPoint = async (
  context: string,
  options: AISuggestionOptions = {}
): Promise<string> => {
  try {
    console.log("Generating bullet point with context:", context);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, return smart-sounding bullet points
    const bulletPoints = [
      "Increased team productivity by 35% through implementation of agile methodologies and workflow optimizations.",
      "Developed and launched new product features resulting in 25% increase in user engagement metrics.",
      "Led cross-functional team of 8 engineers to deliver project under budget and ahead of schedule.",
      "Optimized database queries reducing load times by 40% and improving overall application performance.",
      "Created comprehensive documentation and training materials for internal and client-facing processes.",
      "Designed and implemented responsive UI components that improved user experience and accessibility.",
    ];
    
    return bulletPoints[Math.floor(Math.random() * bulletPoints.length)];
  } catch (error) {
    console.error("Error generating bullet point:", error);
    toast.error("Failed to generate bullet point. Please try again.");
    return "";
  }
};
