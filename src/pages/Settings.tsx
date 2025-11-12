import { useState, useEffect } from "react";
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
import { authService } from "../services/auth";

const Settings = () => {
  // User data state
  const [user, setUser] = useState<{ email: string; emailVerified: boolean } | null>(null);

  // Change password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Change email state
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState(false);

  useEffect(() => {
    // Load current user data
    const loadUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    loadUser();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords don't match!");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setPasswordLoading(true);

    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
      });
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      // Clear success message after 3 seconds
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setPasswordError(error.response?.data?.error || "Failed to change password");
      } else {
        setPasswordError("An unexpected error occurred");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setEmailSuccess(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setEmailError("Invalid email format");
      return;
    }

    setEmailLoading(true);

    try {
      await authService.changeEmail({
        newEmail,
        password: emailPassword,
      });
      setEmailSuccess(true);
      setNewEmail("");
      setEmailPassword("");

      // Clear success message after 5 seconds
      setTimeout(() => setEmailSuccess(false), 5000);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setEmailError(error.response?.data?.error || "Failed to change email");
      } else {
        setEmailError("An unexpected error occurred");
      }
    } finally {
      setEmailLoading(false);
    }
  };

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
                <form onSubmit={handleChangeEmail} className="space-y-4">
                  <div className="space-y-2 py-6">
                    <Label htmlFor="current-email">Current Email</Label>
                    <Input
                      id="current-email"
                      type="email"
                      value={user?.email || ""}
                      className="w-full h-14 bg-gray-50"
                      disabled
                    />
                    {user && !user.emailVerified && (
                      <p className="text-sm text-yellow-600">Email not verified</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-email">New Email</Label>
                    <Input
                      id="new-email"
                      type="email"
                      placeholder="Enter new email address"
                      className="w-full h-14"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      disabled={emailLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-password">Current Password</Label>
                    <Input
                      id="email-password"
                      type="password"
                      placeholder="Enter your current password"
                      className="w-full h-14"
                      value={emailPassword}
                      onChange={(e) => setEmailPassword(e.target.value)}
                      disabled={emailLoading}
                    />
                    <p className="text-xs text-gray-500">
                      Enter your password to confirm email change
                    </p>
                  </div>
                  {emailError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{emailError}</p>
                    </div>
                  )}
                  {emailSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-600">
                        Verification email sent to your new email address. Please check your inbox.
                      </p>
                    </div>
                  )}
                  <Button type="submit" disabled={emailLoading || !newEmail || !emailPassword}>
                    {emailLoading ? "Sending..." : "Change Email"}
                  </Button>
                </form>
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
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter current password"
                      className="w-full h-14"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={passwordLoading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password (min. 8 characters)"
                      className="w-full h-14"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={passwordLoading}
                      minLength={8}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full h-14"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      disabled={passwordLoading}
                      required
                    />
                  </div>
                  {passwordError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{passwordError}</p>
                    </div>
                  )}
                  {passwordSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-600">Password changed successfully!</p>
                    </div>
                  )}
                  <Button type="submit" disabled={passwordLoading}>
                    {passwordLoading ? "Changing..." : "Change Password"}
                  </Button>
                </form>
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
