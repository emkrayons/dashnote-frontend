import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, logPageView } from '../utils/analytics';

const AnalyticsWrapper = () => {
  const location = useLocation();

  // Initialize Google Analytics on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route change
  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  // This component doesn't render anything
  return null;
};

export default AnalyticsWrapper;