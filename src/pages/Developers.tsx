import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Book, Key, Download, ExternalLink, Copy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Developers = () => {
  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Developers</h1>
        <p className="text-muted-foreground mt-1">API documentation and development resources</p>
      </div>

      {/* Getting Started */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            QR API Documentation
          </CardTitle>
          <CardDescription>
            Integrate QR code generation into your applications with our REST API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Book className="w-8 h-8" />
              <div className="text-center">
                <p className="font-medium">API Reference</p>
                <p className="text-xs opacity-90">Complete API documentation</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Key className="w-8 h-8" />
              <div className="text-center">
                <p className="font-medium">Get API Key</p>
                <p className="text-xs text-muted-foreground">Generate your API credentials</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Download className="w-8 h-8" />
              <div className="text-center">
                <p className="font-medium">SDKs & Libraries</p>
                <p className="text-xs text-muted-foreground">Ready-to-use code libraries</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="endpoints" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Code Examples</TabsTrigger>
          <TabsTrigger value="sdks">SDKs</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-6">
          {/* Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle>Available Endpoints</CardTitle>
              <CardDescription>Core API endpoints for QR code management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  method: "POST",
                  endpoint: "/api/v1/qr/create",
                  description: "Create a new QR code",
                  status: "Stable"
                },
                {
                  method: "GET",
                  endpoint: "/api/v1/qr/{id}",
                  description: "Retrieve QR code details",
                  status: "Stable"
                },
                {
                  method: "PUT",
                  endpoint: "/api/v1/qr/{id}",
                  description: "Update QR code content",
                  status: "Stable"
                },
                {
                  method: "DELETE",
                  endpoint: "/api/v1/qr/{id}",
                  description: "Delete a QR code",
                  status: "Stable"
                },
                {
                  method: "GET",
                  endpoint: "/api/v1/qr/{id}/analytics",
                  description: "Get QR code analytics",
                  status: "Beta"
                },
                {
                  method: "POST",
                  endpoint: "/api/v1/qr/bulk",
                  description: "Bulk QR code creation",
                  status: "Beta"
                }
              ].map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant={endpoint.method === "GET" ? "secondary" : endpoint.method === "POST" ? "default" : endpoint.method === "PUT" ? "outline" : "destructive"}
                      className="font-mono"
                    >
                      {endpoint.method}
                    </Badge>
                    <div>
                      <p className="font-mono text-sm">{endpoint.endpoint}</p>
                      <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={endpoint.status === "Stable" ? "default" : "secondary"}>
                      {endpoint.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          {/* Code Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>Ready-to-use code snippets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Create QR Code (cURL)</h4>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`curl -X POST "https://api.qrfy.com/v1/qr/create" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "url",
    "content": "https://example.com",
    "title": "My Website"
  }'`}</pre>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Create QR Code (JavaScript)</h4>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`const response = await fetch('https://api.qrfy.com/v1/qr/create', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'url',
    content: 'https://example.com',
    title: 'My Website'
  })
});

const qrCode = await response.json();`}</pre>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Create QR Code (Python)</h4>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`import requests

url = "https://api.qrfy.com/v1/qr/create"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "type": "url",
    "content": "https://example.com",
    "title": "My Website"
}

response = requests.post(url, headers=headers, json=data)
qr_code = response.json()`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sdks" className="space-y-6">
          {/* SDKs */}
          <Card>
            <CardHeader>
              <CardTitle>Official SDKs</CardTitle>
              <CardDescription>Use our official libraries in your preferred language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "JavaScript/Node.js", version: "v2.1.0", status: "Stable" },
                  { name: "Python", version: "v1.8.0", status: "Stable" },
                  { name: "PHP", version: "v1.5.0", status: "Stable" },
                  { name: "Ruby", version: "v1.3.0", status: "Beta" },
                  { name: "Go", version: "v1.2.0", status: "Beta" },
                  { name: "Java", version: "v1.1.0", status: "Coming Soon" }
                ].map((sdk, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">{sdk.name}</h4>
                      <Badge variant="outline" className="mb-3">{sdk.version}</Badge>
                      <div className="space-y-2">
                        <Badge variant={sdk.status === "Stable" ? "default" : sdk.status === "Beta" ? "secondary" : "outline"}>
                          {sdk.status}
                        </Badge>
                        <Button variant="outline" size="sm" className="w-full" disabled={sdk.status === "Coming Soon"}>
                          <Download className="w-4 h-4 mr-2" />
                          {sdk.status === "Coming Soon" ? "Coming Soon" : "Download"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          {/* Webhooks */}
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Receive real-time notifications about QR code events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  {
                    event: "qr.created",
                    description: "Triggered when a new QR code is created"
                  },
                  {
                    event: "qr.scanned",
                    description: "Triggered when a QR code is scanned"
                  },
                  {
                    event: "qr.updated",
                    description: "Triggered when QR code content is modified"
                  },
                  {
                    event: "qr.deleted",
                    description: "Triggered when a QR code is deleted"
                  }
                ].map((webhook, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-mono text-sm font-medium">{webhook.event}</p>
                      <p className="text-sm text-muted-foreground">{webhook.description}</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Rate Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Limits</CardTitle>
          <CardDescription>API usage limits by plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium">Free Plan</h4>
              <p className="text-2xl font-bold mt-2">100</p>
              <p className="text-sm text-muted-foreground">requests/hour</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium">Pro Plan</h4>
              <p className="text-2xl font-bold mt-2">1,000</p>
              <p className="text-sm text-muted-foreground">requests/hour</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium">Enterprise</h4>
              <p className="text-2xl font-bold mt-2">Custom</p>
              <p className="text-sm text-muted-foreground">Contact us</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Developers