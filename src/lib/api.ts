import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base URL
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
console.log('🌐 API Base URL:', baseURL);
console.log('🌐 Environment variables:', import.meta.env);

export const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies
});

// Cookie utilities for client-side token management (fallback only)
export const tokenStorage = {
  getAccessToken: (): string | null => {
    // Cookies are handled automatically by the browser, this is just for client-side checks
    const cookies = document.cookie.split(';');
    const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
    return accessTokenCookie ? accessTokenCookie.split('=')[1] : null;
  },
  setAccessToken: (token: string): void => {
    // This will be handled by the server setting httpOnly cookies
    // This method is kept for compatibility but shouldn't be used
    console.warn('Token should be set by server as httpOnly cookie');
  },
  removeAccessToken: (): void => {
    // This will be handled by the server clearing cookies
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; httpOnly; secure; sameSite=strict';
  },
  getRefreshToken: (): string | null => {
    // Refresh token should be httpOnly and not accessible from client
    return null;
  },
  setRefreshToken: (token: string): void => {
    // This will be handled by the server setting httpOnly cookies
    console.warn('Refresh token should be set by server as httpOnly cookie');
  },
  removeRefreshToken: (): void => {
    // This will be handled by the server clearing cookies
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; httpOnly; secure; sameSite=strict';
  },
  clearTokens: (): void => {
    // Clear any client-accessible cookies (though tokens should be httpOnly)
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },
};

// Request interceptor (cookies are sent automatically, no manual authorization needed)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('📡 Making API request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      headers: config.headers,
      withCredentials: config.withCredentials,
      data: config.data
    });
    debugger; // Check request configuration
    
    // Cookies are automatically included due to withCredentials: true
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    debugger; // Check request errors
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token using cookie-based endpoint
        await api.post('/auth/refresh');
        
        processQueue(null, 'refreshed');
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear any client-side auth state
        processQueue(refreshError, null);
        tokenStorage.clearTokens();

        // Don't redirect to login from home page or public pages
        const currentPath = window.location.pathname;
        const publicPaths = ['/', '/home', '/login', '/signup', '/forgot-password'];

        if (!publicPaths.includes(currentPath)) {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Stats API functions
export const statsApi = {
  getStats: async () => {
    const response = await api.get('/qr/stats');
    return response.data;
  }
};

export default api;
