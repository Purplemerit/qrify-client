import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SocialMediaQRFormProps {
  onGenerate: (data: any) => void
}

const SocialMediaQRForm = ({ onGenerate }: SocialMediaQRFormProps) => {
  const [qrName, setQrName] = useState("")

  // Time Scheduling
  const [enableTimeRanges, setEnableTimeRanges] = useState(false)

  // Basic Information
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [twitter, setTwitter] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [youtube, setYoutube] = useState("")
  const [tiktok, setTiktok] = useState("")
  const [snapchat, setSnapchat] = useState("")
  const [pinterest, setPinterest] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  // Content
  const [welcomeScreen, setWelcomeScreen] = useState("")
  const [welcomeImage, setWelcomeImage] = useState<File | null>(null)
  const [duration, setDuration] = useState(3)

  // Stats - Schedule
  const [activateSchedule, setActivateSchedule] = useState(false)
  const [sinceDate, setSinceDate] = useState("")
  const [untilDate, setUntilDate] = useState("")

  // URL Configuration
  const [autoGenerate, setAutoGenerate] = useState(true)
  const [uri, setUri] = useState("")

  // Scan Limit
  const [enableScanLimit, setEnableScanLimit] = useState(false)
  const [scanLimit, setScanLimit] = useState("")

  // Configuration
  const [folder, setFolder] = useState("")
  const [domain, setDomain] = useState("")
  const [password, setPassword] = useState("")

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0])
    }
  }

  const handleWelcomeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setWelcomeImage(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    const data = {
      qrName,
      timeScheduling: {
        enableTimeRanges
      },
      basicInformation: {
        title,
        description,
        profileImage,
        socialLinks: {
          facebook,
          instagram,
          twitter,
          linkedin,
          youtube,
          tiktok,
          snapchat,
          pinterest,
          whatsapp
        }
      },
      content: {
        welcomeScreen,
        welcomeImage,
        duration
      },
      stats: {
        schedule: {
          activateSchedule,
          sinceDate: activateSchedule ? sinceDate : null,
          untilDate: activateSchedule ? untilDate : null
        }
      },
      urlConfiguration: {
        autoGenerate,
        uri: autoGenerate ? "" : uri
      },
      scanLimit: {
        enableScanLimit,
        limit: enableScanLimit ? scanLimit : null
      },
      configuration: {
        folder,
        domain,
        password
      }
    }
    onGenerate(data)
  }

  return (
    <div className="space-y-6">
      {/* QR Name */}
      <Card>
        <CardHeader>
          <CardTitle>QR Code Name</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="qr-name">Name *</Label>
            <Input
              id="qr-name"
              placeholder="Enter QR code name"
              value={qrName}
              onChange={(e) => setQrName(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Time Scheduling */}
      <Card>
        <CardHeader>
          <CardTitle>Time Scheduling</CardTitle>
          <p className="text-sm text-muted-foreground">
            Create time ranges for your business and apply them to your products
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enable-time-ranges"
              checked={enableTimeRanges}
              onChange={(e) => setEnableTimeRanges(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="enable-time-ranges">Enable time ranges</Label>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add your social media profiles
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="My Social Media"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Follow me on social media"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-image">Profile Image</Label>
            <Input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
            {profileImage && <p className="text-sm text-muted-foreground">Selected: {profileImage.name}</p>}
          </div>

          <div className="space-y-3 mt-6">
            <Label>Social Media Links</Label>
            <Input
              placeholder="Facebook URL"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
            <Input
              placeholder="Instagram URL"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
            <Input
              placeholder="Twitter/X URL"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
            <Input
              placeholder="LinkedIn URL"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
            <Input
              placeholder="YouTube URL"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
            />
            <Input
              placeholder="TikTok URL"
              value={tiktok}
              onChange={(e) => setTiktok(e.target.value)}
            />
            <Input
              placeholder="Snapchat URL"
              value={snapchat}
              onChange={(e) => setSnapchat(e.target.value)}
            />
            <Input
              placeholder="Pinterest URL"
              value={pinterest}
              onChange={(e) => setPinterest(e.target.value)}
            />
            <Input
              placeholder="WhatsApp Number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
          <p className="text-sm text-muted-foreground">
            All the details about your QR
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="welcome-screen">Welcome Screen</Label>
            <Textarea
              id="welcome-screen"
              placeholder="Enter welcome message"
              rows={3}
              value={welcomeScreen}
              onChange={(e) => setWelcomeScreen(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcome-image">Image</Label>
            <Input
              id="welcome-image"
              type="file"
              accept="image/*"
              onChange={handleWelcomeImageChange}
            />
            {welcomeImage && <p className="text-sm text-muted-foreground">Selected: {welcomeImage.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Time (seconds): {duration}s</Label>
            <input
              id="duration"
              type="range"
              min="1"
              max="10"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1s</span>
              <span>10s</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
          <p className="text-sm text-muted-foreground">
            Key tools and data to evaluate performance
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-2 block">Schedule a date</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Set the dates on which your content will be shown through the QR. At the end of that period, it will be disabled.
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="activate-schedule"
                checked={activateSchedule}
                onChange={(e) => setActivateSchedule(e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="activate-schedule">Activate the schedule to work during certain dates</Label>
            </div>

            {activateSchedule && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="since-date">Since</Label>
                  <Input
                    id="since-date"
                    type="date"
                    value={sinceDate}
                    onChange={(e) => setSinceDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="until-date">Until</Label>
                  <Input
                    id="until-date"
                    type="date"
                    value={untilDate}
                    onChange={(e) => setUntilDate(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* URL Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>URL Configuration</CardTitle>
          <p className="text-sm text-muted-foreground">
            Customize your qrfy.com address identifier
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="auto-generate"
              checked={autoGenerate}
              onChange={(e) => setAutoGenerate(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="auto-generate">Auto generate</Label>
          </div>

          {!autoGenerate && (
            <div className="space-y-2">
              <Label htmlFor="uri">URI</Label>
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">qrfy.com/</span>
                <Input
                  id="uri"
                  placeholder="custom-identifier"
                  value={uri}
                  onChange={(e) => setUri(e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Limit */}
      <Card>
        <CardHeader>
          <CardTitle>Scan Limit</CardTitle>
          <p className="text-sm text-muted-foreground">
            Limit the number of times your QR can be scanned in total
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enable-scan-limit"
              checked={enableScanLimit}
              onChange={(e) => setEnableScanLimit(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="enable-scan-limit">Enable scan limit</Label>
          </div>

          {enableScanLimit && (
            <div className="space-y-2">
              <Label htmlFor="scan-limit-value">Maximum scans</Label>
              <Input
                id="scan-limit-value"
                type="number"
                placeholder="e.g., 1000"
                value={scanLimit}
                onChange={(e) => setScanLimit(e.target.value)}
                min="1"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <p className="text-sm text-muted-foreground">
            Customized settings to optimize your experience
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folder">Folder</Label>
            <Input
              id="folder"
              placeholder="Select or create a folder"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <Input
              id="domain"
              placeholder="Select a custom domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Set a password to protect your QR"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        className="w-full rounded-2xl px-8 py-6 text-lg"
      >
        Generate QR Code
      </Button>
    </div>
  )
}

export default SocialMediaQRForm
