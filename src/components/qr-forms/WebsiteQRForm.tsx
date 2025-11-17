import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

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
    </div>
  );
};

export default WebsiteQRForm;
