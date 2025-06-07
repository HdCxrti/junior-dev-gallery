// Theme debugger to help troubleshoot theme issues
export const debugTheme = () => {
  const html = document.documentElement;
  const currentTheme = localStorage.getItem('theme');
  const currentClass = html.classList.contains('dark') ? 'dark' : 'light';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  console.group('%c🎨 Theme Debugger', 'font-weight: bold; font-size: 14px;');
  console.log(
    '%cDocument Class: %c' + currentClass,
    'font-weight: bold;',
    'color: #9b87f5;'
  );
  console.log(
    '%cLocalStorage Theme: %c' + (currentTheme || 'not set'),
    'font-weight: bold;',
    'color: #9b87f5;'
  );
  console.log(
    '%cSystem Preference: %c' + systemTheme,
    'font-weight: bold;',
    'color: #9b87f5;'
  );
  console.groupEnd();
  
  return {
    documentClass: currentClass,
    storedTheme: currentTheme || 'not set',
    systemTheme
  };
};

// Run debugger when imported if in development mode
if (import.meta.env.DEV) {
  window.addEventListener('DOMContentLoaded', () => {
    debugTheme();
  });
}
