// frontend/src/utils/analytics.js
import ReactGA from 'react-ga4';

let isInitialized = false;

// Initialize Google Analytics
export const initGA = () => {
  // Only initialize once
  if (isInitialized) return;
  
  try {
    // ⭐ Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID
    // For now, we'll use a test ID - replace this when you have your real ID
    ReactGA.initialize('G-XXXXXXXXXX', {
      testMode: true, // This prevents errors if ID is not set up yet
    });
    isInitialized = true;
    console.log('✅ Google Analytics initialized');
  } catch (error) {
    console.log('⚠️ Google Analytics not configured yet');
  }
};

// Track page views
export const logPageView = (path) => {
  if (!isInitialized) return;
  
  try {
    ReactGA.send({ hitType: 'pageview', page: path });
    console.log('📊 Page view tracked:', path);
  } catch (error) {
    console.log('⚠️ Page view tracking failed');
  }
};

// Track events
export const logEvent = (category, action, label = '') => {
  if (!isInitialized) return;
  
  try {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
    console.log('📊 Event tracked:', category, action, label);
  } catch (error) {
    console.log('⚠️ Event tracking failed');
  }
};

// Track user signup
export const logSignup = () => {
  logEvent('User', 'Signup', 'New User Registration');
};

// Track user login
export const logLogin = () => {
  logEvent('User', 'Login', 'User Login');
};

// Track note creation
export const logNoteCreated = () => {
  logEvent('Note', 'Create', 'Note Created');
};

// Track note export
export const logExport = (format) => {
  logEvent('Export', format, `Export as ${format}`);
};