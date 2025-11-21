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
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: '#f3f5fe' }}>
                <svg
                  focusable={false}
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.5208 8.90417 12.7125 8.7125C12.9042 8.52083 13 8.28333 13 8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <p className="text-base leading-7 font-semibold m-0">Basic Information</p>
                <p className="text-sm text-muted-foreground">
                  Add essential information
                </p>
              </div>
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
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: '#f3f5fe' }}>
                <svg
                  focusable={false}
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    d="M15.3501 16.25L16.6251 14.975L12.9001 11.25V5.99996H11.1001V12L15.3501 16.25ZM12.0001 21.6C10.6771 21.6 9.4339 21.35 8.2704 20.85C7.1069 20.35 6.08765 19.6625 5.21265 18.7875C4.33765 17.9125 3.65015 16.892 3.15015 15.726C2.65015 14.56 2.40015 13.3141 2.40015 11.9885C2.40015 10.6628 2.65015 9.41663 3.15015 8.24996C3.65015 7.0833 4.33765 6.06663 5.21265 5.19996C6.08765 4.3333 7.10815 3.64996 8.27415 3.14996C9.44015 2.64996 10.686 2.39996 12.0116 2.39996C13.3373 2.39996 14.5836 2.65196 15.7504 3.15596C16.9171 3.65996 17.932 4.34396 18.7951 5.20796C19.6581 6.07196 20.3414 7.08796 20.8449 8.25596C21.3484 9.42396 21.6001 10.672 21.6001 12C21.6001 13.323 21.3501 14.5662 20.8501 15.7297C20.3501 16.8932 19.6668 17.9125 18.8001 18.7875C17.9335 19.6625 16.9157 20.35 15.7469 20.85C14.5781 21.35 13.3291 21.6 12.0001 21.6ZM12.0121 19.8C14.17 19.8 16.0075 19.0375 17.5246 17.5125C19.0416 15.9875 19.8001 14.146 19.8001 11.988C19.8001 9.83013 19.0416 7.99263 17.5246 6.47546C16.0075 4.95846 14.17 4.19996 12.0121 4.19996C9.85415 4.19996 8.01265 4.95846 6.48765 6.47546C4.96265 7.99263 4.20015 9.83013 4.20015 11.988C4.20015 14.146 4.96265 15.9875 6.48765 17.5125C8.01265 19.0375 9.85415 19.8 12.0121 19.8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <p className="text-base leading-7 font-semibold m-0">Time Scheduling</p>
                <p className="text-sm text-muted-foreground">
                  Create time ranges for your business and apply them to your products
                </p>
              </div>
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
