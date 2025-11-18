import api from '../lib/api';

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  role: string;
  language?: string;
  dateFormat?: string;
  timeFormat?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface RefreshTokenResponse {
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePreferencesRequest {
  language?: string;
  dateFormat?: string;
  timeFormat?: string;
}

export interface DeleteAccountRequest {
  password: string;
}

export interface GetMeResponse {
  user: User;
}

export interface VerifyEmailResponse {
  valid: boolean;
  error?: string;
  suggestion?: string;
  result?: string;
}

class AuthService {
  /**
   * Register a new user account
   */
  async signup(data: SignupRequest): Promise<SignupResponse> {
    
    const response = await api.post<SignupResponse>('/auth/signup', data);
    
    
    // Cookies are set automatically by the server
    return response.data;
  }

  /**
   * Login with email and password
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    
    const response = await api.post<LoginResponse>('/auth/login', data);
    
    
    // Check cookies after login
    
    // Cookies are set automatically by the server
    return response.data;
  }

  /**
   * Logout and invalidate refresh token
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
      // Cookies are cleared automatically by the server
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await api.post<RefreshTokenResponse>('/auth/refresh');
    // Cookies are updated automatically by the server
    return response.data;
  }

  /**
   * Request email verification (resend verification email)
   */
  async requestEmailVerification(data: ResendVerificationRequest): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/verify/request', data);
    return response.data;
  }

  /**
   * Confirm email verification with token
   */
  async confirmEmailVerification(data: VerifyEmailRequest): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/verify/confirm', data);
    return response.data;
  }

  /**
   * Request password reset email
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/password/forgot', data);
    return response.data;
  }

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/password/reset', data);
    return response.data;
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<GetMeResponse> {
    try {
      const response = await api.get<GetMeResponse>('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Change password for authenticated user
   */
  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/change-password', data);
    return response.data;
  }

  /**
   * Update user preferences
   */
  async updatePreferences(data: UpdatePreferencesRequest): Promise<{ message: string; user: User }> {
    const response = await api.put<{ message: string; user: User }>('/auth/preferences', data);
    return response.data;
  }

  /**
   * Delete user account
   */
  async deleteAccount(data: DeleteAccountRequest): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>('/auth/account', { data });
    return response.data;
  }

  /**
   * Verify email address in real-time
   */
  async verifyEmail(email: string): Promise<VerifyEmailResponse> {
    const response = await api.post<VerifyEmailResponse>('/auth/verify-email', { email });
    return response.data;
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      // Try to fetch current user to verify authentication
      await this.getCurrentUser();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Synchronous authentication check (less reliable, use async version when possible)
   * Note: With httpOnly cookies, we cannot reliably check auth status client-side
   */
  isAuthenticatedSync(): boolean {
    // Since cookies are httpOnly, we cannot access them from JavaScript
    // This method is kept for compatibility but should be avoided
    // Always prefer the async isAuthenticated() method
    return true; // Assume authenticated and let server validate
  }
}

export const authService = new AuthService();
export default authService;
