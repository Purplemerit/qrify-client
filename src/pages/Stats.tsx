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

const Stats = () => {
  const { data, loading, error, refetch } = useStats();

  console.log("📊 Stats component state:", {
    data,
    loading,
    error,
    hasData: !!data,
  });

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto py-4 md:py-8 px-4 md:px-6">
          <div className="mb-6 md:mb-8 fade-in">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Stats
            </h1>
            <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-lg">
              Overview of your QR code performance
            </p>
          </div>{" "}
          <div className="max-w-2xl mx-auto px-2">
            <Alert variant="destructive" className="shadow-lg border border-transparent">
              <AlertCircle className="h-4 w-4 md:h-5 md:w-5" />
              <AlertTitle className="text-sm md:text-base">
                Error loading statistics
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-3 text-sm">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white border border-transparent text-xs md:text-sm"
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-4 md:py-8 px-4 md:px-6">
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Statistics
            </h1>
            <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-lg">
              Overview of your QR code performance and analytics
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            disabled={loading}
            className="bg-white/80 border border-transparent shadow-md px-4 md:px-6"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card className="Totals-Total bg-white/80 backdrop-blur-sm border border-transparent shadow-lg">
            <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2 md:pb-2 p-3 md:pt-6 md:px-6 md:pb-2">
              {loading ? (
                <Skeleton className="h-6 md:h-8 w-12 md:w-16 bg-gray-200" />
              ) : (
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                  {data?.overview.totalQrCodes.value || 0}
                </CardTitle>
              )}
              {/* <div className="p-1.5 md:p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                <QrCode className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              </div> */}
              {/* <QrCode className="h-4 w-4 md:h-5 md:w-5 text-blue-600" /> */}
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              {loading ? (
                <Skeleton className="h-3 md:h-4 w-20 md:w-24 bg-gray-100" />
              ) : (
                <>
                  <p className="text-xs md:text-sm font-medium text-gray-600 flex items-center justify-center gap-1">
                    <QrCode className="h-3 w-3 md:h-4 md:w-4" />
                    Total QR Codes
                  </p>
                  {/* <p className="text-xs md:text-sm text-muted-foreground">
                    {data?.overview.totalQrCodes.change || "No data available"}
                  </p> */}
                </>
              )}
            </CardContent>
          </Card>

          <Card className="Totals-Total bg-white/80 backdrop-blur-sm border border-transparent shadow-lg">
            <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2 md:pb-2 p-3 md:pt-6 md:px-6 md:pb-2">
              {loading ? (
                <Skeleton className="h-6 md:h-8 w-12 md:w-16 bg-gray-200" />
              ) : (
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                  {data?.overview.totalScans.value.toLocaleString() || 0}
                </CardTitle>
              )}
              {/* <div className="p-1.5 md:p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors duration-300">
                <Eye className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              </div> */}
              {/* <Eye className="h-4 w-4 md:h-5 md:w-5 text-green-600" /> */}
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              {loading ? (
                <Skeleton className="h-3 md:h-4 w-20 md:w-24 bg-gray-100" />
              ) : (
                <>
                  <p className="text-xs md:text-sm font-medium text-gray-600 flex items-center justify-center gap-1">
                    <Eye className="h-3 w-3 md:h-4 md:w-4" />
                    Total Scans
                  </p>
                  {/* <p className="text-xs md:text-sm text-muted-foreground">
                    {data?.overview.totalScans.change || "No data available"}
                  </p> */}
                </>
              )}
            </CardContent>
          </Card>

          <Card className="Totals-Total bg-white/80 backdrop-blur-sm border border-transparent shadow-lg">
            <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2 md:pb-2 p-3 md:pt-6 md:px-6 md:pb-2">
              {loading ? (
                <Skeleton className="h-6 md:h-8 w-12 md:w-16 bg-gray-200" />
              ) : (
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                  {data?.overview.uniqueVisitors.value.toLocaleString() || 0}
                </CardTitle>
              )}
              {/* <div className="p-1.5 md:p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors duration-300">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
              </div> */}
              {/* <Users className="h-4 w-4 md:h-5 md:w-5 text-purple-600" /> */}
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              {loading ? (
                <Skeleton className="h-3 md:h-4 w-20 md:w-24 bg-gray-100" />
              ) : (
                <>
                  <p className="text-xs md:text-sm font-medium text-gray-600 flex items-center justify-center gap-1">
                    <Users className="h-3 w-3 md:h-4 md:w-4" />
                    Unique Visitors
                  </p>
                  {/* <p className="text-xs md:text-sm text-muted-foreground">
                    {data?.overview.uniqueVisitors.change ||
                      "No data available"}
                  </p> */}
                </>
              )}
            </CardContent>
          </Card>

          <Card className="Totals-Total bg-white/80 backdrop-blur-sm border border-transparent shadow-lg">
            <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2 md:pb-2 p-3 md:pt-6 md:px-6 md:pb-2">
              {loading ? (
                <Skeleton className="h-6 md:h-8 w-12 md:w-16 bg-gray-200" />
              ) : (
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                  {data?.overview.downloads.value || 0}
                </CardTitle>
              )}
              {/* <div className="p-1.5 md:p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors duration-300">
                <Download className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
              </div> */}
              {/* <Download className="h-4 w-4 md:h-5 md:w-5 text-orange-600" /> */}
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              {loading ? (
                <Skeleton className="h-3 md:h-4 w-20 md:w-24 bg-gray-100" />
              ) : (
                <>
                  <p className="text-xs md:text-sm font-medium text-gray-600 flex items-center justify-center gap-1">
                    <Download className="h-3 w-3 md:h-4 md:w-4" />
                    Downloads
                  </p>
                  {/* <p className="text-xs md:text-sm text-muted-foreground">
                    {data?.overview.downloads.change || "No data available"}
                  </p> */}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Top Performing QR Codes */}
          <Card className="bg-white/80 backdrop-blur-sm border border-transparent shadow-lg">
            <CardHeader className="pb-3 md:pb-4 p-4 md:p-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-1.5 md:p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-base md:text-lg font-semibold text-gray-800">
                    Top Performing QR Codes
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Your most scanned QR codes this month
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 bg-gray-200" />
                      <Skeleton className="h-3 w-16 bg-gray-100" />
                    </div>
                    <Skeleton className="h-6 w-12 bg-gray-200" />
                  </div>
                ))
              ) : data?.topPerformingQrCodes &&
                data.topPerformingQrCodes.length > 0 ? (
                data.topPerformingQrCodes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-transparent"
                  >
                    <div className="space-y-0.5 md:space-y-1">
                      <p className="text-xs md:text-sm font-medium text-gray-800">
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
                ))
              ) : (
                <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-transparent">
                  <QrCode className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No QR codes found</p>
                  <p className="text-sm text-muted-foreground">
                    Create your first QR code to see statistics
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Device Analytics */}
          <Card className="bg-white/80 backdrop-blur-sm border border-transparent shadow-lg">
            <CardHeader className="pb-3 md:pb-4 p-4 md:p-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-1.5 md:p-2 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-base md:text-lg font-semibold text-gray-800">
                    Device Analytics
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Breakdown of scans by device type
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-5 p-4 md:p-6 pt-0">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="space-y-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <Skeleton className="h-4 w-16 bg-gray-200" />
                      <Skeleton className="h-4 w-20 bg-gray-200" />
                    </div>
                    <Skeleton className="h-3 w-full bg-gray-100" />
                    <div className="text-right">
                      <Skeleton className="h-3 w-8 ml-auto bg-gray-200" />
                    </div>
                  </div>
                ))
              ) : data?.deviceAnalytics && data.deviceAnalytics.length > 0 ? (
                data.deviceAnalytics.map((item, index) => (
                  <div
                    key={index}
                    className="space-y-2 md:space-y-3 p-3 md:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-transparent"
                  >
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="font-medium text-gray-800">
                        {item.device}
                      </span>
                      <span className="text-muted-foreground">
                        {item.scans} scans
                      </span>
                    </div>
                    <Progress
                      value={item.percentage}
                      className="h-2 md:h-3 bg-gray-200"
                    />
                    <p className="text-xs text-muted-foreground text-right font-medium">
                      {item.percentage}%
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-transparent">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    No device data available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Geographic Data */}
          <Card className="bg-white/80 backdrop-blur-sm border border-transparent shadow-lg">
            <CardHeader className="pb-3 md:pb-4 p-4 md:p-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-1.5 md:p-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-base md:text-lg font-semibold text-gray-800">
                    Top Locations
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Countries with the most scans
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded bg-gray-200" />
                      <Skeleton className="h-4 w-24 bg-gray-200" />
                    </div>
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                  </div>
                ))
              ) : data?.topLocations && data.topLocations.length > 0 ? (
                data.topLocations.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-transparent"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      {item.flag ? (
                        <span className="text-base md:text-xl bg-white rounded-full p-1 shadow-sm">
                          {item.flag}
                        </span>
                      ) : (
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-xs md:text-sm text-gray-500">
                            🌍
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-medium text-gray-800">
                          {item.country}
                        </span>
                        {item.city && (
                          <span className="text-xs text-muted-foreground">
                            {item.city}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs md:text-sm text-muted-foreground font-medium">
                      {item.scans} scans
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-transparent">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    No location data available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/80 backdrop-blur-sm border border-transparent shadow-lg">
            <CardHeader className="pb-3 md:pb-4 p-4 md:p-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-1.5 md:p-2 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <Eye className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-base md:text-lg font-semibold text-gray-800">
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Latest QR code interactions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="space-y-2 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32 bg-gray-200" />
                      <Skeleton className="h-3 w-20 bg-gray-100" />
                    </div>
                    <Skeleton className="h-3 w-40 bg-gray-100" />
                  </div>
                ))
              ) : data?.recentActivity && data.recentActivity.length > 0 ? (
                data.recentActivity.map((item, index) => (
                  <div
                    key={index}
                    className="space-y-1.5 md:space-y-2 p-3 md:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-transparent"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs md:text-sm font-medium text-gray-800">
                        {item.action}
                      </p>
                      <p className="text-xs text-muted-foreground bg-white px-2 py-0.5 md:py-1 rounded-full shadow-sm">
                        {item.time}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium text-gray-700">
                        {item.qr}
                      </span>
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
                ))
              ) : (
                <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-transparent">
                  <Eye className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    No recent activity
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stats;
