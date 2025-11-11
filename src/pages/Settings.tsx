import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Settings = () => {
  return (
    <div className="max-w-7xl transform scale-[1.1] origin-top-left space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General information</TabsTrigger>
          <TabsTrigger value="tax">Tax information</TabsTrigger>
          <TabsTrigger value="analytics">Tracking Analytics</TabsTrigger>
          <TabsTrigger value="api">API key</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <p className="text-sm text-muted-foreground mt-1">
          Modified on July 29, 2025
        </p>

        <TabsContent value="general" className="space-y-6">
          {/* Contact Information */}
          <Card>
            <div className="flex">
              <CardHeader className="w-1/4">
                <CardTitle>Contact information</CardTitle>
                <CardDescription>
                  Manage and update your personal information easily
                </CardDescription>
              </CardHeader>
              <CardContent className="w-3/4 space-y-4">
                <div className="space-y-2 py-6">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" className="w-full h-14" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input id="surname" placeholder="Enter your surname" className="w-full h-14" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="w-full h-14" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Telephone</Label>
                  <Input id="telephone" type="tel" placeholder="Enter your phone number" className="w-full h-14" />
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Change Password */}
          <Card>
            <div className="flex">
              <CardHeader className="w-1/4">
                <CardTitle>Change password</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure. It is recommended to use a unique and strong password.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-3/4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter new password" className="w-full h-14" />
                </div>
                <Button>Save</Button>
              </CardContent>
            </div>
          </Card>

          {/* 2FA */}
          <Card>
            <div className="flex">
              <CardHeader className="w-1/4">
                <CardTitle>2-factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account by enabling two-factor authentication (2FA).
                </CardDescription>
              </CardHeader>
              <CardContent className="w-3/4 mt-20">
                <Button>Activate</Button>
              </CardContent>
            </div>
          </Card>

          {/* Language */}
          <Card>
            <div className="flex">
              <CardHeader className="w-1/4">
                <CardTitle>Language</CardTitle>
                <CardDescription>
                  Select your preferred language to personalize your platform experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-3/4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select>
                    <SelectTrigger className="w-full h-14">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Date and Time */}
          <Card>
            <div className="flex">
              <CardHeader className="w-1/4">
                <CardTitle>Date and time</CardTitle>
                <CardDescription>
                  Configure the format in which you prefer to display dates and times on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-3/4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date format</Label>
                    <Select>
                      <SelectTrigger className="w-full h-14">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-format">Hours format</Label>
                    <Select>
                      <SelectTrigger className="w-full h-14">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 hour</SelectItem>
                        <SelectItem value="24">24 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button>Save</Button>
              </CardContent>
            </div>
          </Card>

          {/* Thousands Separator */}
          <Card>
            <div className="flex">
              <CardHeader className="w-1/4">
                <CardTitle>Thousands</CardTitle>
              </CardHeader>
              <CardContent className="w-3/4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="separator">Separator</Label>
                  <Select>
                    <SelectTrigger className="w-full h-14">
                      <SelectValue placeholder="Select separator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comma">,</SelectItem>
                      <SelectItem value="dot">.</SelectItem>
                      <SelectItem value="space"> </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save</Button>
              </CardContent>
            </div>
          </Card>

          {/* Account Status */}
          <Card>
            <div className="flex">
              <CardHeader className="w-1/4">
                <CardTitle>Account Status</CardTitle>
                <CardDescription>Delete my account and all the information it contains.</CardDescription>
              </CardHeader>
                <CardContent className="w-3/4 mt-20">
                <Button className="w-16 h-12">Delete</Button>
              </CardContent>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tax">
          <Card>
            <div className="flex">
              <CardHeader className="w-1/4">
                <CardTitle>Invoicing</CardTitle>
                <CardDescription>
                  Please complete your tax information to ensure your invoices are generated correctly
                </CardDescription>
              </CardHeader>
              <CardContent className="w-3/4 space-y-4">
                <Label>Type</Label>
                <TabsList className="grid w-30 grid-cols-2">
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="private">Private</TabsTrigger>
                </TabsList>
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input id="companyName" className="w-full h-12" />
                  <Label>Country</Label>
                  <Input id="country" className="w-full h-12" />
                  <Label>Tax ID</Label>
                  <Input id="tax" className="w-full h-12" />
                  <Label>Name</Label>
                  <Input id="name" className="w-full h-12" />
                  <Label>Surname</Label>
                  <Input id="sname" className="w-full h-12" />
                  <Label>Address</Label>
                  <Input id="address" className="w-full h-12" />
                  <Label>Postal Code</Label>
                  <Input id="post" className="w-full h-12" />
                  <Label>City</Label>
                  <Input id="city" className="w-full h-12" />
                  <Label>Email</Label>
                  <Input id="email" className="w-full h-12" />
                </div>
                <Button className="w-20 h-12">Save</Button>
              </CardContent>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <div className="flex">
              <CardHeader className="w-1/4">
                <CardTitle>Tracking Analytics</CardTitle>
                <CardDescription>
                  Integrate analytics tools to effectively track performance and interactions with your QRs.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-3/4 space-y-4">
                <Label>Google Analytics 4 Tracking ID</Label>
                <Input id="analytics" className="w-full h-12" placeholder="G-XXXXXXXX" />
                <Label>Facebook Pixel ID</Label>
                <Input id="facebookPixel" className="w-full h-12" />
                <Label>Google Tag Manager ID</Label>
                <Input id="gtm" className="w-full h-12" placeholder="GTM-XXXXXXXX" />
              </CardContent>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <div className="flex">
              <CardHeader className="w-1/4">
                <CardTitle>API Key</CardTitle>
                <CardDescription>Manage your API keys for external integrations.</CardDescription>
              </CardHeader>
              <CardContent className="w-3/4 mt-20">
                <Button>Generate API Key</Button>
              </CardContent>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <div className="flex">
              <CardHeader className="w-1/4">
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Set up the alerts you want to enable and receive only the information you want.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-3/4 mt-20">
                <Button>Save</Button>
              </CardContent>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings
