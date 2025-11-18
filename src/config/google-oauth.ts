export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

if (!GOOGLE_CLIENT_ID) {
  console.warn('Google OAuth Client ID not found in environment variables');
}

export const GOOGLE_OAUTH_CONFIG = {
  clientId: GOOGLE_CLIENT_ID,
  redirectUri: `${window.location.origin}/auth/google/callback`,
  scope: 'openid profile email',
} as const;