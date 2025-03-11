
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const templates: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design with a focus on content",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='20' y='20' width='160' height='20' fill='%23f0f0f0'/%3E%3Crect x='20' y='50' width='100' height='8' fill='%23e0e0e0'/%3E%3Crect x='20' y='70' width='160' height='1' fill='%23e0e0e0'/%3E%3Crect x='20' y='80' width='80' height='8' fill='%23e0e0e0'/%3E%3Crect x='20' y='95' width='120' height='4' fill='%23f0f0f0'/%3E%3Crect x='20' y='105' width='100' height='4' fill='%23f0f0f0'/%3E%3Crect x='20' y='125' width='80' height='8' fill='%23e0e0e0'/%3E%3Crect x='20' y='140' width='120' height='4' fill='%23f0f0f0'/%3E%3Crect x='20' y='150' width='100' height='4' fill='%23f0f0f0'/%3E%3Crect x='20' y='170' width='80' height='8' fill='%23e0e0e0'/%3E%3Crect x='20' y='185' width='120' height='4' fill='%23f0f0f0'/%3E%3Crect x='20' y='195' width='100' height='4' fill='%23f0f0f0'/%3E%3C/svg%3E"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with a two-column layout",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='0' y='0' width='60' height='280' fill='%23f0f0f0'/%3E%3Crect x='75' y='20' width='110' height='15' fill='%23e0e0e0'/%3E%3Crect x='75' y='45' width='80' height='8' fill='%23e0e0e0'/%3E%3Crect x='75' y='65' width='110' height='1' fill='%23e0e0e0'/%3E%3Crect x='75' y='80' width='70' height='8' fill='%23e0e0e0'/%3E%3Crect x='75' y='95' width='110' height='4' fill='%23f0f0f0'/%3E%3Crect x='75' y='105' width='100' height='4' fill='%23f0f0f0'/%3E%3Crect x='75' y='125' width='70' height='8' fill='%23e0e0e0'/%3E%3Crect x='75' y='140' width='110' height='4' fill='%23f0f0f0'/%3E%3Crect x='20' y='40' width='20' height='20' rx='10' fill='%23e0e0e0'/%3E%3Crect x='15' y='70' width='30' height='4' fill='%23d0d0d0'/%3E%3Crect x='15' y='80' width='30' height='4' fill='%23d0d0d0'/%3E%3Crect x='15' y='90' width='30' height='4' fill='%23d0d0d0'/%3E%3Crect x='20' y='120' width='20' height='20' rx='10' fill='%23e0e0e0'/%3E%3Crect x='15' y='150' width='30' height='4' fill='%23d0d0d0'/%3E%3Crect x='15' y='160' width='30' height='4' fill='%23d0d0d0'/%3E%3C/svg%3E"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional layout ideal for corporate environments",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='white'/%3E%3Crect x='0' y='0' width='200' height='40' fill='%23f0f0f0'/%3E%3Crect x='70' y='15' width='60' height='10' fill='%23e0e0e0'/%3E%3Crect x='20' y='50' width='160' height='1' fill='%23e0e0e0'/%3E%3Crect x='20' y='60' width='80' height='8' fill='%23e0e0e0'/%3E%3Crect x='20' y='75' width='160' height='4' fill='%23f0f0f0'/%3E%3Crect x='20' y='85' width='140' height='4' fill='%23f0f0f0'/%3E%3Crect x='20' y='105' width='80' height='8' fill='%23e0e0e0'/%3E%3Crect x='20' y='120' width='160' height='4' fill='%23f0f0f0'/%3E%3Crect x='20' y='130' width='140' height='4' fill='%23f0f0f0'/%3E%3Crect x='20' y='150' width='80' height='8' fill='%23e0e0e0'/%3E%3Crect x='20' y='165' width='160' height='4' fill='%23f0f0f0'/%3E%3Crect x='20' y='175' width='140' height='4' fill='%23f0f0f0'/%3E%3C/svg%3E"
  }
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Resume Template</h3>
      </div>
      
      <RadioGroup 
        value={selectedTemplate} 
        onValueChange={onSelectTemplate}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {templates.map((template) => (
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
