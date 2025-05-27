import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

const WorkExperience = () => {  const experiences: ExperienceItem[] = [
    {
      title: "Junior Web Developer",
      company: "Current Company",
      period: "January 2025 - Present",
      description: "Developing responsive web applications using modern JavaScript frameworks and React. Collaborating with senior developers on feature implementation and bug fixes. Participating in code reviews and agile development processes.",
      skills: ["React", "JavaScript", "TypeScript", "Node.js", "Tailwind CSS"]
    },
    {
      title: "Automotive Technician",
      company: "Massey Hyundai",
      period: "2023 - 2025",
      description: "Diagnosed and resolved complex mechanical and electrical issues using systematic troubleshooting approaches. Developed practical problem-solving skills and attention to detail that translate directly to software development.",
      skills: ["Problem Solving", "Diagnostics", "Client Communication"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-portfolio-purple/10 text-portfolio-purple border-portfolio-purple/20 mb-4 dark:bg-portfolio-purple/20">
            Experience
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            Work History
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey and how it's shaped my development skills.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-portfolio-purple/30 pl-8 ml-4">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-12 relative">
                {/* Timeline dot */}
                <div className="absolute -left-12 mt-1.5 w-6 h-6 rounded-full bg-portfolio-purple flex items-center justify-center">
                  <Briefcase className="h-3 w-3 text-white" />
                </div>
                
                {/* Experience content */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                    <span className="inline-block bg-portfolio-purple/10 text-portfolio-purple px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <h4 className="text-lg text-portfolio-purple mb-3">{exp.company}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
