export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

// Create a persistent debug log that won't get cleared
const debugLog = (message: string) => {
  console.log(`%c[GOOGLE_OAUTH_DEBUG] ${message}`, 'background: #ff0000; color: white; font-weight: bold;');
  // Also store in sessionStorage for persistence
  const logs = JSON.parse(sessionStorage.getItem('google_oauth_debug') || '[]');
  logs.push(`${new Date().toISOString()}: ${message}`);
  sessionStorage.setItem('google_oauth_debug', JSON.stringify(logs.slice(-10))); // Keep last 10 logs
};

if (!GOOGLE_CLIENT_ID) {
  debugLog('Google OAuth Client ID not found in environment variables');
  console.warn('Google OAuth Client ID not found in environment variables');
  if (import.meta.env.PROD) {
    debugLog('PRODUCTION MODE: Google Client ID is missing!');
    debugger; // Production debugging: Google Client ID missing
  }
} else {
  debugLog(`Google Client ID configured: ${GOOGLE_CLIENT_ID.substring(0, 20)}...`);
}

// Get the current origin for redirect URI
const getOrigin = () => {
  if (typeof window === 'undefined') return 'http://localhost:8080';
  return window.location.origin;
};

export const GOOGLE_OAUTH_CONFIG = {
  clientId: GOOGLE_CLIENT_ID,
  redirectUri: `${getOrigin()}/auth/google/callback`,
  scope: 'openid profile email',
} as const;

// Check if we're in development mode
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// Debug function to check Google OAuth status
(window as any).debugGoogleOAuth = () => {
  console.group('🔍 Google OAuth Debug Information');
  console.log('Environment:', import.meta.env.MODE);
  console.log('Google Client ID:', GOOGLE_CLIENT_ID ? `${GOOGLE_CLIENT_ID.substring(0, 20)}...` : 'NOT SET');
  console.log('Current Origin:', window.location.origin);
  console.log('OAuth Config:', GOOGLE_OAUTH_CONFIG);
  
  const logs = JSON.parse(sessionStorage.getItem('google_oauth_debug') || '[]');
  console.log('Debug Logs:', logs);
  
  console.groupEnd();
  
  return {
    clientId: GOOGLE_CLIENT_ID,
    origin: window.location.origin,
    config: GOOGLE_OAUTH_CONFIG,
    logs
  };
};