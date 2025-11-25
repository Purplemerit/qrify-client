import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authService } from "../services/auth";

const Settings = () => {
  // User data state
  const [user, setUser] = useState<{
    email: string;
    emailVerified: boolean;
    language?: string;
    dateFormat?: string;
    timeFormat?: string;
  } | null>(null);

  // Change password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Settings state
  const [language, setLanguage] = useState("en");
  const [dateFormat, setDateFormat] = useState("dd/mm/yyyy");
  const [timeFormat, setTimeFormat] = useState("24");
  const [preferencesLoading, setPreferencesLoading] = useState(false);
  const [preferencesError, setPreferencesError] = useState<string | null>(null);
  const [preferencesSuccess, setPreferencesSuccess] = useState(false);

  // Account deletion state
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    // Load current user data
    const loadUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        setUser(response.user);

        // Set preferences from user data
        if (response.user.language) setLanguage(response.user.language);
        if (response.user.dateFormat) setDateFormat(response.user.dateFormat);
        if (response.user.timeFormat) setTimeFormat(response.user.timeFormat);
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
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setPasswordError(
          error.response?.data?.error || "Failed to change password"
        );
      } else {
        setPasswordError("An unexpected error occurred");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setPreferencesError(null);
    setPreferencesSuccess(false);
    setPreferencesLoading(true);

    try {
      const response = await authService.updatePreferences({
        language,
        dateFormat,
        timeFormat,
      });

      setPreferencesSuccess(true);
      setUser(response.user);

      // Clear success message after 3 seconds
      setTimeout(() => setPreferencesSuccess(false), 3000);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setPreferencesError(
          error.response?.data?.error || "Failed to save preferences"
        );
      } else {
        setPreferencesError("An unexpected error occurred");
      }
    } finally {
      setPreferencesLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError("Password is required");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeleteError(null);
    setDeleteLoading(true);

    try {
      await authService.deleteAccount({ password: deletePassword });

      // Redirect to home page after successful deletion
      window.location.href = "/";
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setDeleteError(
          error.response?.data?.error || "Failed to delete account"
        );
      } else {
        setDeleteError("An unexpected error occurred");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-4 md:py-6 space-y-6 md:space-y-8">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Settings</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        {/* Current Email Information */}
        <Card>
          <div className="flex flex-col lg:flex-row">
            <CardHeader className="lg:w-1/3 xl:w-1/4">
              <CardTitle>Current Email</CardTitle>
              <CardDescription>Your registered email address</CardDescription>
            </CardHeader>
            <CardContent className="lg:w-2/3 xl:w-3/4">
              <div className="space-y-2 py-6">
                <Label htmlFor="current-email">Email Address</Label>
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
            </CardContent>
          </div>
        </Card>

        {/* Change Password */}
        <Card>
          <div className="flex flex-col lg:flex-row">
            <CardHeader className="lg:w-1/3 xl:w-1/4">
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure. Use a unique
                and strong password.
              </CardDescription>
            </CardHeader>
            <CardContent className="lg:w-2/3 xl:w-3/4 space-y-4">
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
                    <p className="text-sm text-green-600">
                      Password changed successfully!
                    </p>
                  </div>
                )}
                <Button type="submit" disabled={passwordLoading}>
                  {passwordLoading ? "Changing..." : "Change Password"}
                </Button>
              </form>
            </CardContent>
          </div>
        </Card>

        {/* Language */}
        <Card>
          <div className="flex flex-col lg:flex-row">
            <CardHeader className="lg:w-1/3 xl:w-1/4">
              <CardTitle>Language</CardTitle>
              <CardDescription>
                Select your preferred language to personalize your platform
                experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="lg:w-2/3 xl:w-3/4 space-y-4">
              <div className="space-y-2 py-6">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
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
          <div className="flex flex-col lg:flex-row">
            <CardHeader className="lg:w-1/3 xl:w-1/4">
              <CardTitle>Date and Time</CardTitle>
              <CardDescription>
                Configure the format in which you prefer to display dates and
                times.
              </CardDescription>
            </CardHeader>
            <CardContent className="lg:w-2/3 xl:w-3/4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select value={dateFormat} onValueChange={setDateFormat}>
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
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select value={timeFormat} onValueChange={setTimeFormat}>
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
              {preferencesError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{preferencesError}</p>
                </div>
              )}
              {preferencesSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600">
                    Preferences saved successfully!
                  </p>
                </div>
              )}
              <Button
                onClick={handleSavePreferences}
                disabled={preferencesLoading}
              >
                {preferencesLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardContent>
          </div>
        </Card>

        {/* Account Status */}
        <Card>
          <div className="flex flex-col lg:flex-row">
            <CardHeader className="lg:w-1/3 xl:w-1/4">
              <CardTitle>Account Status</CardTitle>
              <CardDescription>
                Delete your account and all associated information. This action
                cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent className="lg:w-2/3 xl:w-3/4 space-y-4">
              <div className="space-y-2 py-6">
                <Label htmlFor="delete-password">
                  Enter your password to confirm
                </Label>
                <Input
                  id="delete-password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-14"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  disabled={deleteLoading}
                />
              </div>
              {deleteError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{deleteError}</p>
                </div>
              )}
              <Button
                variant="destructive"
                className="w-auto h-12 px-6"
                onClick={handleDeleteAccount}
                disabled={deleteLoading || !deletePassword}
              >
                {deleteLoading ? "Deleting..." : "Delete Account"}
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
