import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import NewQRHeader from "@/components/new-qr/NewQRHeader";
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
 { name: "Website", description: "Open a URL", icon: Globe },
];

const NewQR = () => {
 const navigate = useNavigate();
 const [currentStep, setCurrentStep] = useState(1);
 const [selectedQRType, setSelectedQRType] = useState("");
 const [isStaticQR, setIsStaticQR] = useState(false);
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

 // Static form collapsible sections state - collapsed by default
 const [isStaticQRNameExpanded, setIsStaticQRNameExpanded] = useState(false);
 const [isStaticBasicInfoExpanded, setIsStaticBasicInfoExpanded] = useState(false);

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

 const handleQRTypeSelect = (typeName: string, isStatic = false) => {
 setSelectedQRType(typeName);
 setIsStaticQR(isStatic);
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
 // ...existing code...
 try {
 const authStatus = await authService.getCurrentUser();
 // ...existing code...
 } catch (authError) {
 console.error("Authentication check failed:", authError);
 setError("Authentication required. Please log in again.");
 setLoading(false);
 return;
 }

 // Create QR code - cookies are sent automatically
 // Server will handle authentication check
 // ...existing code...

 const response = await api.post("/qr/url", {
 name: formData.qrName || "Website QR",
 url: formData.basicInformation?.websiteURL || "",
 dynamic: !isStaticQR,
 });

 const createdQr = response.data;
 // ...existing code...

 // Get the QR image - cookies are sent automatically
 const imageResponse = await api.get(`/qr/${createdQr.id}/image`);
 const imageData = imageResponse.data;

 // Build scan URL - for static QRs, point directly to the URL; for dynamic QRs, use the scan endpoint
 const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000";
 const scanUrl = isStaticQR
 ? formData.basicInformation?.websiteURL || ""
 : `${apiBase.replace(/\/$/, "")}/scan/${createdQr.slug}`;

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

 // ...existing code...
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

 // Header (step indicator + navigation) will be rendered via NewQRHeader

 const renderStep1 = () => (
 <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full px-4 md:px-10 justify-between">
 {/* Main Content */}
 <div className="flex-1 w-full lg:max-w-4xl">
 {/* Dynamic QRs Section */}
 <div className="mb-8">
 <div
 className="flex items-center justify-between cursor-pointer group mb-4"
 onClick={() => setIsDynamicCollapsed(!isDynamicCollapsed)}
 >
 <div className="flex items-center gap-3">
 <h1 className="text-2xl font-semibold ">
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
 className={` ${
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
 className={` ${
 isDynamicCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
 }`}
 style={{ overflow: isDynamicCollapsed ? "hidden" : "visible" }}
 >
 <div className="grid grid-cols-1 gap-4 p-2">
 {dynamicQrTypes.map((type, index) => (
 <Card
 key={index}
 className="cursor-pointer border-2 rounded-2xl group bg-white overflow-hidden relative "
 onClick={() => handleQRTypeSelect(type.name)}
 >
 <CardContent className="p-6 relative z-10">
 <div className="flex items-start space-x-4">
 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group- group- ">
 <type.icon className="w-6 h-6 text-primary " />
 </div>
 <div className="flex-1">
 <h3 className="font-semibold text-lg ">
 {type.name}
 </h3>
 <p className="text-muted-foreground text-sm leading-relaxed">
 {type.description}
 </p>
 </div>
 </div>
 </CardContent>
 {/* Hover effect overlay */}
 <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-primary/8 opacity-0 pointer-events-none rounded-2xl"></div>
 {/* Subtle border glow effect */}
 <div className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none shadow-[inset_0_0_0_1px_rgba(59,130,246,0.1)]"></div>
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
 <h1 className="text-2xl font-semibold ">
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
 className={` ${
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
 className={` ${
 isStaticCollapsed
 ? "max-h-0 opacity-0"
 : "max-h-[900px] opacity-100"
 }`}
 style={{ overflow: isStaticCollapsed ? "hidden" : "visible" }}
 >
 <div className="grid grid-cols-1 gap-4 p-2">
 {staticQrTypes.map((type, index) => (
 <Card
 key={index}
 className="cursor-pointer border-2 rounded-2xl group bg-white overflow-hidden relative "
 onClick={() => handleQRTypeSelect(type.name, true)}
 >
 <CardContent className="p-6 relative z-10">
 <div className="flex items-start space-x-4">
 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group- group- ">
 <type.icon className="w-6 h-6 text-orange-600 " />
 </div>
 <div className="flex-1">
 <h3 className="font-semibold text-lg ">
 {type.name}
 </h3>
 <p className="text-muted-foreground text-sm leading-relaxed">
 {type.description}
 </p>
 </div>
 </div>
 </CardContent>
 {/* Hover effect overlay */}
 <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-orange-100/50 opacity-0 pointer-events-none rounded-2xl"></div>
 {/* Subtle border glow effect */}
 <div className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none shadow-[inset_0_0_0_1px_rgba(251,146,60,0.1)]"></div>
 </Card>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Phone Mockup - Hidden on mobile, shown on large screens */}
 <div className="hidden lg:flex flex-shrink-0 flex-col items-center sticky top-24 h-fit ml-8 w-80">
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
 if (selectedQRType === "Website") {
 if (isStaticQR) {
 // Static website QR - simplified form with collapsible sections
 return (
 <div className="space-y-6">
 {/* QR Code Name Section */}
 <Card>
 <CardContent className="p-0">
 <div
 className="flex items-center justify-between p-6 cursor-pointer select-none "
 onClick={() => setIsStaticQRNameExpanded(!isStaticQRNameExpanded)}
 >
 <p className="text-base leading-7 font-semibold cursor-pointer m-0">
 QR Code Name
 </p>
 <ChevronDown
 className={`h-5 w-5 text-muted-foreground ${
 isStaticQRNameExpanded ? "rotate-180" : ""
 }`}
 />
 </div>
 <div
 className={` overflow-hidden ${
 isStaticQRNameExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
 }`}
 >
 <div className="px-6 pb-6">
 <Input
 id="qr-name"
 placeholder="My Website QR"
 defaultValue="Website QR"
 />
 </div>
 </div>
 </CardContent>
 </Card>

 {/* Basic Information Section */}
 <Card>
 <CardContent className="p-0">
 <div
 className="flex items-center justify-between p-6 cursor-pointer select-none "
 onClick={() => setIsStaticBasicInfoExpanded(!isStaticBasicInfoExpanded)}
 >
 <div className="flex items-start gap-3">
 <div className="w-11 h-11 flex items-center justify-center rounded-lg flex-shrink-0 bg-white">
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
 <p className="text-base leading-7 font-semibold cursor-pointer m-0">
 Basic Information
 </p>
 <p className="text-sm text-muted-foreground mt-1">
 Enter your website URL
 </p>
 </div>
 </div>
 <ChevronDown
 className={`h-5 w-5 text-muted-foreground ${
 isStaticBasicInfoExpanded ? "rotate-180" : ""
 }`}
 />
 </div>
 <div
 className={` overflow-hidden ${
 isStaticBasicInfoExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
 }`}
 >
 <div className="px-6 pb-6 space-y-4">
 <div className="space-y-2">
 <Label htmlFor="website-url">Website URL *</Label>
 <Input
 id="website-url"
 type="url"
 placeholder="https://example.com"
 required
 />
 </div>
 </div>
 </div>
 </CardContent>
 </Card>

 {/* Static QR Notice */}
 <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
 <h4 className="font-medium text-orange-800 mb-2">
 Static QR Code
 </h4>
 <p className="text-sm text-orange-700">
 This QR code will contain the URL directly and cannot be
 changed once created. Scanning will not be tracked.
 </p>
 </div>
 </div>
 );
 } else {
 // Dynamic website QR - full form
 return <WebsiteQRForm onGenerate={handleGenerateQR} />;
 }
 }

 // Other QR types (removed from static)
 switch (selectedQRType) {
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
 <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full px-4 md:px-10 justify-between items-start">
 {/* Mobile Preview Area - Top */}
 <div className="lg:hidden w-full mb-6">
 <div className="rounded-2xl shadow-lg p-6" style={{ backgroundColor: 'rgb(248, 248, 249)' }}>
 <div className="flex items-center justify-center mb-4">
 <div className="bg-white rounded-full px-4 py-1.5 shadow-sm">
 <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
 Live Preview
 </h3>
 </div>
 </div>
 <div className="flex justify-center">
 {loading ? (
 <div className="w-40 h-40 flex items-center justify-center bg-white rounded-xl shadow-inner">
 <div className="flex flex-col items-center gap-2">
 <div className="rounded-full h-10 w-10 border-3 border-primary border-t-transparent"></div>
 <p className="text-xs text-gray-500 font-medium">
 Generating...
 </p>
 </div>
 </div>
 ) : generatedQR ? (
 <div className="flex flex-col items-center gap-3">
 <div className="bg-white p-4 rounded-xl shadow-md">
 {renderQRWithDesign(
 generatedQR.scanUrl ||
 `${
 import.meta.env.VITE_API_URL || "http://localhost:4000"
 }/scan/${generatedQR.slug}`,
 qrDesignOptions,
 {
 width: 140,
 height: 140,
 }
 )}
 </div>
 {generatedQR.scanUrl && (
 <a
 href={generatedQR.scanUrl}
 target="_blank"
 rel="noreferrer"
 className="inline-flex items-center gap-1 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-primary shadow-sm"
 >
 <span>{isStaticQR ? "Test Website" : "Test Scan"}</span>
 <svg
 className="w-3 h-3"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M14 5l7 7m0 0l-7 7m7-7H3"
 />
 </svg>
 </a>
 )}
 </div>
 ) : (
 <div className="w-40 h-40 border-2 border-dashed border-blue-200 rounded-xl flex items-center justify-center bg-white/50">
 <div className="flex flex-col items-center gap-2">
 <div className="w-12 h-12 border-2 border-dashed border-blue-300 rounded-lg"></div>
 <p className="text-xs text-gray-500 font-medium text-center px-4">
 QR code will appear here
 </p>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>

 {/* Main Content */}
 <div className="flex-1 w-full lg:max-w-3xl min-w-0">
 <div className="space-y-6">
 <div className="fade-in">
 <h1 className="text-xl md:text-2xl font-semibold mb-2">
 {selectedQRType} QR Code
 </h1>
 <p className="text-muted-foreground text-sm md:text-base">
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

 {/* Phone Mockup - Hidden on mobile */}
 <div className="hidden lg:flex flex-shrink-0 flex-col items-center sticky top-24 h-fit ml-8">
 <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: 'rgb(248, 248, 249)' }}>
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
 <div className="rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
 `${
 import.meta.env.VITE_API_URL || "http://localhost:4000"
 }/scan/${generatedQR.slug}`,
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
 className="mt-3 text-xs text-primary underline "
 >
 {isStaticQR ? "Test website" : "Test scan URL"}
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
 </div>
 );

 const renderStep3 = () => (
 <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full px-4 md:px-10 justify-between">
 {/* Mobile Preview Area - Top */}
 <div className="lg:hidden w-full mb-6">
 <div className="rounded-2xl shadow-lg p-6" style={{ backgroundColor: 'rgb(248, 248, 249)' }}>
 <div className="flex items-center justify-center mb-4">
 <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm">
 <svg
 focusable={false}
 aria-hidden="true"
 viewBox="0 0 24 24"
 className="w-4 h-4"
 style={{ fill: 'none' }}
 >
 <rect width="16" height="16" x="4" y="4" stroke="currentColor" strokeWidth="2" rx="1"></rect>
 <path d="M7 11.444V7h4.444v4.444H7Zm1.111-1.11h2.222V8.11H8.111v2.222ZM7 17v-4.444h4.444V17H7Zm1.111-1.111h2.222v-2.222H8.111v2.222Zm4.445-4.445V7H17v4.444h-4.444Zm1.11-1.11h2.223V8.11h-2.222v2.222ZM15.89 17v-1.111H17V17h-1.111Zm-3.333-3.333v-1.111h1.11v1.11h-1.11Zm1.11 1.11v-1.11h1.112v1.11h-1.111Zm-1.11 1.112v-1.111h1.11v1.11h-1.11ZM13.666 17v-1.111h1.112V17h-1.111Zm1.112-1.111v-1.111h1.11v1.11h-1.11Zm0-2.222v-1.111h1.11v1.11h-1.11Zm1.11 1.11v-1.11H17v1.11h-1.111Z" fill="currentColor"></path>
 </svg>
 <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
 Final Preview
 </h3>
 </div>
 </div>
 <div className="flex justify-center">
 {generatedQR && (
 <div className="flex flex-col items-center gap-3">
 <div className="bg-white p-4 rounded-xl shadow-md">
 {renderQRWithDesign(
 generatedQR.scanUrl ||
 `${
 import.meta.env.VITE_API_URL || "http://localhost:4000"
 }/scan/${generatedQR.slug}`,
 qrDesignOptions,
 {
 width: 140,
 height: 140,
 }
 )}
 </div>
 {generatedQR.scanUrl && (
 <a
 href={generatedQR.scanUrl}
 target="_blank"
 rel="noreferrer"
 className="inline-flex items-center gap-1 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-primary shadow-sm"
 >
 <span>{isStaticQR ? "Test Website" : "Test Scan"}</span>
 <svg
 className="w-3 h-3"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M14 5l7 7m0 0l-7 7m7-7H3"
 />
 </svg>
 </a>
 )}
 </div>
 )}
 </div>
 </div>
 </div>

 {/* Main Content */}
 <div className="flex-1 w-full lg:max-w-4xl">
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
 <div className="rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
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
 className={` cursor-pointer group relative ${
 isApplied
 ? "border-2 border-primary bg-primary/5"
 : "border border-gray-200 "
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
 className={`font-medium ${
 isApplied
 ? "text-primary"
 : ""
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
 className={`w-full ${
 isApplied
 ? "border-primary text-primary "
 : "group-"
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
 {isStaticQR ? "Test your website:" : "Test your QR code:"}
 </p>
 <a
 href={generatedQR.scanUrl}
 target="_blank"
 rel="noreferrer"
 className="text-sm text-blue-600 underline "
 >
 {isStaticQR ? "Open website →" : "Open scan URL →"}
 </a>
 </div>
 )}
 </div>
 </div>

 {/* Phone Mockup - Hidden on mobile, shown on large screens */}
 <div className="hidden lg:flex flex-shrink-0 flex-col items-center sticky top-24 h-fit ml-8">
 <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: 'rgb(248, 248, 249)' }}>
 <div className="mb-6">
 <div className="flex items-center justify-center gap-2">
 <svg
 focusable={false}
 aria-hidden="true"
 viewBox="0 0 24 24"
 className="w-5 h-5"
 style={{ fill: 'none' }}
 >
 <rect width="16" height="16" x="4" y="4" stroke="currentColor" strokeWidth="2" rx="1"></rect>
 <path d="M7 11.444V7h4.444v4.444H7Zm1.111-1.11h2.222V8.11H8.111v2.222ZM7 17v-4.444h4.444V17H7Zm1.111-1.111h2.222v-2.222H8.111v2.222Zm4.445-4.445V7H17v4.444h-4.444Zm1.11-1.11h2.223V8.11h-2.222v2.222ZM15.89 17v-1.111H17V17h-1.111Zm-3.333-3.333v-1.111h1.11v1.11h-1.11Zm1.11 1.11v-1.11h1.112v1.11h-1.111Zm-1.11 1.112v-1.111h1.11v1.11h-1.11ZM13.666 17v-1.111h1.112V17h-1.111Zm1.112-1.111v-1.111h1.11v1.11h-1.11Zm0-2.222v-1.111h1.11v1.11h-1.11Zm1.11 1.11v-1.11H17v1.11h-1.111Z" fill="currentColor"></path>
 </svg>
 <h3 className="text-xl font-semibold text-center">Final Preview</h3>
 </div>
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
 `${
 import.meta.env.VITE_API_URL || "http://localhost:4000"
 }/scan/${generatedQR.slug}`,
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
 className="mt-3 text-xs text-primary underline "
 >
 {isStaticQR ? "Test website" : "Test scan URL"}
 </a>
 )}
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 );

 return (
 <div className="min-h-screen bg-white">
 <div className="max-w-[1600px] mx-auto py-4 md:py-8 px-4 md:px-6">
 <NewQRHeader
 currentStep={currentStep}
 loading={loading}
 hasSelectedType={!!selectedQRType}
 hasGeneratedQR={!!generatedQR}
 onStepClick={handleStepClick}
 onBack={() => setCurrentStep((s) => Math.max(1, s - 1))}
 onNext={() => {
 if (currentStep === 1) {
 if (selectedQRType) setCurrentStep(2);
 } else if (currentStep === 2) {
 handleNextFromStep2();
 }
 }}
 onComplete={handleCompleteQR}
 />
 <div className="">
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
