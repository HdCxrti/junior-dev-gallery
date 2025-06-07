import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize theme before rendering
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'system';
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : savedTheme;
  
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(initialTheme);
};

// Run initialization
initializeTheme();

// Add theme change listener for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (localStorage.getItem('theme') === 'system') {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(e.matches ? 'dark' : 'light');
  }
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
