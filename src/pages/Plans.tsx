import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, CreditCard } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for getting started",
    current: true,
    features: [
      "5 QR codes",
      "Basic analytics",
      "PNG downloads",
      "Standard support"
    ],
    limitations: [
      "No custom domains",
      "Basic customization",
      "Limited scans tracking"
    ]
  },
  {
    name: "Pro",
    price: 9.99,
    period: "month",
    description: "For growing businesses",
    popular: true,
    features: [
      "Unlimited QR codes",
      "Advanced analytics",
      "All file formats",
      "Custom domains",
      "Bulk generation",
      "Priority support",
      "API access"
    ]
  },
  {
    name: "Enterprise",
    price: 29.99,
    period: "month",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "White-label solution",
      "Advanced integrations",
      "Custom branding",
      "Dedicated support",
      "SLA guarantee",
      "Custom limits"
    ]
  }
]

const paymentHistory = [
  {
    id: 1,
    date: "2024-07-01",
    amount: 9.99,
    plan: "Pro Monthly",
    status: "Paid",
    invoice: "INV-2024-001"
  },
  {
    id: 2,
    date: "2024-06-01",
    amount: 9.99,
    plan: "Pro Monthly",
    status: "Paid",
    invoice: "INV-2024-002"
  },
  {
    id: 3,
    date: "2024-05-01",
    amount: 9.99,
    plan: "Pro Monthly",
    status: "Paid",
    invoice: "INV-2024-003"
  }
]

const Plans = () => {
  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Plans and Payments</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and billing</p>
      </div>

      {/* Current Plan */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your active subscription details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Free Plan</h3>
              <p className="text-muted-foreground">Active since July 2024</p>
            </div>
            <Badge variant="secondary">Current</Badge>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">QR Codes Used</p>
              <p className="font-medium">3 / 5</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Scans</p>
              <p className="font-medium">1,245</p>
            </div>
            <div>
              <p className="text-muted-foreground">Custom Domains</p>
              <p className="font-medium">0 / 0</p>
            </div>
            <div>
              <p className="text-muted-foreground">Next Billing</p>
              <p className="font-medium">N/A</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''} ${plan.current ? 'border-green-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              {plan.current && (
                <div className="absolute -top-3 right-4">
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    Current Plan
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations?.map((limitation, index) => (
                    <div key={index} className="flex items-center gap-2 opacity-60">
                      <div className="w-4 h-4 rounded-full border border-muted-foreground"></div>
                      <span className="text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full" 
                  variant={plan.current ? "secondary" : plan.popular ? "default" : "outline"}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : plan.price === 0 ? "Downgrade" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment History
          </CardTitle>
          <CardDescription>Your billing and payment records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{payment.plan}</p>
                  <p className="text-sm text-muted-foreground">{payment.date}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium">${payment.amount}</p>
                  <Badge variant="outline" className="text-xs">
                    {payment.status}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Download Invoice
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Plans