
import * as z from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().optional(),
  summary: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Language name is required"),
  proficiency: z.enum(["Basic", "Intermediate", "Advanced", "Native"]),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required"),
  level: z.number().min(1).max(5).optional(),
  category: z.enum([
    "Technical",
    "Soft Skills",
    "Industry Knowledge",
    "Tools",
    "Certifications",
    "Other"
  ]).optional(),
});

export const hobbySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Hobby name is required"),
  description: z.string().optional(),
});

export const achievementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Achievement title is required"),
  date: z.string().optional(),
  description: z.string().optional(),
});

export const certificateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certificate name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().optional(),
  credentialID: z.string().optional(),
  credentialURL: z.string().url().optional().or(z.literal("")),
  description: z.string().optional(),
});

const templateStyles = z.enum([
  "minimal",
  "professional",
  "modern",
  "academic",
  "creative",
  "executive",
  "technical",
  "elegant",
  "bold",
  "simple"
]);

const templateRoles = z.enum([
  "software-engineer",
  "doctor",
  "student",
  "mba-student",
  "business-analyst",
  "project-manager",
  "marketing-professional",
  "designer",
  "researcher",
  "teacher",
  "data-scientist",
  "finance-professional",
  "healthcare-worker",
  "sales-representative",
  "customer-service",
  "executive",
]);

export const professionalTemplateSchema = z.object({
  role: templateRoles.optional(),
  style: templateStyles.default("minimal"),
});

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  experiences: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  languages: z.array(languageSchema).optional(),
  hobbies: z.array(hobbySchema).optional(),
  achievements: z.array(achievementSchema).optional(),
  certificates: z.array(certificateSchema).optional(),
  template: professionalTemplateSchema,
});

export type ResumeData = z.infer<typeof resumeSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Language = z.infer<typeof languageSchema>;
export type Hobby = z.infer<typeof hobbySchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type Certificate = z.infer<typeof certificateSchema>;
export type ProfessionalTemplate = z.infer<typeof professionalTemplateSchema>;
export type TemplateStyle = z.infer<typeof templateStyles>;
export type TemplateRole = z.infer<typeof templateRoles>;
