import { useState, useEffect } from 'react';
import { statsApi } from '@/lib/api';
import type { StatsData, UseStatsReturn } from '@/types/stats';

export const useStats = (): UseStatsReturn => {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const statsData = await statsApi.getStats();
      setData(statsData);
    } catch (err: unknown) {
      console.error('Failed to fetch stats:', err);
      // Provide more detailed error information
      let errorMessage = 'Failed to load statistics';
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { status?: number; data?: { error?: string } } };
        if (axiosError?.response?.status === 404) {
          errorMessage = 'Statistics endpoint not found. Please ensure the server is running.';
        } else if (axiosError?.response?.status === 401) {
          errorMessage = 'Authentication required. Please log in.';
        } else if (axiosError?.response?.status === 503) {
          errorMessage = 'Geolocation service temporarily unavailable. Stats will show with limited location data.';
        } else if (axiosError?.response?.status && axiosError.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (axiosError?.response?.data?.error) {
          errorMessage = axiosError.response.data.error;
        }
      } else if (err && typeof err === 'object' && 'code' in err) {
        const networkError = err as { code?: string; message?: string };
        if (networkError?.code === 'NETWORK_ERROR' || networkError?.message?.includes('Network Error')) {
          errorMessage = 'Network error. Please check your connection and ensure the server is running.';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchStats
  };
};