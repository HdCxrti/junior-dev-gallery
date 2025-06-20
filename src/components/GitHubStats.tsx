import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Github, Star, GitBranch, Code, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GitHubStats {
  repos: number;
  stars: number;
  commits: number;
  contributions: number;
  forks: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date;
}

const GitHubStats = () => {  
  // Define GitHub username at the top for better visibility
  const username = 'HdCxrti';
  
  const [stats, setStats] = useState<GitHubStats>({
    repos: 0,
    stars: 0,
    commits: 0,
    contributions: 0,
    forks: 0,
    loading: true,
    error: null,
    lastUpdated: new Date()
  });
  
  // Track if the refresh was manually triggered
  const [isUserRefresh, setIsUserRefresh] = useState(false);
  const fetchGitHubStats = async (manualRefresh = false) => {
    // Set user refresh state
    if (manualRefresh) {
      setIsUserRefresh(true);
    }
    
    // Always clear cache when manually refreshing
    if (manualRefresh) {
      try {
        localStorage.removeItem('githubStats');
        localStorage.removeItem('githubStatsTime');
      } catch (err) {
        console.error('Error clearing cache:', err);
      }
    }
    
    setStats(prevStats => ({ ...prevStats, loading: true, error: null }));
    try {
      // Check if we have cached data and it's less than 15 mins old
      const cachedStats = localStorage.getItem('githubStats');
      const cachedTime = localStorage.getItem('githubStatsTime');
      
      // Only use cache on initial load, not when manually refreshing
      const isInitialLoad = !manualRefresh;
        if (cachedStats && cachedTime && isInitialLoad) {
        const parsedStats = JSON.parse(cachedStats);
        const timestamp = parseInt(cachedTime, 10);
        const now = Date.now();
        
        // Log cache details for debugging
        console.log('Found cached GitHub stats:', parsedStats);
        console.log(`Cache age: ${Math.round((now - timestamp) / 1000 / 60)} minutes old`);
          // If cache is less than 30 minutes old, use it
        if (now - timestamp < 30 * 60 * 1000) {
          // Allow the cached contribution count to be used as is
          console.log(`Using cached contribution count: ${parsedStats.contributions}`);
          
          
          setStats({
            ...parsedStats,
            loading: false,
            error: null,
            lastUpdated: new Date(timestamp)
          });
          return;
        }
        
        console.log('Cache is too old. Fetching fresh data...');
      }
        console.log('Fetching GitHub stats directly from GitHub API...');
      // Using username defined at component level
      
      // Fetch repositories to get repo count and stars
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch GitHub repositories: ${reposResponse.status}`);
      }
      const reposData = await reposResponse.json();
      
      // Count repositories
      const repos = reposData.length;
      
      // Sum stars across all repositories
      const stars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        // Fetch user data to get commits via events
      const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
      if (!eventsResponse.ok) {
        throw new Error(`Failed to fetch GitHub events: ${eventsResponse.status}`);
      }
      const eventsData = await eventsResponse.json();
      
      // Count recent commits from push events
      const commits = eventsData
        .filter(event => event.type === 'PushEvent')
        .reduce((acc, event) => acc + event.payload.commits?.length || 0, 0);      // Get contribution count - since CORS proxies tend to fail, we'll use a base estimate
      // plus any new commits we see from the GitHub API
      let contributions = 157; // Updated baseline count as of June 2025
      
      console.log('Using estimated contribution count with commits adjustment');
      
      // Add any new commits we've detected to the count for a rough estimate
      if (commits > 0) {
        // We'll add half the commits to avoid double-counting (rough estimate)
        const additionalContributions = Math.floor(commits / 2);
        if (additionalContributions > 0) {
          contributions += additionalContributions;
          console.log(`Adding ${additionalContributions} from recent commits to contribution count`);
        }
      }
        // Calculate forks from repos data
      const forks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);
      
      const newStats = {
        repos: repos || 0,
        stars: stars || 0,
        commits: commits || 0,
        forks: forks || 0,
        contributions: contributions || 0,
        loading: false,
        error: null,
        lastUpdated: new Date()
      };
      
      // Cache the results in localStorage with additional debugging info
      try {
        // Store the current contribution value for debugging purposes
        console.log(`Caching GitHub stats. Contributions: ${contributions}`);
          // Save the data with a timestamp so we can tell when it was last updated
        const statsData = {
          repos: newStats.repos,
          stars: newStats.stars,
          commits: newStats.commits,
          forks: newStats.forks,  // Include forks data
          contributions: newStats.contributions,
          timestamp: Date.now(),
          contributionSource: 'estimate' // We're using estimated data now
        };
        
        localStorage.setItem('githubStats', JSON.stringify(statsData));
        localStorage.setItem('githubStatsTime', Date.now().toString());
      } catch (err) {
        console.error('Error caching GitHub stats:', err);
        // Continue even if caching fails
      }
      
      setStats(newStats);
      // Reset user refresh state after successful fetch
      if (manualRefresh) {
        setIsUserRefresh(false);
      }
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      setStats(prevStats => ({
        ...prevStats,
        loading: false,
        error: error instanceof Error ? `Failed to load GitHub stats: ${error.message}` : 'Failed to load GitHub stats',
        lastUpdated: new Date()
      }));
      // Reset user refresh state on error
      if (manualRefresh) {
        setIsUserRefresh(false);
      }
    }
  };
  
  // Fetch on initial load
  useEffect(() => {
    fetchGitHubStats(false);
    
    // Set up an interval to refresh the data every hour if the tab is active
    const refreshInterval = setInterval(() => {
      if (!document.hidden) {
        fetchGitHubStats(false);
      }
    }, 60 * 60 * 1000); // 1 hour
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  return (
    <section id="github-stats" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Badge className="bg-portfolio-blue/10 text-portfolio-blue border-portfolio-blue/20 mb-4 dark:bg-portfolio-blue/20">GitHub Stats</Badge>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8 dark:text-white">My GitHub Activity</h3>
          
          {stats.loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 text-portfolio-blue animate-spin" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">Loading GitHub stats...</span>
            </div>
          ) : stats.error ? (
            <div className="text-center py-10">
              <Alert variant="destructive">
                <AlertTitle>Error loading stats</AlertTitle>
                <AlertDescription>
                  {stats.error}
                </AlertDescription>
                {stats.loading && <Loader2 className="h-8 w-8 text-portfolio-blue animate-spin" />}
              </Alert>
              
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>Here are some things you can try:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Check your internet connection</li>
                  <li>Reload the page</li>
                  <li>Come back later, stats update hourly</li>
                </ul>
              </div>
            </div>
          ) : null}
          
          <Card className="text-center p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <Github className="h-8 w-8 text-portfolio-blue mb-2" />
                {stats.loading ? (
                  <div className="h-8 w-8 rounded-full border-2 border-portfolio-blue/30 border-t-portfolio-blue animate-spin" />
                ) : (
                  <span className="text-2xl font-bold dark:text-white">{stats.repos}</span>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">Repositories</span>
              </div>

              <div className="flex flex-col items-center">
                <Star className="h-8 w-8 text-portfolio-blue mb-2" />
                {stats.loading ? (
                  <div className="h-8 w-8 rounded-full border-2 border-portfolio-blue/30 border-t-portfolio-blue animate-spin" />
                ) : (
                  <span className="text-2xl font-bold dark:text-white">{stats.stars}</span>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">Stars</span>
              </div>
              
              <div className="flex flex-col items-center">
                <GitBranch className="h-8 w-8 text-portfolio-blue mb-2" />
                {stats.loading ? (
                  <div className="h-8 w-8 rounded-full border-2 border-portfolio-blue/30 border-t-portfolio-blue animate-spin" />
                ) : (
                  <span className="text-2xl font-bold dark:text-white">{stats.forks}</span>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">Forks</span>
              </div>

              <div className="flex flex-col items-center">
                <Code className="h-8 w-8 text-portfolio-blue mb-2" />
                {stats.loading ? (
                  <div className="h-8 w-8 rounded-full border-2 border-portfolio-blue/30 border-t-portfolio-blue animate-spin" />
                ) : (
                  <span className="text-2xl font-bold dark:text-white">{stats.contributions}</span>
                )}                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Contributions</span>
                  <span className="block text-xs text-gray-400 dark:text-gray-500">(estimated)</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              <span className="font-medium">Last updated:</span> {stats.lastUpdated.toLocaleString()}
              <br />
              <span className="italic">Stats automatically update hourly when page is active</span>
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                onClick={() => fetchGitHubStats(true)} 
                disabled={stats.loading}
                className="bg-portfolio-blue hover:bg-portfolio-indigo gap-2"
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
              
              {!stats.loading ? (
                <Button 
                  asChild
                  className="bg-portfolio-blue hover:bg-portfolio-indigo gap-2"
                >
                  <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    View GitHub Profile
                  </a>
                </Button>
              ) : (
                <div className="flex justify-center">
                  <div className="animate-spin h-6 w-6 border-b-2 border-portfolio-blue" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
