import { Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const BlogPreview = () => {
  // These would be fetched from a CMS or database in a real app
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "My Journey from Auto Mechanic to Web Developer",
      excerpt: "How I transitioned from fixing cars to building websites, and the surprising skills that transferred between these fields.",
      date: "May 10, 2025",
      category: "Career Change",
      readTime: "5 min read"
    },
    {
      id: "2",
      title: "Building a React Portfolio with Tailwind CSS",
      excerpt: "A technical walkthrough of how I built this portfolio site using React, TypeScript and Tailwind CSS.",
      date: "April 28, 2025",
      category: "Web Development",
      readTime: "8 min read"
    },
    {
      id: "3",
      title: "Problem-Solving Approaches: From Mechanical to Digital",
      excerpt: "My methodology for tackling complex problems in web development, inspired by my background as a mechanic.",
      date: "April 15, 2025",
      category: "Problem Solving",
      readTime: "6 min read"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">          <Badge className="bg-portfolio-blue/10 text-portfolio-blue border-portfolio-blue/20 mb-4 dark:bg-portfolio-blue/20">
            Blog
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            Recent Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Thoughts, insights, and learning from my development journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Card key={post.id} className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <Badge variant="outline" className="bg-transparent">
                    {post.category}
                  </Badge>
                  <span>•</span>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button variant="link" className="text-portfolio-blue p-0 h-auto flex items-center gap-2 hover:text-portfolio-indigo">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-portfolio-blue hover:bg-portfolio-indigo">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
