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
    if (step <= currentStep || step === 2) {
      setCurrentStep(step);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center flex-1">
        <div className="flex items-center space-x-8">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleStepClick(1)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 1
                  ? "bg-primary text-primary-foreground"
                  : currentStep > 1
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 1 ? "✓" : "1"}
            </div>
            <span
              className={`text-sm ${
                currentStep >= 1 ? "font-medium" : "text-muted-foreground"
              }`}
            >
              Type of QR code
            </span>
          </div>
          <div className="h-px w-12 bg-muted"></div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleStepClick(2)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <span
              className={`text-sm ${
                currentStep === 2 ? "font-medium" : "text-muted-foreground"
              }`}
            >
              Content
            </span>
          </div>
          <div className="h-px w-12 bg-muted"></div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-sm text-muted-foreground">QR Design</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {currentStep === 2 && (
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(1)}
            className="px-8 rounded-3xl mt-2"
          >
            Back
          </Button>
          <Button
            onClick={() => setCurrentStep(3)}
            className="px-6 rounded-3xl mt-2"
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );

  const renderStep1 = () => (
    <div className="flex gap-8 w-full px-10 justify-center">
      {/* Main Content */}
      <div className="flex-1 max-w-3xl">
        {/* Dynamic QRs Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold">Dynamic QRs</h1>
            <Badge variant="secondary" className="bg-green-300 text-black pt-2">
              WITH TRACKING
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Update content in real time, without changing your code
          </p>
        </div>

        {/* QR Types Grid */}
        <div className="grid grid-cols-2 gap-4 hover:border">
          {dynamicQrTypes.map((type, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20 py-2 rounded-2xl"
              onClick={() => handleQRTypeSelect(type.name)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center">
                    <type.icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{type.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {type.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold">Static QRs</h1>
              <Badge
                variant="secondary"
                className="bg-orange-300 text-black pt-2"
              >
                NO TRACKING
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Content cannot be changed once created
            </p>
          </div>

          {/* Static QR Types Grid */}
          <div className="grid grid-cols-2 gap-4 hover:border">
            {staticQrTypes.map((type, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20 py-2 rounded-2xl"
                onClick={() => handleQRTypeSelect(type.name)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center">
                      <type.icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{type.name}</h3>
                      <p className="text-muted-foreground text-sm">
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

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-center">Example</h3>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain"
          />
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
    <div className="flex gap-8 w-full px-10 justify-center">
      {/* Main Content */}
      <div className="flex-1 max-w-2xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              {selectedQRType} QR Code
            </h1>
            <p className="text-muted-foreground">
              Fill in the details to generate your QR code
            </p>
          </div>

          {renderQRForm()}

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex-shrink-0 flex flex-col items-center sticky top-24 h-fit">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-center">Preview</h3>
        </div>
        <div className="relative">
          <img
            src="/iphone15.png"
            alt="iPhone 15 Mockup"
            className="w-72 h-auto object-contain"
          />
          {/* QR Code overlay on phone screen */}
          {loading && (
            <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div
                className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center"
                style={{ width: "180px" }}
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-2 text-sm text-gray-600">Generating QR...</p>
              </div>
            </div>
          )}
          {generatedQR && !loading && (
            <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <img
                src={generatedQR.qr_image}
                alt="Generated QR"
                className="rounded-lg shadow-md"
                style={{ maxWidth: "180px", height: "auto" }}
              />
              {/* Link to scan endpoint (useful in development to open from phone) */}
              {generatedQR.scanUrl && (
                <a
                  href={generatedQR.scanUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 text-xs text-primary underline"
                >
                  Open scan URL
                </a>
              )}
            </div>
          )}
          {!generatedQR && !loading && (
            <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div
                className="bg-gray-100 rounded-lg shadow-md p-8 flex flex-col items-center"
                style={{ width: "180px", height: "180px" }}
              >
                <div className="text-gray-400 text-center">
                  <p className="text-sm">QR Code will appear here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-8xl bg-neutral-100">
      {renderStepIndicator()}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
    </div>
  );
};

export default NewQR;
