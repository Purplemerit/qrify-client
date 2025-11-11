import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Book, Video, MessageCircle, ExternalLink, ArrowRight } from "lucide-react"

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics of creating and managing QR codes",
    articles: 12,
    icon: Book,
    popular: true
  },
  {
    title: "QR Code Types",
    description: "Understanding different QR code formats and uses",
    articles: 8,
    icon: Book
  },
  {
    title: "Analytics & Tracking",
    description: "How to track and analyze QR code performance",
    articles: 6,
    icon: Book
  },
  {
    title: "Custom Domains",
    description: "Setting up and managing custom domains",
    articles: 4,
    icon: Book
  },
  {
    title: "Billing & Plans",
    description: "Subscription management and billing questions",
    articles: 5,
    icon: Book
  },
  {
    title: "API Documentation",
    description: "Technical documentation for developers",
    articles: 15,
    icon: Book
  }
]

const popularArticles = [
  {
    title: "How to create your first QR code",
    category: "Getting Started",
    views: "2.1k views",
    updated: "2 days ago"
  },
  {
    title: "Setting up custom domains",
    category: "Custom Domains",
    views: "1.8k views",
    updated: "1 week ago"
  },
  {
    title: "Understanding QR code analytics",
    category: "Analytics",
    views: "1.5k views",
    updated: "3 days ago"
  },
  {
    title: "Bulk QR code generation guide",
    category: "Getting Started",
    views: "1.2k views",
    updated: "5 days ago"
  },
  {
    title: "API rate limits and authentication",
    category: "API",
    views: "890 views",
    updated: "1 week ago"
  }
]

const HelpCenter = () => {
  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Help Center</h1>
        <p className="text-muted-foreground mt-1">Find answers to your questions</p>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search for help articles, guides, and FAQs..." 
              className="pl-12 h-12 text-lg"
            />
          </div>
          <div className="flex gap-2 justify-center mt-4">
            <Badge variant="outline">QR codes</Badge>
            <Badge variant="outline">Analytics</Badge>
            <Badge variant="outline">Custom domains</Badge>
            <Badge variant="outline">API</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Categories */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium mb-4">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{category.title}</CardTitle>
                        {category.popular && (
                          <Badge variant="secondary" className="mt-1 text-xs">Popular</Badge>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <CardDescription className="mt-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.articles} articles
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-medium mb-4">Quick Links</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Tutorials
                </CardTitle>
                <CardDescription>Step-by-step video guides</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Watch Tutorials
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Live Chat
                </CardTitle>
                <CardDescription>Chat with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact Support</CardTitle>
                <CardDescription>Send us a detailed message</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Articles</CardTitle>
          <CardDescription>Most viewed help articles this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="space-y-1">
                  <h4 className="font-medium">{article.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                    <span>•</span>
                    <span>{article.views}</span>
                    <span>•</span>
                    <span>Updated {article.updated}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HelpCenter