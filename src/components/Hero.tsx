import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Laptop, Code, Briefcase } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto relative z-10">
        {/* Background Elements */}
        <div className="absolute top-20 -left-10 w-64 h-64 bg-portfolio-purple/5 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 -right-10 w-80 h-80 bg-portfolio-blue/5 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        ></div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div
            className={`w-full md:w-1/2 transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block bg-portfolio-purple/10 px-4 py-1 rounded-full mb-4">
              <h2 className="text-lg font-medium text-portfolio-purple flex items-center">
                <Code className="w-4 h-4 mr-2" /> Hello, I'm
              </h2>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 dark:text-white tracking-tight">
              Jacob{" "}
              <span className="text-portfolio-purple">Dutra</span>
            </h1>

            <div className="overflow-hidden h-16 mb-6">
              <h3 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 sliding-text">
                <span className="block mb-2">Mechanic Turned Developer</span>
                <span className="block mb-2">Full Stack Problem Solver</span>
                <span className="block">Lifelong Learner</span>
              </h3>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              Aspiring full stack developer with a hands-on approach, a common
              sense mindset, and a background in the automotive industry. Known
              for a strong work ethic and a get-it-done attitude.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-portfolio-purple hover:bg-portfolio-indigo text-white px-8 py-6 rounded-md transition-transform hover:scale-105 shadow-lg hover:shadow-portfolio-purple/20"
                size="lg"
                asChild
              >
                <a href="#projects" className="flex items-center gap-2">
                  <Laptop className="w-5 h-5" />
                  View My Work
                </a>
              </Button>

              <Button
                variant="outline"
                className="border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple/10 px-8 py-6 rounded-md transition-transform hover:scale-105"
                size="lg"
                asChild
              >
                <a href="#contact" className="flex items-center gap-2">
                  Contact Me
                </a>
              </Button>

              <Button
                variant="outline"
                className="border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple/10 px-8 py-6 rounded-md transition-transform hover:scale-105"
                size="lg"
                asChild
              >
                <a
                  href="/resume/Jake_Dutra_Software_Developer_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Briefcase className="w-5 h-5" />
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="mt-8 bg-portfolio-purple/5 border border-portfolio-purple/10 rounded-lg p-4 dark:bg-gray-800/50 dark:border-portfolio-purple/20 relative overflow-hidden">
              {/* Animated corner accent */}
              <div className="absolute -top-1 -right-1 w-16 h-16">
                <div className="absolute rotate-45 top-0 right-0 w-8 h-8 bg-portfolio-purple/20 transform origin-bottom-left"></div>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-bold">🚀 Open to Work:</span> After
                transitioning from my automotive career and dedicating myself to
                learning web development full-time in 2025, I'm actively seeking
                software development opportunities. Ready to bring my technical
                problem-solving skills and fresh coding knowledge to your team!
              </p>
            </div>
          </div>

          <div
            className={`w-full md:w-1/2 flex justify-center transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full relative">
              {/* Orbit animation */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-portfolio-purple/20 rotate-animation"
                style={{ animationDuration: "25s" }}
              ></div>
              <div
                className="absolute inset-4 rounded-full border-2 border-dashed border-portfolio-blue/20 rotate-animation-reverse"
                style={{ animationDuration: "15s" }}
              ></div>

              <div className="w-64 h-64 md:w-80 md:h-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-portfolio-blue to-portfolio-purple flex items-center justify-center shadow-xl">
                <div className="w-60 h-60 md:w-76 md:h-76 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/coding-desktop.jpg.png"
                    alt="Jacob Dutra - Coding setup"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Tech icon bubbles */}
              <div className="tech-bubble html-icon">
                <span className="tech-label">HTML</span>
              </div>
              <div className="tech-bubble css-icon">
                <span className="tech-label">CSS</span>
              </div>
              <div className="tech-bubble js-icon">
                <span className="tech-label">JS</span>
              </div>
              <div className="tech-bubble react-icon">
                <span className="tech-label">React</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="#projects"
            className="flex flex-col items-center text-portfolio-purple hover:text-portfolio-indigo transition-colors hover:scale-110 transform transition-transform"
          >
            <span className="mb-2 text-sm">Scroll Down</span>
            <ArrowDown className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
