import { ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  showDropdown?: boolean;
}

export function CTAButton({
  children,
  className = "",
  onClick,
  showDropdown = false,
}: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-200 shadow-sm hover:shadow-md flex items-center gap-2 ${className}`}
    >
      <span>{children}</span>
      {showDropdown && (
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
      )}
    </button>
  );
}
