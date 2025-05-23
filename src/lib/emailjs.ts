import { useEffect } from 'react';

// This function initializes EmailJS with your public key
export const useEmailJsInit = () => {  useEffect(() => {
    // Initialize EmailJS
    if (window.emailjs && typeof window.emailjs.init === 'function') {
      // Using your public key directly from the environment variable
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '0911nTIj_nbg-aH7i';
      window.emailjs.init({
        publicKey: publicKey,
      });
    } else {
      console.error('EmailJS is not loaded correctly.');
    }
  }, []);
};

// Extend the Window interface to include emailjs
declare global {
  interface Window {
    emailjs: any;
  }
}
