import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Star, GitBranch, Code, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GitHubStats {
  repos: number;
  stars: number;
  commits: number;
  contributions: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date;
}

const GitHubStats = () => {  
  const [stats, setStats] = useState<GitHubStats>({
    repos: 0,
    stars: 0,
    commits: 0,
    contributions: 0,
    loading: true,
    error: null,
    lastUpdated: new Date()
  });
  
  const fetchGitHubStats = async () => {
    setStats(prevStats => ({ ...prevStats, loading: true, error: null }));
    try {
      // Replace with your GitHub username
      const username = 'HdCxrti';
        // Check if we have cached data and it's less than 30 mins old
      const cachedStats = localStorage.getItem('githubStats');
      const cachedTime = localStorage.getItem('githubStatsTime');
      
      // When manually refreshing or if there's no cache, don't use cached data
      const isUserRefresh = stats.lastUpdated.getTime() > 0 && !stats.loading;
      
      if (cachedStats && cachedTime && !isUserRefresh) {
        const parsedStats = JSON.parse(cachedStats);
        const timestamp = parseInt(cachedTime, 10);
        const now = Date.now();
        
        // If cache is less than 30 minutes old, use it
        if (now - timestamp < 30 * 60 * 1000) {
          setStats({
            ...parsedStats,
            loading: false,
            error: null,
            lastUpdated: new Date(timestamp)
          });
          return;
        }
      }
      
      // Fetch repositories with a personal access token if available
      const headers = {};
      if (import.meta.env.VITE_GITHUB_TOKEN) {
        headers['Authorization'] = `token ${import.meta.env.VITE_GITHUB_TOKEN}`;
      }
      
      const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
      if (!repoResponse.ok) throw new Error('Failed to fetch repositories');
      const repos = await repoResponse.json();
      
      // Calculate stars from repos
      const totalStars = repos.reduce((total: number, repo: any) => total + repo.stargazers_count, 0);
      
      // Fetch user data for contribution stats
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const userData = await userResponse.json();
      
      // Get more accurate commit data by sampling a few repos
      let commitCount = 0;
      try {
        // Sample up to 5 repos to get commit counts (to avoid API rate limits)
        const reposToSample = repos.slice(0, 5);
        for (const repo of reposToSample) {
          const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`);
          if (commitsResponse.ok) {
            // Get total commit count from header
            const linkHeader = commitsResponse.headers.get('link');
            if (linkHeader && linkHeader.includes('rel="last"')) {
              const match = linkHeader.match(/page=(\d+)>; rel="last"/);
              if (match) {
                commitCount += parseInt(match[1], 10);
              }
            } else {
              // If no pagination, just add the commits we received
              const commits = await commitsResponse.json();
              commitCount += commits.length;
            }
          }
        }
        // Extrapolate if we only sampled some repos
        if (repos.length > 5) {
          commitCount = Math.round(commitCount * (repos.length / 5));
        }
      } catch (commitError) {
        console.error('Error fetching detailed commit data:', commitError);
        // Fallback to estimate
        commitCount = Math.floor(repos.length * 35);
      }      const newStats = {
        repos: repos.length,
        stars: totalStars,
        commits: commitCount,
        // Use public contributions from profile or fallback to estimate
        contributions: userData.public_contributions || Math.floor(repos.length * 40),
        loading: false,
        error: null,
        lastUpdated: new Date()
      };
        // Cache the results in localStorage
      try {
        localStorage.setItem('githubStats', JSON.stringify({
          repos: newStats.repos,
          stars: newStats.stars,
          commits: newStats.commits,
          contributions: newStats.contributions
        }));
        localStorage.setItem('githubStatsTime', Date.now().toString());
      } catch (err) {
        console.error('Error caching GitHub stats:', err);
        // Continue even if caching fails
      }
      localStorage.setItem('githubStats', JSON.stringify({
        repos: newStats.repos,
        stars: newStats.stars,
        commits: newStats.commits,
        contributions: newStats.contributions
      }));
      localStorage.setItem('githubStatsTime', Date.now().toString());
      
      setStats(newStats);
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      setStats(prevStats => ({
        ...prevStats,
        loading: false,
        error: 'Failed to load GitHub stats',
        lastUpdated: new Date()
      }));
    }
  };
  // Fetch on initial load
  useEffect(() => {
    fetchGitHubStats();
    
    // Set up an interval to refresh the data every hour if the tab is active
    const refreshInterval = setInterval(() => {
      if (!document.hidden) {
        fetchGitHubStats();
      }
    }, 60 * 60 * 1000); // 1 hour
    
    return () => clearInterval(refreshInterval);
  }, []);
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8 dark:text-white">My GitHub Activity</h3>
          
          {stats.loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 text-portfolio-purple animate-spin" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">Loading GitHub stats...</span>
            </div>
          ) : stats.error ? (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg mb-8">
              <p>{stats.error}</p>
              <p className="text-sm mt-2">Displaying placeholder data instead.</p>
            </div>
          ) : null}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="flex flex-col items-center">
                  <Github className="h-8 w-8 text-portfolio-purple mb-2" />
                  {stats.loading ? (
                    <div className="h-8 w-8 rounded-full border-2 border-portfolio-purple/30 border-t-portfolio-purple animate-spin" />
                  ) : (
                    <span className="text-2xl font-bold dark:text-white">{stats.repos}</span>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">Repositories</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="flex flex-col items-center">
                  <Star className="h-8 w-8 text-portfolio-purple mb-2" />
                  {stats.loading ? (
                    <div className="h-8 w-8 rounded-full border-2 border-portfolio-purple/30 border-t-portfolio-purple animate-spin" />
                  ) : (
                    <span className="text-2xl font-bold dark:text-white">{stats.stars}</span>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">Stars</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="flex flex-col items-center">
                  <GitBranch className="h-8 w-8 text-portfolio-purple mb-2" />
                  {stats.loading ? (
                    <div className="h-8 w-8 rounded-full border-2 border-portfolio-purple/30 border-t-portfolio-purple animate-spin" />
                  ) : (
                    <span className="text-2xl font-bold dark:text-white">{stats.commits}</span>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">Commits</span>
                </div>
              </CardContent>
            </Card>
              <Card className="text-center p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="flex flex-col items-center">
                  <Code className="h-8 w-8 text-portfolio-purple mb-2" />
                  {stats.loading ? (
                    <div className="h-8 w-8 rounded-full border-2 border-portfolio-purple/30 border-t-portfolio-purple animate-spin" />
                  ) : (
                    <span className="text-2xl font-bold dark:text-white">{stats.contributions}</span>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">Contributions</span>
                </div>
              </CardContent>
            </Card>
          </div>
            <div className="flex flex-col items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              <span className="font-medium">Last updated:</span> {stats.lastUpdated.toLocaleString()}
              <br />
              <span className="italic">Stats automatically update hourly when page is active</span>
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                onClick={fetchGitHubStats} 
                disabled={stats.loading}
                className="bg-portfolio-purple hover:bg-portfolio-indigo gap-2"
              >
                {stats.loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2v6h-6"></path>
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                    <path d="M3 12a9 9 0 0 0 6.7 15L13 21"></path>
                    <path d="M14 21h7v-6"></path>
                  </svg>
                )}
                Refresh Stats
              </Button>
              <Button asChild className="bg-portfolio-purple hover:bg-portfolio-indigo gap-2">
                <a href="https://github.com/HdCxrti" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View GitHub Profile
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
