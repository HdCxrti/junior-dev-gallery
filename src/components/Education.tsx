import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Scroll, GraduationCap, Award } from 'lucide-react';

interface Education {
  type: 'education' | 'certification';
  title: string;
  institution: string;
  date: string;
  description: string;
  icon: 'graduation' | 'certificate' | 'scroll';
}

const Education = () => {
  const educationItems: Education[] = [
    {
      type: 'education',
      title: 'Full Stack Web Development Bootcamp',
      institution: 'Coding Academy',
      date: '2023',
      description: 'Intensive 12-week immersive program covering front-end and back-end web development. Built several full-stack projects using modern technologies.',
      icon: 'graduation'
    },
    {
      type: 'certification',
      title: 'JavaScript Algorithms and Data Structures',
      institution: 'freeCodeCamp',
      date: 'December 2022',
      description: 'Certification covering basic JavaScript, ES6, regular expressions, debugging, data structures, OOP, functional programming, and algorithmic thinking.',
      icon: 'certificate'
    },
    {
      type: 'education',
      title: 'Associate Degree in Automotive Technology',
      institution: 'Technical Community College',
      date: '2018',
      description: 'Specialized in electrical diagnostics and engine performance, providing a strong foundation in systems thinking and troubleshooting processes.',
      icon: 'scroll'
    }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'graduation':
        return <GraduationCap className="h-6 w-6 text-portfolio-purple" />;
      case 'certificate':
        return <Award className="h-6 w-6 text-portfolio-purple" />;
      case 'scroll':
        return <Scroll className="h-6 w-6 text-portfolio-purple" />;
      default:
        return <GraduationCap className="h-6 w-6 text-portfolio-purple" />;
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-portfolio-purple/10 text-portfolio-purple border-portfolio-purple/20 mb-4 dark:bg-portfolio-purple/20">
            Education
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            Education & Certifications
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My formal education and professional certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {educationItems.map((item, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-700 shadow bg-white dark:bg-gray-900 h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-portfolio-purple/10 p-3 rounded-full mt-1">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <Badge variant="outline" className={`mb-2 ${item.type === 'certification' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400'}`}>
                      {item.type === 'certification' ? 'Certification' : 'Education'}
                    </Badge>
                    <h3 className="text-xl font-bold mb-1 dark:text-white">
                      {item.title}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="font-medium">{item.institution}</span> • {item.date}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
