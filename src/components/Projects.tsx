
import ProjectCard from './ProjectCard';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Website",
      description: "A fully responsive e-commerce platform with product filtering, cart functionality, and checkout process.",
      imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Task Management App",
      description: "A Kanban-style task management application with drag-and-drop functionality and task filtering.",
      imageSrc: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      tags: ["React", "Redux", "Firebase", "Tailwind CSS"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Weather Dashboard",
      description: "A weather application that displays current weather and forecasts based on user location or search.",
      imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tags: ["HTML", "CSS", "JavaScript", "Weather API"],
      demoLink: "#",
      codeLink: "#"
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-portfolio-purple/10 text-portfolio-purple border-portfolio-purple/20 mb-4">Portfolio</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">My Recent Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects showcasing my skills and experience. Feel free to check out the code and live demos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              tags={project.tags}
              demoLink={project.demoLink}
              codeLink={project.codeLink}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
