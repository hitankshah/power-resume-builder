
import React from "react";
import { ResumeData } from "@/utils/resumeSchema";
import { cn } from "@/lib/utils";

interface ProfessionalTemplateProps {
  resumeData: ResumeData;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ resumeData }) => {
  const { personalInfo, experiences, education, skills } = resumeData;
  
  return (
    <div className="min-h-full w-full bg-white font-sans">
      {/* Header */}
      <header className="bg-primary text-white p-8 text-center">
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        <div className="flex flex-wrap justify-center text-sm gap-x-4 gap-y-1 mt-2">
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
      
      {/* Main Content */}
      <main className="p-8 text-gray-800">
        {/* Summary Section */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-primary">Professional Summary</h2>
            <div className="w-12 h-1 bg-primary mb-4"></div>
            <p className="text-sm text-gray-700">{personalInfo.summary}</p>
          </section>
        )}
        
        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3 space-y-8">
            {/* Experience Section */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3 text-primary">Experience</h2>
                <div className="w-12 h-1 bg-primary mb-4"></div>
                
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="text-sm">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-base">{exp.position}</h3>
                        <div className="text-gray-600 text-xs font-medium">
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </div>
                      </div>
                      <div className="text-gray-600 font-medium mb-2">{exp.company}</div>
                      <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Education Section */}
            {education.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3 text-primary">Education</h2>
                <div className="w-12 h-1 bg-primary mb-4"></div>
                
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-sm">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-base">{edu.degree}</h3>
                        <div className="text-gray-600 text-xs font-medium">
                          {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                        </div>
                      </div>
                      <div className="text-gray-600 font-medium mb-2">
                        {edu.institution}{edu.field ? `, ${edu.field}` : ""}
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div className="w-full md:w-1/3 space-y-8">
            {/* Skills Section */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3 text-primary">Skills</h2>
                <div className="w-12 h-1 bg-primary mb-4"></div>
                
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div 
                      key={skill.id} 
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalTemplate;
