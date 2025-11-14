import { useState } from "react";
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
} from "lucide-react";
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
import {
  type QRDesignOptions,
  renderQRWithDesign,
} from "@/lib/qr-design-utils";
import api from "@/lib/api";
import { authService } from "@/services/auth";

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
  });

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
    // Get the website URL from the form
    const websiteUrlInput = document.getElementById(
      "website-url"
    ) as HTMLInputElement;
    const websiteURL = websiteUrlInput?.value || "";

    if (!websiteURL.trim()) {
      setError("Please enter a website URL");
      return;
    }

    // Create form data with the user's input
    const formData = {
      qrName: selectedQRType + " QR",
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
      // Create QR code - cookies are sent automatically
      // Server will handle authentication check
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
              onClick={() => console.log("Download QR")}
              className="px-8 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Download
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
            <div className="transition-transform duration-300">
              {isDynamicCollapsed ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>

          {!isDynamicCollapsed && (
            <p className="text-muted-foreground mb-6">
              Update content in real time, without changing your code
            </p>
          )}

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isDynamicCollapsed ? "max-h-0" : "max-h-96"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {dynamicQrTypes.map((type, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/30 hover:scale-[1.02] py-2 rounded-2xl group bg-white hover-lift"
                  onClick={() => handleQRTypeSelect(type.name)}
                >
                  <CardContent className="p-6">
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
            <div className="transition-transform duration-300">
              {isStaticCollapsed ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>

          {!isStaticCollapsed && (
            <p className="text-muted-foreground mb-6">
              Content cannot be changed once created
            </p>
          )}

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isStaticCollapsed ? "max-h-0" : "max-h-[800px]"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {staticQrTypes.map((type, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/30 hover:scale-[1.02] py-2 rounded-2xl group bg-white hover-lift"
                  onClick={() => handleQRTypeSelect(type.name)}
                >
                  <CardContent className="p-6">
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
    <div className="flex gap-12 w-full px-10 justify-between">
      {/* Main Content */}
      <div className="flex-1 max-w-3xl">
        <div className="space-y-6">
          <div className="fade-in">
            <h1 className="text-2xl font-semibold mb-2">
              {selectedQRType} QR Code
            </h1>
            <p className="text-muted-foreground">
              Fill in the details to generate your QR code
            </p>
          </div>

          <div className="animate-slide-up">{renderQRForm()}</div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-slide-up">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit ml-8 w-80">
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
              {renderQRWithDesign(generatedQR.qr_image, qrDesignOptions)}
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

          {/* Design Options Grid */}
          <div className="space-y-6 animate-slide-up">
            {/* Frame Section */}
            <div className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                  <div className="w-8 h-8 border-2 border-blue-500 rounded group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Frame Selection
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add decorative borders and context
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Choose from various frame designs to make your QR code stand out
                and provide visual context for scanning. Frames help users
                understand the purpose of your QR code at a glance.
              </p>

              {/* Frame Selection Grid */}
              <div className="grid grid-cols-5 gap-3">
                {[
                  { id: 1, name: "No Frame", icon: null },
                  { id: 2, name: "Card", icon: "/assets/card.svg" },
                  { id: 3, name: "Scooter", icon: "/assets/scooter.svg" },
                  { id: 4, name: "Juice", icon: "/assets/juice.svg" },
                  {
                    id: 5,
                    name: "Gift Wrapper",
                    icon: "/assets/gift-wrapper.svg",
                  },
                  { id: 6, name: "Cup", icon: "/assets/cup.svg" },
                  {
                    id: 7,
                    name: "Text Tab",
                    icon: "/assets/text-then-tab.svg",
                  },
                  { id: 8, name: "Tab", icon: "/assets/tab.svg" },
                  { id: 9, name: "Clipboard", icon: "/assets/clipboard.svg" },
                  {
                    id: 10,
                    name: "Clipped Text",
                    icon: "/assets/clipped-text.svg",
                  },
                ].map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() =>
                      setQrDesignOptions((prev) => ({
                        ...prev,
                        frame: frame.id,
                      }))
                    }
                    className={`p-3 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                      qrDesignOptions.frame === frame.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 bg-white"
                    }`}
                  >
                    <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-gray-50 rounded">
                      {frame.icon ? (
                        <img
                          src={frame.icon}
                          alt={frame.name}
                          className="w-10 h-10 object-contain"
                          style={{
                            filter:
                              "invert(46%) sepia(0%) saturate(0%) hue-rotate(212deg) brightness(94%) contrast(88%)",
                          }}
                        />
                      ) : (
                        <div className="w-8 h-8 border border-gray-400 rounded flex items-center justify-center">
                          <div className="w-6 h-6 grid grid-cols-3 gap-[1px]">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-1 h-1 bg-gray-600"
                              ></div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-600">{frame.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Section */}
            <div className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                  <div className="w-8 h-8 grid grid-cols-2 gap-1 group-hover:scale-110 transition-transform duration-300">
                    <div className="bg-green-500 rounded-full"></div>
                    <div className="bg-green-500"></div>
                    <div className="bg-green-500"></div>
                    <div className="bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    Shape Selection
                  </h3>
                  <p className="text-sm text-gray-500">
                    Customize QR code dot patterns
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Modify the shape of QR code dots to create a unique visual
                style. Choose from classic squares to rounded corners, dots, or
                circles for better brand alignment.
              </p>

              {/* Shape Selection Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { id: 1, name: "Square", preview: "■" },
                  { id: 2, name: "Rounded", preview: "●" },
                  { id: 3, name: "Dots", preview: "•" },
                  { id: 4, name: "Circle", preview: "◯" },
                ].map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() =>
                      setQrDesignOptions((prev) => ({
                        ...prev,
                        shape: shape.id,
                      }))
                    }
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                      qrDesignOptions.shape === shape.id
                        ? "border-green-500 bg-green-50 shadow-md"
                        : "border-gray-200 hover:border-green-300 bg-white"
                    }`}
                  >
                    <div className="mb-3">
                      <div className="grid grid-cols-5 gap-1 mx-auto w-fit">
                        {Array.from({ length: 25 }).map((_, i) => {
                          const isPattern = [
                            0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23,
                            24,
                          ].includes(i);
                          if (!isPattern)
                            return <div key={i} className="w-1.5 h-1.5"></div>;

                          if (shape.id === 1)
                            return (
                              <div
                                key={i}
                                className="w-1.5 h-1.5 bg-gray-800"
                              ></div>
                            );
                          if (shape.id === 2)
                            return (
                              <div
                                key={i}
                                className="w-1.5 h-1.5 bg-gray-800 rounded-sm"
                              ></div>
                            );
                          if (shape.id === 3)
                            return (
                              <div
                                key={i}
                                className="w-1.5 h-1.5 bg-gray-800 rounded-full"
                              ></div>
                            );
                          if (shape.id === 4)
                            return (
                              <div
                                key={i}
                                className="w-1.5 h-1.5 bg-gray-800 rounded-full border border-gray-600"
                              ></div>
                            );
                        })}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{shape.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Logo Section */}
            <div className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    Logo Selection
                  </h3>
                  <p className="text-sm text-gray-500">
                    Brand your QR code with icons
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Add recognizable icons like WhatsApp, location, link, or WiFi
                symbols to instantly communicate your QR code's purpose and
                increase scan rates.
              </p>

              {/* Logo Selection Grid */}
              <div className="grid grid-cols-7 gap-3">
                {[
                  { id: 0, name: "None", icon: null },
                  { id: 1, name: "WhatsApp", icon: "/assets/whatsapp.svg" },
                  { id: 2, name: "Location", icon: "/assets/location.svg" },
                  { id: 3, name: "Link", icon: "/assets/link.svg" },
                  { id: 4, name: "Scan", icon: "/assets/scan.svg" },
                  { id: 5, name: "WiFi", icon: "/assets/wifi.svg" },
                  { id: 6, name: "Email", icon: "/assets/email.svg" },
                ].map((logo) => (
                  <button
                    key={logo.id}
                    onClick={() =>
                      setQrDesignOptions((prev) => ({ ...prev, logo: logo.id }))
                    }
                    className={`p-3 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                      qrDesignOptions.logo === logo.id
                        ? "border-purple-500 bg-purple-50 shadow-md"
                        : "border-gray-200 hover:border-purple-300 bg-white"
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                      {logo.icon ? (
                        <img
                          src={logo.icon}
                          alt={logo.name}
                          className="w-6 h-6 object-contain"
                          style={{
                            filter:
                              qrDesignOptions.logo === logo.id
                                ? "invert(48%) sepia(79%) saturate(2476%) hue-rotate(249deg) brightness(95%) contrast(98%)"
                                : "invert(46%) sepia(0%) saturate(0%) hue-rotate(212deg) brightness(94%) contrast(88%)",
                          }}
                        />
                      ) : (
                        <div className="w-6 h-6 border border-dashed border-gray-400 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-400">×</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-600">{logo.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Level Section */}
            <div className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300">
                  <div className="text-orange-500 font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    HD
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    Quality Level
                  </h3>
                  <p className="text-sm text-gray-500">
                    Error correction and readability
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Higher quality levels add more error correction, making QR codes
                readable even when partially damaged, dirty, or obscured. Choose
                based on your usage environment.
              </p>

              {/* Quality Level Selection */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  {
                    id: 1,
                    name: "Low (L)",
                    description: "~7% recovery",
                    level: "Basic scanning",
                  },
                  {
                    id: 2,
                    name: "Medium (M)",
                    description: "~15% recovery",
                    level: "Recommended",
                  },
                  {
                    id: 3,
                    name: "Quality (Q)",
                    description: "~25% recovery",
                    level: "Outdoor use",
                  },
                  {
                    id: 4,
                    name: "High (H)",
                    description: "~30% recovery",
                    level: "Maximum safety",
                  },
                ].map((quality) => (
                  <button
                    key={quality.id}
                    onClick={() =>
                      setQrDesignOptions((prev) => ({
                        ...prev,
                        level: quality.id,
                      }))
                    }
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                      qrDesignOptions.level === quality.id
                        ? "border-orange-500 bg-orange-50 shadow-md"
                        : "border-gray-200 hover:border-orange-300 bg-white"
                    }`}
                  >
                    <div className="font-semibold mb-1">{quality.name}</div>
                    <div className="text-xs text-gray-500 mb-1">
                      {quality.description}
                    </div>
                    <div className="text-xs text-gray-400">{quality.level}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

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
              {renderQRWithDesign(generatedQR.qr_image, qrDesignOptions)}
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
