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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto py-8 px-6">
          <div className="mb-8 fade-in">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Statistics
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Overview of your QR code performance
            </p>
          </div>

          <div className="max-w-2xl mx-auto animate-slide-up">
            <Alert variant="destructive" className="shadow-lg border-red-300">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-base">
                Error loading statistics
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-3">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-gray-50 border-red-300 hover:border-red-400"
                  onClick={refetch}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
            className="bg-white/80 hover:bg-white border-2 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-lg px-4 md:px-6"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8 animate-slide-up">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                Total QR Codes
              </CardTitle>
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                <QrCode className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-8 w-16 bg-gray-200 animate-pulse" />
                  <Skeleton className="h-4 w-24 bg-gray-100 animate-pulse" />
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {data?.overview.totalQrCodes.value || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {data?.overview.totalQrCodes.change || "No data available"}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                Total Scans
              </CardTitle>
              <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors duration-300">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-8 w-16 bg-gray-200 animate-pulse" />
                  <Skeleton className="h-4 w-24 bg-gray-100 animate-pulse" />
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {data?.overview.totalScans.value.toLocaleString() || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {data?.overview.totalScans.change || "No data available"}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                Unique Visitors
              </CardTitle>
              <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors duration-300">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-8 w-16 bg-gray-200 animate-pulse" />
                  <Skeleton className="h-4 w-24 bg-gray-100 animate-pulse" />
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {data?.overview.uniqueVisitors.value.toLocaleString() || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {data?.overview.uniqueVisitors.change ||
                      "No data available"}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                Downloads
              </CardTitle>
              <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors duration-300">
                <Download className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-8 w-16 bg-gray-200 animate-pulse" />
                  <Skeleton className="h-4 w-24 bg-gray-100 animate-pulse" />
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {data?.overview.downloads.value || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {data?.overview.downloads.change || "No data available"}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-scale-in">
          {/* Top Performing QR Codes */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Top Performing QR Codes
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Your most scanned QR codes this month
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-pulse"
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
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-blue-100 transition-all duration-300 group border border-gray-200 hover:border-blue-300"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-800 group-hover:text-blue-800">
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
                <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
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
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-green-50 to-green-100 rounded-lg group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Device Analytics
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Breakdown of scans by device type
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="space-y-3 p-3 bg-gray-50 rounded-lg animate-pulse"
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
                    className="space-y-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-green-50 hover:to-green-100 transition-all duration-300 border border-gray-200 hover:border-green-300"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-800">
                        {item.device}
                      </span>
                      <span className="text-muted-foreground">
                        {item.scans} scans
                      </span>
                    </div>
                    <Progress
                      value={item.percentage}
                      className="h-3 bg-gray-200"
                    />
                    <p className="text-xs text-muted-foreground text-right font-medium">
                      {item.percentage}%
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    No device data available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Geographic Data */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Top Locations
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Countries with the most scans
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-pulse"
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
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-purple-50 hover:to-purple-100 transition-all duration-300 border border-gray-200 hover:border-purple-300 group"
                  >
                    <div className="flex items-center gap-3">
                      {item.flag ? (
                        <span className="text-xl bg-white rounded-full p-1 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                          {item.flag}
                        </span>
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-sm text-gray-500">🌍</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800 group-hover:text-purple-800">
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
                ))
              ) : (
                <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    No location data available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg group-hover:from-orange-100 group-hover:to-orange-200 transition-all duration-300">
                  <Eye className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Latest QR code interactions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="space-y-2 p-3 bg-gray-50 rounded-lg animate-pulse"
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
                    className="space-y-2 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-orange-50 hover:to-orange-100 transition-all duration-300 border border-gray-200 hover:border-orange-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800 group-hover:text-orange-800">
                        {item.action}
                      </p>
                      <p className="text-xs text-muted-foreground bg-white px-2 py-1 rounded-full shadow-sm">
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
                <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
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
