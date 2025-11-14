import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, ChevronDown, ChevronUp } from "lucide-react";

interface LanguageField {
  id: string;
  language: string;
  url: string;
}

interface CountryField {
  id: string;
  country: string;
  websiteName: string;
}

interface WebsiteQRFormProps {
  onGenerate: (data: any) => void;
}

const WebsiteQRForm = ({ onGenerate }: WebsiteQRFormProps) => {
  const [qrName, setQrName] = useState("");

  // Time Scheduling
  const [enableTimeRanges, setEnableTimeRanges] = useState(false);

  // Basic Information
  const [multiLanguageSupport, setMultiLanguageSupport] = useState(false);
  const [multiCountrySupport, setMultiCountrySupport] = useState(false);
  const [websiteURL, setWebsiteURL] = useState("");
  const [languages, setLanguages] = useState<LanguageField[]>([]);
  const [countries, setCountries] = useState<CountryField[]>([]);

  // Stats - Schedule
  const [activateSchedule, setActivateSchedule] = useState(false);
  const [sinceDate, setSinceDate] = useState("");
  const [untilDate, setUntilDate] = useState("");

  // URL Configuration
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [uri, setUri] = useState("");

  // Scan Limit
  const [enableScanLimit, setEnableScanLimit] = useState(false);
  const [scanLimit, setScanLimit] = useState("");

  // Configuration
  const [folder, setFolder] = useState("");
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");

  // Collapsible sections state
  const [isStatsExpanded, setIsStatsExpanded] = useState(false);
  const [isConfigurationExpanded, setIsConfigurationExpanded] = useState(false);

  const addLanguage = () => {
    setLanguages([
      ...languages,
      { id: Date.now().toString(), language: "", url: "" },
    ]);
  };

  const removeLanguage = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const updateLanguage = (
    id: string,
    field: "language" | "url",
    value: string
  ) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const addCountry = () => {
    setCountries([
      ...countries,
      { id: Date.now().toString(), country: "", websiteName: "" },
    ]);
  };

  const removeCountry = (id: string) => {
    setCountries(countries.filter((country) => country.id !== id));
  };

  const updateCountry = (
    id: string,
    field: "country" | "websiteName",
    value: string
  ) => {
    setCountries(
      countries.map((country) =>
        country.id === id ? { ...country, [field]: value } : country
      )
    );
  };

  const handleSubmit = () => {
    const data = {
      qrName,
      timeScheduling: {
        enableTimeRanges,
      },
      basicInformation: {
        multiLanguageSupport,
        multiCountrySupport,
        websiteURL,
        languages: multiLanguageSupport ? languages : [],
        countries: multiCountrySupport ? countries : [],
      },
      stats: {
        schedule: {
          activateSchedule,
          sinceDate: activateSchedule ? sinceDate : null,
          untilDate: activateSchedule ? untilDate : null,
        },
      },
      urlConfiguration: {
        autoGenerate,
        uri: autoGenerate ? "" : uri,
      },
      scanLimit: {
        enableScanLimit,
        limit: enableScanLimit ? scanLimit : null,
      },
      configuration: {
        folder,
        domain,
        password,
      },
    };
    onGenerate(data);
  };

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

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add essential information
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="multi-language"
              checked={multiLanguageSupport}
              onChange={(e) => setMultiLanguageSupport(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="multi-language">Multi-Language support</Label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="multi-country"
              checked={multiCountrySupport}
              onChange={(e) => setMultiCountrySupport(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="multi-country">Multi-Country support</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website-url">Website URL *</Label>
            <Input
              id="website-url"
              placeholder="https://example.com"
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)}
            />
          </div>

          {/* Multi-Language Fields */}
          {multiLanguageSupport && (
            <div className="space-y-3 mt-4">
              <Label>Additional Languages</Label>
              {languages.map((lang) => (
                <div key={lang.id} className="flex gap-2 items-start">
                  <Input
                    placeholder="Language (e.g., Spanish)"
                    value={lang.language}
                    onChange={(e) =>
                      updateLanguage(lang.id, "language", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Input
                    placeholder="https://example.com/es"
                    value={lang.url}
                    onChange={(e) =>
                      updateLanguage(lang.id, "url", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeLanguage(lang.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addLanguage}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </div>
          )}

          {/* Multi-Country Fields */}
          {multiCountrySupport && (
            <div className="space-y-3 mt-4">
              <Label>Additional Countries</Label>
              {countries.map((country) => (
                <div key={country.id} className="flex gap-2 items-start">
                  <Input
                    placeholder="Country (e.g., France)"
                    value={country.country}
                    onChange={(e) =>
                      updateCountry(country.id, "country", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Input
                    placeholder="Website name"
                    value={country.websiteName}
                    onChange={(e) =>
                      updateCountry(country.id, "websiteName", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeCountry(country.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addCountry} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Country
              </Button>
            </div>
          )}
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

      {/* Stats */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => setIsStatsExpanded(!isStatsExpanded)}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Stats</CardTitle>
              <p className="text-sm text-muted-foreground">
                Key tools and data to evaluate performance
              </p>
            </div>
            {isStatsExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </CardHeader>
        {isStatsExpanded && (
          <CardContent className="space-y-6">
            {/* Schedule Section */}
            <div>
              <Label className="mb-2 block">Schedule a date</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Set the dates on which your content will be shown through the
                QR. At the end of that period, it will be disabled.
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="activate-schedule"
                  checked={activateSchedule}
                  onChange={(e) => setActivateSchedule(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="activate-schedule">
                  Activate the schedule to work during certain dates
                </Label>
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

            {/* URL Configuration Section */}
            <div className="border-t pt-6">
              <div className="mb-4">
                <h4 className="font-medium">URL Configuration</h4>
                <p className="text-sm text-muted-foreground">
                  Customize your qrfy.com address identifier
                </p>
              </div>
              <div className="space-y-4">
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
                      <span className="text-sm text-muted-foreground mr-2">
                        qrfy.com/
                      </span>
                      <Input
                        id="uri"
                        placeholder="custom-identifier"
                        value={uri}
                        onChange={(e) => setUri(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scan Limit Section */}
            <div className="border-t pt-6">
              <div className="mb-4">
                <h4 className="font-medium">Scan Limit</h4>
                <p className="text-sm text-muted-foreground">
                  Limit the number of times your QR can be scanned in total
                </p>
              </div>
              <div className="space-y-4">
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
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => setIsConfigurationExpanded(!isConfigurationExpanded)}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Configuration</CardTitle>
              <p className="text-sm text-muted-foreground">
                Customized settings to optimize your experience
              </p>
            </div>
            {isConfigurationExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </CardHeader>
        {isConfigurationExpanded && (
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
        )}
      </Card>
    </div>
  );
};

export default WebsiteQRForm;
