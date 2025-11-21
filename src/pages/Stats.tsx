import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  QrCode,
  Eye,
  Download,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Calendar,
  Edit,
  Filter,
  SquareCheckBig,
} from "lucide-react";
import { useStats } from "@/hooks/use-stats";

// Simple Alert component fallback if import fails
const Alert = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "destructive";
  className?: string;
}) => (
  <div
    className={`relative w-full rounded-lg border p-4 ${
      variant === "destructive"
        ? "border-red-200 bg-red-50 text-red-800"
        : "border-gray-200 bg-gray-50 text-gray-800"
    } ${className}`}
    role="alert"
  >
    {children}
  </div>
);

const AlertTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h5 className={`mb-1 font-medium leading-none tracking-tight ${className}`}>
    {children}
  </h5>
);

const AlertDescription = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`text-sm ${className}`}>{children}</div>;

// StatsCard Component
interface StatsCardProps {
  value: string;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ value, label }) => {
  return (
    <div className="flex-1 min-w-[200px] h-[100px] bg-white rounded-xl shadow-sm flex flex-col justify-center items-center gap-4 relative">
      <div className="text-[#5A5B70] text-[32px] font-semibold">{value}</div>
      <div className="text-[#5A5B70] text-xs font-semibold">{label}</div>
    </div>
  );
};

// AnalyticsRow Component
interface AnalyticsRowProps {
  title: string;
  hasInfo?: boolean;
  hasChevron?: boolean;
  count?: number;
  loading?: boolean;
  children?: React.ReactNode;
  isExpandable?: boolean;
}

