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
  // Only use basename for production (GitHub Pages deployment)
  const basename = import.meta.env.MODE === 'production' ? '/junior-dev-gallery' : '/';
  
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <HashRouter basename={basename}>
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
