import { ArrowRight, Code, FileText, Github, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SkillTag from "./SkillTag";

const About = () => {  const skills = [
    { name: "HTML/CSS", icon: "/icons/html-css.svg" },
    { name: "JavaScript", icon: "/icons/javascript.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "React", icon: "/icons/react.svg" },
    { name: "Next.js", icon: "/icons/nextjs.svg" },
    { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
    { name: "Node.js", icon: "/icons/nodejs.svg" },
    { name: "Express", icon: "/icons/express.svg" },
    { name: "Git", icon: "/icons/git.svg" },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">          <Badge className="bg-portfolio-blue/10 text-portfolio-blue border-portfolio-blue/20 mb-4 dark:bg-portfolio-blue/20">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            My Journey & Skills
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-md bg-gradient-to-br from-portfolio-blue to-portfolio-indigo absolute -top-4 -left-4 z-0"></div>
              <img
                src="/images/laptop-tools.jpg.png"
                alt="Jacob Dutra - Coding with tools"
                className="w-64 h-64 md:w-80 md:h-80 rounded-md object-cover object-center relative z-10 shadow-lg"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold mb-4 dark:text-white">
              Hello! I'm Jacob Dutra
            </h3>{" "}
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              I started working at 14 and kept moving forward. I've done
              everything from landscaping to retail to automotive repair. Most
              recently I worked at Massey Hyundai as a technician. In early 2025
              I made the decision to fully commit to my passion for coding and
              web development. Since then I’ve been studying hard and building
              real projects to prep for my career shift. I focus on learning
              what I need, building what I want, and fixing what’s broken. With
              a background in hands-on mechanical troubleshooting, I bring a
              unique problem-solving mindset to software. I’m not afraid to dig
              into new tech, debug tough issues, and create solutions that work.
            </p>            <div className="mb-8">
              <h4 className="font-bold text-lg mb-2 dark:text-white">
                My Skills:
              </h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <SkillTag
                    key={index}
                    skill={skill.name}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-portfolio-blue hover:bg-portfolio-indigo flex items-center gap-2"
                asChild
              >
                <a
                  href="/resume/Jake_Dutra_Software_Developer_Resume.pdf"
                  download
                >
                  <FileText className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue/10 dark:border-portfolio-blue/70 dark:text-portfolio-blue/90 flex items-center gap-2"
                asChild
              >
                <a
                  href="https://github.com/HdCxrti"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  Visit GitHub
                </a>
              </Button>{" "}
            </div>
          </div>        </div>
      </div>
    </section>
  );
};

export default About;
