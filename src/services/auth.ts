import api from '../lib/api';

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  role: string;
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

export interface ChangeEmailRequest {
  newEmail: string;
  password: string;
}

export interface VerifyEmailChangeRequest {
  token: string;
}

export interface GetMeResponse {
  user: User;
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
    const response = await api.get<GetMeResponse>('/auth/me');
    return response.data;
  }

  /**
   * Change password for authenticated user
   */
  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/change-password', data);
    return response.data;
  }

  /**
   * Request email change (sends verification to new email)
   */
  async changeEmail(data: ChangeEmailRequest): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/change-email', data);
    return response.data;
  }

  /**
   * Confirm email change with token
   */
  async confirmEmailChange(data: VerifyEmailChangeRequest): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/change-email/verify', data);
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
    } catch {
      return false;
    }
  }

  /**
   * Synchronous authentication check (less reliable, use async version when possible)
   */
  isAuthenticatedSync(): boolean {
    // For cookie-based auth, we can't reliably check client-side
    // This is a basic check that looks for any auth-related cookies
    return document.cookie.includes('accessToken');
  }
}

export const authService = new AuthService();
export default authService;
