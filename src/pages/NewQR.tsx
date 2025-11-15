import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  FileText,
  Image,
  CreditCard,
  Play,
  Link,
  Users,
  Music,
  Building,
  Tag,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebsiteQRForm from "@/components/qr-forms/WebsiteQRForm";
import PDFQRForm from "@/components/qr-forms/PDFQRForm";
import ImagesQRForm from "@/components/qr-forms/ImagesQRForm";
import VCardQRForm from "@/components/qr-forms/VCardQRForm";
import VideoQRForm from "@/components/qr-forms/VideoQRForm";
import ListOfLinksQRForm from "@/components/qr-forms/ListOfLinksQRForm";
import SocialMediaQRForm from "@/components/qr-forms/SocialMediaQRForm";
import MP3QRForm from "@/components/qr-forms/MP3QRForm";
import BusinessQRForm from "@/components/qr-forms/BusinessQRForm";
import GenericQRForm from "@/components/qr-forms/GenericQRForm";
import QRDesignComponent from "@/components/QRDesignComponent";
import QRDesignSelector from "@/components/QRDesignSelector";
import {
  type QRDesignOptions,
  renderQRWithDesign,
} from "@/lib/qr-design-utils";
import api from "@/lib/api";
import { authService } from "@/services/auth";
import templateStorage, { type QRTemplate } from "@/lib/template-storage";

const dynamicQrTypes = [
  { name: "Website", description: "Open a URL", icon: Globe },
];

const staticQrTypes = [
  { name: "PDF", description: "Show a PDF", icon: FileText },
  { name: "Images", description: "Show an image gallery", icon: Image },
  {
    name: "vCard Plus",
    description: "Share contact details",
    icon: CreditCard,
  },
  { name: "Video", description: "Show a video", icon: Play },
  { name: "List of links", description: "Group links", icon: Link },
  {
    name: "Social Media",
    description: "Share your social profiles",
    icon: Users,
  },
  { name: "MP3", description: "Play an audio file", icon: Music },
  {
    name: "Business",
    description: "Share information about your business",
    icon: Building,
  },
  { name: "Coupon", description: "Share a coupon", icon: Tag },
  { name: "Apps", description: "Redirect to app store", icon: Tag },
  { name: "Event", description: "Promote and share an Event", icon: Building },
  {
    name: "Menu",
    description: "Display the menu of a resturant or bar",
    icon: Play,
  },
  {
    name: "Feedback",
    description: "Collect feedback and get rated",
    icon: Users,
  },
];

