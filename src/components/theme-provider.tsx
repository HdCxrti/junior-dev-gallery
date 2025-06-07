"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Initialize theme on first load
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || props.defaultTheme || 'system';
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : savedTheme;
    
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(initialTheme);
  }, [props.defaultTheme]);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
