import { CredentialResponse } from '@react-oauth/google';
import api from '../lib/api';

export interface GoogleAuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    role: string;
  };
}

export const googleAuthService = {
  /**
   * Handle Google OAuth login/signup
   */
  async handleGoogleAuth(credentialResponse: CredentialResponse): Promise<GoogleAuthResponse> {
    if (!credentialResponse.credential) {
      throw new Error('No credential received from Google');
    }

    const response = await api.post('/auth/google', {
      credential: credentialResponse.credential,
    });

    return response.data;
  },

  /**
   * Handle Google OAuth login/signup with error handling
   */
  async authenticateWithGoogle(credentialResponse: CredentialResponse): Promise<GoogleAuthResponse> {
    try {
      const result = await this.handleGoogleAuth(credentialResponse);
      return result;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { error?: string } } };
        throw new Error(apiError.response?.data?.error || 'Google authentication failed');
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Google authentication failed. Please try again.');
      }
    }
  },
};