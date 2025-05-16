
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-2xl text-portfolio-purple mb-2">Portfolio</h3>
            <p className="text-gray-600">Building the web, one project at a time.</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-4">
              <a 
                href="#" 
                className="bg-gray-100 p-2 rounded-md hover:bg-portfolio-purple/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-portfolio-purple" />
              </a>
              <a 
                href="#" 
                className="bg-gray-100 p-2 rounded-md hover:bg-portfolio-purple/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-portfolio-purple" />
              </a>
              <a 
                href="mailto:john.doe@example.com" 
                className="bg-gray-100 p-2 rounded-md hover:bg-portfolio-purple/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-portfolio-purple" />
              </a>
            </div>
            <p className="text-gray-600 text-sm">© {currentYear} John Doe. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
