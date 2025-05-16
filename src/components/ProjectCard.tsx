
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  demoLink?: string;
  codeLink?: string;
  index: number;
}

const ProjectCard = ({ title, description, imageSrc, tags, demoLink, codeLink, index }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${0.2 * (index + 1)}s` }}>
      <div className="h-56 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="bg-portfolio-purple/10 text-portfolio-purple border-portfolio-purple/20">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        {demoLink && (
          <Button asChild className="flex-1 bg-portfolio-purple hover:bg-portfolio-indigo">
            <a href={demoLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
        {codeLink && (
          <Button asChild variant="outline" className="flex-1 border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple/10">
            <a href={codeLink} target="_blank" rel="noopener noreferrer">
              <Code className="mr-2 h-4 w-4" />
              View Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
