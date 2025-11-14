// SVG asset paths for frames
const frameAssets = {
  card: "/assets/card.svg",
  scooter: "/assets/scooter.svg",
  juice: "/assets/juice.svg",
  giftWrapper: "/assets/gift-wrapper.svg",
  cup: "/assets/cup.svg",
  textThenTab: "/assets/text-then-tab.svg",
  tab: "/assets/tab.svg",
  clipboard: "/assets/clipboard.svg",
  clippedText: "/assets/clipped-text.svg",
};

// SVG asset paths for logos
const logoAssets = {
  whatsapp: "/assets/whatsapp.svg",
  location: "/assets/location.svg",
  link: "/assets/link.svg",
  scan: "/assets/scan.svg",
  wifi: "/assets/wifi.svg",
  email: "/assets/email.svg",
};

export interface QRDesignOptions {
  frame: number;
  shape: number;
  logo: number;
  level: number;
}

const frameOptions = [
  { id: 1, name: "No Frame", icon: null },
  { id: 2, name: "Card", icon: frameAssets.card },
  { id: 3, name: "Scooter", icon: frameAssets.scooter },
  { id: 4, name: "Juice", icon: frameAssets.juice },
  { id: 5, name: "Gift Wrapper", icon: frameAssets.giftWrapper },
  { id: 6, name: "Cup", icon: frameAssets.cup },
  { id: 7, name: "Text Tab", icon: frameAssets.textThenTab },
  { id: 8, name: "Tab", icon: frameAssets.tab },
  { id: 9, name: "Clipboard", icon: frameAssets.clipboard },
  { id: 10, name: "Clipped Text", icon: frameAssets.clippedText },
];

const logoOptions = [
  { id: 0, name: "None", icon: null },
  { id: 1, name: "WhatsApp", icon: logoAssets.whatsapp },
  { id: 2, name: "Location", icon: logoAssets.location },
  { id: 3, name: "Link", icon: logoAssets.link },
  { id: 4, name: "Scan", icon: logoAssets.scan },
  { id: 5, name: "WiFi", icon: logoAssets.wifi },
  { id: 6, name: "Email", icon: logoAssets.email },
];

const levelOptions = [
  { id: 1, name: "Low", value: "L" },
  { id: 2, name: "Medium", value: "M" },
  { id: 3, name: "Quality", value: "Q" },
  { id: 4, name: "High", value: "H" },
];

// QR positioning logic for different frames
const getQRPosition = (frameId: number) => {
  switch (frameId) {
    case 2: // Card
      return {
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.8,
      };
    case 3: // Scooter
      return {
        top: "27%",
        left: "27%",
        transform: "translate(-50%, -50%)",
        scale: 0.6,
      };
    case 4: // Juice
      return {
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.75,
      };
    case 5: // Gift Wrapper
      return {
        top: "41%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.7,
      };
    case 6: // Cup
      return {
        top: "49%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.65,
      };
    case 7: // Text Tab
      return {
        top: "62%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.8,
      };
    case 8: // Tab
      return {
        top: "39%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.85,
      };
    case 9: // Clipboard
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.45,
      };
    case 10: // Clipped Text
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.45,
      };
    default:
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 1,
      };
  }
};

// Export the QR rendering function for use in other components
export const renderQRWithDesign = (
  qrImage: string | undefined,
  options: QRDesignOptions,
  size: { width: string; height: string } = { width: "w-32", height: "h-32" }
) => {
  const selectedFrameData = frameOptions.find((f) => f.id === options.frame);
  const selectedLogoData = logoOptions.find((l) => l.id === options.logo);
  const selectedLevelData = levelOptions.find((l) => l.id === options.level);

  // Blur effect based on level
  const blurAmount =
    selectedLevelData?.id === 1
      ? "blur-[1px]"
      : selectedLevelData?.id === 2
      ? "blur-[0.5px]"
      : selectedLevelData?.id === 3
      ? "blur-[0.2px]"
      : "";

  // Shape-specific classes for QR code
  const getShapeClass = (shapeId: number) => {
    switch (shapeId) {
      case 2: // Rounded
        return "rounded-md";
      case 3: // Dots
        return "rounded-lg";
      case 4: // Circle
        return "rounded-full";
      default: // Square
        return "";
    }
  };

  // Use provided QR image if available, otherwise show mock pattern
  const qrCode = qrImage ? (
    <img
      src={qrImage}
      alt="Generated QR Code"
      className={`${size.width} ${size.height} ${blurAmount} ${getShapeClass(
        options.shape
      )}`}
      style={{
        imageRendering:
          options.shape === 3 || options.shape === 4 ? "auto" : "pixelated",
      }}
    />
  ) : (
    <div
      className={`w-32 h-32 bg-gray-200 ${getShapeClass(
        options.shape
      )} flex items-center justify-center`}
    >
      <span className="text-gray-400 text-xs">No QR</span>
    </div>
  );

  // Logo overlay
  const logoOverlay = selectedLogoData?.icon && (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200 p-1.5">
        <img
          src={selectedLogoData.icon}
          alt={selectedLogoData.name}
          className="w-full h-full"
        />
      </div>
    </div>
  );

  // No Frame - just QR
  if (selectedFrameData?.id === 1 || !selectedFrameData?.icon) {
    return (
      <div
        className="relative bg-white rounded-lg shadow-lg flex items-center justify-center p-4"
        style={{ width: "180px", height: "180px" }}
      >
        {qrCode}
        {logoOverlay}
      </div>
    );
  }

  // With Frame - position QR based on frame type
  const qrPosition = getQRPosition(selectedFrameData.id);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: "180px", height: "180px" }}
    >
      {/* Frame SVG as background */}
      <img
        src={selectedFrameData.icon}
        alt={selectedFrameData.name}
        className="absolute inset-0 w-full h-full object-contain"
      />
      {/* QR Code overlaid on frame */}
      <div
        className="absolute z-10"
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
          className="absolute z-20"
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