const NewQR = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedQRType, setSelectedQRType] = useState("");
  const [qrData, setQrData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedQR, setGeneratedQR] = useState<null | {
    qr_image: string;
    scanUrl?: string;
    slug?: string;
    id?: string;
  }>(null);

  // Collapsible sections state
  const [isDynamicCollapsed, setIsDynamicCollapsed] = useState(false);
  const [isStaticCollapsed, setIsStaticCollapsed] = useState(false);

  // QR Design options
  const [qrDesignOptions, setQrDesignOptions] = useState<QRDesignOptions>({
    frame: 1,
    shape: 1,
    logo: 0,
    level: 2,
    dotStyle: 1,
    bgColor: "#ffffff",
    outerBorder: 1,
  });

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

  const handleQRTypeSelect = (typeName: string) => {
    setSelectedQRType(typeName);
    setCurrentStep(2);
  };

  interface FormData {
    qrName?: string;
    basicInformation?: {
      websiteURL?: string;
    };
  }

  const handleNextFromStep2 = async () => {
    // Get form data from the form inputs
    const websiteUrlInput = document.getElementById(
      "website-url"
    ) as HTMLInputElement;
    const qrNameInput = document.getElementById("qr-name") as HTMLInputElement;

    const websiteURL = websiteUrlInput?.value || "";
    const qrName = qrNameInput?.value || selectedQRType + " QR";

    if (!websiteURL.trim()) {
      setError("Please enter a website URL");
      return;
    }

    // Create form data with the user's input
    const formData = {
      qrName: qrName,
      basicInformation: {
        websiteURL: websiteURL,
      },
    };

    await handleGenerateQR(formData);
  };

  const handleGenerateQR = async (formData: FormData) => {
    setLoading(true);
    setError("");
    setQrData(formData);

    try {
      // Debug: Check authentication status
      console.log("Checking authentication status...");
      try {
        const authStatus = await authService.getCurrentUser();
        console.log("User authenticated:", authStatus.user);
      } catch (authError) {
        console.error("Authentication check failed:", authError);
        setError("Authentication required. Please log in again.");
        setLoading(false);
        return;
      }

      // Create QR code - cookies are sent automatically
      // Server will handle authentication check
      console.log("Form data being sent:", formData);
      const response = await api.post("/qr/url", {
        name: formData.qrName || "Website QR",
        url: formData.basicInformation?.websiteURL || "",
        dynamic: true,
      });

      const createdQr = response.data;
      console.log("QR created:", createdQr);

      // Get the QR image - cookies are sent automatically
      const imageResponse = await api.get(`/qr/${createdQr.id}/image`);
      const imageData = imageResponse.data;

      // Build scan URL so it can be opened from other devices in dev
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const scanUrl = `${apiBase.replace(/\/$/, "")}/scan/${createdQr.slug}`;

      setGeneratedQR({
        qr_image: imageData.image,
        scanUrl,
        slug: createdQr.slug,
        id: createdQr.id,
      }); // Set the base64 image and scan URL

      // Move to step 3 after successful QR generation
      setCurrentStep(3);
    } catch (err: unknown) {
      let errorMessage = "Something went wrong";

      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response?: { data?: { error?: string } } };
        errorMessage = error.response?.data?.error || "Failed to generate QR";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleStepClick = (step: number) => {
    if (step === 1) {
      setCurrentStep(step);
    } else if (step === 2 && selectedQRType) {
      setCurrentStep(step);
    } else if (step === 3 && selectedQRType && generatedQR) {
      setCurrentStep(step);
    }
  };

  const handleCompleteQR = async () => {
    if (!generatedQR?.id) return;

    try {
      setLoading(true);

      console.log("Completing QR with design options:", qrDesignOptions);
      // Update the QR code with the applied design options
      await api.put(`/qr/${generatedQR.id}`, {
        designOptions: qrDesignOptions,
        status: "active",
      });

      // Redirect to My QR Codes page
      navigate("/my-qr-codes");
    } catch (err) {
      console.error("Failed to complete QR creation:", err);
      setError("Failed to save QR code");
    } finally {
      setLoading(false);
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
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : currentStep > 1
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 1 ? "✓" : "1"}
            </div>
            <span
              className={`text-sm transition-colors duration-300 ${
                currentStep >= 1
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Type of QR code
            </span>
          </div>

          {/* Connecting line 1 */}
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
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : currentStep > 2
                  ? "bg-green-500 text-white"
                  : selectedQRType
                  ? "bg-muted text-foreground cursor-pointer"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {currentStep > 2 ? "✓" : "2"}
            </div>
            <span
              className={`text-sm transition-colors duration-300 ${
                currentStep === 2
                  ? "font-medium text-foreground"
                  : selectedQRType
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Content
            </span>
          </div>

          {/* Connecting line 2 */}
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
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : currentStep > 3
                  ? "bg-green-500 text-white"
                  : generatedQR
                  ? "bg-muted text-foreground cursor-pointer"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {currentStep > 3 ? "✓" : "3"}
            </div>
            <span
              className={`text-sm transition-colors duration-300 ${
                currentStep === 3
                  ? "font-medium text-foreground"
                  : generatedQR
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              QR Design
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
              className="px-8 py-2 rounded-full border-2 hover:border-primary/50 transition-all duration-300"
            >
              ← Back
            </Button>
            <Button
              onClick={handleNextFromStep2}
              disabled={loading}
              className="px-8 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                "Next →"
              )}
            </Button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(2)}
              className="px-8 py-2 rounded-full border-2 hover:border-primary/50 transition-all duration-300"
            >
              ← Back
            </Button>
            <Button
              onClick={handleCompleteQR}
              disabled={loading || !generatedQR?.id}
              className="px-8 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : "Complete"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="flex gap-12 w-full px-10 justify-between">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl">
        {/* Dynamic QRs Section */}
        <div className="mb-8">
          <div
            className="flex items-center justify-between cursor-pointer group mb-4"
            onClick={() => setIsDynamicCollapsed(!isDynamicCollapsed)}
          >
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">
                Dynamic QRs
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
              Update content in real time, without changing your code
            </p>
          )}

          <div
            className={`transition-all duration-700 ease-in-out ${
              isDynamicCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
            }`}
            style={{ overflow: isDynamicCollapsed ? "hidden" : "visible" }}
          >
            <div className="grid grid-cols-2 gap-6 p-2">
              {dynamicQrTypes.map((type, index) => (
                <Card
                  key={index}
                  className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/40 hover:scale-105 rounded-2xl group bg-white overflow-hidden relative transform-gpu hover:-translate-y-1"
                  onClick={() => handleQRTypeSelect(type.name)}
                >
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300 group-hover:scale-110">
                        <type.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                          {type.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-primary/8 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none rounded-2xl"></div>
                  {/* Subtle border glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-[inset_0_0_0_1px_rgba(59,130,246,0.1)]"></div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Static QRs Section */}
        <div className="mt-12">
          <div
            className="flex items-center justify-between cursor-pointer group mb-4"
            onClick={() => setIsStaticCollapsed(!isStaticCollapsed)}
          >
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">
                Static QRs
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
              Content cannot be changed once created
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
            <div className="grid grid-cols-2 gap-6 p-2">
              {staticQrTypes.map((type, index) => (
                <Card
                  key={index}
                  className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/40 hover:scale-105 rounded-2xl group bg-white overflow-hidden relative transform-gpu hover:-translate-y-1"
                  onClick={() => handleQRTypeSelect(type.name)}
                >
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300 group-hover:scale-110">
                        <type.icon className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                          {type.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-orange-100/50 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none rounded-2xl"></div>
                  {/* Subtle border glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-[inset_0_0_0_1px_rgba(251,146,60,0.1)]"></div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phone Mockup - Moved to right */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit ml-8 w-80">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-center">Preview Example</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            See how your QR code will look
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
                <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-400 rounded"></div>
                </div>
                <h4 className="text-sm font-medium">QR Code Preview</h4>
                <p className="text-xs text-gray-500">
                  Choose a QR type to see a real preview
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQRForm = () => {
    switch (selectedQRType) {
      case "Website":
        return <WebsiteQRForm onGenerate={handleGenerateQR} />;
      case "PDF":
        return <PDFQRForm onGenerate={handleGenerateQR} />;
      case "Images":
        return <ImagesQRForm onGenerate={handleGenerateQR} />;
      case "vCard Plus":
        return <VCardQRForm onGenerate={handleGenerateQR} />;
      case "Video":
        return <VideoQRForm onGenerate={handleGenerateQR} />;
      case "List of links":
        return <ListOfLinksQRForm onGenerate={handleGenerateQR} />;
      case "Social Media":
        return <SocialMediaQRForm onGenerate={handleGenerateQR} />;
      case "MP3":
        return <MP3QRForm onGenerate={handleGenerateQR} />;
      case "Business":
        return <BusinessQRForm onGenerate={handleGenerateQR} />;
      case "Coupon":
      case "Apps":
      case "Event":
      case "Menu":
      case "Feedback":
        return (
          <GenericQRForm
            qrType={selectedQRType}
            onGenerate={handleGenerateQR}
          />
        );
      default:
        return (
          <GenericQRForm
            qrType={selectedQRType}
            onGenerate={handleGenerateQR}
          />
        );
    }
  };

  const renderStep2 = () => (
    <div className="flex gap-12 w-full px-10 justify-between items-start">
      {/* Main Content */}
      <div className="flex-1 max-w-3xl min-w-0">
        <div className="space-y-6">
          <div className="fade-in">
            <h1 className="text-2xl font-semibold mb-2">
              {selectedQRType} QR Code
            </h1>
            <p className="text-muted-foreground">
              Fill in the details to generate your QR code
            </p>
          </div>

          <div className="animate-slide-up overflow-hidden">
            {renderQRForm()}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-slide-up">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit ml-8 w-80 min-w-[320px]">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-center">Live Preview</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            See your QR code as you create it
          </p>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain drop-shadow-lg"
          />
          {/* QR Code overlay on phone screen */}
          {loading && (
            <div className="absolute top-[18%] left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in">
              <div
                className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center border"
                style={{ width: "180px" }}
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-3 text-sm text-gray-600 font-medium">
                  Generating QR...
                </p>
              </div>
            </div>
          )}
          {generatedQR && !loading && (
            <div className="absolute top-[18%] left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in">
              {renderQRWithDesign(
                generatedQR.scanUrl ||
                  `http://localhost:4000/scan/${generatedQR.slug}`,
                qrDesignOptions,
                {
                  width: 240,
                  height: 240,
                }
              )}
              {/* Link to scan endpoint (useful in development to open from phone) */}
              {generatedQR.scanUrl && (
                <a
                  href={generatedQR.scanUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 text-xs text-primary underline hover:text-primary/80 transition-colors duration-300"
                >
                  Test scan URL
                </a>
              )}
            </div>
          )}
          {!generatedQR && !loading && (
            <div className="absolute top-[18%] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md p-8 flex flex-col items-center border border-gray-200"
                style={{ width: "180px", height: "180px" }}
              >
                <div className="text-gray-400 text-center flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg mb-3"></div>
                  <p className="text-sm">QR Code will appear here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="flex gap-12 w-full px-10 justify-between">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl">
        <div className="space-y-8">
          <div className="fade-in">
            <h1 className="text-2xl font-semibold mb-2">Design Your QR Code</h1>
            <p className="text-muted-foreground">
              Customize the appearance of your QR code with frames, shapes,
              logos, and quality levels
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

          {generatedQR?.scanUrl && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-slide-up">
              <p className="text-sm text-blue-700 mb-2 font-medium">
                Test your QR code:
              </p>
              <a
                href={generatedQR.scanUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 underline hover:text-blue-800 transition-colors duration-300"
              >
                Open scan URL →
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit ml-8 w-80">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-center">Final Preview</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Your customized QR code
          </p>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain drop-shadow-lg"
          />
          {/* Final QR Code overlay on phone screen */}
          {generatedQR && (
            <div className="absolute top-[18%] left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in">
              {renderQRWithDesign(
                generatedQR.scanUrl ||
                  `http://localhost:4000/scan/${generatedQR.slug}`,
                qrDesignOptions,
                {
                  width: 240,
                  height: 240,
                }
              )}
              {/* Link to scan endpoint (useful in development to open from phone) */}
              {generatedQR.scanUrl && (
                <a
                  href={generatedQR.scanUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 text-xs text-primary underline hover:text-primary/80 transition-colors duration-300"
                >
                  Test scan URL
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-8xl mx-auto py-8">
        {renderStepIndicator()}
        <div className="transition-all duration-700 ease-in-out">
          {currentStep === 1 && (
            <div className="animate-fade-in">{renderStep1()}</div>
          )}
          {currentStep === 2 && (
            <div className="animate-slide-up">{renderStep2()}</div>
          )}
          {currentStep === 3 && (
            <div className="animate-scale-in">{renderStep3()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewQR;
