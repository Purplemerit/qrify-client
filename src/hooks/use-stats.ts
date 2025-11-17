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
      console.log('🎯 useStats: Starting fetch...');
      const statsData = await statsApi.getStats();
      console.log('🎯 useStats: Received data:', statsData);
      setData(statsData);
      console.log('🎯 useStats: Data set in state');
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
      console.log('🎯 useStats: Error set:', errorMessage);
    } finally {
      setLoading(false);
      console.log('🎯 useStats: Loading set to false');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []); // Initial fetch only

  // Separate effect for loading timeout
  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        console.warn('🎯 Stats loading timeout - forcing loading to false');
        setLoading(false);
      }, 10000); // 10 second timeout
      
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  // Debug: Log state changes
  useEffect(() => {
    console.log('🎯 useStats state changed:', { 
      hasData: !!data, 
      loading, 
      error: !!error,
      dataKeys: data ? Object.keys(data) : null 
    });
  }, [data, loading, error]);

  return {
    data,
    loading,
    error,
    refetch: fetchStats
  };
};