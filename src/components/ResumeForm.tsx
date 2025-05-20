import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResumeData, resumeSchema, ProfessionalTemplate } from "@/utils/resumeSchema";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TemplateSelector from "./TemplateSelector";
import AISuggestions from "./AISuggestions";
import { toast } from "sonner";
import { PlusCircle, Trash2, Save, Eye } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface ResumeFormProps {
  initialData?: Partial<ResumeData>;
  onSubmit: (data: ResumeData) => void;
  onChange?: (data: Partial<ResumeData>) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ initialData, onSubmit, onChange }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personalInfo: {
        firstName: initialData?.personalInfo?.firstName || "",
        lastName: initialData?.personalInfo?.lastName || "",
        email: initialData?.personalInfo?.email || "",
        phone: initialData?.personalInfo?.phone || "",
        location: initialData?.personalInfo?.location || "",
        website: initialData?.personalInfo?.website || "",
        linkedin: initialData?.personalInfo?.linkedin || "",
        summary: initialData?.personalInfo?.summary || "",
      },
      experiences: initialData?.experiences || [
        {
          id: uuidv4(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
      education: initialData?.education || [
        {
          id: uuidv4(),
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
      skills: initialData?.skills || [
        {
          id: uuidv4(),
          name: "",
          level: 3,
        },
      ],
      languages: initialData?.languages || [
        {
          id: uuidv4(),
          name: "",
          proficiency: "Intermediate",
        },
      ],
      customSections: initialData?.customSections || [],
      template: initialData?.template || {
        style: "minimal",
        role: "software-engineer",
      },
    },
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const { fields: customSectionFields, append: appendCustomSection, remove: removeCustomSection } = useFieldArray({
    control: form.control,
    name: "customSections",
  });

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onChange?.(value as Partial<ResumeData>);
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
    toast.success("Resume has been saved!");
  });

  const handleAISuggestion = (field: string, value: string) => {
    if (field === "summary") {
      form.setValue("personalInfo.summary", value);
    } else if (field.startsWith("experience-")) {
      const index = parseInt(field.split("-")[1]);
      form.setValue(`experiences.${index}.description`, value);
    } else if (field.startsWith("education-")) {
      const index = parseInt(field.split("-")[1]);
      form.setValue(`education.${index}.description`, value);
    }
  };

  const handleTemplateStyleChange = (style: string) => {
    form.setValue("template.style", style as any);
  };

  const handleRoleChange = (role: string) => {
    form.setValue("template.role", role as any);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(customSectionFields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    form.setValue("customSections", items);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <Card className="neomorphic">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-6 mb-4">
              <TabsTrigger value="personal" className="transition-all duration-300 ease-apple">Personal</TabsTrigger>
              <TabsTrigger value="experience" className="transition-all duration-300 ease-apple">Experience</TabsTrigger>
              <TabsTrigger value="education" className="transition-all duration-300 ease-apple">Education</TabsTrigger>
              <TabsTrigger value="skills" className="transition-all duration-300 ease-apple">Skills</TabsTrigger>
              <TabsTrigger value="languages" className="transition-all duration-300 ease-apple">Languages</TabsTrigger>
              <TabsTrigger value="custom" className="transition-all duration-300 ease-apple">Custom</TabsTrigger>
            </TabsList>

            <CardContent>
              <TabsContent value="personal" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourwebsite.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="linkedin.com/in/johndoe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.summary"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Professional Summary</FormLabel>
                          </div>
                          <FormControl>
                            <Textarea
                              placeholder="Briefly describe your professional background and career goals..."
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <AISuggestions 
                      resumeData={form.getValues()} 
                      onApplySuggestion={handleAISuggestion}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="experience" className="animate-fade-in">
                <div className="space-y-6">
                  {experienceFields.map((field, index) => (
                    <div key={field.id} className="space-y-4 p-4 border rounded-lg relative animate-enter">
                      <div className="absolute top-4 right-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExperience(index)}
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`experiences.${index}.company`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Company Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`experiences.${index}.position`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position</FormLabel>
                              <FormControl>
                                <Input placeholder="Job Title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`experiences.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YYYY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-end gap-4">
                          <FormField
                            control={form.control}
                            name={`experiences.${index}.current`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center gap-2 space-y-0">
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Current Position</FormLabel>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {!form.watch(`experiences.${index}.current`) && (
                            <FormField
                              control={form.control}
                              name={`experiences.${index}.endDate`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YYYY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`experiences.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your responsibilities and achievements..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <AISuggestions 
                        resumeData={form.getValues()} 
                        onApplySuggestion={handleAISuggestion}
                        context={`experience-${index}`}
                      />
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendExperience({
                        id: uuidv4(),
                        company: "",
                        position: "",
                        startDate: "",
                        endDate: "",
                        current: false,
                        description: "",
                      })
                    }
                    className="w-full"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Experience
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="education" className="animate-fade-in">
                <div className="space-y-6">
                  {educationFields.map((field, index) => (
                    <div key={field.id} className="space-y-4 p-4 border rounded-lg relative animate-enter">
                      <div className="absolute top-4 right-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEducation(index)}
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`education.${index}.institution`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institution</FormLabel>
                              <FormControl>
                                <Input placeholder="University/College Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`education.${index}.degree`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                <Input placeholder="Bachelor of Science" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`education.${index}.field`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Field of Study</FormLabel>
                              <FormControl>
                                <Input placeholder="Computer Science" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`education.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YYYY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-end gap-4">
                          <FormField
                            control={form.control}
                            name={`education.${index}.current`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center gap-2 space-y-0">
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Current Student</FormLabel>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {!form.watch(`education.${index}.current`) && (
                            <FormField
                              control={form.control}
                              name={`education.${index}.endDate`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YYYY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`education.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your academic achievements, relevant coursework, etc..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <AISuggestions 
                        resumeData={form.getValues()} 
                        onApplySuggestion={handleAISuggestion}
                        context={`education-${index}`}
                      />
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendEducation({
                        id: uuidv4(),
                        institution: "",
                        degree: "",
                        field: "",
                        startDate: "",
                        endDate: "",
                        current: false,
                        description: "",
                      })
                    }
                    className="w-full"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Education
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="skills" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillFields.map((field, index) => (
                      <div key={field.id} className="flex items-center space-x-2 animate-enter">
                        <FormField
                          control={form.control}
                          name={`skills.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="Skill name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSkill(index)}
                          className="h-8 w-8 text-destructive flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendSkill({
                        id: uuidv4(),
                        name: "",
                        level: 3,
                      })
                    }
                    className="w-full"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Skill
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="languages" className="animate-fade-in">
                <div className="space-y-6">
                  {languageFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center animate-enter">
                      <FormField
                        control={form.control}
                        name={`languages.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language</FormLabel>
                            <FormControl>
                              <Input placeholder="Language name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-end space-x-2">
                        <FormField
                          control={form.control}
                          name={`languages.${index}.proficiency`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Proficiency</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select proficiency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Basic">Basic</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                  <SelectItem value="Native">Native</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLanguage(index)}
                          className="h-10 w-10 text-destructive flex-shrink-0 mb-[2px]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendLanguage({
                        id: uuidv4(),
                        name: "",
                        proficiency: "Intermediate",
                      })
                    }
                    className="w-full"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Language
                  </Button>
                </div>
                
                <Separator className="my-8" />
                
                <div className="mt-8">
                  <TemplateSelector
                    selectedTemplate={form.watch("template")}
                    onSelectTemplate={handleTemplateStyleChange}
                    selectedRole={form.watch("template.role")}
                    onSelectRole={handleRoleChange}
                  />
                </div>
              </TabsContent>

              <TabsContent value="custom" className="animate-fade-in">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="customSections">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                        {customSectionFields.map((field, index) => (
                          <Draggable key={field.id} draggableId={field.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="space-y-4 p-4 border rounded-lg relative animate-enter"
                              >
                                <div className="absolute top-4 right-4">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeCustomSection(index)}
                                    className="h-8 w-8 text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>

                                <FormField
                                  control={form.control}
                                  name={`customSections.${index}.title`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Section Title</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Section Title" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`customSections.${index}.content`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Content</FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Section Content"
                                          rows={4}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendCustomSection({
                      id: uuidv4(),
                      title: "",
                      content: "",
                    })
                  }
                  className="w-full"
                >
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Custom Section
                </Button>
              </TabsContent>
            </CardContent>
          </Tabs>

          <div className="flex justify-between p-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const tabOrder = ["personal", "experience", "education", "skills", "languages", "custom"];
                const currentIndex = tabOrder.indexOf(activeTab);
                const nextIndex = (currentIndex + 1) % tabOrder.length;
                setActiveTab(tabOrder[nextIndex]);
              }}
            >
              {activeTab === "custom" ? "Back to Personal" : "Next"}
            </Button>

            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
                <Eye className="h-4 w-4" /> {isPreviewMode ? "Edit Mode" : "Preview Mode"}
              </Button>
              <Button type="button" onClick={handleSubmit} className="flex items-center gap-2">
                <Save className="h-4 w-4" /> Save Resume
              </Button>
            </div>
          </div>
        </Card>
      </Form>
    </div>
  );
};

export default ResumeForm;
