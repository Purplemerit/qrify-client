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
    console.log('📝 AuthService: Making signup API call with:', { email: data.email });
    debugger; // Check before API call
    
    const response = await api.post<SignupResponse>('/auth/signup', data);
    
    console.log('📝 AuthService: Signup API response:', response);
    console.log('📝 AuthService: Response status:', response.status);
    console.log('📝 AuthService: Response headers:', response.headers);
    console.log('📝 AuthService: Response data:', response.data);
    debugger; // Check after API call
    
    // Cookies are set automatically by the server
    return response.data;
  }

  /**
   * Login with email and password
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    console.log('🔐 AuthService: Making login API call with:', { email: data.email });
    debugger; // Check before API call
    
    const response = await api.post<LoginResponse>('/auth/login', data);
    
    console.log('🔐 AuthService: Login API response:', response);
    console.log('🔐 AuthService: Response status:', response.status);
    console.log('🔐 AuthService: Response headers:', response.headers);
    console.log('🔐 AuthService: Response data:', response.data);
    
    // Check cookies after login
    console.log('🍪 All cookies after login:', document.cookie);
    console.log('🍪 Set-Cookie headers:', response.headers['set-cookie']);
    
    debugger; // Check after API call
    
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
    console.log('👤 Getting current user...');
    console.log('🍪 Cookies before /auth/me call:', document.cookie);
    debugger; // Check before getCurrentUser call
    
    try {
      const response = await api.get<GetMeResponse>('/auth/me');
      console.log('✅ getCurrentUser success:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ getCurrentUser failed:', error);
      console.log('🍪 Cookies after failed /auth/me call:', document.cookie);
      debugger; // Check after failed getCurrentUser call
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
    console.log('🔍 Checking if user is authenticated...');
    debugger; // Check before authentication check
    
    try {
      // Try to fetch current user to verify authentication
      await this.getCurrentUser();
      console.log('✅ User is authenticated');
      return true;
    } catch (error) {
      console.log('❌ User is not authenticated:', error);
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
    console.warn('isAuthenticatedSync() is unreliable with httpOnly cookies. Use isAuthenticated() instead.');
    return true; // Assume authenticated and let server validate
  }
}

export const authService = new AuthService();
export default authService;
