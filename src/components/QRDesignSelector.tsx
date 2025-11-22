import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  type QRDesignOptions,
  dotStyleOptions,
  bgColorOptions,
  outerBorderOptions,
} from "@/lib/qr-design-utils";

interface QRDesignSelectorProps {
  designOptions: QRDesignOptions;
  onDesignChange: (options: QRDesignOptions) => void;
  compact?: boolean;
}

const QRDesignSelector: React.FC<QRDesignSelectorProps> = ({
  designOptions,
  onDesignChange,
  compact = false,
}) => {
  const [isFrameCollapsed, setIsFrameCollapsed] = useState(true);
  const [isShapeCollapsed, setIsShapeCollapsed] = useState(true);
  const [isLogoCollapsed, setIsLogoCollapsed] = useState(true);
  const [isQualityCollapsed, setIsQualityCollapsed] = useState(true);
  const [isStyleCollapsed, setIsStyleCollapsed] = useState(true);

  const updateDesignOption = (
    key: keyof QRDesignOptions,
    value: number | string
  ) => {
    onDesignChange({
      ...designOptions,
      [key]: value,
    });
  };

  const frameOptions = [
    { id: 1, name: "No Frame", icon: null },
    { id: 2, name: "Card", icon: "/assets/card.svg" },
    { id: 3, name: "Scooter", icon: "/assets/scooter.svg" },
    { id: 4, name: "Juice", icon: "/assets/juice.svg" },
    { id: 5, name: "Gift Wrapper", icon: "/assets/gift-wrapper.svg" },
    { id: 6, name: "Cup", icon: "/assets/cup.svg" },
    { id: 7, name: "Text Tab", icon: "/assets/text-then-tab.svg" },
    { id: 8, name: "Tab", icon: "/assets/tab.svg" },
    { id: 9, name: "Clipboard", icon: "/assets/clipboard.svg" },
    { id: 10, name: "Clipped Text", icon: "/assets/clipped-text.svg" },
  ];

  const shapeOptions = [
    { id: 1, name: "Square", preview: "■" },
    { id: 2, name: "Rounded", preview: "●" },
    { id: 3, name: "Dots", preview: "•" },
    { id: 4, name: "Circle", preview: "◯" },
  ];

  const logoOptions = [
    { id: 0, name: "None", icon: null },
    { id: 1, name: "WhatsApp", icon: "/assets/whatsapp.svg" },
    { id: 2, name: "Location", icon: "/assets/location.svg" },
    { id: 3, name: "Link", icon: "/assets/link.svg" },
    { id: 4, name: "Scan", icon: "/assets/scan.svg" },
    { id: 5, name: "WiFi", icon: "/assets/wifi.svg" },
    { id: 6, name: "Email", icon: "/assets/email.svg" },
  ];

  const qualityOptions = [
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
  ];

  const renderShapePreview = (shapeId: number, index: number) => {
    const isPattern = [
      0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24,
    ].includes(index);
    if (!isPattern) return <div key={index} className="w-1.5 h-1.5"></div>;

    const baseClass = "w-1.5 h-1.5 bg-gray-800";
    switch (shapeId) {
      case 1:
        return <div key={index} className={baseClass}></div>;
      case 2:
        return <div key={index} className={`${baseClass} rounded-sm`}></div>;
      case 3:
        return <div key={index} className={`${baseClass} rounded-full`}></div>;
      case 4:
        return (
          <div
            key={index}
            className={`${baseClass} rounded-full border border-gray-600`}
          ></div>
        );
      default:
        return <div key={index} className={baseClass}></div>;
    }
  };

  if (compact) {
    return (
      <div className="space-y-6">
        {/* Compact Frame Section */}
        <div className="space-y-3">
          <div
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => setIsFrameCollapsed(!isFrameCollapsed)}
          >
            <h4 className="text-md font-medium group-hover:text-blue-600 transition-colors">
              Frame
            </h4>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                isFrameCollapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
          {!isFrameCollapsed && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {frameOptions.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => updateDesignOption("frame", frame.id)}
                  className={`p-2 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                    designOptions.frame === frame.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <div className="w-8 h-8 mx-auto mb-1 flex items-center justify-center bg-gray-50 rounded">
                    {frame.icon ? (
                      <img
                        src={frame.icon}
                        alt={frame.name}
                        className="w-6 h-6 object-contain"
                        style={{
                          filter:
                            "invert(46%) sepia(0%) saturate(0%) hue-rotate(212deg) brightness(94%) contrast(88%)",
                        }}
                      />
                    ) : (
                      <div className="w-6 h-6 border border-gray-400 rounded flex items-center justify-center">
                        <div className="w-4 h-4 grid grid-cols-3 gap-[1px]">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-gray-600"></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600">{frame.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Compact Shape Section */}
        <div className="space-y-3">
          <div
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => setIsShapeCollapsed(!isShapeCollapsed)}
          >
            <h4 className="text-md font-medium group-hover:text-green-600 transition-colors">
              Shape
            </h4>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                isShapeCollapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
          {!isShapeCollapsed && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {shapeOptions.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => updateDesignOption("shape", shape.id)}
                  className={`p-2 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                    designOptions.shape === shape.id
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-green-300 bg-white"
                  }`}
                >
                  <div className="mb-2">
                    <div className="grid grid-cols-5 gap-1 mx-auto w-fit">
                      {Array.from({ length: 25 }).map((_, i) =>
                        renderShapePreview(shape.id, i)
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{shape.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Compact Logo Section */}
        <div className="space-y-3">
          <div
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => setIsLogoCollapsed(!isLogoCollapsed)}
          >
            <h4 className="text-md font-medium group-hover:text-purple-600 transition-colors">
              Logo
            </h4>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                isLogoCollapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
          {!isLogoCollapsed && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-2">
              {logoOptions.map((logo) => (
                <button
                  key={logo.id}
                  onClick={() => updateDesignOption("logo", logo.id)}
                  className={`p-2 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                    designOptions.logo === logo.id
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-gray-200 hover:border-purple-300 bg-white"
                  }`}
                >
                  <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
                    {logo.icon ? (
                      <img
                        src={logo.icon}
                        alt={logo.name}
                        className="w-4 h-4 object-contain"
                        style={{
                          filter:
                            designOptions.logo === logo.id
                              ? "invert(48%) sepia(79%) saturate(2476%) hue-rotate(249deg) brightness(95%) contrast(98%)"
                              : "invert(46%) sepia(0%) saturate(0%) hue-rotate(212deg) brightness(94%) contrast(88%)",
                        }}
                      />
                    ) : (
                      <div className="w-4 h-4 border border-dashed border-gray-400 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-400">×</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600">{logo.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Compact Quality Section */}
        <div className="space-y-3">
          <div
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => setIsQualityCollapsed(!isQualityCollapsed)}
          >
            <h4 className="text-md font-medium group-hover:text-orange-600 transition-colors">
              Quality
            </h4>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                isQualityCollapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
          {!isQualityCollapsed && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {qualityOptions.map((quality) => (
                <button
                  key={quality.id}
                  onClick={() => updateDesignOption("level", quality.id)}
                  className={`p-2 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                    designOptions.level === quality.id
                      ? "border-orange-500 bg-orange-50 shadow-md"
                      : "border-gray-200 hover:border-orange-300 bg-white"
                  }`}
                >
                  <div className="text-xs font-semibold mb-1">
                    {quality.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {quality.description}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Compact QR Code Style Section */}
        <div className="space-y-3">
          <div
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => setIsStyleCollapsed(!isStyleCollapsed)}
          >
            <h4 className="text-md font-medium group-hover:text-pink-600 transition-colors">
              QR Code Style
            </h4>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                isStyleCollapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
          {!isStyleCollapsed && (
            <div className="space-y-4">
              {/* Dot Style */}
              <div>
                <h5 className="text-sm font-medium mb-2 text-gray-700">
                  Dot Style
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {dotStyleOptions.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => updateDesignOption("dotStyle", style.id)}
                      className={`p-2 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                        (designOptions.dotStyle || 1) === style.id
                          ? "border-pink-500 bg-pink-50 shadow-md"
                          : "border-gray-200 hover:border-pink-300 bg-white"
                      }`}
                    >
                      <div className="text-lg mb-1">{style.icon}</div>
                      <span className="text-xs text-gray-600">
                        {style.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Color */}
              <div>
                <h5 className="text-sm font-medium mb-2 text-gray-700">
                  Background
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {bgColorOptions.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => updateDesignOption("bgColor", color.id)}
                      className={`p-2 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                        (designOptions.bgColor || "#ffffff") === color.id
                          ? "border-pink-500 bg-pink-50 shadow-md"
                          : "border-gray-200 hover:border-pink-300 bg-white"
                      }`}
                    >
                      <div
                        className="w-6 h-6 mx-auto mb-1 rounded border border-gray-200"
                        style={{ background: color.gradient }}
                      ></div>
                      <span className="text-xs text-gray-600">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Border Style */}
              <div>
                <h5 className="text-sm font-medium mb-2 text-gray-700">
                  Border
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {outerBorderOptions.map((border) => (
                    <button
                      key={border.id}
                      onClick={() =>
                        updateDesignOption("outerBorder", border.id)
                      }
                      className={`p-2 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                        (designOptions.outerBorder || 1) === border.id
                          ? "border-pink-500 bg-pink-50 shadow-md"
                          : "border-gray-200 hover:border-pink-300 bg-white"
                      }`}
                    >
                      <div className="mb-1 flex justify-center">
                        <div
                          className="w-4 h-4 bg-gray-100 rounded-sm"
                          style={{
                            border:
                              border.style === "none"
                                ? "1px dashed #ccc"
                                : border.style
                                    .replace("2px", "1px")
                                    .replace("4px", "1px"),
                            boxShadow: border.shadow
                              ? "0 1px 2px rgba(0,0,0,0.1)"
                              : "none",
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {border.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Frame Section */}
      <div className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group">
        <div
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => setIsStyleCollapsed(!isStyleCollapsed)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white">
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable={false}
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                style={{ fill: 'none' }}
              >
                <rect
                  width="16"
                  height="16"
                  x="4"
                  y="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  rx="1"
                />
                <path
                  d="M7 11.444V7h4.444v4.444H7Zm1.111-1.11h2.222V8.11H8.111v2.222ZM7 17v-4.444h4.444V17H7Zm1.111-1.111h2.222v-2.222H8.111v2.222Zm4.445-4.445V7H17v4.444h-4.444Zm1.11-1.11h2.223V8.11h-2.222v2.222ZM15.89 17v-1.111H17V17h-1.111Zm-3.333-3.333v-1.111h1.11v1.11h-1.11Zm1.11 1.11v-1.11h1.112v1.11h-1.111Zm-1.11 1.112v-1.111h1.11v1.11h-1.11ZM13.666 17v-1.111h1.112V17h-1.111Zm1.112-1.111v-1.111h1.11v1.11h-1.11Zm0-2.222v-1.111h1.11v1.11h-1.11Zm1.11 1.11v-1.11H17v1.11h-1.111Z"
                  fill="currentColor"
                />
              </svg>
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
          <ChevronDown
            className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${
              isFrameCollapsed ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
        {!isFrameCollapsed && (
          <>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Choose from various frame designs to make your QR code stand out
              and provide visual context for scanning. Frames help users
              understand the purpose of your QR code at a glance.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {frameOptions.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => updateDesignOption("frame", frame.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                    designOptions.frame === frame.id
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
                            <div key={i} className="w-1 h-1 bg-gray-600"></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600">{frame.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Shape Section */}
      <div className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group">
        <div
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => setIsShapeCollapsed(!isShapeCollapsed)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white">
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable={false}
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                style={{ fill: 'none' }}
              >
                <path
                  d="M3 11V3h8v8H3Zm2-2h4V5H5v4ZM3 21v-8h8v8H3Zm2-2h4v-4H5v4Zm8-8V3h8v8h-8Zm2-2h4V5h-4v4Zm4 12v-2h2v2h-2Zm-6-6v-2h2v2h-2Zm2 2v-2h2v2h-2Zm-2 2v-2h2v2h-2Zm2 2v-2h2v2h-2Zm2-2v-2h2v2h-2Zm0-4v-2h2v2h-2Zm2 2v-2h2v2h-2Z"
                  fill="currentColor"
                />
              </svg>
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
          <ChevronDown
            className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${
              isShapeCollapsed ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
        {!isShapeCollapsed && (
          <>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Modify the shape of QR code dots to create a unique visual style.
              Choose from classic squares to rounded corners, dots, or circles
              for better brand alignment.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {shapeOptions.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => updateDesignOption("shape", shape.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                    designOptions.shape === shape.id
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-green-300 bg-white"
                  }`}
                >
                  <div className="mb-3">
                    <div className="grid grid-cols-5 gap-1 mx-auto w-fit">
                      {Array.from({ length: 25 }).map((_, i) =>
                        renderShapePreview(shape.id, i)
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{shape.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Logo Section */}
      <div className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group">
        <div
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => setIsLogoCollapsed(!isLogoCollapsed)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white">
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable={false}
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                style={{ fill: 'none' }}
              >
                <rect
                  width="16"
                  height="16"
                  x="4"
                  y="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  rx="1"
                />
                <path
                  d="M7 11.444V7h4.444v4.444H7Zm1.111-1.11h2.222V8.11H8.111v2.222ZM7 17v-4.444h4.444V17H7Zm1.111-1.111h2.222v-2.222H8.111v2.222Zm4.445-4.445V7H17v4.444h-4.444Zm1.11-1.11h2.223V8.11h-2.222v2.222Z"
                  fill="currentColor"
                />
                <circle cx="14.778" cy="14.778" r="2.222" fill="currentColor" />
              </svg>
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
          <ChevronDown
            className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${
              isLogoCollapsed ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
        {!isLogoCollapsed && (
          <>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Add recognizable icons like WhatsApp, location, link, or WiFi
              symbols to instantly communicate your QR code's purpose and
              increase scan rates.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
              {logoOptions.map((logo) => (
                <button
                  key={logo.id}
                  onClick={() => updateDesignOption("logo", logo.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                    designOptions.logo === logo.id
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
                            designOptions.logo === logo.id
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
          </>
        )}
      </div>

      {/* Quality Level Section */}
      <div className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group">
        <div
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => setIsQualityCollapsed(!isQualityCollapsed)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white">
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable={false}
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                style={{ fill: 'none' }}
              >
                <path
                  d="M7.09 21H4.637c-.45 0-.835-.16-1.155-.48-.32-.321-.481-.706-.481-1.156v-2.455h1.636v2.455h2.455V21Zm9.82 0v-1.636h2.454v-2.455H21v2.455c0 .45-.16.835-.48 1.155-.321.32-.706.481-1.156.481h-2.455ZM12 17.318a7.379 7.379 0 0 1-4.449-1.452C6.221 14.898 5.25 13.609 4.636 12c.614-1.61 1.586-2.898 2.915-3.866A7.379 7.379 0 0 1 12 6.682c1.636 0 3.12.484 4.449 1.452 1.33.968 2.301 2.257 2.915 3.866-.614 1.61-1.586 2.898-2.915 3.866A7.379 7.379 0 0 1 12 17.318Zm0-1.636a5.87 5.87 0 0 0 3.293-.982c.996-.654 1.76-1.554 2.291-2.7-.532-1.146-1.295-2.045-2.29-2.7A5.87 5.87 0 0 0 12 8.318a5.87 5.87 0 0 0-3.293.982c-.996.655-1.76 1.554-2.291 2.7.532 1.146 1.295 2.046 2.29 2.7a5.87 5.87 0 0 0 3.294.982Zm0-.818c.79 0 1.466-.28 2.025-.839A2.76 2.76 0 0 0 14.864 12c0-.79-.28-1.466-.839-2.025A2.76 2.76 0 0 0 12 9.136c-.79 0-1.466.28-2.025.839A2.76 2.76 0 0 0 9.136 12c0 .79.28 1.466.839 2.025a2.76 2.76 0 0 0 2.025.839Zm0-1.637c-.34 0-.63-.119-.87-.358a1.183 1.183 0 0 1-.357-.869c0-.34.119-.63.358-.87.238-.238.528-.357.869-.357.34 0 .63.119.87.358.238.238.357.528.357.869 0 .34-.119.63-.358.87a1.183 1.183 0 0 1-.869.357ZM3 7.091V4.636c0-.45.16-.835.48-1.155C3.802 3.16 4.187 3 4.637 3h2.455v1.636H4.636v2.455H3Zm16.364 0V4.636h-2.455V3h2.455c.45 0 .835.16 1.155.48.32.321.481.706.481 1.156v2.455h-1.636Z"
                  fill="currentColor"
                />
              </svg>
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
          <ChevronDown
            className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${
              isQualityCollapsed ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
        {!isQualityCollapsed && (
          <>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Higher quality levels add more error correction, making QR codes
              readable even when partially damaged, dirty, or obscured. Choose
              based on your usage environment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {qualityOptions.map((quality) => (
                <button
                  key={quality.id}
                  onClick={() => updateDesignOption("level", quality.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                    designOptions.level === quality.id
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
          </>
        )}
      </div>

      {/* QR Code Style Section */}
      <div className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group">
        <div
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => setIsStyleCollapsed(!isStyleCollapsed)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white">
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable={false}
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                style={{ fill: 'none' }}
              >
                <path
                  d="M3 21v-2h2v2H3Zm0-4v-2h2v2H3Zm0-4v-2h2v2H3Zm0-4V7h2v2H3Zm0-4V3h2v2H3Zm4 16v-2h2v2H7ZM7 5V3h2v2H7Zm4 16v-2h2v2h-2Zm4 0v-2h2v2h-2Zm4 0v-2h2v2h-2Zm0-4v-2h2v2h-2Zm2-4h-2V8c0-.833-.292-1.542-.875-2.125A2.893 2.893 0 0 0 16 5h-5V3h5c1.383 0 2.563.487 3.538 1.463C20.512 5.437 21 6.617 21 8v5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                QR Code Style
              </h3>
              <p className="text-sm text-gray-500">
                Advanced customization options
              </p>
            </div>
          </div>
          <ChevronDown
            className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${
              isStyleCollapsed ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
        {!isStyleCollapsed && (
          <>
            {/* Dot Style Subsection */}
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-4 text-gray-800">
                Dot Style
              </h4>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Choose unique shapes for your QR code dots to create distinctive
                visual styles.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                {dotStyleOptions.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => updateDesignOption("dotStyle", style.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                      (designOptions.dotStyle || 1) === style.id
                        ? "border-pink-500 bg-pink-50 shadow-md"
                        : "border-gray-200 hover:border-pink-300 bg-white"
                    }`}
                  >
                    <div className="text-2xl mb-2 flex justify-center items-center h-8">
                      <span className="text-gray-700">{style.icon}</span>
                    </div>
                    <span className="text-xs text-gray-600">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Background Color Subsection */}
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-4 text-gray-800">
                Background Color
              </h4>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Select gradient background colors to make your QR codes more
                visually appealing.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                {bgColorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => updateDesignOption("bgColor", color.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                      (designOptions.bgColor || "#ffffff") === color.id
                        ? "border-pink-500 bg-pink-50 shadow-md"
                        : "border-gray-200 hover:border-pink-300 bg-white"
                    }`}
                  >
                    <div
                      className="w-10 h-10 mx-auto mb-2 rounded-lg border border-gray-200"
                      style={{ background: color.gradient }}
                    ></div>
                    <span className="text-xs text-gray-600">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Outer Border Subsection */}
            <div>
              <h4 className="text-lg font-medium mb-4 text-gray-800">
                Outer Border
              </h4>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Add stylish borders around your QR codes for enhanced visual
                impact.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                {outerBorderOptions.map((border) => (
                  <button
                    key={border.id}
                    onClick={() => updateDesignOption("outerBorder", border.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                      (designOptions.outerBorder || 1) === border.id
                        ? "border-pink-500 bg-pink-50 shadow-md"
                        : "border-gray-200 hover:border-pink-300 bg-white"
                    }`}
                  >
                    <div className="mb-2 flex justify-center">
                      <div
                        className="w-8 h-8 bg-gray-100 rounded"
                        style={{
                          border:
                            border.style === "none"
                              ? "1px dashed #ccc"
                              : border.style,
                          boxShadow: border.shadow || "none",
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{border.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QRDesignSelector;
