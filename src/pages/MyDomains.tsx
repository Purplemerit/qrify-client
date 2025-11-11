import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Globe, Plus, Settings, Trash2, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const domains = [
  {
    id: 1,
    domain: "qr.mycompany.com",
    status: "Active",
    qrCodes: 24,
    clicks: 1245,
    verified: true,
    added: "2024-07-01"
  },
  {
    id: 2,
    domain: "links.example.org",
    status: "Pending",
    qrCodes: 0,
    clicks: 0,
    verified: false,
    added: "2024-07-15"
  }
]

const MyDomains = () => {
  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">My Domains</h1>
        <p className="text-muted-foreground mt-1">Manage your custom domains for QR codes</p>
      </div>

      {/* Add New Domain */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Domain
          </CardTitle>
          <CardDescription>
            Connect your custom domain to use with QR codes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="domain">Domain Name</Label>
              <Input 
                id="domain" 
                placeholder="e.g., qr.yourdomain.com" 
                className="font-mono"
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Domain
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            <p>• Domain must be a subdomain (e.g., qr.yourdomain.com)</p>
            <p>• You'll need to add DNS records to verify ownership</p>
            <p>• SSL certificate will be automatically generated</p>
          </div>
        </CardContent>
      </Card>

      {/* Domain List */}
      <div className="space-y-4">
        {domains.map((domain) => (
          <Card key={domain.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <CardTitle className="text-lg font-mono">{domain.domain}</CardTitle>
                    <Badge 
                      variant={domain.status === "Active" ? "default" : "secondary"}
                    >
                      {domain.status}
                    </Badge>
                    {domain.verified && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    Added on {domain.added}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View DNS Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Domain
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{domain.qrCodes}</p>
                  <p className="text-sm text-muted-foreground">QR Codes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{domain.clicks.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {domain.clicks > 0 ? Math.round(domain.clicks / domain.qrCodes) : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg. Clicks per QR</p>
                </div>
              </div>

              {domain.status === "Pending" && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">DNS Configuration Required</h4>
                  <p className="text-sm text-yellow-700 mb-3">
                    Add the following DNS records to verify domain ownership:
                  </p>
                  <div className="space-y-2 text-sm font-mono bg-yellow-100 p-3 rounded">
                    <div>Type: CNAME</div>
                    <div>Name: {domain.domain}</div>
                    <div>Value: proxy.qrfy.com</div>
                  </div>
                  <Button size="sm" className="mt-3">
                    Verify Domain
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Learn how to set up custom domains</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Domain Setup Guide
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              DNS Configuration Help
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Troubleshooting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MyDomains