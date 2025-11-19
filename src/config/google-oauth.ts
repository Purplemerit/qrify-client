export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

if (!GOOGLE_CLIENT_ID) {
  console.warn('Google OAuth Client ID not found in environment variables');
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