
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfessionalTemplate, TemplateRole, TemplateStyle } from "@/utils/resumeSchema";
import { Badge } from "@/components/ui/badge";
import { Trophy, Briefcase, GraduationCap, Palette, ChevronRight } from "lucide-react";

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  roles: string[];
  badge?: string;
}

interface TemplateSelectorProps {
  selectedTemplate: ProfessionalTemplate;
  onSelectTemplate: (templateId: string) => void;
  selectedRole?: string;
  onSelectRole?: (role: string) => void;
}

const templates: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design for all professionals",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='20' y='20' width='160' height='20' fill='%23f0f0f0'/%3E%3Crect x='20' y='50' width='100' height='8' fill='%23e0e0e0'/%3E%3Crect x='20' y='70' width='160' height='1' fill='%23e0e0e0'/%3E%3C/svg%3E",
    roles: ["all"],
    badge: "Popular"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional corporate layout",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='0' y='0' width='200' height='40' fill='%23f0f0f0'/%3E%3C/svg%3E",
    roles: ["business-analyst", "project-manager", "mba-student"]
  },
  {
    id: "academic",
    name: "Academic",
    description: "Perfect for students and researchers",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='0' y='0' width='60' height='280' fill='%23f0f0f0'/%3E%3C/svg%3E",
    roles: ["student", "researcher", "doctor"]
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with a modern design",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='0' y='0' width='60' height='280' fill='%23f0f0f0'/%3E%3C/svg%3E",
    roles: ["designer", "marketing-professional"],
    badge: "New"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Elegant design for senior professionals",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='0' y='0' width='200' height='40' fill='%23f0f0f0'/%3E%3C/svg%3E",
    roles: ["business-analyst", "project-manager", "mba-student"]
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary layout with strong visual hierarchy",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='0' y='0' width='200' height='60' fill='%23f0f0f0'/%3E%3Crect x='20' y='80' width='160' height='10' fill='%23e0e0e0'/%3E%3C/svg%3E",
    roles: ["software-engineer", "designer", "marketing-professional"],
    badge: "Popular"
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for technical roles and skills",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='0' y='0' width='200' height='30' fill='%23e0e0e0'/%3E%3Crect x='130' y='40' width='50' height='220' fill='%23f0f0f0'/%3E%3C/svg%3E",
    roles: ["software-engineer", "data-scientist", "researcher"]
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated design with refined typography",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='20' y='30' width='160' height='2' fill='%23e0e0e0'/%3E%3Crect x='20' y='45' width='120' height='10' fill='%23f0f0f0'/%3E%3C/svg%3E",
    roles: ["all"],
    badge: "New"
  },
  {
    id: "simple",
    name: "Simple",
    description: "Streamlined design focusing on content",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='20' y='20' width='160' height='12' fill='%23f0f0f0'/%3E%3Crect x='20' y='40' width='120' height='8' fill='%23e0e0e0'/%3E%3C/svg%3E",
    roles: ["all"]
  },
];

const roleOptions = [
  { value: "software-engineer", label: "Software Engineer", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { value: "doctor", label: "Medical Professional", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { value: "student", label: "Student", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
  { value: "mba-student", label: "MBA Student", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
  { value: "business-analyst", label: "Business Analyst", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { value: "project-manager", label: "Project Manager", icon: <Trophy className="h-4 w-4 mr-2" /> },
  { value: "marketing-professional", label: "Marketing Professional", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { value: "designer", label: "Designer", icon: <Palette className="h-4 w-4 mr-2" /> },
  { value: "researcher", label: "Researcher", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
  { value: "teacher", label: "Teacher", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
  { value: "data-scientist", label: "Data Scientist", icon: <Briefcase className="h-4 w-4 mr-2" /> }
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  onSelectTemplate,
  selectedRole,
  onSelectRole 
}) => {
  const filteredTemplates = selectedRole
    ? templates.filter(t => t.roles.includes("all") || t.roles.includes(selectedRole))
    : templates;

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Resume Template</h3>
      </div>

      <div className="mb-6">
        <Label htmlFor="role" className="mb-2 block">Choose your profession</Label>
        <Select 
          value={selectedRole} 
          onValueChange={onSelectRole}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your profession" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((role) => (
              <SelectItem key={role.value} value={role.value} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {role.icon}
                  {role.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="relative">
            <input
              type="radio"
              id={template.id}
              name="template"
              value={template.id}
              checked={selectedTemplate.style === template.id}
              onChange={() => onSelectTemplate(template.id)}
              className="sr-only peer"
            />
            <Label
              htmlFor={template.id}
              className={cn(
                "flex flex-col items-center justify-between rounded-lg border-2 border-muted p-4 hover:border-primary cursor-pointer transition-all duration-200 ease-in-out",
                "peer-checked:border-primary peer-checked:bg-primary/5",
                "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              <div className="relative mb-3 overflow-hidden rounded-md border shadow-sm w-full">
                {template.badge && (
                  <Badge 
                    className={cn(
                      "absolute top-2 right-2 z-10",
                      template.badge === "New" ? "bg-blue-500" : "bg-primary"
                    )}
                  >
                    {template.badge}
                  </Badge>
                )}
                <div className="aspect-[1/1.414] relative">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="h-full w-full object-cover absolute inset-0"
                  />
                </div>
                <div className="absolute inset-0 peer-checked:bg-primary/10 transition-colors"></div>
              </div>
              <div className="text-center">
                <h4 className="text-base font-medium">{template.name}</h4>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
              
              <div className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity",
                "peer-checked:opacity-100 hover:opacity-100"
              )}>
                <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium flex items-center">
                  {selectedTemplate.style === template.id ? "Selected" : "Preview"} <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