const AnalyticsRow: React.FC<AnalyticsRowProps> = ({
  title,
  hasInfo = false,
  hasChevron = true,
  count = 0,
  loading = false,
  children,
  isExpandable = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border-b border-gray-100 last:border-b-0">
      <div
        className={`flex justify-between items-center h-14 px-3 py-4 hover:bg-gray-50 transition-colors ${
          isExpandable ? "cursor-pointer" : ""
        }`}
        onClick={() => isExpandable && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[#5A5B70] text-xs font-semibold">{title}</span>
          {hasInfo && (
            <div className="flex w-4 h-4 justify-center items-center border rounded-full border-black">
              <div className="text-black text-[8px] font-bold">i</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {loading ? (
            <Skeleton className="h-4 w-12 bg-gray-200" />
          ) : (
            <span className="text-[#5A5B70] text-xs font-medium">
              {count} items
            </span>
          )}
          {hasChevron &&
            (isExpanded ? (
              <ChevronDown className="w-5 h-5 text-[#5A5B70]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[#5A5B70]" />
            ))}
        </div>
      </div>
      {isExpanded && children && (
        <div className="px-3 pb-4 pt-0 bg-gray-50 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

const Stats = () => {
  const { data, loading, error, refetch } = useStats();
  const [selectedView, setSelectedView] = useState("Day");
  const [selectedChart, setSelectedChart] = useState("bar");
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [showTimezone, setShowTimezone] = useState(false);
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [showFilters, setShowFilters] = useState(false);
  const [chartFilters, setChartFilters] = useState({
    showTotal: true,
    showUniques: false,
    showVisits: false,
  });

  // Calculate date range based on selection
  const getDateRange = () => {
    const today = new Date();
    let daysAgo = 7;

    if (dateRange === "Last 30 days") daysAgo = 30;
    else if (dateRange === "Last 90 days") daysAgo = 90;

    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - daysAgo);

    return { startDate, endDate: today };
  };

  const { startDate, endDate } =
    customStartDate && customEndDate
      ? {
          startDate: new Date(customStartDate),
          endDate: new Date(customEndDate),
        }
      : getDateRange();

  const formatDate = (d: Date) => {
    const month = d.toLocaleString("en", { month: "short" });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const formatDateShort = (d: Date) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Apply filters button handler
  const handleApplyFilters = () => {
    setShowFilters(false);
    refetch();
  };

  console.log("📊 Stats component state:", {
    data,
    loading,
    error,
    hasData: !!data,
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto py-4 md:py-8 px-4 md:px-6">
          <div className="mb-6 md:mb-8 fade-in">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Statistics
            </h1>
            <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-lg">
              Overview of your QR code performance
            </p>
          </div>
          <div className="max-w-2xl mx-auto animate-slide-up px-2">
            <Alert variant="destructive" className="shadow-lg border-red-300">
              <AlertCircle className="h-4 w-4 md:h-5 md:w-5" />
              <AlertTitle className="text-sm md:text-base">
                Error loading statistics
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-3 text-sm">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-gray-50 border-red-300 hover:border-red-400 text-xs md:text-sm"
                  onClick={refetch}
                >
                  <RefreshCw className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* FilterBar Component */}
      <div className="flex gap-4 mb-9 flex-wrap">
        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => {
              setDateRange(e.target.value);
              setCustomStartDate("");
              setCustomEndDate("");
            }}
            className="w-[132px] h-[38px] px-4 py-[7px] rounded border border-[#DBD5DC] text-[#585858] text-[13px] font-semibold appearance-none bg-white cursor-pointer hover:border-[#888] transition-colors"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 text-[#585858] pointer-events-none" />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 px-4 py-[7px] rounded border border-[#DBD5DC] hover:border-[#888] transition-colors"
          >
            {loading ? (
              <Skeleton className="h-4 w-44 bg-gray-200" />
            ) : (
              <span className="text-[#585858] text-[13px] font-semibold">
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
            )}
            <Calendar className="w-6 h-6 text-black" />
          </button>

          {showDatePicker && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-[#DBD5DC] rounded-lg shadow-lg p-4 z-10 min-w-[300px]">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DBD5DC] rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DBD5DC] rounded text-sm"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowDatePicker(false);
                      if (customStartDate && customEndDate) {
                        setDateRange("Custom");
                      }
                    }}
                    className="flex-1"
                  >
                    Apply
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowDatePicker(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowTimezone(!showTimezone)}
            className="flex items-center gap-2 px-4 py-[7px] rounded border border-[#DBD5DC] hover:border-[#888] transition-colors"
          >
            <span className="text-[#585858] text-[13px] font-semibold">
              {timezone.split("/").pop()?.replace("_", " ") || "Time zone"}
            </span>
            <Edit className="w-6 h-6 text-black" />
          </button>

          {showTimezone && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-[#DBD5DC] rounded-lg shadow-lg p-4 z-10 min-w-[250px]">
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-700 block">
                  Select Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 border border-[#DBD5DC] rounded text-sm"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                  <option value="Asia/Shanghai">Shanghai</option>
                  <option value="Australia/Sydney">Sydney</option>
                  <option value="UTC">UTC</option>
                </select>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => setShowTimezone(false)}
                    className="flex-1"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative ml-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-[7px] rounded border border-[#DBD5DC] hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5 text-[#5A5B70]" />
            <span className="text-[#585858] text-[13px] font-semibold">
              Filter
            </span>
          </button>

          {showFilters && (
            <div className="absolute top-full mt-2 right-0 bg-white border border-[#DBD5DC] rounded-lg shadow-lg p-4 z-10 min-w-[200px]">
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Chart Data
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chartFilters.showTotal}
                    onChange={(e) =>
                      setChartFilters({
                        ...chartFilters,
                        showTotal: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Total Scans</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chartFilters.showUniques}
                    onChange={(e) =>
                      setChartFilters({
                        ...chartFilters,
                        showUniques: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Unique Visitors</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chartFilters.showVisits}
                    onChange={(e) =>
                      setChartFilters({
                        ...chartFilters,
                        showVisits: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Visits</span>
                </label>
                <div className="pt-2 border-t border-gray-200">
                  <Button
                    size="sm"
                    onClick={handleApplyFilters}
                    className="w-full"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ChartSection Component */}
      <section className="bg-white rounded-xl border border-[#DDDCDE] p-3 mb-3">
        <div className="bg-[#F7F7F7] rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 bg-white rounded border border-[#DBD5DC] px-3 py-[7px] mb-6">
            <span className="text-[#1E1E1E] text-[13px] font-semibold">
              Analyzed period:
            </span>
            {loading ? (
              <Skeleton className="h-4 w-40 bg-gray-200" />
            ) : (
              <span className="text-[#96949C] text-xs font-semibold">
                {formatDateShort(startDate)} to {formatDateShort(endDate)}
              </span>
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            {loading ? (
              <>
                <Skeleton className="flex-1 min-w-[200px] h-[100px] bg-gray-200 animate-pulse rounded-xl" />
                <Skeleton className="flex-1 min-w-[200px] h-[100px] bg-gray-200 animate-pulse rounded-xl" />
                <Skeleton className="flex-1 min-w-[200px] h-[100px] bg-gray-200 animate-pulse rounded-xl" />
                <Skeleton className="flex-1 min-w-[200px] h-[100px] bg-gray-200 animate-pulse rounded-xl" />
              </>
            ) : (
              <>
                <StatsCard
                  value={
                    data?.overview.totalScans.value.toLocaleString() || "0"
                  }
                  label="Total Scans"
                />
                <StatsCard
                  value={
                    data?.overview.uniqueVisitors.value.toLocaleString() || "0"
                  }
                  label="Unique Scans"
                />
                <StatsCard
                  value={String(data?.overview.totalQrCodes.value || 0)}
                  label="QR Codes"
                />
                <StatsCard
                  value={String(data?.overview.downloads.value || 0)}
                  label="Visits"
                />
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center px-3 mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-7">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={chartFilters.showTotal}
                onChange={(e) =>
                  setChartFilters({
                    ...chartFilters,
                    showTotal: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded-sm"
              />
              <span className="text-[#5A5B70] text-xs font-semibold">
                Total
              </span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={chartFilters.showUniques}
                onChange={(e) =>
                  setChartFilters({
                    ...chartFilters,
                    showUniques: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded-sm"
              />
              <span className="text-[#5A5B70] text-xs font-semibold">
                Uniques
              </span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={chartFilters.showVisits}
                onChange={(e) =>
                  setChartFilters({
                    ...chartFilters,
                    showVisits: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded-sm"
              />
              <span className="text-[#5A5B70] text-xs font-semibold">
                Visits
              </span>
            </label>
          </div>

          <div className="flex items-center gap-7">
            <button
              onClick={() => setSelectedView("Day")}
              className={`text-xs font-semibold ${
                selectedView === "Day" ? "text-[#1D59F9]" : "text-[#5A5B70]"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setSelectedView("Month")}
              className={`text-xs font-semibold ${
                selectedView === "Month" ? "text-[#1D59F9]" : "text-[#5A5B70]"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setSelectedView("Year")}
              className={`text-xs font-semibold ${
                selectedView === "Year" ? "text-[#1D59F9]" : "text-[#5A5B70]"
              }`}
            >
              Year
            </button>
            <button
              onClick={() => setSelectedChart("line")}
              className={
                selectedChart === "line" ? "text-[#1D59F9]" : "text-[#5A5B70]"
              }
            >
              <TrendingUp className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSelectedChart("bar")}
              className={`p-1 rounded ${
                selectedChart === "bar"
                  ? "bg-[#F3F5FE] text-[#1D59F9]"
                  : "text-[#5A5B70]"
              }`}
            >
              <BarChart3 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="px-3">
          <div className="flex items-center gap-2.5 mb-4">
            {loading ? (
              <Skeleton className="h-4 w-8 bg-gray-200" />
            ) : (
              <span className="text-[#5A5B70] text-xs font-semibold">
                {data?.overview?.totalScans?.value || 0}
              </span>
            )}
            <div className="flex-1 border-b border-[#E0E0E0]" />
          </div>
          <div className="flex justify-between flex-wrap gap-2">
            {loading
              ? Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-12 bg-gray-100" />
                ))
              : (() => {
                  const dates = [];
                  const days =
                    dateRange === "Last 30 days"
                      ? 30
                      : dateRange === "Last 90 days"
                      ? 90
                      : 7;
                  for (let i = days - 1; i >= 0; i--) {
                    const date = new Date(endDate);
                    date.setDate(date.getDate() - i);
                    const day = date.getDate();
                    const month = date.toLocaleString("en", {
                      month: "short",
                    });
                    dates.push(`${day} ${month}`);
                  }
                  // Show only every nth date to avoid crowding
                  const step = Math.ceil(dates.length / 9);
                  return dates
                    .filter(
                      (_, index) =>
                        index % step === 0 || index === dates.length - 1
                    )
                    .map((dateStr) => (
                      <span
                        key={dateStr}
                        className="text-[#5A5B70] text-xs font-semibold"
                      >
                        {dateStr}
                      </span>
                    ));
                })()}
          </div>
        </div>
      </section>

      {/* AnalyticsGrid Component - Dynamic breakdown sections */}
      <div className="flex flex-col mb-6 bg-white rounded-xl border border-[#DDDCDE] overflow-hidden">
        <AnalyticsRow
          title="Scans by operating system"
          count={data?.deviceAnalytics?.length || 0}
          loading={loading}
          isExpandable={
            !!data?.deviceAnalytics && data.deviceAnalytics.length > 0
          }
        >
          <div className="space-y-3 mt-3">
            {data?.deviceAnalytics?.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">
                    {item.device}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.scans} scans
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2 bg-gray-200" />
                <p className="text-xs text-muted-foreground text-right mt-1 font-medium">
                  {item.percentage}%
                </p>
              </div>
            ))}
          </div>
        </AnalyticsRow>

        <AnalyticsRow
          title="Scan by country"
          hasInfo
          count={data?.topLocations?.length || 0}
          loading={loading}
          isExpandable={!!data?.topLocations && data.topLocations.length > 0}
        >
          <div className="space-y-2 mt-3">
            {data?.topLocations?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  {item.flag ? (
                    <span className="text-xl bg-white rounded-full p-1 shadow-sm">
                      {item.flag}
                    </span>
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-sm text-gray-500">🌍</span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800">
                      {item.country}
                    </span>
                    {item.city && (
                      <span className="text-xs text-muted-foreground">
                        {item.city}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {item.scans} scans
                </span>
              </div>
            ))}
          </div>
        </AnalyticsRow>

        <AnalyticsRow
          title="Scan by region/city"
          hasInfo
          count={data?.topLocations?.filter((l) => l.city)?.length || 0}
          loading={loading}
          isExpandable={
            !!data?.topLocations?.filter((l) => l.city) &&
            data.topLocations.filter((l) => l.city).length > 0
          }
        >
          <div className="space-y-2 mt-3">
            {data?.topLocations
              ?.filter((l) => l.city)
              ?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    {item.flag ? (
                      <span className="text-xl bg-white rounded-full p-1 shadow-sm">
                        {item.flag}
                      </span>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-sm text-gray-500">🏙️</span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        {item.city}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.country}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {item.scans} scans
                  </span>
                </div>
              ))}
          </div>
        </AnalyticsRow>

        <AnalyticsRow
          title="Scans by browser"
          hasChevron={false}
          count={0}
          loading={loading}
        />

        <AnalyticsRow
          title="Scans by user language"
          hasChevron={false}
          count={0}
          loading={loading}
        />

        <AnalyticsRow
          title="Scans by QR name"
          hasChevron={false}
          count={data?.topPerformingQrCodes?.length || 0}
          loading={loading}
          isExpandable={
            !!data?.topPerformingQrCodes && data.topPerformingQrCodes.length > 0
          }
        >
          <div className="space-y-2 mt-3">
            {data?.topPerformingQrCodes?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.scans} scans
                  </p>
                </div>
                <Badge
                  variant={
                    item.change.startsWith("+") ? "default" : "secondary"
                  }
                  className={`text-xs font-medium shadow-sm ${
                    item.change.startsWith("+")
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {item.change}
                </Badge>
              </div>
            ))}
          </div>
        </AnalyticsRow>

        <AnalyticsRow
          title="Scans by time of day"
          hasChevron={false}
          count={data?.recentActivity?.length || 0}
          loading={loading}
          isExpandable={
            !!data?.recentActivity && data.recentActivity.length > 0
          }
        >
          <div className="space-y-2 mt-3">
            {data?.recentActivity?.map((item, index) => (
              <div
                key={index}
                className="space-y-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800">
                    {item.action}
                  </p>
                  <p className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-full shadow-sm">
                    {item.time}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-gray-700">{item.qr}</span>
                  {item.location && <span> • {item.location}</span>}
                  {item.city && item.country && (
                    <span>
                      {" "}
                      • {item.city}, {item.country}
                    </span>
                  )}
                  {!item.location && !item.city && (
                    <span> • Location unknown</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AnalyticsRow>

        <AnalyticsRow
          title="Events"
          hasInfo
          hasChevron={false}
          count={data?.overview?.totalScans?.value || 0}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Stats;
