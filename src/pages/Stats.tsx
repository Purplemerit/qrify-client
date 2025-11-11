import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, QrCode, Eye, Download } from "lucide-react"

const Stats = () => {
  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Statistics</h1>
        <p className="text-muted-foreground mt-1">Overview of your QR code performance</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total QR Codes</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,924</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +4 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing QR Codes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing QR Codes</CardTitle>
            <CardDescription>Your most scanned QR codes this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Company Website", scans: 1245, change: "+12%" },
              { name: "Product Catalog", scans: 987, change: "+8%" },
              { name: "Contact Info", scans: 654, change: "+15%" },
              { name: "Social Media", scans: 432, change: "+5%" },
              { name: "WiFi Access", scans: 324, change: "-2%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.scans} scans</p>
                </div>
                <Badge 
                  variant={item.change.startsWith('+') ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {item.change}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Device Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Device Analytics</CardTitle>
            <CardDescription>Breakdown of scans by device type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { device: "Mobile", percentage: 68, scans: 1936 },
              { device: "Desktop", percentage: 24, scans: 683 },
              { device: "Tablet", percentage: 8, scans: 228 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.device}</span>
                  <span className="text-muted-foreground">{item.scans} scans</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">{item.percentage}%</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Geographic Data */}
        <Card>
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
            <CardDescription>Countries with the most scans</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { country: "United States", scans: 1245, flag: "🇺🇸" },
              { country: "United Kingdom", scans: 987, flag: "🇬🇧" },
              { country: "Germany", scans: 654, flag: "🇩🇪" },
              { country: "France", scans: 432, flag: "🇫🇷" },
              { country: "Canada", scans: 324, flag: "🇨🇦" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.flag}</span>
                  <span className="text-sm font-medium">{item.country}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.scans} scans</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest QR code interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "QR Code scanned", qr: "Company Website", time: "2 minutes ago", location: "New York, US" },
              { action: "QR Code created", qr: "New Product", time: "1 hour ago", location: "Dashboard" },
              { action: "QR Code scanned", qr: "Contact Info", time: "3 hours ago", location: "London, UK" },
              { action: "QR Code downloaded", qr: "WiFi Access", time: "5 hours ago", location: "Dashboard" },
              { action: "QR Code scanned", qr: "Social Media", time: "8 hours ago", location: "Paris, FR" },
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.qr} • {item.location}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Stats