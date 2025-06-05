import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effect and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'projects', 'about', 'contact'];
      const sectionElements = sections.map(id => 
        id === 'home' ? document.querySelector('section') : document.querySelector(`#${id}`)
      );
        const scrollPosition = window.scrollY + 100; // Offset for navbar height
      
      sectionElements.forEach((section, index) => {
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          const sectionBottom = sectionTop + section.clientHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sections[index]);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#', id: 'home' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="font-bold text-2xl relative group"
        >
          <span className="text-portfolio-purple dark:text-portfolio-purple transition-all">Portfolio</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-portfolio-blue to-portfolio-indigo group-hover:w-full transition-all duration-300"></span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`relative text-gray-700 dark:text-gray-200 hover:text-portfolio-purple transition-colors group ${
                activeSection === link.id ? 'text-portfolio-purple dark:text-portfolio-purple' : ''
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-portfolio-blue to-portfolio-indigo transition-all duration-300 ${
                activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          ))}
          
          <ThemeToggle />
          
          <Button className="bg-portfolio-blue hover:bg-portfolio-indigo transition-all duration-300 transform hover:scale-105" asChild>
            <a href="/resume/Jake_Dutra_Software_Developer_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-portfolio-purple" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '60px' }}
      >
        <div className="container mx-auto px-6 py-8 flex flex-col space-y-6 h-full">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="flex items-center text-xl font-medium text-gray-700 hover:text-portfolio-purple transition-colors py-2 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ChevronRight className="h-5 w-5 mr-2 text-portfolio-purple" />
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center py-4 justify-between border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-700 dark:text-gray-200">Theme</span>
            <ThemeToggle />
          </div>
          
          <Button className="bg-portfolio-blue hover:bg-portfolio-indigo mt-4 w-full py-6" asChild>
            <a href="/resume/Jake_Dutra_Software_Developer_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
