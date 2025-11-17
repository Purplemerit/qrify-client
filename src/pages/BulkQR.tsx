import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRDesignSelector from "@/components/QRDesignSelector";
import templateStorage, { type QRTemplate } from "@/lib/template-storage";
import api from "@/lib/api";
import {
  Globe,
  Upload,
  Download,
  FileText,
  CheckCircle,
  X,
  Plus,
  Check,
  Tag,
  ChevronDown,
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
  const [selectedQRType, setSelectedQRType] = useState("");
  const [isStaticQR, setIsStaticQR] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvUrls, setCsvUrls] = useState<string[]>([]);

  // Collapsible sections state
  const [isDynamicCollapsed, setIsDynamicCollapsed] = useState(false);
  const [isStaticCollapsed, setIsStaticCollapsed] = useState(false);
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

  // Templates state
  const [availableTemplates, setAvailableTemplates] = useState<QRTemplate[]>(
    []
  );
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"custom" | "templates">("custom");
  const [appliedTemplateId, setAppliedTemplateId] = useState<string | null>(
    null
  );

  // Load templates when component mounts
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setTemplatesLoading(true);
        const templates = await templateStorage.getTemplates();
        setAvailableTemplates(templates);
      } catch (error) {
        console.error("Failed to load templates:", error);
      } finally {
        setTemplatesLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const handleApplyTemplate = (template: QRTemplate) => {
    if (appliedTemplateId === template.id) {
      // Unapply template - reset to default options
      setQrDesignOptions({
        frame: 1,
        shape: 1,
        logo: 0,
        level: 2,
        dotStyle: 1,
        bgColor: "#ffffff",
        outerBorder: 1,
      });
      setAppliedTemplateId(null);
    } else {
      // Apply template
      setQrDesignOptions(template.designOptions);
      setAppliedTemplateId(template.id);
    }
    setActiveTab("custom");
  };

  const handleQRTypeSelect = (typeName: string, isStatic = false) => {
    setSelectedQRType(typeName);
    setIsStaticQR(isStatic);
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
            dynamic: !isStaticQR,
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

  const handleCompleteAndNavigate = async () => {
    if (generatedQRs.length === 0) {
      navigate("/my-qr-codes");
      return;
    }

    // For static QRs, no need to update design options - navigate directly
    if (isStaticQR) {
      navigate("/my-qr-codes");
      return;
    }

    try {
      setLoading(true);

      console.log("Updating bulk QRs with design options:", qrDesignOptions);

      // Update all generated QR codes with the applied design options
      const updatePromises = generatedQRs.map(async (qr) => {
        try {
          await api.put(`/qr/${qr.id}`, {
            designOptions: qrDesignOptions,
            status: "active",
          });
          return { id: qr.id, success: true };
        } catch (err) {
          console.error(`Failed to update QR ${qr.id}:`, err);
          return { id: qr.id, success: false };
        }
      });

      const results = await Promise.all(updatePromises);
      const failedUpdates = results.filter((result) => !result.success);

      if (failedUpdates.length > 0) {
        console.warn(
          `${failedUpdates.length} QR codes failed to update with design options`
        );
      }

      // Navigate to My QR Codes page
      navigate("/my-qr-codes");
    } catch (err) {
      console.error("Failed to complete bulk QR creation:", err);
      setError("Failed to save QR code designs");
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
            className="px-8 rounded-3xl"
          >
            {loading ? "Saving Designs..." : "Complete & View QR Codes"}
          </Button>
        )}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="flex gap-12 w-full px-10 justify-between">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl">
        {/* Dynamic Bulk QRs Section */}
        <div className="mb-8">
          <div
            className="flex items-center justify-between cursor-pointer group mb-4"
            onClick={() => setIsDynamicCollapsed(!isDynamicCollapsed)}
          >
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">
                Dynamic Bulk QRs
              </h1>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 border-green-200"
              >
                WITH TRACKING
              </Badge>
            </div>
            <div
              className={`transition-transform duration-700 ease-in-out ${
                isDynamicCollapsed ? "rotate-0" : "rotate-180"
              }`}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {!isDynamicCollapsed && (
            <p className="text-muted-foreground mb-6">
              Generate multiple trackable QR codes that can be updated in real
              time
            </p>
          )}

          <div
            className={`transition-all duration-700 ease-in-out ${
              isDynamicCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
            }`}
            style={{ overflow: isDynamicCollapsed ? "hidden" : "visible" }}
          >
            <div className="grid grid-cols-1 gap-4 p-2">
              <Card
                className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/40 hover:scale-105 rounded-2xl group bg-white overflow-hidden relative transform-gpu hover:-translate-y-1"
                onClick={() => handleQRTypeSelect("Website", false)}
              >
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300 group-hover:scale-110">
                      <Globe className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                        Website Bulk QRs
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Generate multiple trackable QR codes from CSV with scan
                        analytics
                      </p>
                    </div>
                  </div>
                </CardContent>
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-primary/8 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none rounded-2xl"></div>
                {/* Subtle border glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-[inset_0_0_0_1px_rgba(59,130,246,0.1)]"></div>
              </Card>
            </div>
          </div>
        </div>

        {/* Static Bulk QRs Section */}
        <div className="mt-12">
          <div
            className="flex items-center justify-between cursor-pointer group mb-4"
            onClick={() => setIsStaticCollapsed(!isStaticCollapsed)}
          >
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">
                Static Bulk QRs
              </h1>
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-800 border-orange-200"
              >
                NO TRACKING
              </Badge>
            </div>
            <div
              className={`transition-transform duration-700 ease-in-out ${
                isStaticCollapsed ? "rotate-0" : "rotate-180"
              }`}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {!isStaticCollapsed && (
            <p className="text-muted-foreground mb-6">
              Generate multiple QR codes with URLs embedded directly - no
              tracking
            </p>
          )}

          <div
            className={`transition-all duration-700 ease-in-out ${
              isStaticCollapsed
                ? "max-h-0 opacity-0"
                : "max-h-[900px] opacity-100"
            }`}
            style={{ overflow: isStaticCollapsed ? "hidden" : "visible" }}
          >
            <div className="grid grid-cols-1 gap-4 p-2">
              <Card
                className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/40 hover:scale-105 rounded-2xl group bg-white overflow-hidden relative transform-gpu hover:-translate-y-1"
                onClick={() => handleQRTypeSelect("Website", true)}
              >
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300 group-hover:scale-110">
                      <Globe className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                        Website Bulk QRs
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Generate multiple static QR codes from CSV - URLs
                        embedded directly
                      </p>
                    </div>
                  </div>
                </CardContent>
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-orange-100/50 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none rounded-2xl"></div>
                {/* Subtle border glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-[inset_0_0_0_1px_rgba(251,146,60,0.1)]"></div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Mockup - Moved to right */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit ml-8 w-80">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-center">Preview Example</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            See how your bulk QR codes will look
          </p>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain drop-shadow-lg"
          />
          {/* Sample content inside phone */}
          <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-[200px]">
            <div className="bg-white rounded-lg p-4 shadow-inner border">
              <div className="text-center space-y-2">
                <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-xs text-muted-foreground">
                  CSV with URLs will generate
                </p>
                <p className="text-xs text-muted-foreground">
                  multiple QR codes at once
                </p>
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
            <h1 className="text-2xl font-semibold mb-2">
              {selectedQRType} Bulk QR Codes{" "}
              {isStaticQR ? "(Static)" : "(Dynamic)"}
            </h1>
            <p className="text-muted-foreground">
              Choose the design options that will be applied to all QR codes
              {isStaticQR
                ? " - These will be static QR codes with no tracking"
                : " - These will be dynamic QR codes with tracking and analytics"}
            </p>
          </div>

          {/* Design Options with Templates */}
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "custom" | "templates")
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="custom">Custom Design</TabsTrigger>
              <TabsTrigger value="templates">
                Templates{" "}
                {availableTemplates.length > 0 &&
                  `(${availableTemplates.length})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="custom" className="mt-6">
              <QRDesignSelector
                designOptions={qrDesignOptions}
                onDesignChange={setQrDesignOptions}
              />
            </TabsContent>

            <TabsContent value="templates" className="mt-6">
              {templatesLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading templates...</p>
                </div>
              ) : availableTemplates.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Tag className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No Templates Available
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    You haven't created any templates yet. Go to the Templates
                    page to create custom design templates that you can reuse.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.open("/templates", "_blank")}
                  >
                    Create Templates
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Choose from your saved templates to quickly apply a design:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableTemplates.map((template) => {
                      const isApplied = appliedTemplateId === template.id;
                      return (
                        <Card
                          key={template.id}
                          className={`hover:shadow-lg transition-all duration-300 cursor-pointer group relative ${
                            isApplied
                              ? "border-2 border-primary bg-primary/5"
                              : "border border-gray-200 hover:border-primary/40"
                          }`}
                          onClick={() => handleApplyTemplate(template)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex justify-center relative">
                                {renderQRWithDesign(
                                  "https://example.com/template-preview",
                                  template.designOptions,
                                  { width: 80, height: 80 }
                                )}
                                {/* Applied indicator */}
                                {isApplied && (
                                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                                    <Check className="w-3 h-3" />
                                  </div>
                                )}
                              </div>
                              <div className="text-center">
                                <h4
                                  className={`font-medium transition-colors duration-300 ${
                                    isApplied
                                      ? "text-primary"
                                      : "group-hover:text-primary"
                                  }`}
                                >
                                  {template.name}
                                </h4>
                                {template.description && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {template.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1 justify-center">
                                <Badge variant="secondary" className="text-xs">
                                  Frame {template.designOptions.frame}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  Shape {template.designOptions.shape}
                                </Badge>
                                {template.designOptions.logo > 0 && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Logo {template.designOptions.logo}
                                  </Badge>
                                )}
                              </div>
                              <Button
                                size="sm"
                                variant={isApplied ? "outline" : "default"}
                                className={`w-full transition-colors duration-300 ${
                                  isApplied
                                    ? "border-primary text-primary hover:bg-primary hover:text-white"
                                    : "group-hover:bg-primary/90"
                                }`}
                              >
                                {isApplied
                                  ? "Unapply Template"
                                  : "Apply Template"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit ml-8 w-80">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-center">Design Preview</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            This design will apply to all QRs
          </p>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain drop-shadow-lg"
          />
          {/* QR Code overlay on phone screen */}
          <div className="absolute top-[18%] left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in">
            {renderQRWithDesign("https://example.com", qrDesignOptions, {
              width: 240,
              height: 240,
            })}
            <p className="mt-3 text-xs text-muted-foreground text-center px-2">
              Preview of your bulk QR design
            </p>
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
          <h3 className="text-xl font-semibold text-center">Live Preview</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Ready to generate {csvUrls.length} QR codes
          </p>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain drop-shadow-lg"
          />
          {/* Sample QR codes overlay on phone screen */}
          {csvUrls.length > 0 ? (
            <div className="absolute top-[18%] left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in">
              <div
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center border"
                style={{ width: "180px" }}
              >
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {csvUrls.slice(0, 4).map((url, index) => (
                    <div key={index} className="w-16 h-16">
                      {renderQRWithDesign(url, qrDesignOptions, {
                        width: 60,
                        height: 60,
                      })}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {csvUrls.length} URLs ready to generate
                </p>
              </div>
            </div>
          ) : (
            <div className="absolute top-[18%] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md p-8 flex flex-col items-center border border-gray-200"
                style={{ width: "180px", height: "180px" }}
              >
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-xs text-muted-foreground text-center">
                  Upload CSV to see preview
                </p>
              </div>
            </div>
          )}
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
                      renderQRWithDesign(result.url, qrDesignOptions, {
                        width: 48,
                        height: 48,
                      })
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
          <h3 className="text-xl font-semibold text-center">Final Preview</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Your bulk QR codes are ready
          </p>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain drop-shadow-lg"
          />
          {/* Success overlay on phone screen */}
          <div className="absolute top-[18%] left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in">
            <div
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border"
              style={{ width: "180px" }}
            >
              <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
              <p className="text-lg font-semibold text-center mb-2">
                {bulkResults.filter((r) => r.status === "success").length}
              </p>
              <p className="text-sm text-muted-foreground text-center mb-4">
                QR Codes Generated
              </p>
              <Button
                onClick={handleCompleteAndNavigate}
                disabled={loading}
                className="w-full text-xs py-2"
              >
                {loading ? "Saving..." : "Complete & View All"}
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
