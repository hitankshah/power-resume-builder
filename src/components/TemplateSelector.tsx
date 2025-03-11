
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  roles: string[];
}

interface TemplateSelectorProps {
  selectedTemplate: string;
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
    roles: ["all"]
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
    roles: ["designer", "marketing-professional"]
  },
  {
    id: "executive",
    name: "Executive",
    description: "Elegant design for senior professionals",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='0' y='0' width='200' height='40' fill='%23f0f0f0'/%3E%3C/svg%3E",
    roles: ["business-analyst", "project-manager", "mba-student"]
  }
];

const roleOptions = [
  { value: "software-engineer", label: "Software Engineer" },
  { value: "doctor", label: "Medical Professional" },
  { value: "student", label: "Student" },
  { value: "mba-student", label: "MBA Student" },
  { value: "business-analyst", label: "Business Analyst" },
  { value: "project-manager", label: "Project Manager" },
  { value: "marketing-professional", label: "Marketing Professional" },
  { value: "designer", label: "Designer" },
  { value: "researcher", label: "Researcher" },
  { value: "teacher", label: "Teacher" }
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
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <RadioGroup 
        value={selectedTemplate} 
        onValueChange={onSelectTemplate}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {filteredTemplates.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem
              value={template.id}
              id={template.id}
              className="sr-only peer"
            />
            <Label
              htmlFor={template.id}
              className={cn(
                "flex flex-col items-center justify-between rounded-lg border-2 border-muted p-4 hover:border-primary cursor-pointer transition-all duration-200 ease-apple",
                "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              )}
            >
              <div className="mb-2 overflow-hidden rounded-md border shadow-sm">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="h-36 w-full object-cover transition-transform duration-300 ease-apple"
                />
              </div>
              <div className="text-center">
                <h4 className="text-base font-medium">{template.name}</h4>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TemplateSelector;
