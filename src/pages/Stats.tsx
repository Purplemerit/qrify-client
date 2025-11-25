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
  Info,
  HelpCircle,
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
      <div className="text-[#5A5B70] text-[32px] font-bold">{value}</div>
      <div className="text-[#5A5B70] text-xs font-bold">{label}</div>
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
    <div className="bg-white border border-[#DDDCDE] rounded-xl mb-3 overflow-hidden transition-all duration-200 hover:shadow-sm">
      <div
        className={`flex justify-between items-center min-h-[72px] py-3 px-4 cursor-pointer ${
          isExpanded ? "bg-gray-50/50" : ""
        }`}
        onClick={() => (hasChevron || isExpandable || children) && !loading && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 flex-1 pr-2">
          <span className="text-[#1E1E1E] text-[13px] font-bold leading-tight">{title}</span>
          {hasInfo && (
            <HelpCircle className="w-4 h-4 text-[#96949C] flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {loading ? (
            <Skeleton className="h-4 w-12 bg-gray-200" />
          ) : (
            count > 0 && (
              <span className="text-[#5A5B70] text-xs font-medium">
                {count} items
              </span>
            )
          )}
          {hasChevron && (
            <ChevronRight 
              className={`w-5 h-5 text-[#5A5B70] transition-transform duration-200 ${
                isExpanded ? "rotate-90" : ""
              }`} 
            />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-100">
          {count > 0 && children ? (
            children
          ) : (
            <div className="text-sm text-gray-500 py-2 text-center">
              No data available yet
            </div>
          )}
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
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Stats
              </h1>
              <Button
                variant="outline"
                className="rounded-full border-gray-300 text-blue-600 hover:bg-blue-50"
              >
                Export information
              </Button>
            </div>
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
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Stats</h1>
        <Button
          variant="outline"
          className="rounded-full border-gray-200 text-[#1D59F9] hover:bg-blue-50 font-semibold text-sm h-9 px-4"
        >
          Export information
        </Button>
      </div>

      {/* Time Zone Banner */}
      <div className="flex items-center justify-between bg-[#F3F5FE] border border-[#1D59F9] rounded-lg p-3 mb-6">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-[#1D59F9]" />
          <span className="text-[#1D59F9] text-sm font-medium">
            You can set your time zone.{" "}
            <span className="font-normal text-[#5A5B70]">
              Current time zone: {timezone.split("/").pop()?.replace("_", " ")}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white border-gray-200 text-[#5A5B70] hover:bg-gray-50 h-8 text-xs font-medium rounded-md"
          >
            Change
          </Button>
          <Button
            size="sm"
            className="bg-[#1D59F9] hover:bg-blue-700 text-white h-8 text-xs font-medium rounded-md border-0"
          >
            Accept
          </Button>
        </div>
      </div>

      {/* FilterBar Component */}
      <div className="flex gap-4 mb-6 flex-wrap items-center">
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
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#585858] pointer-events-none" />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center justify-between w-[240px] h-[38px] px-3 py-[7px] rounded border border-[#DBD5DC] bg-[#F3F3F3] hover:border-[#888] transition-colors"
          >
            {loading ? (
              <Skeleton className="h-4 w-32 bg-gray-200" />
            ) : (
              <span className="text-[#96949C] text-[13px] font-medium">
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
            )}
            <Calendar className="w-4 h-4 text-[#5A5B70]" />
          </button>

          {showDatePicker && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-[#DBD5DC] rounded-lg shadow-lg p-4 z-10 w-[300px] max-w-[calc(100vw-32px)]">
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
            className="flex items-center gap-2 px-4 py-[7px] h-[38px] rounded border border-[#DBD5DC] hover:border-[#888] transition-colors"
          >
            <span className="text-[#585858] text-[13px] font-semibold">
              Time zone: {timezone.split("/").pop()?.replace("_", " ") || "Time zone"}
            </span>
            <Edit className="w-3 h-3 text-[#5A5B70]" />
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
            className="flex items-center gap-2 px-4 py-[7px] h-[38px] rounded border border-[#DBD5DC] hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4 text-[#5A5B70]" />
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
        <div className="bg-[#F7F7F7] rounded-lg p-1 mb-6 border border-gray-100">
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="text-[#1E1E1E] text-[13px] font-semibold">
              Analyzed period:
            </span>
            {loading ? (
              <Skeleton className="h-4 w-40 bg-gray-200" />
            ) : (
              <span className="text-[#96949C] text-xs font-medium">
                {formatDateShort(startDate)} to {formatDateShort(endDate)}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap mb-6">
          {loading ? (
            <>
              <Skeleton className="flex-1 min-w-[200px] h-[100px] bg-gray-200 animate-pulse rounded-xl" />
              <Skeleton className="flex-1 min-w-[200px] h-[100px] bg-gray-200 animate-pulse rounded-xl" />
              <Skeleton className="flex-1 min-w-[200px] h-[100px] bg-gray-200 animate-pulse rounded-xl" />
              <Skeleton className="flex-1 min-w-[200px] h-[100px] bg-gray-200 animate-pulse rounded-xl" />
            </>
          ) : (
            <>
              <div className="flex-1 min-w-[200px] h-[100px] bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center gap-2 relative">
                <div className="text-[#1E1E1E] text-[32px] font-bold">
                  {data?.overview.totalQrCodes.value.toLocaleString() || "0"}
                </div>
                <div className="flex items-center gap-2 text-[#5A5B70] text-xs font-bold">
                  <QrCode className="w-4 h-4" />
                  Total QR Codes
                </div>
              </div>
              <div className="flex-1 min-w-[200px] h-[100px] bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center gap-2 relative">
                <div className="text-[#1E1E1E] text-[32px] font-bold">
                  {data?.overview.totalScans.value.toLocaleString() || "0"}
                </div>
                <div className="flex items-center gap-2 text-[#5A5B70] text-xs font-bold">
                  <RefreshCw className="w-4 h-4" />
                  Total Scans
                </div>
              </div>
              <div className="flex-1 min-w-[200px] h-[100px] bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center gap-2 relative">
                <div className="text-[#1E1E1E] text-[32px] font-bold">
                  {data?.overview.uniqueVisitors.value.toLocaleString() || "0"}
                </div>
                <div className="flex items-center gap-2 text-[#5A5B70] text-xs font-bold">
                  <Users className="w-4 h-4" />
                  Total Unique Scans
                </div>
              </div>
              <div className="flex-1 min-w-[200px] h-[100px] bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center gap-2 relative">
                <div className="text-[#1E1E1E] text-[32px] font-bold">
                  {data?.overview.downloads.value.toLocaleString() || "0"}
                </div>
                <div className="flex items-center gap-2 text-[#5A5B70] text-xs font-bold">
                  <Eye className="w-4 h-4" />
                  Total visits
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between items-center px-3 mb-12 flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${chartFilters.showTotal ? 'bg-[#1D59F9]' : 'border border-gray-300'}`}>
                {chartFilters.showTotal && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
              </div>
              <input
                type="checkbox"
                checked={chartFilters.showTotal}
                onChange={(e) =>
                  setChartFilters({
                    ...chartFilters,
                    showTotal: e.target.checked,
                  })
                }
                className="hidden"
              />
              <span className={`text-xs font-semibold ${chartFilters.showTotal ? 'text-[#1E1E1E]' : 'text-[#5A5B70]'}`}>
                Totals
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${chartFilters.showUniques ? 'bg-[#1D59F9]' : 'border border-gray-300'}`}>
                {chartFilters.showUniques && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
              </div>
              <input
                type="checkbox"
                checked={chartFilters.showUniques}
                onChange={(e) =>
                  setChartFilters({
                    ...chartFilters,
                    showUniques: e.target.checked,
                  })
                }
                className="hidden"
              />
              <span className={`text-xs font-semibold ${chartFilters.showUniques ? 'text-[#1E1E1E]' : 'text-[#5A5B70]'}`}>
                Uniques
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${chartFilters.showVisits ? 'bg-[#1D59F9]' : 'border border-gray-300'}`}>
                {chartFilters.showVisits && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
              </div>
              <input
                type="checkbox"
                checked={chartFilters.showVisits}
                onChange={(e) =>
                  setChartFilters({
                    ...chartFilters,
                    showVisits: e.target.checked,
                  })
                }
                className="hidden"
              />
              <span className={`text-xs font-semibold ${chartFilters.showVisits ? 'text-[#1E1E1E]' : 'text-[#5A5B70]'}`}>
                Visits
              </span>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 mr-4">
              <button
                onClick={() => setSelectedView("Day")}
                className={`text-xs font-medium px-2 py-1 rounded ${
                  selectedView === "Day" ? "bg-[#F3F5FE] text-[#1D59F9]" : "text-[#5A5B70]"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setSelectedView("Month")}
                className={`text-xs font-medium px-2 py-1 rounded ${
                  selectedView === "Month" ? "bg-[#F3F5FE] text-[#1D59F9]" : "text-[#5A5B70]"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setSelectedView("Year")}
                className={`text-xs font-medium px-2 py-1 rounded ${
                  selectedView === "Year" ? "bg-[#F3F5FE] text-[#1D59F9]" : "text-[#5A5B70]"
                }`}
              >
                Year
              </button>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
              <button
                onClick={() => setSelectedChart("line")}
                className={`p-1.5 rounded ${
                  selectedChart === "line" ? "bg-[#F3F5FE] text-[#1D59F9]" : "text-[#5A5B70]"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedChart("bar")}
                className={`p-1.5 rounded ${
                  selectedChart === "bar"
                    ? "bg-[#F3F5FE] text-[#1D59F9]"
                    : "text-[#5A5B70]"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-3 pb-6 relative h-[200px]">
          <div className="absolute left-3 top-0 bottom-8 w-full border-b border-gray-100 flex flex-col justify-between pointer-events-none">
            <div className="w-full border-t border-gray-100 border-dashed opacity-50" />
            <div className="w-full border-t border-gray-100 border-dashed opacity-50" />
            <div className="w-full border-t border-gray-100 border-dashed opacity-50" />
            <div className="w-full border-t border-gray-100 border-dashed opacity-50" />
          </div>
          
          {/* Y-axis label */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-medium">
            0
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8">
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
                    dates.push(`${month} ${day}`);
                  }
                  // Show only every nth date to avoid crowding
                  const step = Math.ceil(dates.length / 8);
                  return dates
                    .filter(
                      (_, index) =>
                        index % step === 0 || index === dates.length - 1
                    )
                    .map((dateStr) => (
                      <span
                        key={dateStr}
                        className="text-[#5A5B70] text-[10px] font-semibold"
                      >
                        {dateStr}
                      </span>
                    ));
                })()}
          </div>
        </div>
      </section>

      {/* AnalyticsGrid Component - Dynamic breakdown sections */}
      <div className="flex flex-col mb-6">
        <AnalyticsRow
          title="Scans by day"
          hasChevron={true}
          count={0}
          loading={loading}
        />

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
                  <span className="text-sm font-semibold text-gray-800">
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
          title="Scans by country"
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
                    <span className="text-sm font-semibold text-gray-800">
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
          title="Scans by region/city"
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
                      <span className="text-sm font-semibold text-gray-800">
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
          hasChevron={true}
          count={0}
          loading={loading}
        />

        <AnalyticsRow
          title="Scans by user language"
          hasChevron={true}
          count={0}
          loading={loading}
        />

        <AnalyticsRow
          title="Scans by QR name"
          hasChevron={true}
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
                  <p className="text-sm font-semibold text-gray-800">
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
          hasChevron={true}
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
                  <p className="text-sm font-semibold text-gray-800">
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
          hasChevron={true}
          count={data?.overview?.totalScans?.value || 0}
          loading={loading}
        />
      </div>
      </div>
    </div>
  );
};

export default Stats;