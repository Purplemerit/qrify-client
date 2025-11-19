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
    console.group('🔄 Google Auth Service');
    console.log('Sending credential to server...');
    
    if (!credentialResponse.credential) {
      throw new Error('No credential received from Google');
    }

    const response = await api.post('/auth/google', {
      credential: credentialResponse.credential,
    });

    console.log('✅ Server response:', response.data);
    console.groupEnd();
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
      console.groupEnd(); // Close any open group
      console.group('❌ Google Auth Service Error');
      console.error('Authentication service error:', error);
      
      // Enhanced error logging for better debugging
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: any, status?: number, statusText?: string } };
        console.error('Server response:', apiError.response?.data);
        console.error('Status:', apiError.response?.status, apiError.response?.statusText);
      }
      
      console.groupEnd();
      debugger; // Debug Google auth service errors
      
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