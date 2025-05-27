import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Star, GitBranch, Code } from 'lucide-react';

const GitHubStats = () => {
  // You can replace these with actual data or connect to GitHub API
  const stats = {
    repos: 12,
    stars: 24,
    commits: 378,
    contributions: 416
  };

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8 dark:text-white">My GitHub Activity</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="flex flex-col items-center">
                  <Github className="h-8 w-8 text-portfolio-purple mb-2" />
                  <span className="text-2xl font-bold dark:text-white">{stats.repos}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Repositories</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="flex flex-col items-center">
                  <Star className="h-8 w-8 text-portfolio-purple mb-2" />
                  <span className="text-2xl font-bold dark:text-white">{stats.stars}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Stars</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="flex flex-col items-center">
                  <GitBranch className="h-8 w-8 text-portfolio-purple mb-2" />
                  <span className="text-2xl font-bold dark:text-white">{stats.commits}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Commits</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="flex flex-col items-center">
                  <Code className="h-8 w-8 text-portfolio-purple mb-2" />
                  <span className="text-2xl font-bold dark:text-white">{stats.contributions}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Contributions</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Button asChild className="bg-portfolio-purple hover:bg-portfolio-indigo gap-2">
            <a href="https://github.com/HdCxrti" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              View GitHub Profile
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
