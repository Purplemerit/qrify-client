import React, { useState, useRef, useEffect } from "react";
import completeIcon from '../../../assets/header/complete.svg';
import dynamicIcon from '../../../assets/header/dynamic.svg';
import varietyIcon from '../../../assets/header/variety.svg';
import limitedIcon from '../../../assets/header/limited.svg';
import integrationIcon from '../../../assets/header/integration.svg';
import editingIcon from '../../../assets/header/editing.svg';
import bulkIcon from '../../../assets/header/bulk.svg';
import customIcon from '../../../assets/header/custom.svg';
import templatesIcon from '../../../assets/header/templates.svg';
import eventIcon from '../../../assets/header/event.svg';
import passwordIcon from '../../../assets/header/password.svg';
import { Link } from "react-router-dom";

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
            className="flex w-full items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
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
  link: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  link,
}) => {
  return (
    <Link to={link} className="block">
      <article className="flex w-full items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
        <img
          src={icon}
          alt={`${title} icon`}
          className="aspect-[1] object-contain w-11 self-stretch shrink-0 my-auto rounded-lg"
        />
        <div className="self-stretch flex flex-col flex-1 my-auto">
          <h3 className="text-black text-sm font-semibold">{title}</h3>
          <p className="text-[rgba(96,96,96,1)] text-[13px] font-normal mt-[11px]">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
};

// FeaturesList Component
interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  link: string;
}

const features: Feature[] = [
  {
    id: "static-qr",
    icon: completeIcon,
    title: "Static QR",
    description: "Permanent and unalterable QR codes.",
    link: "/features/static-qr",
  },
  {
    id: "dynamic-qr",
    icon: dynamicIcon,
    title: "Dynamic QR",
    description: "QR codes updatable in real times.",
    link: "/features/dynamic-qr",
  },
  {
    id: "download-formats",
    icon: varietyIcon,
    title: "Variety of download formats.",
    description: "Expand the possibilities of use of QRs.",
    link: "/features/download-formats",
  },
  {
    id: "team-users",
    icon: limitedIcon,
    title: "Limited contributing users",
    description: "Manage QRs as a team.",
    link: "/features/team-users",
  },
  {
    id: "analytics",
    icon: integrationIcon,
    title: "Complete analytics",
    description: "Understand performance with detailed data.",
    link: "/features/analytics",
  },
  {
    id: "editing-management",
    icon: editingIcon,
    title: "Editing and management of QRs",
    description: "Customize and organize your QRs.",
    link: "/features/editing-management",
  },
  {
    id: "bulk-creation",
    icon: bulkIcon,
    title: "Bulk creation and download",
    description: "Generate and download QRs on large scale.",
    link: "/features/bulk-creation",
  },
  {
    id: "google-pixel",
    icon: integrationIcon,
    title: "Google pixel integration",
    description: "Improve the analysis of your digital campaigns.",
    link: "/features/google-pixel",
  },
  {
    id: "custom-domain",
    icon: customIcon,
    title: "Custom Domain",
    description: "Strengthen your brand with your own domain",
    link: "/features/custom-domain",
  },
  {
    id: "templates",
    icon: templatesIcon,
    title: "Templates",
    description: "Save and reuse your own designs",
    link: "/features/templates",
  },
  {
    id: "event-tracking",
    icon: eventIcon,
    title: "Event tracking",
    description: "Track interactions",
    link: "/features/event-tracking",
  },
  {
    id: "password-protection",
    icon: passwordIcon,
    title: "Password access protection",
    description: "Secure your codes.",
    link: "/features/password-protection",
  },
];

export const FeaturesList: React.FC = () => {
  const firstColumnFeatures = features.slice(0, 6);
  const secondColumnFeatures = features.slice(6, 12);

  return (
    <section className="bg-white flex flex-col md:flex-row items-start gap-4 md:gap-10 p-4 md:p-8 rounded-lg max-h-[80vh] overflow-y-auto">
      <div className="flex-1 w-full md:min-w-0 space-y-3">
        {firstColumnFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            link={feature.link}
          />
        ))}
      </div>
      <div className="flex-1 w-full md:min-w-0 space-y-3">
        {secondColumnFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            link={feature.link}
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
      // ...existing code...
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
                className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl w-[95vw] md:w-auto md:min-w-[600px] lg:min-w-[750px] max-w-[750px]"
                style={{ zIndex: 999999 }}
              >
                <FeaturesList />
              </div>
            )}

            {/* Resources Dropdown for this specific item */}
            {activeDropdown === "Resources" && item.label === "Resources" && (
              <div
                className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl w-[95vw] md:w-auto md:min-w-[400px] lg:min-w-[600px] max-w-[600px]"
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
    <div className="flex items-center gap-2 md:gap-3">
      <button
        onClick={handleLogin}
        className="bg-white border flex min-h-8 md:min-h-10 items-center gap-2 text-[rgba(29,89,249,1)] justify-center w-24 md:w-40 px-2 py-2 md:py-3 text-xs md:text-sm rounded-[20px] border-[rgba(224,224,224,1)] border-solid hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Log in to your account"
      >
        <span>Log In</span>
      </button>
      <button
        onClick={handleRegister}
        className="bg-[rgba(29,89,249,1)] border flex min-h-8 md:min-h-10 items-center gap-2 text-white whitespace-nowrap justify-center w-24 md:w-[120px] px-2 py-2 md:py-3 text-xs md:text-sm rounded-[20px] border-[rgba(224,224,224,1)] border-solid hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Register for a new account"
      >
        <span>Register</span>
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
    <header className="bg-white border relative flex flex-col md:flex-row md:items-center md:justify-between text-sm font-bold px-5 md:px-10 py-4 md:py-2.5 border-[rgba(217,217,217,1)] border-solid gap-4">
      <div className="z-50 flex items-center gap-4 md:gap-8 text-[rgba(34,14,39,1)] flex-wrap">
        <Link to="/" aria-label="Home" className="flex-shrink-0">
          <img
            src={logoSrc}
            alt={logoAlt}
            className="aspect-[2.23] object-contain w-[100px] md:w-[134px]"
          />
        </Link>
        <div className="hidden lg:block">
          <Navigation />
        </div>
      </div>
      <div className="z-50 flex items-center gap-3 md:flex-shrink-0">
        <AuthButtons onLogin={onLogin} onRegister={onRegister} />
      </div>
    </header>
  );
}
