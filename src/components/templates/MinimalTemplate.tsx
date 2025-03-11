
import React from "react";
import { ResumeData } from "@/utils/resumeSchema";
import { cn } from "@/lib/utils";

interface MinimalTemplateProps {
  resumeData: ResumeData;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ resumeData }) => {
  const { personalInfo, experiences, education, skills } = resumeData;

  return (
    <div className="min-h-full w-full bg-white p-8 text-gray-800 font-sans">
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        <div className="flex flex-wrap text-sm text-gray-600 gap-x-4 gap-y-1">
          {personalInfo.email && (
            <div>{personalInfo.email}</div>
          )}
          {personalInfo.phone && (
            <div>{personalInfo.phone}</div>
          )}
          {personalInfo.location && (
            <div>{personalInfo.location}</div>
          )}
          {personalInfo.website && (
            <div>{personalInfo.website}</div>
          )}
          {personalInfo.linkedin && (
            <div>{personalInfo.linkedin}</div>
          )}
        </div>
      </header>
      
      {/* Summary Section */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 pb-1 border-b border-gray-200">Summary</h2>
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience Section */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 pb-1 border-b border-gray-200">Experience</h2>
          
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="text-sm">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{exp.position}</h3>
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
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 pb-1 border-b border-gray-200">Education</h2>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="text-sm">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{edu.degree}</h3>
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
      
      {/* Skills Section */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2 pb-1 border-b border-gray-200">Skills</h2>
          
          <div className="flex flex-wrap gap-2 text-sm">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
