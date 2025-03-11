
import React from "react";
import { ResumeData } from "@/utils/resumeSchema";
import { cn } from "@/lib/utils";

interface ModernTemplateProps {
  resumeData: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resumeData }) => {
  const { personalInfo, experiences, education, skills } = resumeData;
  
  return (
    <div className="min-h-full w-full bg-white font-sans flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-6 text-gray-800">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary rounded-full mb-4 mx-auto flex items-center justify-center text-white text-2xl font-bold">
            {personalInfo.firstName?.[0]}{personalInfo.lastName?.[0]}
          </div>
          
          <h1 className="text-xl font-bold text-center mb-1">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
        </div>
        
        <div className="space-y-6">
          {/* Contact Information */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-primary">Contact</h2>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-start">
                  <span className="w-full break-words">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-start">
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-start">
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-start">
                  <span className="w-full break-words">{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-start">
                  <span className="w-full break-words">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </section>
          
          {/* Skills Section */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-primary">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className="text-xs text-gray-600">{skill.level}/5</span>
                      )}
                    </div>
                    {skill.level && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-6 text-gray-800">
        {/* Summary Section */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-3 text-gray-700">Profile</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">{personalInfo.summary}</p>
          </section>
        )}
        
        {/* Experience Section */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-3 text-gray-700">Experience</h2>
            
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200 pb-4 text-sm">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px]"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold">{exp.position}</h3>
                    <div className="text-gray-600 text-xs">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                  <div className="text-gray-600 mb-1">{exp.company}</div>
                  <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education Section */}
        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide mb-3 text-gray-700">Education</h2>
            
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-gray-200 pb-4 text-sm">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px]"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <div className="text-gray-600 text-xs">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </div>
                  </div>
                  <div className="text-gray-600 mb-1">
                    {edu.institution}{edu.field ? `, ${edu.field}` : ""}
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
