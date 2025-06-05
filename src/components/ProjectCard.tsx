import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink, Maximize2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  demoLink?: string;
  codeLink?: string;
  index: number;
  isFromGithub?: boolean;
}

const ProjectCard = ({ title, description, imageSrc, tags, demoLink, codeLink, index, isFromGithub }: ProjectCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <>
      <Card 
        className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in dark:bg-gray-900 dark:border-gray-700 group relative" 
        style={{ animationDelay: `${0.2 * (index + 1)}s` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-56 overflow-hidden relative">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-portfolio-blue/30 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black/90 text-portfolio-blue rounded-full shadow-lg"
              onClick={() => setIsDialogOpen(true)}
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      <CardHeader>
        <CardTitle className="text-xl dark:text-white">{title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="bg-portfolio-blue/10 text-portfolio-blue border-portfolio-blue/20 dark:bg-portfolio-blue/20">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        {demoLink && (
          <Button asChild className="flex-1 bg-portfolio-blue hover:bg-portfolio-indigo">
            <a href={demoLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
        {codeLink && (
          <Button asChild variant="outline" className="flex-1 border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue/10">
            <a href={codeLink} target="_blank" rel="noopener noreferrer">
              <Code className="mr-2 h-4 w-4" />
              View Code
            </a>
          </Button>
        )}      </CardFooter>
    </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
            <DialogDescription className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-portfolio-blue/10 text-portfolio-blue border-portfolio-blue/20 dark:bg-portfolio-blue/20">
                  {tag}
                </Badge>
              ))}
            </DialogDescription>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-hidden rounded-md mb-4">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{description}</p>
          <div className="flex justify-between gap-4">
            {demoLink && (
              <Button asChild className="flex-1 bg-portfolio-blue hover:bg-portfolio-indigo">
                <a href={demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {codeLink && (
              <Button asChild variant="outline" className="flex-1 border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue/10">
                <a href={codeLink} target="_blank" rel="noopener noreferrer">
                  <Code className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
