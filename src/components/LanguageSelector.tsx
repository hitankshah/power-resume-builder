
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle, Trash2 } from "lucide-react";
import { Language } from "@/utils/resumeSchema";

interface LanguageSelectorProps {
  languages: Language[];
  onAddLanguage: () => void;
  onRemoveLanguage: (index: number) => void;
  onUpdateLanguage: (index: number, field: keyof Language, value: string) => void;
}

const proficiencyLevels = ["Basic", "Intermediate", "Advanced", "Native"];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  onAddLanguage,
  onRemoveLanguage,
  onUpdateLanguage,
}) => {
  return (
    <div className="space-y-4">
      {languages.map((language, index) => (
        <div key={language.id} className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Language name"
              value={language.name}
              onChange={(e) => onUpdateLanguage(index, "name", e.target.value)}
            />
          </div>
          
          <div className="w-40">
            <Select
              value={language.proficiency}
              onValueChange={(value) => onUpdateLanguage(index, "proficiency", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Proficiency" />
              </SelectTrigger>
              <SelectContent>
                {proficiencyLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemoveLanguage(index)}
            className="h-8 w-8 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={onAddLanguage}
        className="w-full"
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add Language
      </Button>
    </div>
  );
};

export default LanguageSelector;
