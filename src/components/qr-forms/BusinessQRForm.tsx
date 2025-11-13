import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface BusinessQRFormProps {
  onGenerate: (data: any) => void
}

const BusinessQRForm = ({ onGenerate }: BusinessQRFormProps) => {
  const [qrName, setQrName] = useState("")
  const [enableTimeRanges, setEnableTimeRanges] = useState(false)
  const [businessName, setBusinessName] = useState("")
  const [description, setDescription] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [businessLogo, setBusinessLogo] = useState<File | null>(null)
  const [businessHours, setBusinessHours] = useState("")
  const [welcomeScreen, setWelcomeScreen] = useState("")
  const [welcomeImage, setWelcomeImage] = useState<File | null>(null)
  const [duration, setDuration] = useState(3)
  const [activateSchedule, setActivateSchedule] = useState(false)
  const [sinceDate, setSinceDate] = useState("")
  const [untilDate, setUntilDate] = useState("")
  const [autoGenerate, setAutoGenerate] = useState(true)
  const [uri, setUri] = useState("")
  const [enableScanLimit, setEnableScanLimit] = useState(false)
  const [scanLimit, setScanLimit] = useState("")
  const [folder, setFolder] = useState("")
  const [domain, setDomain] = useState("")
  const [password, setPassword] = useState("")

  const handleBusinessLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setBusinessLogo(e.target.files[0])
  }

  const handleWelcomeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setWelcomeImage(e.target.files[0])
  }

  const handleSubmit = () => {
    onGenerate({
      qrName,
      timeScheduling: { enableTimeRanges },
      basicInformation: { businessName, description, phone, email, website, address, city, state, country, zipCode, businessLogo, businessHours },
      content: { welcomeScreen, welcomeImage, duration },
      stats: { schedule: { activateSchedule, sinceDate: activateSchedule ? sinceDate : null, untilDate: activateSchedule ? untilDate : null } },
      urlConfiguration: { autoGenerate, uri: autoGenerate ? "" : uri },
      scanLimit: { enableScanLimit, limit: enableScanLimit ? scanLimit : null },
      configuration: { folder, domain, password }
    })
  }

  return (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>QR Code Name</CardTitle></CardHeader><CardContent><div className="space-y-2"><Label htmlFor="qr-name">Name *</Label><Input id="qr-name" placeholder="Enter QR code name" value={qrName} onChange={(e) => setQrName(e.target.value)} /></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Time Scheduling</CardTitle><p className="text-sm text-muted-foreground">Create time ranges for your business and apply them to your products</p></CardHeader><CardContent><div className="flex items-center space-x-2"><input type="checkbox" id="enable-time-ranges" checked={enableTimeRanges} onChange={(e) => setEnableTimeRanges(e.target.checked)} className="w-4 h-4" /><Label htmlFor="enable-time-ranges">Enable time ranges</Label></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Basic Information</CardTitle><p className="text-sm text-muted-foreground">Add your business information</p></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><Label htmlFor="business-name">Business Name *</Label><Input id="business-name" placeholder="Your Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" placeholder="Business description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} /></div><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" placeholder="+1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="business@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div></div><div className="space-y-2"><Label htmlFor="website">Website</Label><Input id="website" placeholder="https://example.com" value={website} onChange={(e) => setWebsite(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="address">Address</Label><Input id="address" placeholder="Street address" value={address} onChange={(e) => setAddress(e.target.value)} /></div><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="city">City</Label><Input id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="state">State</Label><Input id="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} /></div></div><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="country">Country</Label><Input id="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="zip">ZIP Code</Label><Input id="zip" placeholder="ZIP" value={zipCode} onChange={(e) => setZipCode(e.target.value)} /></div></div><div className="space-y-2"><Label htmlFor="business-logo">Business Logo</Label><Input id="business-logo" type="file" accept="image/*" onChange={handleBusinessLogoChange} />{businessLogo && <p className="text-sm text-muted-foreground">Selected: {businessLogo.name}</p>}</div><div className="space-y-2"><Label htmlFor="business-hours">Business Hours</Label><Textarea id="business-hours" placeholder="Mon-Fri: 9AM-5PM" rows={2} value={businessHours} onChange={(e) => setBusinessHours(e.target.value)} /></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Content</CardTitle><p className="text-sm text-muted-foreground">All the details about your QR</p></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><Label htmlFor="welcome-screen">Welcome Screen</Label><Textarea id="welcome-screen" placeholder="Enter welcome message" rows={3} value={welcomeScreen} onChange={(e) => setWelcomeScreen(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="welcome-image">Image</Label><Input id="welcome-image" type="file" accept="image/*" onChange={handleWelcomeImageChange} />{welcomeImage && <p className="text-sm text-muted-foreground">Selected: {welcomeImage.name}</p>}</div><div className="space-y-2"><Label htmlFor="duration">Time (seconds): {duration}s</Label><input id="duration" type="range" min="1" max="10" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /><div className="flex justify-between text-xs text-muted-foreground"><span>1s</span><span>10s</span></div></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Stats</CardTitle><p className="text-sm text-muted-foreground">Key tools and data to evaluate performance</p></CardHeader><CardContent className="space-y-4"><div><Label className="mb-2 block">Schedule a date</Label><p className="text-sm text-muted-foreground mb-3">Set the dates on which your content will be shown through the QR. At the end of that period, it will be disabled.</p><div className="flex items-center space-x-2 mb-4"><input type="checkbox" id="activate-schedule" checked={activateSchedule} onChange={(e) => setActivateSchedule(e.target.checked)} className="w-4 h-4" /><Label htmlFor="activate-schedule">Activate the schedule to work during certain dates</Label></div>{activateSchedule && (<div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="since-date">Since</Label><Input id="since-date" type="date" value={sinceDate} onChange={(e) => setSinceDate(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="until-date">Until</Label><Input id="until-date" type="date" value={untilDate} onChange={(e) => setUntilDate(e.target.value)} /></div></div>)}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>URL Configuration</CardTitle><p className="text-sm text-muted-foreground">Customize your qrfy.com address identifier</p></CardHeader><CardContent className="space-y-4"><div className="flex items-center space-x-2"><input type="checkbox" id="auto-generate" checked={autoGenerate} onChange={(e) => setAutoGenerate(e.target.checked)} className="w-4 h-4" /><Label htmlFor="auto-generate">Auto generate</Label></div>{!autoGenerate && (<div className="space-y-2"><Label htmlFor="uri">URI</Label><div className="flex items-center"><span className="text-sm text-muted-foreground mr-2">qrfy.com/</span><Input id="uri" placeholder="custom-identifier" value={uri} onChange={(e) => setUri(e.target.value)} /></div></div>)}</CardContent></Card>
      <Card><CardHeader><CardTitle>Scan Limit</CardTitle><p className="text-sm text-muted-foreground">Limit the number of times your QR can be scanned in total</p></CardHeader><CardContent className="space-y-4"><div className="flex items-center space-x-2"><input type="checkbox" id="enable-scan-limit" checked={enableScanLimit} onChange={(e) => setEnableScanLimit(e.target.checked)} className="w-4 h-4" /><Label htmlFor="enable-scan-limit">Enable scan limit</Label></div>{enableScanLimit && (<div className="space-y-2"><Label htmlFor="scan-limit-value">Maximum scans</Label><Input id="scan-limit-value" type="number" placeholder="e.g., 1000" value={scanLimit} onChange={(e) => setScanLimit(e.target.value)} min="1" /></div>)}</CardContent></Card>
      <Card><CardHeader><CardTitle>Configuration</CardTitle><p className="text-sm text-muted-foreground">Customized settings to optimize your experience</p></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><Label htmlFor="folder">Folder</Label><Input id="folder" placeholder="Select or create a folder" value={folder} onChange={(e) => setFolder(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="domain">Domain</Label><Input id="domain" placeholder="Select a custom domain" value={domain} onChange={(e) => setDomain(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" placeholder="Set a password to protect your QR" value={password} onChange={(e) => setPassword(e.target.value)} /></div></CardContent></Card>
      <Button onClick={handleSubmit} className="w-full rounded-2xl px-8 py-6 text-lg">Generate QR Code</Button>
    </div>
  )
}

export default BusinessQRForm
