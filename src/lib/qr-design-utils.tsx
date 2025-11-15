import React from "react";
import { QRCodeSVG } from "qrcode.react";
import QRCode from "qrcode";

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

// Dot style options
const dotStyleOptions = [
  { id: 1, name: "Square", icon: "■" },
  { id: 2, name: "Rounded Square", icon: "●" },
  { id: 3, name: "Circle", icon: "●" },
  { id: 4, name: "Heart", icon: "♥" },
  { id: 5, name: "Star", icon: "★" },
  { id: 6, name: "Diamond", icon: "♦" },
  { id: 7, name: "Hexagon", icon: "⬢" },
  { id: 8, name: "Triangle", icon: "▲" },
];

// Background color options
const bgColorOptions = [
  {
    id: "#ffffff",
    name: "White",
    gradient: "linear-gradient(135deg, #ffffff, #f8f9fa)",
  },
  {
    id: "#000000",
    name: "Black",
    gradient: "linear-gradient(135deg, #000000, #1a1a1a)",
  },
  {
    id: "#3b82f6",
    name: "Blue",
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  },
  {
    id: "#ef4444",
    name: "Red",
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
  },
  {
    id: "#10b981",
    name: "Green",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
  },
  {
    id: "#f59e0b",
    name: "Orange",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
  {
    id: "#8b5cf6",
    name: "Purple",
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  },
  {
    id: "#06b6d4",
    name: "Cyan",
    gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
  },
];

// Outer border options
const outerBorderOptions = [
  { id: 1, name: "None", style: "none" },
  { id: 2, name: "Solid", style: "2px solid #000" },
  { id: 3, name: "Dashed", style: "2px dashed #000" },
  { id: 4, name: "Dotted", style: "2px dotted #000" },
  { id: 5, name: "Double", style: "4px double #000" },
  { id: 6, name: "Thick", style: "4px solid #000" },
  {
    id: 7,
    name: "Shadow",
    style: "1px solid #ccc",
    shadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  {
    id: 8,
    name: "Glow",
    style: "2px solid #3b82f6",
    shadow: "0 0 15px rgba(59,130,246,0.5)",
  },
];

export interface QRDesignOptions {
  frame: number;
  shape: number;
  logo: number;
  level: number;
  dotStyle?: number;
  bgColor?: string;
  outerBorder?: number;
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
        scale: 1.0,
      };
    case 3: // Scooter
      return {
        top: "27%",
        left: "27%",
        transform: "translate(-50%, -50%)",
        scale: 0.75,
      };
    case 4: // Juice
      return {
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.9,
      };
    case 5: // Gift Wrapper
      return {
        top: "41%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.85,
      };
    case 6: // Cup
      return {
        top: "49%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.8,
      };
    case 7: // Text Tab
      return {
        top: "62%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 1.0,
      };
    case 8: // Tab
      return {
        top: "39%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 1.05,
      };
    case 9: // Clipboard
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.8,
      };
    case 10: // Clipped Text
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        scale: 0.8,
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

// Custom QR Code component with styled dots
const StyledQRCode: React.FC<{
  value: string;
  size: number;
  dotStyle: number;
  fgColor?: string;
  bgColor?: string;
  level?: "L" | "M" | "Q" | "H";
}> = ({
  value,
  size,
  dotStyle,
  fgColor = "#000000",
  bgColor = "#ffffff",
  level = "M",
}) => {
  const [qrMatrix, setQrMatrix] = React.useState<boolean[][]>([]);

  React.useEffect(() => {
    // Generate QR code matrix using the qrcode library
    const generateMatrix = async () => {
      try {
        const qrCode = await QRCode.create(value, {
          errorCorrectionLevel: level,
        });
        const matrix: boolean[][] = [];
        const size = qrCode.modules.size;

        for (let row = 0; row < size; row++) {
          const matrixRow: boolean[] = [];
          for (let col = 0; col < size; col++) {
            matrixRow.push(qrCode.modules.get(row, col));
          }
          matrix.push(matrixRow);
        }
        setQrMatrix(matrix);
      } catch (err) {
        console.error("Error generating QR matrix:", err);
      }
    };

    generateMatrix();
  }, [value, level]);

  const getDotElement = (
    isDark: boolean,
    dotSize: number,
    x: number,
    y: number
  ) => {
    if (!isDark) return null;

    const commonProps = {
      x,
      y,
      width: dotSize,
      height: dotSize,
      fill: fgColor,
    };

    switch (dotStyle) {
      case 2: // Rounded
        return (
          <rect {...commonProps} rx={dotSize * 0.15} ry={dotSize * 0.15} />
        );

      case 3: // Circle
        return (
          <circle
            cx={x + dotSize / 2}
            cy={y + dotSize / 2}
            r={dotSize / 2}
            fill={fgColor}
          />
        );

      case 4: // Heart
        return (
          <path
            d={`M${x + dotSize / 2},${y + dotSize * 0.8} 
                C${x + dotSize / 2},${y + dotSize * 0.8} 
                ${x},${y + dotSize * 0.3} 
                ${x},${y + dotSize * 0.2}
                C${x},${y} ${x + dotSize * 0.2},${y} ${x + dotSize / 2},${
              y + dotSize * 0.3
            }
                C${x + dotSize * 0.8},${y} ${x + dotSize},${y} ${x + dotSize},${
              y + dotSize * 0.2
            }
                C${x + dotSize},${y + dotSize * 0.3} ${x + dotSize / 2},${
              y + dotSize * 0.8
            } ${x + dotSize / 2},${y + dotSize * 0.8} Z`}
            fill={fgColor}
          />
        );

      case 5: // Star
        return (
          <path
            d={`M${x + dotSize / 2},${y} 
                L${x + dotSize * 0.61},${y + dotSize * 0.35}
                L${x + dotSize},${y + dotSize * 0.35}
                L${x + dotSize * 0.68},${y + dotSize * 0.57}
                L${x + dotSize * 0.79},${y + dotSize}
                L${x + dotSize / 2},${y + dotSize * 0.7}
                L${x + dotSize * 0.21},${y + dotSize}
                L${x + dotSize * 0.32},${y + dotSize * 0.57}
                L${x},${y + dotSize * 0.35}
                L${x + dotSize * 0.39},${y + dotSize * 0.35} Z`}
            fill={fgColor}
          />
        );

      case 6: // Diamond
        return (
          <path
            d={`M${x + dotSize / 2},${y} 
                L${x + dotSize},${y + dotSize / 2} 
                L${x + dotSize / 2},${y + dotSize} 
                L${x},${y + dotSize / 2} Z`}
            fill={fgColor}
          />
        );

      case 7: // Hexagon
        return (
          <path
            d={`M${x + dotSize * 0.3},${y} 
                L${x + dotSize * 0.7},${y}
                L${x + dotSize},${y + dotSize / 2}
                L${x + dotSize * 0.7},${y + dotSize}
                L${x + dotSize * 0.3},${y + dotSize}
                L${x},${y + dotSize / 2} Z`}
            fill={fgColor}
          />
        );

      case 8: // Triangle
        return (
          <path
            d={`M${x + dotSize / 2},${y} 
                L${x},${y + dotSize} 
                L${x + dotSize},${y + dotSize} Z`}
            fill={fgColor}
          />
        );

      default: // Square
        return <rect {...commonProps} />;
    }
  };

  if (qrMatrix.length === 0) {
    // Fallback to regular QR code while loading
    return (
      <div
        style={{
          backgroundColor: bgColor,
          borderRadius: "4px",
          padding: "2px",
        }}
      >
        <QRCodeSVG
          value={value}
          size={size}
          level={level}
          includeMargin={false}
          fgColor={fgColor}
          bgColor={bgColor}
        />
      </div>
    );
  }

  const moduleCount = qrMatrix.length;
  const dotSize = size / moduleCount;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius: "4px",
        padding: "2px",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect width={size} height={size} fill={bgColor} />
        {qrMatrix
          .map((row, rowIndex) =>
            row.map((isDark, colIndex) =>
              getDotElement(
                isDark,
                dotSize,
                colIndex * dotSize,
                rowIndex * dotSize
              )
            )
          )
          .flat()
          .filter(Boolean)
          .map((element, index) => React.cloneElement(element, { key: index }))}
      </svg>
    </div>
  );
};

