import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Globe, FileText, Image, CreditCard, Play, Link, Users, Music, Building, Tag } from "lucide-react"

const qrTypes = [
  { name: "Website", description: "Open a URL", icon: Globe },
  { name: "PDF", description: "Show a PDF", icon: FileText },
  { name: "Images", description: "Show an image gallery", icon: Image },
  { name: "vCard Plus", description: "Share contact details", icon: CreditCard },
  { name: "Video", description: "Show a video", icon: Play },
  { name: "List of links", description: "Group links", icon: Link },
  { name: "Social Media", description: "Share your social profiles", icon: Users },
  { name: "MP3", description: "Play an audio file", icon: Music },
  { name: "Business", description: "Share information about your business", icon: Building },
  { name: "Coupon", description: "Share a coupon", icon: Tag },
  { name: "Apps", description: "Redirect to app store", icon: Tag },
  { name: "Event", description: "Promote and share an Event", icon: Building },
  { name: "Menu", description: "Display the menu of a resturant or bar", icon: Play},
  { name: "Feedback", description: "Collect feedback and get rated", icon: Users}
]

const NewQR = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedQRType, setSelectedQRType] = useState("")
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [generatedQR, setGeneratedQR] = useState<null | { qr_image: string }>(null)


  const handleQRTypeSelect = (typeName: string) => {
    setSelectedQRType(typeName)
    setCurrentStep(2)
  }

  const handleGenerateQR = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:5000/api/qr/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${localStorage.getItem("token")}`, 
        },
        body: JSON.stringify({
          type: selectedQRType,
          data: url,
          title,
          description,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Failed to generate QR")

      console.log("QR created:", data)
      setGeneratedQR(data)  // <-- Save the returned QR object here
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }



  const handleStepClick = (step: number) => {
    if (step <= currentStep || step === 2) {
      setCurrentStep(step)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center flex-1">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleStepClick(1)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === 1 ? 'bg-primary text-primary-foreground' : 
              currentStep > 1 ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
            }`}>
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <span className={`text-sm ${currentStep >= 1 ? 'font-medium' : 'text-muted-foreground'}`}>
              Type of QR code
            </span>
          </div>
          <div className="h-px w-12 bg-muted"></div>
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleStepClick(2)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
            <span className={`text-sm ${currentStep === 2 ? 'font-medium' : 'text-muted-foreground'}`}>
              Content
            </span>
          </div>
          <div className="h-px w-12 bg-muted"></div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-sm text-muted-foreground">QR Design</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {currentStep === 2 && (
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setCurrentStep(1)} className="px-8 rounded-3xl mt-2">
            Back
          </Button>
          <Button onClick={() => setCurrentStep(3)} className="px-6 rounded-3xl mt-2">
            Next →
          </Button>
        </div>
      )}
    </div>
  )

  const renderStep1 = () => (
    <div className="flex gap-8 w-full px-10 justify-center">
      {/* Main Content */}
      <div className="flex-1 max-w-3xl">
        {/* Dynamic QRs Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold">Dynamic QRs</h1>
            <Badge variant="secondary" className="bg-green-300 text-black pt-2">
              WITH TRACKING
            </Badge>
          </div>
          <p className="text-muted-foreground">Update content in real time, without changing your code</p>
        </div>

        {/* QR Types Grid */}
        <div className="grid grid-cols-2 gap-4 hover:border">
          {qrTypes.map((type, index) => (
            <Card 
              key={index} 
              className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20 py-2 rounded-2xl"
              onClick={() => handleQRTypeSelect(type.name)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center">
                    <type.icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{type.name}</h3>
                    <p className="text-muted-foreground text-sm">{type.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold">Static QRs</h1>
            <Badge variant="secondary" className="bg-orange-300 text-black pt-2">
              NO TRACKING
            </Badge>
          </div>
          <p className="text-muted-foreground">Update content in real time, without changing your code</p>
        </div>
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-center">Example</h3>
        </div>
        <div className="relative">
          <img 
            src="/iphone15.png" 
            alt="iPhone 15 Mockup" 
            className="w-72 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
     <div className="flex gap-8 w-full px-10 justify-center">
      {/* Main Content */}
      <div className="flex-1 max-w-2xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Enter your website URL</h1>
            <p className="text-muted-foreground">Add the link you want to share</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website-url">Website URL *</Label>
              <Input 
                id="website-url" 
                placeholder="https://example.com"
                className="text-lg h-12"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                placeholder="Enter a title for your QR code"
                className="h-12"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleGenerateQR} 
              className="rounded-2xl px-8 py-6 text-lg mt-6 w-full"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate QR"}
            </Button>


            {error && <p className="text-red-500 mt-2">{error}</p>}


            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter a description (optional)"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-center">Preview</h3>
        </div>
        <div className="relative">
          <img 
            src="/iphone15.png" 
            alt="iPhone 15 Mockup" 
            className="w-72 h-auto object-contain"
          />
          {/* QR Code overlay on phone screen */}
          {generatedQR && (
            <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <img 
                src={generatedQR.qr_image} 
                alt="Generated QR" 
                className="rounded-lg shadow-md"
                style={{ maxWidth: '180px', height: 'auto' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-8xl bg-neutral-100">
      {renderStepIndicator()}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
    </div>
  )
}

export default NewQR