import { useState } from "react";

export function Hero() {
  const tabs = ["Website", "Text", "PDF", "Images", "vCard Plus", "Video"];
  const designTabs = ["Frame", "Shape", "Logo", "Level"];

  const contentMap = {
    Website: (
      <>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your Website
        </label>
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="E.g. https://www.myweb.com/"
        />
      </>
    ),
    Text: (
      <>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your text
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your message here..."
          rows={4}
        />
      </>
    ),
    PDF: (
      <>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload your PDF
        </label>
        <input
          type="file"
          accept="application/pdf"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm"
        />
      </>
    ),
    Images: (
      <>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload your image
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm"
        />
      </>
    ),
    "vCard Plus": (
      <>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fill in your contact details
        </label>
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
        />
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Phone"
        />
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
        />
      </>
    ),
    Video: (
      <>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Paste your video link
        </label>
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="E.g. https://youtube.com/..."
        />
      </>
    ),
  };

  // Frame options with placeholder QR codes
  const frameOptions = [
    { id: 1, name: "No Frame", icon: "⊘" },
    { id: 2, name: "Email", icon: "✉" },
    { id: 3, name: "Scanner", icon: "📱" },
    { id: 4, name: "Document", icon: "📄" },
    { id: 5, name: "Truck", icon: "🚚" },
    { id: 6, name: "Mobile", icon: "📱" },
    { id: 7, name: "Scooter", icon: "🛵" },
    { id: 8, name: "Coffee", icon: "☕" },
  ];

  const shapeOptions = [
    { id: 1, name: "Square", preview: "■" },
    { id: 2, name: "Rounded", preview: "●" },
    { id: 3, name: "Dots", preview: "•" },
    { id: 4, name: "Circle", preview: "◯" },
  ];

  const logoOptions = [
    { id: 1, name: "No Logo" },
    { id: 2, name: "Custom Logo" },
    { id: 3, name: "Brand Logo" },
    { id: 4, name: "Icon" },
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
  const [selectedLogo, setSelectedLogo] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(2);

  // QR Code rendering based on shape - Professional realistic pattern
  const renderQRPattern = () => {
    const selectedShapeData = shapeOptions.find((s) => s.id === selectedShape);

    // Realistic QR code pattern (21x21 grid simulation)
    // 1 = black, 0 = white
    const qrMatrix = [
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

    const pattern = [];
    const size = 21;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const i = row * size + col;
        const isBlack = qrMatrix[row][col] === 1;

        if (selectedShapeData?.name === "Square") {
          pattern.push(
            <div
              key={i}
              className={`w-1 h-1 ${isBlack ? "bg-gray-900" : "bg-white"}`}
            ></div>
          );
        } else if (selectedShapeData?.name === "Rounded") {
          pattern.push(
            <div
              key={i}
              className={`w-1 h-1 rounded-sm ${
                isBlack ? "bg-gray-900" : "bg-white"
              }`}
            ></div>
          );
        } else if (selectedShapeData?.name === "Dots") {
          pattern.push(
            <div
              key={i}
              className={`w-1 h-1 rounded-full ${
                isBlack ? "bg-gray-900" : "bg-white"
              }`}
            ></div>
          );
        } else if (selectedShapeData?.name === "Circle") {
          pattern.push(
            <div
              key={i}
              className={`w-1 h-1 rounded-full ${
                isBlack ? "bg-gray-900" : "bg-white"
              }`}
              style={{ transform: isBlack ? "scale(1)" : "scale(0.3)" }}
            ></div>
          );
        }
      }
    }
    return pattern;
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

    const qrCode = (
      <div
        className={`grid grid-cols-21 gap-[1px] ${blurAmount}`}
        style={{ gridTemplateColumns: "repeat(21, minmax(0, 1fr))" }}
      >
        {renderQRPattern()}
      </div>
    );

    // Logo overlay
    const logoOverlay = selectedLogoData?.id !== 1 && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200">
          {selectedLogoData?.name === "Custom Logo" && (
            <span className="text-xs font-bold text-blue-600">L</span>
          )}
          {selectedLogoData?.name === "Brand Logo" && (
            <span className="text-xs">🏢</span>
          )}
          {selectedLogoData?.name === "Icon" && (
            <span className="text-xs">⭐</span>
          )}
        </div>
      </div>
    );

    // Different frame styles
    if (selectedFrameData?.id === 1) {
      // No Frame
      return (
        <div className="relative w-40 h-40 bg-white border-4 border-gray-300 rounded-lg flex items-center justify-center p-4">
          {qrCode}
          {logoOverlay}
        </div>
      );
    } else if (selectedFrameData?.id === 2) {
      // Email Frame
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg viewBox="0 0 200 180" className="w-full h-full">
            {/* Envelope */}
            <rect
              x="20"
              y="40"
              width="160"
              height="100"
              fill="#e5e7eb"
              stroke="#9ca3af"
              strokeWidth="2"
              rx="4"
            />
            <path
              d="M 20 40 L 100 100 L 180 40"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
            />
            <path d="M 20 40 L 100 100 L 180 40" fill="#f3f4f6" />
            {/* QR inside envelope */}
            <foreignObject x="60" y="60" width="80" height="80">
              <div className="w-full h-full flex items-center justify-center">
                <div className="scale-75">{qrCode}</div>
              </div>
            </foreignObject>
          </svg>
          {logoOverlay}
        </div>
      );
    } else if (selectedFrameData?.id === 3) {
      // Scanner Frame
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Monitor/Screen */}
            <rect
              x="30"
              y="30"
              width="140"
              height="110"
              fill="#1f2937"
              stroke="#374151"
              strokeWidth="3"
              rx="6"
            />
            <rect x="40" y="40" width="120" height="90" fill="#f3f4f6" />
            {/* Stand */}
            <rect x="85" y="140" width="30" height="20" fill="#374151" />
            <rect x="60" y="160" width="80" height="8" fill="#4b5563" rx="4" />
            {/* QR on screen */}
            <foreignObject x="60" y="55" width="80" height="80">
              <div className="w-full h-full flex items-center justify-center">
                <div className="scale-75">{qrCode}</div>
              </div>
            </foreignObject>
          </svg>
          {logoOverlay}
        </div>
      );
    } else if (selectedFrameData?.id === 4) {
      // Document Frame
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Paper */}
            <path
              d="M 50 20 L 130 20 L 150 40 L 150 180 L 50 180 Z"
              fill="white"
              stroke="#9ca3af"
              strokeWidth="2"
            />
            <path
              d="M 130 20 L 130 40 L 150 40"
              fill="#e5e7eb"
              stroke="#9ca3af"
              strokeWidth="2"
            />
            {/* Lines */}
            <line
              x1="65"
              y1="60"
              x2="135"
              y2="60"
              stroke="#d1d5db"
              strokeWidth="2"
            />
            <line
              x1="65"
              y1="75"
              x2="135"
              y2="75"
              stroke="#d1d5db"
              strokeWidth="2"
            />
            {/* QR on document */}
            <foreignObject x="60" y="90" width="80" height="80">
              <div className="w-full h-full flex items-center justify-center">
                <div className="scale-75">{qrCode}</div>
              </div>
            </foreignObject>
          </svg>
          {logoOverlay}
        </div>
      );
    } else if (selectedFrameData?.id === 5) {
      // Truck Frame
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Truck body */}
            <rect
              x="40"
              y="80"
              width="80"
              height="50"
              fill="#3b82f6"
              stroke="#2563eb"
              strokeWidth="2"
              rx="4"
            />
            <rect
              x="120"
              y="95"
              width="40"
              height="35"
              fill="#60a5fa"
              stroke="#2563eb"
              strokeWidth="2"
              rx="2"
            />
            {/* Wheels */}
            <circle
              cx="65"
              cy="135"
              r="12"
              fill="#1f2937"
              stroke="#000"
              strokeWidth="2"
            />
            <circle
              cx="135"
              cy="135"
              r="12"
              fill="#1f2937"
              stroke="#000"
              strokeWidth="2"
            />
            <circle cx="65" cy="135" r="6" fill="#6b7280" />
            <circle cx="135" cy="135" r="6" fill="#6b7280" />
            {/* QR on truck */}
            <foreignObject x="50" y="85" width="60" height="60">
              <div className="w-full h-full flex items-center justify-center">
                <div className="scale-50">{qrCode}</div>
              </div>
            </foreignObject>
          </svg>
          {logoOverlay}
        </div>
      );
    } else if (selectedFrameData?.id === 6) {
      // Mobile Frame
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Phone */}
            <rect
              x="60"
              y="30"
              width="80"
              height="140"
              fill="#1f2937"
              stroke="#000"
              strokeWidth="3"
              rx="12"
            />
            <rect x="65" y="40" width="70" height="110" fill="#f3f4f6" />
            {/* Home button */}
            <circle cx="100" cy="160" r="8" fill="#374151" />
            {/* QR on phone screen */}
            <foreignObject x="70" y="50" width="60" height="60">
              <div className="w-full h-full flex items-center justify-center">
                <div className="scale-75">{qrCode}</div>
              </div>
            </foreignObject>
          </svg>
          {logoOverlay}
        </div>
      );
    } else if (selectedFrameData?.id === 7) {
      // Scooter Frame
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Scooter body */}
            <path
              d="M 80 90 L 120 90 L 130 110 L 70 110 Z"
              fill="#6b7280"
              stroke="#374151"
              strokeWidth="2"
            />
            {/* Handles */}
            <line
              x1="85"
              y1="90"
              x2="85"
              y2="70"
              stroke="#374151"
              strokeWidth="3"
            />
            <line
              x1="75"
              y1="70"
              x2="95"
              y2="70"
              stroke="#374151"
              strokeWidth="3"
            />
            {/* Wheels */}
            <circle
              cx="75"
              cy="130"
              r="15"
              fill="#1f2937"
              stroke="#000"
              strokeWidth="2"
            />
            <circle
              cx="125"
              cy="130"
              r="15"
              fill="#1f2937"
              stroke="#000"
              strokeWidth="2"
            />
            {/* QR on scooter */}
            <foreignObject x="75" y="85" width="50" height="50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="scale-50">{qrCode}</div>
              </div>
            </foreignObject>
          </svg>
          {logoOverlay}
        </div>
      );
    } else if (selectedFrameData?.id === 8) {
      // Coffee Frame
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Cup */}
            <path
              d="M 60 70 L 70 140 L 130 140 L 140 70 Z"
              fill="#f3f4f6"
              stroke="#9ca3af"
              strokeWidth="2"
            />
            <ellipse
              cx="100"
              cy="70"
              rx="40"
              ry="10"
              fill="#e5e7eb"
              stroke="#9ca3af"
              strokeWidth="2"
            />
            {/* Handle */}
            <path
              d="M 140 90 Q 160 100 160 110 Q 160 120 140 130"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="3"
            />
            {/* Steam */}
            <path
              d="M 85 50 Q 85 40 90 35"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 100 50 Q 100 35 105 30"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 115 50 Q 115 40 110 35"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* QR on cup */}
            <foreignObject x="70" y="80" width="60" height="60">
              <div className="w-full h-full flex items-center justify-center">
                <div className="scale-75">{qrCode}</div>
              </div>
            </foreignObject>
          </svg>
          {logoOverlay}
        </div>
      );
    }

    return (
      <div className="relative w-40 h-40 bg-white border-4 border-gray-300 rounded-lg flex items-center justify-center p-4">
        {qrCode}
        {logoOverlay}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {frameOptions.map((frame) => (
              <button
                key={frame.id}
                onClick={() => setSelectedFrame(frame.id)}
                className={`relative flex flex-col items-center justify-center p-2 sm:p-3 lg:p-4 rounded-lg border-2 transition-all ${
                  selectedFrame === frame.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-100 rounded flex items-center justify-center mb-1 sm:mb-2">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-white border border-gray-300 rounded flex items-center justify-center p-1">
                    <div
                      className="grid gap-[1px]"
                      style={{
                        gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
                      }}
                    >
                      {miniQRPattern.flat().map((cell, i) => (
                        <div
                          key={i}
                          className={`w-[2px] sm:w-[3px] h-[2px] sm:h-[3px] ${
                            cell ? "bg-gray-900" : "bg-white"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-600">
                  {frame.icon}
                </span>
              </button>
            ))}
          </div>
        );
      case "Shape":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {shapeOptions.map((shape) => (
              <button
                key={shape.id}
                onClick={() => setSelectedShape(shape.id)}
                className={`relative flex flex-col items-center justify-center p-2 sm:p-3 lg:p-4 rounded-lg border-2 transition-all ${
                  selectedShape === shape.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-100 rounded flex items-center justify-center mb-1 sm:mb-2">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-white border border-gray-300 rounded flex items-center justify-center p-1">
                    <div
                      className="grid gap-[1px]"
                      style={{
                        gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
                      }}
                    >
                      {miniQRPattern.flat().map((cell, i) => {
                        const className = cell ? "bg-gray-900" : "bg-white";
                        const sizeClass =
                          "w-[2px] sm:w-[3px] h-[2px] sm:h-[3px]";
                        if (shape.name === "Square") {
                          return (
                            <div
                              key={i}
                              className={`${sizeClass} ${className}`}
                            ></div>
                          );
                        } else if (shape.name === "Rounded") {
                          return (
                            <div
                              key={i}
                              className={`${sizeClass} rounded-sm ${className}`}
                            ></div>
                          );
                        } else if (shape.name === "Dots") {
                          return (
                            <div
                              key={i}
                              className={`${sizeClass} rounded-full ${className}`}
                            ></div>
                          );
                        } else {
                          return (
                            <div
                              key={i}
                              className={`${sizeClass} rounded-full ${className}`}
                            ></div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-600">
                  {shape.name}
                </span>
              </button>
            ))}
          </div>
        );
      case "Logo":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {logoOptions.map((logo) => (
              <button
                key={logo.id}
                onClick={() => setSelectedLogo(logo.id)}
                className={`relative flex flex-col items-center justify-center p-2 sm:p-3 lg:p-4 rounded-lg border-2 transition-all ${
                  selectedLogo === logo.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-100 rounded flex items-center justify-center mb-1 sm:mb-2">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-white border border-gray-300 rounded flex items-center justify-center p-1">
                    <div
                      className="grid gap-[1px]"
                      style={{
                        gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
                      }}
                    >
                      {miniQRPattern.flat().map((cell, i) => (
                        <div
                          key={i}
                          className={`w-[2px] sm:w-[3px] h-[2px] sm:h-[3px] ${
                            cell ? "bg-gray-900" : "bg-white"
                          }`}
                        ></div>
                      ))}
                    </div>
                    {logo.id !== 1 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full border border-gray-300 flex items-center justify-center text-[6px] sm:text-[8px]">
                          {logo.id === 2 && (
                            <span className="text-blue-600 font-bold">L</span>
                          )}
                          {logo.id === 3 && <span>🏢</span>}
                          {logo.id === 4 && <span>⭐</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-600">
                  {logo.name}
                </span>
              </button>
            ))}
          </div>
        );
      case "Level":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {levelOptions.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`relative flex flex-col items-center justify-center p-2 sm:p-3 lg:p-4 rounded-lg border-2 transition-all ${
                  selectedLevel === level.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-100 rounded flex items-center justify-center mb-1 sm:mb-2">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-white border border-gray-300 rounded flex items-center justify-center p-1">
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
                          className={`w-[2px] sm:w-[3px] h-[2px] sm:h-[3px] ${
                            cell ? "bg-gray-900" : "bg-white"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-600">
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
    <section className="bg-gradient-to-b from-white to-gray-50 rounded-lg p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Main Tabs */}
        <div className="flex flex-nowrap gap-3 mb-8 pb-6 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
                activeTab === tab
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Step 1 and Step 2 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Complete the content */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <span className="flex items-center justify-center w-7 h-7 bg-gray-900 text-white rounded text-sm font-bold">
                  1
                </span>
                Complete the content
              </h3>
              {contentMap[activeTab]}
            </div>

            {/* Step 2: Design your QR */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <span className="flex items-center justify-center w-7 h-7 bg-gray-900 text-white rounded text-sm font-bold">
                  2
                </span>
                Design your QR
              </h3>

              {/* Design Sub-tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {designTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDesignTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
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
              <div className="bg-gray-50 rounded-lg p-6">
                {renderDesignOptions()}
              </div>
            </div>
          </div>

          {/* Right Column - Step 3: Download your QR */}
          <div className="lg:col-span-1">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-600 mb-6">
              <span className="flex items-center justify-center w-7 h-7 bg-gray-500 text-white rounded text-sm font-bold">
                3
              </span>
              Download your QR
            </h3>

            {/* QR Code Preview */}
            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-6 mb-4">
              {renderQRWithFrame()}
            </div>

            {/* Download Button */}
            <button className="w-full px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all flex items-center justify-center gap-2 text-sm">
              Download QR
              <svg
                className="w-4 h-4"
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
    </section>
  );
}
