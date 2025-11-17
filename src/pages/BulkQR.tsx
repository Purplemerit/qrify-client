import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QRDesignComponent from "@/components/QRDesignComponent";
import api from "@/lib/api";
import {
  Globe,
  Upload,
  Download,
  FileText,
  CheckCircle,
  X,
  Plus,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  type QRDesignOptions,
  renderQRWithDesign,
} from "@/lib/qr-design-utils";

interface BulkQRResult {
  id: string;
  url: string;
  title: string;
  qrCode: string;
  status: "success" | "error";
  error?: string;
}

interface QRCodeData {
  id: string;
  title: string;
  name?: string;
  type: string;
  status: "Active" | "Inactive";
  data: string;
  scans: number;
  created_at: string;
  slug: string;
  dynamic: boolean;
  designOptions?: QRDesignOptions | null;
  bulk?: boolean;
}

const BulkQR = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedQRType, setSelectedQRType] = useState("Website");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvUrls, setCsvUrls] = useState<string[]>([]);
  const [qrDesignOptions, setQrDesignOptions] = useState<QRDesignOptions>({
    frame: 1,
    shape: 1,
    logo: 0,
    level: 2,
    dotStyle: 1,
    bgColor: "#ffffff",
    outerBorder: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bulkResults, setBulkResults] = useState<BulkQRResult[]>([]);
  const [generatedQRs, setGeneratedQRs] = useState<QRCodeData[]>([]);

  const handleQRTypeSelect = (typeName: string) => {
    setSelectedQRType(typeName);
    setCurrentStep(2);
  };

  const parseCsvFile = (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter((line) => line.trim());
        const urls = lines
          .map((line) => {
            // Handle CSV with multiple columns - take first column as URL
            const columns = line.split(",");
            let url = columns[0].trim().replace(/^"|"$/g, ""); // Remove quotes if present

            // Add protocol if missing
            if (
              url &&
              !url.startsWith("http://") &&
              !url.startsWith("https://")
            ) {
              url = "https://" + url;
            }

            return url;
          })
          .filter((url) => {
            // Basic URL validation - check if it contains a domain
            return url && url.includes(".") && url.length > 4;
          });

        console.log("All lines:", lines);
        console.log("Parsed URLs:", urls);
        resolve(urls);
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }

    setCsvFile(file);
    try {
      const urls = await parseCsvFile(file);
      console.log("Parsed URLs:", urls); // Debug log
      console.log("Setting csvUrls state with:", urls.length, "URLs");
      setCsvUrls(urls);
      setError("");
    } catch (err) {
      setError("Failed to parse CSV file");
      console.error("CSV parsing error:", err);
    }
  };

  const handleGenerateBulkQR = async () => {
    if (csvUrls.length === 0) {
      setError("Please upload a CSV file with URLs");
      return;
    }

    setLoading(true);
    setError("");
    const results: BulkQRResult[] = [];
    const qrCodes: QRCodeData[] = [];

    try {
      for (let i = 0; i < csvUrls.length; i++) {
        const url = csvUrls[i];
        try {
          // Create QR code
          const response = await api.post("/qr/url", {
            name: `Bulk QR ${i + 1} - ${url}`,
            url: url,
            dynamic: true,
            designOptions: qrDesignOptions,
            bulk: true, // Mark as bulk QR
          });

          const createdQr = response.data;

          // Get the QR image
          const imageResponse = await api.get(`/qr/${createdQr.id}/image`);
          const imageData = imageResponse.data;

          const result: BulkQRResult = {
            id: createdQr.id,
            url: url,
            title: `Bulk QR ${i + 1}`,
            qrCode: imageData.image,
            status: "success",
          };

          results.push(result);
          qrCodes.push(createdQr);
        } catch (err) {
          results.push({
            id: `error-${i}`,
            url: url,
            title: `Bulk QR ${i + 1}`,
            qrCode: "",
            status: "error",
            error: "Failed to generate QR code",
          });
        }
      }

      setBulkResults(results);
      setGeneratedQRs(qrCodes);
      setCurrentStep(4);
    } catch (err) {
      console.error("Bulk QR generation failed:", err);
      setError("Failed to generate bulk QR codes");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteAndNavigate = () => {
    // Navigate to My QR Codes page
    navigate("/my-qr-codes");
  };

  const handleStepClick = (step: number) => {
    if (step === 1) {
      setCurrentStep(step);
    } else if (step === 2 && selectedQRType) {
      setCurrentStep(step);
    } else if (step === 3 && selectedQRType) {
      setCurrentStep(step);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-12 px-10">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8 mt-8">
        <div className="flex items-center space-x-4 relative">
          {/* Step 1 */}
          <div
            className="flex items-center space-x-3 cursor-pointer transition-all duration-300"
            onClick={() => handleStepClick(1)}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                currentStep === 1
                  ? "bg-primary text-primary-foreground shadow-lg scale-110"
                  : currentStep > 1
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 1 ? "✓" : "1"}
            </div>
            <span
              className={`text-sm transition-all duration-300 ${
                currentStep >= 1
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              QR Type
            </span>
          </div>

          {/* Line */}
          <div
            className={`h-px w-16 transition-colors duration-500 ${
              currentStep > 1 ? "bg-green-500" : "bg-muted"
            }`}
          ></div>

          {/* Step 2 */}
          <div
            className="flex items-center space-x-3 cursor-pointer transition-all duration-300"
            onClick={() => handleStepClick(2)}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                currentStep === 2
                  ? "bg-primary text-primary-foreground shadow-lg scale-110"
                  : currentStep > 2
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 2 ? "✓" : "2"}
            </div>
            <span
              className={`text-sm transition-all duration-300 ${
                currentStep >= 2
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Design
            </span>
          </div>

          {/* Line */}
          <div
            className={`h-px w-16 transition-colors duration-500 ${
              currentStep > 2 ? "bg-green-500" : "bg-muted"
            }`}
          ></div>

          {/* Step 3 */}
          <div
            className="flex items-center space-x-3 cursor-pointer transition-all duration-300"
            onClick={() => handleStepClick(3)}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                currentStep === 3
                  ? "bg-primary text-primary-foreground shadow-lg scale-110"
                  : currentStep > 3
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 3 ? "✓" : "3"}
            </div>
            <span
              className={`text-sm transition-all duration-300 ${
                currentStep >= 3
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Upload CSV
            </span>
          </div>

          {/* Line */}
          <div
            className={`h-px w-16 transition-colors duration-500 ${
              currentStep > 3 ? "bg-green-500" : "bg-muted"
            }`}
          ></div>

          {/* Step 4 */}
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                currentStep === 4
                  ? "bg-primary text-primary-foreground shadow-lg scale-110"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              4
            </div>
            <span
              className={`text-sm transition-all duration-300 ${
                currentStep === 4
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Results
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center">
        {currentStep === 2 && (
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="px-8 rounded-3xl"
            >
              ← Back
            </Button>
            <Button
              onClick={() => setCurrentStep(3)}
              className="px-8 rounded-3xl"
            >
              Next →
            </Button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(2)}
              className="px-8 rounded-3xl"
            >
              ← Back
            </Button>
            <Button
              onClick={handleGenerateBulkQR}
              disabled={csvUrls.length === 0 || loading}
              className="px-8 rounded-3xl"
            >
              {loading
                ? "Generating..."
                : csvUrls.length > 0
                ? `Generate ${csvUrls.length} QR Codes`
                : "Generate QR Codes"}
            </Button>
          </div>
        )}

        {currentStep === 4 && (
          <Button
            onClick={handleCompleteAndNavigate}
            className="px-8 rounded-3xl"
          >
            View All QR Codes
          </Button>
        )}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="flex gap-12 w-full px-10 justify-between">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl">
        {/* Bulk QRs Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold">Bulk QR Codes</h1>
            <Badge variant="secondary" className="bg-blue-300 text-black pt-2">
              BATCH GENERATION
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Generate multiple QR codes at once from a CSV file
          </p>
        </div>

        {/* Website QR Type Card */}
        <div className="grid grid-cols-1 gap-4">
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20 py-2 rounded-2xl"
            onClick={() => handleQRTypeSelect("Website")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Website</h3>
                  <p className="text-muted-foreground text-sm">
                    Generate QR codes for multiple URLs from CSV
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit ml-8 w-80">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-center">Bulk QR Preview</h3>
          <p className="text-sm text-gray-500 text-center">
            Upload CSV to generate multiple QRs
          </p>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain drop-shadow-lg"
          />
          {/* Phone content overlay */}
          <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 w-[250px] h-[450px] rounded-[35px] overflow-hidden bg-white">
            <div className="p-4 h-full flex flex-col items-center justify-center space-y-4">
              <Upload className="w-12 h-12 text-gray-400" />
              <p className="text-xs text-gray-500 text-center">
                CSV with URLs will generate multiple QR codes
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center"
                  >
                    <QRCodeSVG value={`https://example${i}.com`} size={40} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="flex gap-12 w-full px-10 justify-between">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Customize QR Design</h1>
            <p className="text-muted-foreground">
              Choose the design options that will be applied to all QR codes
            </p>
          </div>

          {/* QR Design Component */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <QRDesignComponent
              qrImage="https://example.com"
              options={qrDesignOptions}
              onOptionsChange={setQrDesignOptions}
              showPreview={false}
            />
          </div>
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit ml-8 w-80">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-center">Design Preview</h3>
          <p className="text-sm text-gray-500 text-center">
            This design will apply to all QRs
          </p>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain drop-shadow-lg"
          />
          {/* Phone content overlay */}
          <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 w-[250px] h-[450px] rounded-[35px] overflow-hidden bg-white">
            <div className="p-4 h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 mb-3">
                {renderQRWithDesign("https://example.com", qrDesignOptions, {
                  width: 50,
                  height: 50,
                })}
              </div>
              <p className="text-xs text-gray-500 text-center px-2">
                Preview of your bulk QR design
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="flex gap-12 w-full px-10 justify-between">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Upload CSV File</h1>
            <p className="text-muted-foreground">
              Upload a CSV file with URLs in the first column
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csv-file">CSV File *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="text-lg h-12 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {csvFile && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {csvFile.name}
                  </Badge>
                )}
              </div>
              {csvUrls.length > 0 && (
                <p className="text-sm text-green-600">
                  ✓ Found {csvUrls.length} valid URLs - Ready to generate!
                </p>
              )}
              {csvFile && csvUrls.length === 0 && (
                <p className="text-sm text-amber-600">
                  ⚠ No valid URLs found in CSV file. Please check the format.
                </p>
              )}
            </div>

            {/* CSV Format Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                CSV Format Requirements
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• URLs should be in the first column</li>
                <li>
                  • Can include or omit http:// or https:// (will be added
                  automatically)
                </li>
                <li>• Examples: example.com, google.com, https://github.com</li>
                <li>• One URL per line</li>
              </ul>
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const csvContent =
                      "google.com\nexample.com\ngithub.com\nstackoverflow.com";
                    const blob = new Blob([csvContent], { type: "text/csv" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "sample-urls.csv";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download Sample CSV
                </Button>
              </div>
            </div>

            {/* Preview URLs */}
            {csvUrls.length > 0 && (
              <div className="space-y-2">
                <Label>URLs Preview ({csvUrls.length} total)</Label>
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-1">
                  {csvUrls.slice(0, 10).map((url, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      {index + 1}. {url}
                    </div>
                  ))}
                  {csvUrls.length > 10 && (
                    <div className="text-sm text-gray-500 italic">
                      ...and {csvUrls.length - 10} more URLs
                    </div>
                  )}
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 flex items-center gap-2">
                  <X className="w-4 h-4" />
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit ml-8 w-80">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-center">Bulk Generation</h3>
          <p className="text-sm text-gray-500 text-center">
            Ready to generate QR codes
          </p>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain drop-shadow-lg"
          />
          {/* Phone content overlay */}
          <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 w-[250px] h-[450px] rounded-[35px] overflow-hidden bg-white">
            <div className="p-4 h-full overflow-y-auto">
              <div className="space-y-3">
                {csvUrls.slice(0, 6).map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded flex items-center justify-center">
                      {renderQRWithDesign(url, qrDesignOptions, {
                        width: 30,
                        height: 30,
                      })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        Bulk QR {index + 1}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{url}</p>
                    </div>
                  </div>
                ))}
                {csvUrls.length > 6 && (
                  <div className="text-xs text-gray-500 text-center italic">
                    +{csvUrls.length - 6} more
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="flex gap-12 w-full px-10 justify-between">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              Bulk QR Generation Results
            </h1>
            <p className="text-muted-foreground">
              {bulkResults.filter((r) => r.status === "success").length} of{" "}
              {bulkResults.length} QR codes generated successfully
            </p>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {bulkResults.map((result, index) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center bg-gray-50">
                    {result.status === "success" ? (
                      result.qrCode ? (
                        <img
                          src={result.qrCode}
                          alt="QR Code"
                          className="w-10 h-10"
                        />
                      ) : (
                        <QRCodeSVG value={result.url} size={40} />
                      )
                    ) : (
                      <X className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {result.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {result.url}
                    </p>
                    {result.error && (
                      <p className="text-sm text-red-500">{result.error}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {result.status === "success" ? (
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Success
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <X className="w-3 h-3 mr-1" />
                      Failed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit ml-8 w-80">
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-center">Completed!</h1>
          <p className="text-sm text-gray-500 text-center">
            Your bulk QR codes are ready
          </p>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain drop-shadow-lg"
          />
          {/* Phone content overlay */}
          <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 w-[250px] h-[450px] rounded-[35px] overflow-hidden bg-white">
            <div className="p-4 h-full flex flex-col items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <p className="text-lg font-semibold text-center mb-2">
                {bulkResults.filter((r) => r.status === "success").length} QR
                Codes
              </p>
              <p className="text-sm text-gray-500 text-center mb-4">
                Generated Successfully
              </p>
              <Button onClick={handleCompleteAndNavigate} className="w-full">
                View All QR Codes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-8xl mx-auto py-8">
        {renderStepIndicator()}
        <div className="transition-all duration-700 ease-in-out">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>
      </div>
    </div>
  );
};

export default BulkQR;
