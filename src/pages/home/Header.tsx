import React, { useState, useRef, useEffect } from "react";

// Utility function for conditional className joining
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// ResourcesList Component
interface ResourceItem {
  id: string;
  title: string;
  description: string;
}

const resources: ResourceItem[] = [
  {
    id: "types-of-qr",
    title: "Types of QR code",
    description: "Discover different QR code types and their use cases.",
  },
  {
    id: "qr-codes-for",
    title: "QR Codes for",
    description: "Learn what QR codes can be used for in various industries.",
  },
  {
    id: "qr-codes-on",
    title: "QR Codes on",
    description: "Find out where and how to place QR codes effectively.",
  },
  {
    id: "qr-codes-generator",
    title: "QR Codes Generator",
    description: "Explore advanced QR code generation features and tools.",
  },
];

export const ResourcesList: React.FC = () => {
  return (
    <section className="bg-white p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <article
            key={resource.id}
            className="flex w-full items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-black text-sm font-semibold">
                {resource.title}
              </h3>
              <p className="text-[rgba(96,96,96,1)] text-[13px] font-normal mt-2">
                {resource.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

// FeatureCard Component
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <article className="flex w-full items-center gap-3 p-2">
      <img
        src={icon}
        alt={`${title} icon`}
        className="aspect-[1] object-contain w-11 self-stretch shrink-0 my-auto rounded-lg"
      />
      <div className="self-stretch flex flex-col w-[233px] my-auto">
        <h3 className="text-black text-sm font-semibold">{title}</h3>
        <p className="text-[rgba(96,96,96,1)] text-[13px] font-normal mt-[11px]">
          {description}
        </p>
      </div>
    </article>
  );
};

// FeaturesList Component
interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: "static-qr",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Static QR",
    description: "Permanent and unalterable QR codes.",
  },
  {
    id: "dynamic-qr",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Dynamic QR",
    description: "QR codes updatable in real times.",
  },
  {
    id: "download-formats",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Variety of download formats.",
    description: "Expand the possibilities of use of QRs.",
  },
  {
    id: "team-users",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Limited contributing users",
    description: "Manage QRs as a team.",
  },
  {
    id: "analytics",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Complete analytics",
    description: "Understand performance with detailed data.",
  },
  {
    id: "editing-management",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Editing and management of QRs",
    description: "Customize and organize your QRs.",
  },
  {
    id: "bulk-creation",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Bulk creation and download",
    description: "Generate and download QRs on large scale.",
  },
  {
    id: "google-pixel",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Google pixel integration",
    description: "Improve the analysis of your digital campaigns.",
  },
  {
    id: "custom-domain",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Custom Domain",
    description: "Strengthen your brand with your own domain",
  },
  {
    id: "templates",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Templates",
    description: "Save and reuse your own designs",
  },
  {
    id: "event-tracking",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Event tracking",
    description: "Track interactions",
  },
  {
    id: "password-protection",
    icon: "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/19625bd349fa679d8147a94f0525b41e4d8a41e5?placeholderIfAbsent=true",
    title: "Password access protection",
    description: "Secure your codes.",
  },
];

