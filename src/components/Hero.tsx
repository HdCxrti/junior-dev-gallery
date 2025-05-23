import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div
            className="w-full md:w-1/2 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-lg font-medium text-portfolio-purple mb-2">
              Hello, I'm
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Jacob Dutra</h1>
            <h3 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6">
              Mechanic Turned Full Stack Developer
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Aspiring full stack developer with a hands-on approach a common
              sense mindset and a background in the automotive industry. Known
              for a strong work ethic and a get-it-done attitude. I'm all about
              figuring things out building real world projects and learning
              everything I can. Frontend backend APIs you name it. I enjoy
              solving problems digging into bugs and making things work the
              right way. Always learning always troubleshooting always building.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-portfolio-purple hover:bg-portfolio-indigo text-white px-8 py-6 rounded-md"
                size="lg"
                asChild
              >
                <a href="#projects">View My Work</a>
              </Button>
              <Button
                variant="outline"
                className="border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple/10 px-8 py-6 rounded-md"
                size="lg"
                asChild
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>

          <div
            className="w-full md:w-1/2 flex justify-center animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-portfolio-blue to-portfolio-purple flex items-center justify-center">
              <div className="w-60 h-60 md:w-76 md:h-76 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Developer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="#projects"
            className="flex flex-col items-center text-portfolio-purple hover:text-portfolio-indigo transition-colors"
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
