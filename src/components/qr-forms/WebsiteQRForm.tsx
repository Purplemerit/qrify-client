import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, ChevronDown } from "lucide-react";

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

  // Collapsible sections state - all collapsed by default
  const [isQRNameExpanded, setIsQRNameExpanded] = useState(false);
  const [isBasicInfoExpanded, setIsBasicInfoExpanded] = useState(false);
  const [isTimeSchedulingExpanded, setIsTimeSchedulingExpanded] = useState(false);

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
        <CardHeader
          className="cursor-pointer select-none hover:bg-muted/50 transition-colors"
          onClick={() => setIsQRNameExpanded(!isQRNameExpanded)}
        >
          <div className="flex items-center justify-between">
            <p className="text-base leading-7 font-semibold m-0">QR Code Name</p>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                isQRNameExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </CardHeader>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isQRNameExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <CardContent className="pt-0">
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
        </div>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader
          className="cursor-pointer select-none hover:bg-muted/50 transition-colors"
          onClick={() => setIsBasicInfoExpanded(!isBasicInfoExpanded)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base leading-7 font-semibold m-0">Basic Information</p>
              <p className="text-sm text-muted-foreground">
                Add essential information
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                isBasicInfoExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </CardHeader>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isBasicInfoExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <CardContent className="space-y-4 pt-0">
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
        </div>
      </Card>

      {/* Time Scheduling */}
      <Card>
        <CardHeader
          className="cursor-pointer select-none hover:bg-muted/50 transition-colors"
          onClick={() => setIsTimeSchedulingExpanded(!isTimeSchedulingExpanded)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base leading-7 font-semibold m-0">Time Scheduling</p>
              <p className="text-sm text-muted-foreground">
                Create time ranges for your business and apply them to your products
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                isTimeSchedulingExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </CardHeader>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isTimeSchedulingExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <CardContent className="pt-0">
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
        </div>
      </Card>
    </div>
  );
};

export default WebsiteQRForm;
