
// Helper function for Google Analytics page tracking in React Router
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: any) => void;
  }
}

export const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'MEASUREMENT_ID', {
        page_path: location.pathname + location.search
      });
      console.log('Page view tracked:', location.pathname);
    }
  }, [location]);
};
