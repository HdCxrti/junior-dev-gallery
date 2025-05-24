
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-2xl text-portfolio-purple mb-2">Portfolio</h3>
            <p className="text-gray-600 dark:text-gray-400">Building the web, one project at a time.</p>
          </div>

          <div className="flex flex-col items-center md:items-end">            <div className="flex gap-4 mb-4">              <a 
                href="https://www.linkedin.com/in/jacob-david-dutra/" 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md hover:bg-portfolio-purple/10 dark:hover:bg-portfolio-purple/20 transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5 text-portfolio-purple" />
              </a>
              <a 
                href="https://github.com/HdCxrti" 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md hover:bg-portfolio-purple/10 dark:hover:bg-portfolio-purple/20 transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 text-portfolio-purple" />
              </a>
              <a 
                href="mailto:jacobdaviddutra@gmail.com" 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md hover:bg-portfolio-purple/10 dark:hover:bg-portfolio-purple/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-portfolio-purple" />
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">© {currentYear} Jacob Dutra. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
