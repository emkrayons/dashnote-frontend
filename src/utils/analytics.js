// frontend/src/utils/analytics.js
// ✅ CORRECT: Use ReactGAImplementation
import { ReactGAImplementation } from "react-ga4";

// Create instance
const GA = new ReactGAImplementation();

let isInitialized = false;

// Initialize Google Analytics
export const initGA = () => {
  if (isInitialized) return;
  
  try {
    // ✅ Your Google Analytics Measurement ID
    GA.initialize('G-9GETHQSJ9P');
    
    isInitialized = true;
    console.log('✅ Google Analytics initialized with ID: G-9GETHQSJ9P');
  } catch (error) {
    console.error('❌ Google Analytics initialization failed:', error);
  }
};

// Track page views
export const logPageView = (path) => {
  if (!isInitialized) return;
  
  try {
    GA.send({ hitType: 'pageview', page: path });
    console.log('📊 Page view tracked:', path);
  } catch (error) {
    console.error('❌ Page view tracking failed:', error);
  }
};

// Track events
export const logEvent = (category, action, label = '') => {
  if (!isInitialized) return;
  
  try {
    GA.event({
      category: category,
      action: action,
      label: label,
    });
    console.log('📊 Event tracked:', category, action, label);
  } catch (error) {
    console.error('❌ Event tracking failed:', error);
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


