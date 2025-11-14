import React, { useState } from "react";
import { type QRDesignOptions } from "@/lib/qr-design-utils";

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

export interface QRDesignComponentProps {
  qrImage?: string;
  options: QRDesignOptions;
  onOptionsChange: (options: QRDesignOptions) => void;
  className?: string;
  showPreview?: boolean;
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

const shapeOptions = [
  { id: 1, name: "Square", preview: "■" },
  { id: 2, name: "Rounded", preview: "●" },
  { id: 3, name: "Dots", preview: "•" },
  { id: 4, name: "Circle", preview: "◯" },
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

const designTabs = ["Frame", "Shape", "Logo", "Level"];

// QR positioning logic for different frames
const getQRPosition = (frameId: number) => {
  switch (frameId) {
    case 2: // Card
      return {
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 1.25,
      };
    case 3: // Scooter
      return {
        top: "27%",
        left: "27%",
        transform: "translate(-50%, -50%)",
        scale: 1.2,
      };
    case 4: // Juice
      return {
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 1.5,
      };
    case 5: // Gift Wrapper
      return {
        top: "41%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 1.52,
      };
    case 6: // Cup
      return {
        top: "49%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 1.18,
      };
    case 7: // Text Tab
      return {
        top: "62%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 1.58,
      };
    case 8: // Tab
      return {
        top: "39%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 1.73,
      };
    case 9: // Clipboard
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.7,
      };
    case 10: // Clipped Text
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.7,
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

// Realistic QR code pattern for mock display
const mockQRMatrix = [
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
  [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1],
];

const QRDesignComponent: React.FC<QRDesignComponentProps> = ({
  qrImage,
  options,
  onOptionsChange,
  className = "",
  showPreview = true,
}) => {
  const [activeDesignTab, setActiveDesignTab] = useState("Frame");

  const updateOption = (key: keyof QRDesignOptions, value: number) => {
    onOptionsChange({ ...options, [key]: value });
  };

  const renderQRPattern = () => {
    const selectedShapeData = shapeOptions.find((s) => s.id === options.shape);
    const selectedLevelData = levelOptions.find((l) => l.id === options.level);

    // Blur effect based on level (Low = more blur, High = less blur)
    const blurAmount =
      selectedLevelData?.id === 1
        ? "blur-[1px]"
        : selectedLevelData?.id === 2
        ? "blur-[0.5px]"
        : selectedLevelData?.id === 3
        ? "blur-[0.2px]"
        : "";

    const pattern = [];
    const size = 21;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const i = row * size + col;
        const isBlack = mockQRMatrix[row][col] === 1;

        if (selectedShapeData?.name === "Square") {
          pattern.push(
            <div
              key={i}
              className={`w-1 h-1 ${
                isBlack ? "bg-gray-900" : "bg-white"
              } ${blurAmount}`}
            ></div>
          );
        } else if (selectedShapeData?.name === "Rounded") {
          pattern.push(
            <div
              key={i}
              className={`w-1 h-1 rounded-sm ${
                isBlack ? "bg-gray-900" : "bg-white"
              } ${blurAmount}`}
            ></div>
          );
        } else if (selectedShapeData?.name === "Dots") {
          pattern.push(
            <div
              key={i}
              className={`w-1 h-1 rounded-full ${
                isBlack ? "bg-gray-900" : "bg-white"
              } ${blurAmount}`}
            ></div>
          );
        } else if (selectedShapeData?.name === "Circle") {
          pattern.push(
            <div
              key={i}
              className={`w-1 h-1 rounded-full ${
                isBlack ? "bg-gray-900" : "bg-white"
              } ${blurAmount}`}
              style={{ transform: isBlack ? "scale(1)" : "scale(0.3)" }}
            ></div>
          );
        }
      }
    }
    return pattern;
  };

  const renderQRWithFrame = () => {
    const selectedFrameData = frameOptions.find((f) => f.id === options.frame);
    const selectedLogoData = logoOptions.find((l) => l.id === options.logo);

    // Use provided QR image if available, otherwise show mock pattern
    const qrCode = qrImage ? (
      <img src={qrImage} alt="Generated QR Code" className="w-32 h-32" />
    ) : (
      <div
        className="grid grid-cols-21 gap-[1px]"
        style={{ gridTemplateColumns: "repeat(21, minmax(0, 1fr))" }}
      >
        {renderQRPattern()}
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
        <div className="relative w-48 h-48 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
          {qrCode}
          {logoOverlay}
        </div>
      );
    }

    // With Frame - position QR based on frame type
    const qrPosition = getQRPosition(selectedFrameData.id);

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

  const renderDesignOptions = () => {
    // Mini professional QR pattern for thumbnails
    const miniQRPattern = [
      [1, 1, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1],
      [0, 0, 0, 1, 0, 1, 0, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [1, 1, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1],
    ];

    switch (activeDesignTab) {
      case "Frame":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {frameOptions.map((frame) => (
              <button
                key={frame.id}
                onClick={() => updateOption("frame", frame.id)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  options.frame === frame.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mb-2">
                  {frame.icon ? (
                    <img
                      src={frame.icon}
                      alt={frame.name}
                      className="w-12 h-12"
                      style={{
                        filter:
                          "invert(46%) sepia(0%) saturate(0%) hue-rotate(212deg) brightness(94%) contrast(88%)",
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-white border border-gray-300 rounded flex items-center justify-center">
                      <div
                        className="grid gap-[1px]"
                        style={{
                          gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
                        }}
                      >
                        {miniQRPattern.flat().map((cell, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 ${
                              cell ? "bg-gray-900" : "bg-white"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-600 text-center">
                  {frame.name}
                </span>
              </button>
            ))}
          </div>
        );

      case "Shape":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {shapeOptions.map((shape) => (
              <button
                key={shape.id}
                onClick={() => updateOption("shape", shape.id)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  options.shape === shape.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-white border border-gray-300 rounded flex items-center justify-center p-1">
                    <div
                      className="grid gap-[1px]"
                      style={{
                        gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
                      }}
                    >
                      {miniQRPattern.flat().map((cell, i) => {
                        const isBlack = cell === 1;
                        if (shape.name === "Square") {
                          return (
                            <div
                              key={i}
                              className={`w-1 h-1 ${
                                isBlack ? "bg-gray-900" : "bg-white"
                              }`}
                            />
                          );
                        } else if (shape.name === "Rounded") {
                          return (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-sm ${
                                isBlack ? "bg-gray-900" : "bg-white"
                              }`}
                            />
                          );
                        } else if (shape.name === "Dots") {
                          return (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                isBlack ? "bg-gray-900" : "bg-white"
                              }`}
                            />
                          );
                        } else if (shape.name === "Circle") {
                          return (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                isBlack ? "bg-gray-900" : "bg-white"
                              }`}
                              style={{
                                transform: isBlack ? "scale(1)" : "scale(0.3)",
                              }}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-600 text-center">
                  {shape.name}
                </span>
              </button>
            ))}
          </div>
        );

      case "Logo":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {logoOptions.map((logo) => (
              <button
                key={logo.id}
                onClick={() => updateOption("logo", logo.id)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  options.logo === logo.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mb-2">
                  {logo.icon ? (
                    <img
                      src={logo.icon}
                      alt={logo.name}
                      className="w-10 h-10"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">None</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-600 text-center">
                  {logo.name}
                </span>
              </button>
            ))}
          </div>
        );

      case "Level":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {levelOptions.map((level) => (
              <button
                key={level.id}
                onClick={() => updateOption("level", level.id)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  options.level === level.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-white border border-gray-300 rounded flex items-center justify-center p-1">
                    <div
                      className={`grid gap-[1px] ${
                        level.id === 1
                          ? "blur-[1px]"
                          : level.id === 2
                          ? "blur-[0.5px]"
                          : level.id === 3
                          ? "blur-[0.2px]"
                          : ""
                      }`}
                      style={{
                        gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
                      }}
                    >
                      {miniQRPattern.flat().map((cell, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 ${
                            cell ? "bg-gray-900" : "bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-600 text-center">
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
    <div className={`space-y-4 ${className}`}>
      {/* QR Preview - conditionally rendered */}
      {showPreview && (
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 min-h-[280px]">
          {renderQRWithFrame()}
        </div>
      )}

      {/* Design Tab Navigation */}
      <div className="flex gap-1 border-b border-gray-200">
        {designTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveDesignTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
              activeDesignTab === tab
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Design Options */}
      <div className="bg-gray-50 rounded-lg p-4">{renderDesignOptions()}</div>
    </div>
  );
};

export default QRDesignComponent;
