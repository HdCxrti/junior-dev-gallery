import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
// Import theme debugger
import "@/lib/theme-debugger";

const App = () => {
  // HashRouter doesn't need basename - it uses hash-based routing
  // The base path for assets is handled by Vite's base config
  
  useEffect(() => {
    // Log environment info on startup for debugging
    console.log('Environment:', import.meta.env.MODE);
    console.log('Base path in Vite config:', import.meta.env.BASE_URL);
  }, []);
  
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
