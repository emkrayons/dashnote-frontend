import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = () => {
  ReactGA.initialize('13900879613'); // ⭐ Replace with YOUR Measurement ID
};

// Track page views
export const logPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track events
export const logEvent = (category, action, label = '') => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
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