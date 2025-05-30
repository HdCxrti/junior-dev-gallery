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
      title: "Automotive Technician",
      company: "Massey Hyundai",
      period: "2023 - 2025",
      description: "Diagnosed and resolved complex mechanical and electrical issues using systematic troubleshooting approaches. Developed practical problem-solving skills and attention to detail that translate directly to software development. Expert in systematic debugging and finding efficient solutions under pressure.",
      skills: ["Problem Solving", "Diagnostics", "Client Communication", "Technical Documentation", "Attention to Detail"]
    },
    {
      title: "Family Assistant",
      company: "Grandfather's Estate",
      period: "2020 - 2024",
      description: "Provided assistance to grandfather with auto maintenance, home repairs, and lawn care before transitioning to focus fully on software development. Handled complex automotive repairs including brake replacements, oil changes, and diagnostic troubleshooting. Managed regular property maintenance including landscaping, equipment repair, and home improvements. This role developed my practical problem-solving abilities and technical aptitude that transfer well to software development.",
      skills: ["Automotive Repair", "Home Maintenance", "Lawn Care", "Problem Solving", "Technical Skills", "Time Management"]
    },{
      title: "OGP Associate",
      company: "Walmart - Online Grocery Pickup",
      period: "2021 - 2023",
      description: "Fulfilled online grocery orders by accurately picking items from store shelves under strict time constraints. Maintained high standards for quality control and food safety while packing and staging orders. Provided direct customer service during order pickup, ensuring a smooth handoff process and resolving any issues on the spot. Developed strong attention to detail and ability to work efficiently in a fast-paced environment with constantly changing priorities.",
      skills: ["Order Fulfillment", "Time Management", "Customer Service", "Inventory Management", "Quality Control", "Problem Resolution"]
    },
    {
      title: "Landscaper",
      company: "Local Landscaping Business",
      period: "2019 - 2021",
      description: "Maintained residential and commercial properties with attention to detail and quality. Managed project timelines and coordinated with team members to ensure client satisfaction. Developed strong work ethic and ability to perform under various weather conditions.",
      skills: ["Physical Endurance", "Time Management", "Team Coordination", "Client Relations"]
    },
    {
      title: "Team Member",
      company: "Domino's Pizza",
      period: "2018 - 2020",
      description: "Started working at age 14 while balancing school responsibilities. Handled various responsibilities including customer service, food preparation, and order fulfillment. Developed strong multitasking abilities and teamwork skills in a fast-paced environment. This early work experience built a foundation for work ethic and professional responsibility.",
      skills: ["Time Management", "Customer Service", "Multitasking", "Responsibility", "Teamwork", "Food Preparation"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">        <div className="text-center mb-16">
          <Badge className="bg-portfolio-purple/10 text-portfolio-purple border-portfolio-purple/20 mb-4 dark:bg-portfolio-purple/20">
            Experience
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            Work History
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey starting from age 14, showing my long-term commitment to hard work and continuous growth.
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