export const FeaturesList: React.FC = () => {
  const firstColumnFeatures = features.slice(0, 6);
  const secondColumnFeatures = features.slice(6, 12);

  return (
    <section className="bg-white flex items-start gap-10 p-8 rounded-lg">
      <div className="flex-1 min-w-[350px] space-y-3">
        {firstColumnFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      <div className="flex-1 min-w-[350px] space-y-3">
        {secondColumnFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

// Navigation Component
interface NavigationItem {
  label: string;
  hasDropdown?: boolean;
  onClick?: () => void;
}

interface NavigationProps {
  items?: NavigationItem[];
}

const defaultItems: NavigationItem[] = [
  { label: "Products", hasDropdown: true },
  { label: "Resources", hasDropdown: true },
  { label: "Plans and prices", hasDropdown: false },
  { label: "FAQ", hasDropdown: false },
  { label: "API", hasDropdown: false },
];

export const Navigation: React.FC<NavigationProps> = ({
  items = defaultItems,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: NavigationItem) => {
    if (item.hasDropdown) {
      setActiveDropdown(activeDropdown === item.label ? null : item.label);
    } else if (item.onClick) {
      item.onClick();
    } else {
      console.log(`${item.label} clicked`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, item: NavigationItem) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleItemClick(item);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={navigationRef}>
      <nav
        className="flex items-center gap-8 text-[rgba(34,14,39,1)] flex-wrap my-auto max-md:max-w-full"
        role="navigation"
        aria-label="Main navigation"
      >
        {items.map((item, index) => (
          <div key={index} className="relative">
            <div
              className="self-stretch flex items-center gap-2 justify-center my-auto p-2 cursor-pointer hover:bg-gray-50 rounded transition-colors"
              onClick={() => handleItemClick(item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              tabIndex={0}
              role={item.hasDropdown ? "button" : "link"}
              aria-haspopup={item.hasDropdown ? "true" : undefined}
              aria-expanded={
                item.hasDropdown ? activeDropdown === item.label : undefined
              }
            >
              <span
                className={`self-stretch my-auto ${
                  item.hasDropdown ? "" : "whitespace-nowrap"
                }`}
              >
                {item.label}
              </span>
              {item.hasDropdown && (
                <svg
                  className={`aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto transition-transform ${
                    activeDropdown === item.label ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {/* Products Dropdown for this specific item */}
            {activeDropdown === "Products" && item.label === "Products" && (
              <div
                className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl min-w-[750px]"
                style={{ zIndex: 999999 }}
              >
                <FeaturesList />
              </div>
            )}

            {/* Resources Dropdown for this specific item */}
            {activeDropdown === "Resources" && item.label === "Resources" && (
              <div
                className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl min-w-[600px]"
                style={{ zIndex: 999999 }}
              >
                <ResourcesList />
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

// AuthButtons Component
interface AuthButtonsProps {
  onLogin?: () => void;
  onRegister?: () => void;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({
  onLogin,
  onRegister,
}) => {
  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      window.location.href = "/login";
    }
  };

  const handleRegister = () => {
    if (onRegister) {
      onRegister();
    } else {
      window.location.href = "/signup";
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLogin}
        className="bg-white border self-stretch flex min-h-10 items-center gap-2 text-[rgba(29,89,249,1)] justify-center w-40 my-auto px-2 py-3 rounded-[20px] border-[rgba(224,224,224,1)] border-solid hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Log in to your account"
      >
        <span className="self-stretch my-auto">Log In</span>
      </button>
      <button
        onClick={handleRegister}
        className="bg-[rgba(29,89,249,1)] border self-stretch flex min-h-10 items-center gap-2 text-white whitespace-nowrap justify-center w-[120px] my-auto px-2 py-3 rounded-[20px] border-[rgba(224,224,224,1)] border-solid hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Register for a new account"
      >
        <span className="self-stretch my-auto">Register</span>
      </button>
    </div>
  );
};

// Header Component
interface HeaderProps {
  onLogin?: () => void;
  onRegister?: () => void;
  logoSrc?: string;
  logoAlt?: string;
}

export function Header({
  onLogin,
  onRegister,
  logoSrc = "/logo.png",
  logoAlt = "QRFY Logo",
}: HeaderProps = {}) {
  return (
    <header className="bg-white border relative flex items-start text-sm font-bold px-10 py-2.5 border-[rgba(217,217,217,1)] border-solid max-md:px-5">
      <div className="z-50 flex min-w-60 items-center gap-8 text-[rgba(34,14,39,1)] flex-wrap my-auto max-md:max-w-full">
        <img
          src={logoSrc}
          alt={logoAlt}
          className="aspect-[2.23] object-contain w-[134px] self-stretch shrink-0 my-auto"
        />
        <Navigation />
      </div>
      <div className="absolute z-50 flex min-w-60 items-center gap-3 right-10 bottom-5">
        <AuthButtons onLogin={onLogin} onRegister={onRegister} />
      </div>
    </header>
  );
}
