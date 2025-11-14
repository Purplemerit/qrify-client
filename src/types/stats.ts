// Statistics data types
export interface StatOverview {
  totalQrCodes: {
    value: number;
    change: string;
  };
  totalScans: {
    value: number;
    change: string;
  };
  uniqueVisitors: {
    value: number;
    change: string;
  };
  downloads: {
    value: number;
    change: string;
  };
}

export interface TopPerformingQrCode {
  name: string;
  scans: number;
  change: string;
}

export interface DeviceAnalytic {
  device: string;
  percentage: number;
  scans: number;
}

export interface TopLocation {
  country: string;
  scans: number;
  flag: string;
}

export interface RecentActivity {
  action: string;
  qr: string;
  time: string;
  location: string;
}

export interface StatsData {
  overview: StatOverview;
  topPerformingQrCodes: TopPerformingQrCode[];
  deviceAnalytics: DeviceAnalytic[];
  topLocations: TopLocation[];
  recentActivity: RecentActivity[];
}

// Hook return type
export interface UseStatsReturn {
  data: StatsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}