"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Theme initialization is already handled in main.tsx
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
