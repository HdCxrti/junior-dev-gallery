
import { ArrowRight, Code, FileText, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const skills = [
    "HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", 
    "Tailwind CSS", "Node.js", "Express", "MongoDB", "Git"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-portfolio-purple/10 text-portfolio-purple border-portfolio-purple/20 mb-4">About Me</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">My Journey & Skills</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-md bg-gradient-to-br from-portfolio-blue to-portfolio-purple absolute -top-4 -left-4 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                alt="Developer portrait" 
                className="w-64 h-64 md:w-80 md:h-80 rounded-md object-cover relative z-10"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Hello! I'm John Doe</h3>
            <p className="text-gray-600 mb-4">
              I'm an entry-level frontend developer passionate about creating beautiful and functional web applications. 
              I recently completed my degree in Computer Science and have been building projects to enhance my skills.
            </p>
            <p className="text-gray-600 mb-6">
              I love solving problems and learning new technologies. My goal is to create user-friendly interfaces that provide great user experiences.
            </p>

            <div className="mb-8">
              <h4 className="font-bold text-lg mb-4">My Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-portfolio-purple hover:bg-portfolio-indigo flex items-center gap-2" asChild>
                <a href="#" download>
                  <FileText className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button variant="outline" className="border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple/10 flex items-center gap-2" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Visit GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
