import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function DirectThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Initialize on mount
  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);
  
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Update document class
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newIsDark ? 'dark' : 'light');
    
    // Update localStorage
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    
    console.log(`Toggled theme to: ${newIsDark ? 'dark' : 'light'}`);
  };
  
  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="ml-2 rounded-full"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">
        Toggle to {isDark ? 'light' : 'dark'} mode
      </span>
    </Button>
  );
}
