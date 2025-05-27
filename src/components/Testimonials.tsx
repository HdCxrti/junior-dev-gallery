import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  name: string;
  title: string;
  company: string;
}

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "Jake's problem-solving approach is impressive. He has a knack for finding practical solutions that just work. His automotive background gives him a unique perspective on debugging and fixing issues.",
      name: "Alex Johnson",
      title: "Senior Developer",
      company: "TechSolutions Inc."
    },
    {
      id: 2,
      content: "Working with Jake was refreshing. He brings a no-nonsense approach to development and isn't afraid to dive into complex problems. His hands-on mindset makes him great at troubleshooting.",
      name: "Sarah Martinez",
      title: "Project Lead",
      company: "WebCraft Studios"
    },
    {
      id: 3,
      content: "As Jake's mentor, I've watched him grow tremendously. His ability to learn quickly and apply concepts in practical ways sets him apart. He doesn't just write code; he solves real problems.",
      name: "Michael Chen",
      title: "Tech Lead",
      company: "CodeCamp Bootcamp"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-portfolio-purple/10 text-portfolio-purple border-portfolio-purple/20 mb-4 dark:bg-portfolio-purple/20">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            What People Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Feedback from colleagues and mentors who have worked with me.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <Quote className="h-10 w-10 text-portfolio-purple opacity-50" />
              </div>
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className={`transition-opacity duration-500 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0 hidden'}`}
                >
                  <blockquote className="text-xl text-center text-gray-700 dark:text-gray-300 italic mb-8">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="text-center">
                    <p className="font-bold text-lg dark:text-white">{testimonial.name}</p>
                    <p className="text-gray-600 dark:text-gray-400">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === activeTestimonial ? 'bg-portfolio-purple' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
