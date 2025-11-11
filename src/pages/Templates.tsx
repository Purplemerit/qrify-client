import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, Globe, User, Wifi, Phone, Mail, Star } from "lucide-react"

const templates = [
  {
    id: 1,
    name: "Website URL",
    description: "Perfect for sharing website links",
    icon: Globe,
    category: "URL",
    popular: true,
    features: ["Custom design", "Analytics tracking", "URL shortening"]
  },
  {
    id: 2,
    name: "Contact Card",
    description: "Share contact information easily",
    icon: User,
    category: "vCard",
    popular: true,
    features: ["Phone number", "Email", "Address", "Social links"]
  },
  {
    id: 3,
    name: "WiFi Access",
    description: "Quick WiFi connection for guests",
    icon: Wifi,
    category: "WiFi",
    popular: false,
    features: ["Network name", "Password", "Security type"]
  },
  {
    id: 4,
    name: "Phone Number",
    description: "Direct phone call initiation",
    icon: Phone,
    category: "Phone",
    popular: false,
    features: ["Click to call", "International format"]
  },
  {
    id: 5,
    name: "Email Message",
    description: "Pre-composed email template",
    icon: Mail,
    category: "Email",
    popular: false,
    features: ["Subject line", "Message body", "Recipients"]
  },
  {
    id: 6,
    name: "Plain Text",
    description: "Simple text content sharing",
    icon: QrCode,
    category: "Text",
    popular: false,
    features: ["Any text content", "Unicode support"]
  }
]

const Templates = () => {
  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Templates</h1>
        <p className="text-muted-foreground mt-1">Choose from pre-designed QR code templates</p>
      </div>

      {/* Popular Templates */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Popular Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.filter(template => template.popular).map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <template.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
                <CardDescription className="mt-2">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {template.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full">Use Template</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Templates */}
      <div>
        <h2 className="text-lg font-medium mb-4">All Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                      <template.icon className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  {template.popular && (
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  )}
                </div>
                <CardDescription className="mt-2">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {template.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full">Use Template</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Templates