// Export the QR rendering function for use in other components
export const renderQRWithDesign = (
  qrData: string,
  options: QRDesignOptions,
  size: { width: number; height: number } = { width: 160, height: 160 }
) => {
  const selectedFrameData = frameOptions.find((f) => f.id === options.frame);
  const selectedLogoData = logoOptions.find((l) => l.id === options.logo);
  const selectedLevelData = levelOptions.find((l) => l.id === options.level);
  const selectedDotStyle = dotStyleOptions.find(
    (d) => d.id === (options.dotStyle || 1)
  );
  const selectedBgColor = options.bgColor || "#ffffff";
  const selectedBorder = outerBorderOptions.find(
    (b) => b.id === (options.outerBorder || 1)
  );

  // Get error correction level
  const errorCorrectionLevel = selectedLevelData?.value || "M";

  // Shape-specific classes for QR code container
  const getShapeClass = (shapeId: number) => {
    switch (shapeId) {
      case 2: // Rounded
        return "rounded-md overflow-hidden";
      case 3: // Dots
        return "rounded-lg overflow-hidden";
      case 4: // Circle
        return "rounded-full overflow-hidden";
      default: // Square
        return "";
    }
  };

  // Apply border styles
  const getBorderStyles = (): React.CSSProperties => {
    if (!selectedBorder || selectedBorder.id === 1) return {};

    const styles: React.CSSProperties = {
      border: selectedBorder.style,
    };

    if (selectedBorder.shadow) {
      styles.boxShadow = selectedBorder.shadow;
    }

    return styles;
  };

  // Determine if qrData is a base64 image (from NewQR preview) or URL (from database)
  const isBase64Image = qrData.startsWith("data:image/");

  // Generate appropriate QR code element
  const qrCode = isBase64Image ? (
    // For base64 images (NewQR preview), use img tag
    <div
      className={`${getShapeClass(options.shape)}`}
      style={{
        backgroundColor: selectedBgColor,
        ...getBorderStyles(),
      }}
    >
      <img
        src={qrData}
        alt="QR Code"
        style={{
          width: Math.min(size.width * 0.6, size.height * 0.6),
          height: Math.min(size.width * 0.6, size.height * 0.6),
        }}
        className="object-contain"
      />
    </div>
  ) : (
    // For URLs (MyQRCodes/QRDetail), generate QR with custom dot styles if needed
    <div
      className={`${getShapeClass(options.shape)}`}
      style={{
        backgroundColor: selectedBgColor,
        ...getBorderStyles(),
      }}
    >
      <StyledQRCode
        value={qrData}
        size={Math.min(size.width * 0.6, size.height * 0.6)}
        dotStyle={options.dotStyle || 1}
        fgColor="#000000"
        bgColor={selectedBgColor}
        level={errorCorrectionLevel as "L" | "M" | "Q" | "H"}
      />
    </div>
  );

  // Logo overlay - positioned relative to QR code, not absolute position
  const logoOverlay = selectedLogoData?.icon && (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200 p-1">
        <img
          src={selectedLogoData.icon}
          alt={selectedLogoData.name}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );

  // No Frame - just QR
  if (selectedFrameData?.id === 1 || !selectedFrameData?.icon) {
    return (
      <div
        className="relative bg-white rounded-lg shadow-lg flex items-center justify-center p-4"
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
      >
        <div className="relative">
          {qrCode}
          {logoOverlay}
        </div>
      </div>
    );
  }

  // With Frame - position QR based on frame type
  const qrPosition = getQRPosition(selectedFrameData.id);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: `${size.width}px`, height: `${size.height}px` }}
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
        <div className="relative">
          {qrCode}
          {logoOverlay}
        </div>
      </div>
    </div>
  );
};

// Export options for use in other components
export {
  frameOptions,
  logoOptions,
  levelOptions,
  dotStyleOptions,
  bgColorOptions,
  outerBorderOptions,
};
