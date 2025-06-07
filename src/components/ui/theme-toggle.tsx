import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show the theme toggle after component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (theme: string) => {
    console.log(`Setting theme to: ${theme}`);
    setTheme(theme);
    
    // Direct DOM manipulation as a fallback
    document.documentElement.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.add(systemTheme);
    } else {
      document.documentElement.classList.add(theme);
    }
    
    // Store theme preference
    localStorage.setItem('theme', theme);
    
    // Log the current state for debugging
    setTimeout(() => {
      console.log(`Theme applied: ${document.documentElement.classList.contains('dark') ? 'dark' : 'light'}`);
    }, 100);
  };
  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="border-none opacity-0">
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="border-none relative" 
          onClick={() => console.log('Theme toggle clicked')}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleThemeChange("light")}
          className={currentTheme === "light" ? "bg-gray-100 dark:bg-gray-800" : ""}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("dark")}
          className={currentTheme === "dark" ? "bg-gray-100 dark:bg-gray-800" : ""}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("system")}
          className={currentTheme === "system" ? "bg-gray-100 dark:bg-gray-800" : ""}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
