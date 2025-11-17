import { useState, useEffect, useRef } from "react";
import { toDataURL } from "qrcode";
import QRCodeStyling from "qr-code-styling";
import { GoogleAuthSection } from "../../components/GoogleAuthSection";
import { api, tokenStorage } from "../../lib/api";

// SVG asset paths for frames
const CardIcon = "/assets/card.svg";
const ScooterIcon = "/assets/scooter.svg";
const JuiceIcon = "/assets/juice.svg";
const GiftWrapperIcon = "/assets/gift-wrapper.svg";
const CupIcon = "/assets/cup.svg";
const TextThenTabIcon = "/assets/text-then-tab.svg";
const TabIcon = "/assets/tab.svg";
const ClipboardIcon = "/assets/clipboard.svg";
const ClippedTextIcon = "/assets/clipped-text.svg";

const QRCodeSVG = "/QR_code.svg";

// SVG asset paths for logos
const WhatsappIcon = "/assets/whatsapp.svg";
const LocationIcon = "/assets/location.svg";
const LinkIcon = "/assets/link.svg";
const ScanIcon = "/assets/scan.svg";
const WifiIcon = "/assets/wifi.svg";
const EmailIcon = "/assets/email.svg";

export function Hero() {
  const tabs = ["Website", "Text", "PDF", "Images", "vCard Plus", "Video"];
  const designTabs = ["Frame", "Shape", "Logo", "Level"];

  // Frame options with SVG icons
  const frameOptions = [
    { id: 1, name: "No Frame", icon: null },
    { id: 2, name: "Card", icon: CardIcon },
    { id: 3, name: "Scooter", icon: ScooterIcon },
    { id: 4, name: "Juice", icon: JuiceIcon },
    { id: 5, name: "Gift Wrapper", icon: GiftWrapperIcon },
    { id: 6, name: "Cup", icon: CupIcon },
    { id: 7, name: "Text Tab", icon: TextThenTabIcon },
    { id: 8, name: "Tab", icon: TabIcon },
    { id: 9, name: "Clipboard", icon: ClipboardIcon },
    { id: 10, name: "Clipped Text", icon: ClippedTextIcon },
  ];

  const shapeOptions = [
    { id: 1, name: "Square", preview: "■", value: "square" as const },
    { id: 2, name: "Dots", preview: "•", value: "dots" as const },
    { id: 3, name: "Rounded", preview: "●", value: "rounded" as const },
    { id: 4, name: "Extra Rounded", preview: "◯", value: "extra-rounded" as const },
  ];

  const logoOptions = [
    { id: 0, name: "None", icon: null },
    { id: 1, name: "WhatsApp", icon: WhatsappIcon },
    { id: 2, name: "Location", icon: LocationIcon },
    { id: 3, name: "Link", icon: LinkIcon },
    { id: 4, name: "Scan", icon: ScanIcon },
    { id: 5, name: "WiFi", icon: WifiIcon },
    { id: 6, name: "Email", icon: EmailIcon },
  ];

  const levelOptions = [
    { id: 1, name: "Low", value: "L" },
    { id: 2, name: "Medium", value: "M" },
    { id: 3, name: "Quality", value: "Q" },
    { id: 4, name: "High", value: "H" },
  ];

  const [activeTab, setActiveTab] = useState("Website");
  const [activeDesignTab, setActiveDesignTab] = useState("Frame");
  const [selectedFrame, setSelectedFrame] = useState(1);
  const [selectedShape, setSelectedShape] = useState(1);
  const [selectedLogo, setSelectedLogo] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(2);

  // State for input values
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [textContent, setTextContent] = useState("");

  // State for generated QR
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Debounce timer ref (browser setTimeout returns a number)
  const debounceTimer = useRef<number | null>(null);

  // Download QR code function
  const downloadQRCode = () => {
    if (!generatedQR) return;

    const link = document.createElement("a");
    link.href = generatedQR;
    link.download = `qr-code-${activeTab.toLowerCase()}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Auto-generate QR when content changes (with debounce)
  useEffect(() => {
    // Clear existing timer
    if (debounceTimer.current) {
      window.clearTimeout(debounceTimer.current);
    }

    // Check if there's content to generate
    const hasContent =
      (activeTab === "Website" && websiteUrl.trim()) ||
      (activeTab === "Text" && textContent.trim());

    if (hasContent) {
      // Set new timer to generate after 500ms of no typing
      debounceTimer.current = window.setTimeout(() => {
        generateQRCode();
      }, 500);
    } else {
      // Clear QR if no content
      setGeneratedQR(null);
    }

    // Cleanup
    return () => {
      if (debounceTimer.current) {
        window.clearTimeout(debounceTimer.current);
      }
    };
  }, [websiteUrl, textContent, activeTab, selectedLevel, selectedShape, selectedLogo]);

  const generateLocalQRCode = async (value: string, level: "L" | "M" | "Q" | "H") => {
    try {
      const selectedShapeData = shapeOptions.find((s) => s.id === selectedShape);
      const selectedLogoData = logoOptions.find((l) => l.id === selectedLogo);

      // Get the shape type, default to square
      const shapeType = selectedShapeData?.value || "square";

      // Convert relative logo path to absolute URL if logo is selected
      const logoUrl = selectedLogoData?.icon ? `${window.location.origin}${selectedLogoData.icon}` : null;

      // Build config conditionally - don't pass image properties if no logo
      const qrConfig: any = {
        width: 512,
        height: 512,
        type: "canvas",
        data: value,
        margin: 1,
        qrOptions: {
          typeNumber: 0,
          mode: "Byte",
          errorCorrectionLevel: level
        },
        dotsOptions: {
          color: "#000000",
          type: shapeType
        },
        cornersSquareOptions: {
          color: "#000000",
          type: shapeType === "dots" ? "dot" : shapeType
        },
        cornersDotOptions: {
          color: "#000000",
          type: shapeType === "dots" ? "dot" : shapeType
        }
      };

      // Only add image properties when logo is selected
      if (logoUrl) {
        qrConfig.image = logoUrl;
        qrConfig.imageOptions = {
          hideBackgroundDots: true,
          imageSize: 0.3,
          margin: 0,
          crossOrigin: "anonymous",
        };
      }

      const qrCode = new QRCodeStyling(qrConfig);

      const blob = await qrCode.getRawData("png");
      if (blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGeneratedQR(reader.result as string);
        };
        reader.readAsDataURL(blob);
      }
    } catch (localError) {
      console.error("Local QR generation failed:", localError);
      setGeneratedQR(null);
    }
  };

  // Generate QR code function
  const generateQRCode = async () => {
    let content = "";

    if (activeTab === "Website") {
      if (!websiteUrl) {
        setGeneratedQR(null);
        return;
      }
      content = websiteUrl;
    } else if (activeTab === "Text") {
      if (!textContent) {
        setGeneratedQR(null);
        return;
      }
      content = textContent;
    } else {
      // Other types not implemented yet
      setGeneratedQR(null);
      return;
    }

    setIsGenerating(true);

    const levelData = levelOptions.find((l) => l.id === selectedLevel);
    const errorCorrection = (levelData?.value || "M") as "L" | "M" | "Q" | "H";

    // Always use local generation for custom shapes and logos
    // API doesn't support these customizations yet
    try {
      await generateLocalQRCode(content, errorCorrection);
    } catch (error: any) {
      console.error("Error generating QR code:", error);
      setGeneratedQR(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Website":
        return (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your Website
            </label>
            <input
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E.g. https://www.myweb.com/"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          </>
        );
      case "Text":
        return (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your text
            </label>
            <textarea
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message here..."
              rows={1}
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />
          </>
        );
      case "PDF":
        return (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload your PDF
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-3 text-base"
            />
          </>
        );
      case "Images":
        return (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload your image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-3 text-base"
            />
          </>
        );
      case "vCard Plus":
        return (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fill in your contact details
            </label>
            <input
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-2.5 text-base mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
            <input
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-2.5 text-base mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Phone"
            />
            <input
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </>
        );
      case "Video":
        return (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste your video link
            </label>
            <input
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E.g. https://youtube.com/..."
            />
          </>
        );
      default:
        return null;
    }
  };

  // QR Code rendering - now using SVG
  const renderQRPattern = () => {
    return (
      <img 
        src={QRCodeSVG} 
        alt="QR Code" 
        className="w-32 h-32"
      />
    );
  };

  // Frame wrapper for QR code
  const renderQRWithFrame = () => {
    const selectedFrameData = frameOptions.find((f) => f.id === selectedFrame);
    const selectedLogoData = logoOptions.find((l) => l.id === selectedLogo);
    const selectedLevelData = levelOptions.find((l) => l.id === selectedLevel);

    // Blur effect based on level (Low = more blur, High = less blur)
    const blurAmount =
      selectedLevelData?.id === 1
        ? "blur-[1px]"
        : selectedLevelData?.id === 2
        ? "blur-[0.5px]"
        : selectedLevelData?.id === 3
        ? "blur-[0.2px]"
        : "";

    // Use generated QR if available, otherwise show SVG
    const qrCode = generatedQR ? (
      <img
        src={generatedQR}
        alt="Generated QR Code"
        className={`w-full h-full object-contain ${blurAmount}`}
      />
    ) : (
      <img
        src={QRCodeSVG}
        alt="QR Code"
        className={`w-full h-full object-contain ${blurAmount}`}
      />
    );

    // Logo overlay - only show when using SVG fallback (not generated QR)
    // When using generated QR, the logo is already embedded by qr-code-styling
    const logoOverlay = !generatedQR && selectedLogoData?.icon && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 flex items-center justify-center">
          <img src={selectedLogoData.icon} alt={selectedLogoData.name} className="w-full h-full object-contain" />
        </div>
      </div>
    );

    // No Frame - just QR with logo overlay
    if (selectedFrameData?.id === 1 || !selectedFrameData?.icon) {
      return (
        <div className="relative w-48 h-48 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
          {qrCode}
          {logoOverlay}
        </div>
      );
    }

    // With Frame - position QR based on frame type
    // Each frame has a specific area where the QR should be positioned
    const getQRPosition = () => {
      switch (selectedFrameData?.id) {
        case 2: // Card
          return { top: '40%', left: '50%', transform: 'translate(-50%, -50%)', scale: 1.10 };
        case 3: // Scooter
          return { top: '27%', left: '27%', transform: 'translate(-50%, -50%)', scale: 1 };
        case 4: // Juice
          return { top: '60%', left: '50%', transform: 'translate(-50%, -50%)', scale: 1 };
        case 5: // Gift Wrapper
          return { top: '41%', left: '50%', transform: 'translate(-50%, -50%)', scale: 1.1 };
        case 6: // Cup
          return { top: '49%', left: '50%', transform: 'translate(-50%, -50%)', scale: 0.9 };
        case 7: // Text Tab
          return { top: '62%', left: '50%', transform: 'translate(-50%, -50%)', scale: 1.1 };
        case 8: // Tab
          return { top: '39%', left: '50%', transform: 'translate(-50%, -50%)', scale: 1.3 };
        case 9: // Clipboard
          return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', scale: 1.2 };
        case 10: // Clipped Text
          return { top: '40%', left: '50%', transform: 'translate(-50%, -50%)', scale: 1.15 };
        default:
          return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', scale: 1 };
      }
    };

    const qrPosition = getQRPosition();

    return (
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Frame SVG as background */}
        <img
          src={selectedFrameData.icon}
          alt={selectedFrameData.name}
          className="absolute inset-0 w-full h-full object-contain"
        />
        {/* QR Code overlaid on frame */}
        <div
          className="absolute z-10 w-32 h-32"
          style={{
            top: qrPosition.top,
            left: qrPosition.left,
            transform: `${qrPosition.transform} scale(${qrPosition.scale})`,
          }}
        >
          {qrCode}
        </div>
        {/* Logo overlay */}
        {logoOverlay && (
          <div 
            className="absolute"
            style={{
              top: qrPosition.top,
              left: qrPosition.left,
              transform: `${qrPosition.transform} scale(${qrPosition.scale})`,
            }}
          >
            {logoOverlay}
          </div>
        )}
      </div>
    );
  };

  const renderDesignOptions = () => {

    switch (activeDesignTab) {
      case "Frame":
        return (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {frameOptions.map((frame) => (
              <button
                key={frame.id}
                onClick={() => setSelectedFrame(frame.id)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all flex-shrink-0 ${
                  selectedFrame === frame.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center mb-2">
                  {frame.icon ? (
                    <img
                      src={frame.icon}
                      alt={frame.name}
                      className="w-16 h-16"
                      style={{ filter: "invert(46%) sepia(0%) saturate(0%) hue-rotate(212deg) brightness(94%) contrast(88%)" }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-white border border-gray-300 rounded flex items-center justify-center p-1">
                      <img 
                        src={QRCodeSVG} 
                        alt="QR Code" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-600">
                  {frame.name}
                </span>
              </button>
            ))}
          </div>
        );
      case "Shape":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {shapeOptions.map((shape) => (
              <button
                key={shape.id}
                onClick={() => setSelectedShape(shape.id)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  selectedShape === shape.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center mb-2">
                  <div className="w-16 h-16 bg-white border border-gray-300 rounded flex items-center justify-center p-1">
                    <img 
                      src={QRCodeSVG} 
                      alt="QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-600">
                  {shape.name}
                </span>
              </button>
            ))}
          </div>
        );
      case "Logo":
        return (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {logoOptions.map((logo) => (
              <button
                key={logo.id}
                onClick={() => setSelectedLogo(logo.id)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all flex-shrink-0 ${
                  selectedLogo === logo.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center mb-2">
                  {logo.icon ? (
                    <img
                      src={logo.icon}
                      alt={logo.name}
                      className="w-14 h-14"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-white border border-gray-300" />
                  )}
                </div>
                <span className="text-sm text-gray-600">
                  {logo.name}
                </span>
              </button>
            ))}
          </div>
        );
      case "Level":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {levelOptions.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  selectedLevel === level.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center mb-2">
                  <div className="w-16 h-16 bg-white border border-gray-300 rounded flex items-center justify-center p-1">
                    <img 
                      src={QRCodeSVG} 
                      alt="QR Code" 
                      className={`w-full h-full object-contain ${
                        level.id === 1
                          ? "blur-[1px]"
                          : level.id === 2
                          ? "blur-[0.5px]"
                          : level.id === 3
                          ? "blur-[0.2px]"
                          : ""
                      }`}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-600">
                  {level.name}
                </span>
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      className="w-full px-4 md:px-8 lg:px-16 py-16"
      style={{ backgroundColor: "#F3F3FF" }}
    >
      <div
        className="mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-4 overflow-hidden"
        style={{
          width: "980px",
          height: "560px",
          flexShrink: 0,
          aspectRatio: "88/49",
        }}
      >
        {/* Main Tabs */}
        <div className="flex flex-nowrap gap-3 mb-6 pb-4 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-6 py-3 rounded text-base font-medium transition-all whitespace-nowrap flex-1 justify-center ${
                activeTab === tab
                  ? "bg-gray-100 text-blue-600"
                  : "text-blue-600 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {tab === "Website" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9"
                  />
                )}
                {tab === "Text" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                )}
                {tab === "PDF" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                )}
                {tab === "Images" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                )}
                {tab === "vCard Plus" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                )}
                {tab === "Video" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                )}
              </svg>
              <span>{tab}</span>
            </button>
          ))}
        </div>

        {/* Content area with Step 1 & 2 on left, Step 3 on right */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-4"
        >
          {/* Left Column - Step 1 and Step 2 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Complete the content */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1">
                <span className="flex items-center justify-center w-5 h-5 bg-gray-900 text-white rounded text-xs font-bold">
                  1
                </span>
                Complete the content
              </h3>
              {renderContent()}
            </div>

            {/* Step 2: Design your QR */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1">
                <span className="flex items-center justify-center w-5 h-5 bg-gray-900 text-white rounded text-xs font-bold">
                  2
                </span>
                Design your QR
              </h3>

              {/* Design Sub-tabs */}
              <div className="flex gap-1 mb-2 overflow-x-auto">
                {designTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDesignTab(tab)}
                    className={`px-2 py-1 text-xs font-medium rounded transition-all whitespace-nowrap ${
                      activeDesignTab === tab
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Design Options Grid */}
              <div className="bg-gray-50 rounded p-2">
                {renderDesignOptions()}
              </div>
            </div>
          </div>

          {/* Right Column - Step 3: Download your QR */}
          <div className="lg:col-span-1 flex flex-col overflow-hidden space-y-4">
            <h3 className="flex items-center gap-1 text-sm font-semibold text-gray-600 mb-2 flex-shrink-0">
              <span className="flex items-center justify-center w-5 h-5 bg-gray-500 text-white rounded text-xs font-bold">
                3
              </span>
              Download your QR
            </h3>

            {/* QR Code Preview */}
            <div className="flex items-center justify-center bg-gray-50 rounded p-2 mb-2 flex-1 min-h-0 overflow-hidden">
              {renderQRWithFrame()}
            </div>

            {/* Download Button */}
            <div className="flex-shrink-0">
              <button
                onClick={downloadQRCode}
                disabled={!generatedQR}
                className="w-full px-6 py-3 bg-transparent border border-gray-300 hover:border-gray-400 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 font-medium rounded-full transition-all flex items-center justify-center gap-1 text-xs"
              >
                Download QR
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Google Auth Section */}
      <div
        className="flex justify-center"
        style={{ marginTop: "160px", marginBottom: "8px" }}
      >
        <GoogleAuthSection />
      </div>
    </section>
  );
}
