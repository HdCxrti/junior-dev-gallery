
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [githubProjects, setGithubProjects] = useState([]);
  
  // Fetch projects from GitHub on component mount
  useEffect(() => {
    const fetchGithubProjects = async () => {
      try {
        const username = 'HdCxrti'; // Same username from GitHubStats
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        const data = await response.json();
        
        // Take the most recent project that has a description and is not a fork
        const recentProject = data.filter(repo => repo.description && !repo.fork)[0];
        
        if (recentProject) {
          // Get the repo's languages
          const langResponse = await fetch(recentProject.languages_url);
          const langData = await langResponse.json();
          
          // Transform language object to array of tags
          const tags = Object.keys(langData);
          
          // Create a project object with the fetched data
          const githubProject = {
            title: recentProject.name,
            description: recentProject.description,
            // Use a placeholder image if no image is available
            imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1170&auto=format&fit=crop",
            tags: tags.length > 0 ? tags : ["GitHub Project"],
            demoLink: recentProject.homepage || null,
            codeLink: recentProject.html_url,
            isFromGithub: true
          };
          
          setGithubProjects([githubProject]);
        }
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
      }
    };
    
    fetchGithubProjects();
  }, []);
    // Combine hardcoded projects with GitHub projects
  const projects = [
    {
      title: "Weather Dashboard",
      description: "A weather application that displays current weather and forecasts based on user location or search.",
      imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tags: ["HTML", "CSS", "JavaScript", "Weather API"],
      demoLink: "#",
      codeLink: "https://github.com/HdCxrti/weather-app"
    },
    {
      title: "Portfolio Website",
      description: "A customized portfolio website to showcase my projects and skills, featuring a contact form with EmailJS integration.",
      imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      tags: ["React", "TypeScript", "Tailwind CSS", "EmailJS"],
      demoLink: "#",
      codeLink: "https://github.com/HdCxrti/portfolio"
    },
    {
      title: "Recipe Finder App",
      description: "A web application that allows users to search for recipes based on ingredients they have at home.",
      imageSrc: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
      tags: ["React", "JavaScript", "CSS", "Recipe API"],
      demoLink: "#",
      codeLink: "https://github.com/HdCxrti/recipe-finder"
    },  ];

  // Extract all unique tags from all projects for our filter options
  const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];
  // Filter projects based on search term and active filter
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay (remove this in production if not needed)
    setTimeout(() => {
      const filtered = projects.filter(project => {
        const matchesSearch = searchTerm === '' || 
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesFilter = activeFilter === 'All' || project.tags.includes(activeFilter);
        
        return matchesSearch && matchesFilter;
      });
      
      setFilteredProjects(filtered);
      setIsLoading(false);
    }, 500);
  }, [searchTerm, activeFilter]);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge className="bg-portfolio-purple/10 text-portfolio-purple border-portfolio-purple/20 mb-4 dark:bg-portfolio-purple/20">Portfolio</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">My Recent Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Here are some of my recent projects showcasing my skills and experience. Feel free to check out the code and live demos.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <div className="relative max-w-md mx-auto md:mx-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 border-portfolio-purple/20 focus:border-portfolio-purple dark:bg-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {allTags.map((tag) => (
                <Badge 
                  key={tag}
                  className={`cursor-pointer ${
                    activeFilter === tag 
                      ? 'bg-portfolio-purple text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setActiveFilter(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? filteredProjects.map((project, index) => (
            <ProjectCard 
              key={index}              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              tags={project.tags}
              demoLink={project.demoLink}
              codeLink={project.codeLink}
              isFromGithub={project.isFromGithub}
              index={index}
            />
          )) : (
            <div className="col-span-3 text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">No projects match your search criteria. Try a different search term or filter.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
