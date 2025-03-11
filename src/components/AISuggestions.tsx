
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateSummary, generateBulletPoint, AISuggestionOptions } from "@/utils/aiUtils";
import { Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface AISuggestionsProps {
  resumeData: any;
  onApplySuggestion: (field: string, value: string) => void;
  context?: string;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ resumeData, onApplySuggestion, context = "summary" }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [options, setOptions] = useState<AISuggestionOptions>({
    role: "",
    industry: "",
    yearsOfExperience: 3,
    tone: "professional",
    length: "medium",
  });

  const handleGenerateSuggestion = async () => {
    setIsGenerating(true);
    try {
      let result = "";
      
      if (context === "summary") {
        result = await generateSummary(resumeData, options);
      } else {
        result = await generateBulletPoint(context, options);
      }
      
      setSuggestion(result);
    } catch (error) {
      console.error("Error generating suggestion:", error);
      toast.error("Failed to generate suggestion. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplySuggestion = () => {
    if (suggestion) {
      onApplySuggestion(context, suggestion);
      toast.success("Suggestion applied!");
    }
  };

  return (
    <Card className="neomorphic transition-all duration-300 ease-apple">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">AI Assistant</h3>
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Options
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <Tabs defaultValue="content">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-xs">Role</Label>
                    <Select 
                      value={options.role || ""}
                      onValueChange={(value) => setOptions({...options, role: value})}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software-engineer">Software Engineer</SelectItem>
                        <SelectItem value="product-manager">Product Manager</SelectItem>
                        <SelectItem value="data-scientist">Data Scientist</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="marketing">Marketing Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-xs">Industry</Label>
                    <Select 
                      value={options.industry || ""}
                      onValueChange={(value) => setOptions({...options, industry: value})}
                    >
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="experience" className="text-xs">Years of Experience</Label>
                      <span className="text-xs text-muted-foreground">{options.yearsOfExperience}</span>
                    </div>
                    <Slider
                      id="experience"
                      min={0}
                      max={20}
                      step={1}
                      value={[options.yearsOfExperience || 3]}
                      onValueChange={(value) => setOptions({...options, yearsOfExperience: value[0]})}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="style" className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="tone" className="text-xs">Tone</Label>
                    <Select 
                      value={options.tone}
                      onValueChange={(value: "professional" | "conversational" | "confident") => 
                        setOptions({...options, tone: value})
                      }
                    >
                      <SelectTrigger id="tone">
                        <SelectValue placeholder="Select a tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                        <SelectItem value="confident">Confident</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="length" className="text-xs">Length</Label>
                    <Select 
                      value={options.length}
                      onValueChange={(value: "short" | "medium" | "long") => 
                        setOptions({...options, length: value})
                      }
                    >
                      <SelectTrigger id="length">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="long">Long</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="mb-3">
          {suggestion ? (
            <div className="text-sm p-3 bg-muted/50 rounded-md border animate-fade-in">
              {suggestion}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground animate-fade-in">
              {context === "summary" 
                ? "Generate a professional summary based on your resume information."
                : "Generate a bullet point for your experience or education section."}
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-8 flex-1"
            onClick={handleGenerateSuggestion}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 mr-1" />
                Generate
              </>
            )}
          </Button>
          
          {suggestion && (
            <Button 
              size="sm" 
              className="text-xs h-8 flex-1"
              onClick={handleApplySuggestion}
            >
              Apply
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AISuggestions;
