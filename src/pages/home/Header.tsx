import React, { useState } from "react";

// Utility function for conditional className joining
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
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

  return (
    <nav
      className="flex items-center gap-8 text-[rgba(34,14,39,1)] flex-wrap my-auto max-md:max-w-full"
      role="navigation"
      aria-label="Main navigation"
    >
      {items.map((item, index) => (
        <div
          key={index}
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
      ))}
    </nav>
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
    <header className="bg-white border relative flex items-start overflow-hidden text-sm font-bold px-10 py-2.5 border-[rgba(217,217,217,1)] border-solid max-md:px-5">
      <div className="z-0 flex min-w-60 items-center gap-8 text-[rgba(34,14,39,1)] flex-wrap my-auto max-md:max-w-full">
        <img
          src={logoSrc}
          alt={logoAlt}
          className="aspect-[2.23] object-contain w-[134px] self-stretch shrink-0 my-auto"
        />
        <Navigation />
      </div>
      <div className="absolute z-0 flex min-w-60 items-center gap-3 right-10 bottom-5">
        <AuthButtons onLogin={onLogin} onRegister={onRegister} />
      </div>
    </header>
  );
}
