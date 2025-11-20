import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { authService } from "../services/auth";

// UserProfile Component for Layout Header
interface UserProfileProps {
  user?: {
    email: string;
    id: string;
    role: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsDropdownOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return null;
  }

  // Get initials from email
  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="User menu"
      >
        <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-medium">
          {getInitials(user.email)}
        </div>
        <span className="text-gray-700 font-medium hidden sm:inline text-sm md:text-base">
          {user.email}
        </span>
        <svg
          className={`w-3 h-3 md:w-4 md:h-4 text-gray-500 transition-transform hidden sm:block ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Mobile Menu Button Component
const MobileMenuButton = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
      aria-label="Toggle menu"
    >
      <svg
        className="h-7 w-7 text-gray-700"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [user, setUser] = useState<{
    email: string;
    id: string;
    role: string;
  } | null>(null);

  // Get user data on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          // For authenticated layouts, we can assume user has valid token
          // If API call fails, we'll still show profile based on token
          try {
            const response = await authService.getCurrentUser();
            setUser(response.user);
          } catch (error) {
            // If API fails but user has token, create user object from token
            console.error("Error fetching user:", error);
            // We could decode the JWT token here if needed
            setUser({ email: "User", id: "unknown", role: "viewer" });
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []);

  // Pages without sidebar
  const pagesWithoutSidebar = ["/", "/login", "/signup"];
  const showSidebar = !pagesWithoutSidebar.includes(location.pathname);

  // If no sidebar, render simple layout
  if (!showSidebar) {
    return (
      <div className="min-h-screen">
        {/* Header for pages without sidebar */}
        {location.pathname === "/" && (
          <header className="py-6 bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              <nav className="flex items-center gap-6 text-sm text-gray-600">
                <a className="hover:text-gray-900">Products</a>
                <a className="hover:text-gray-900">Resources</a>
                <a className="hover:text-gray-900">Plans</a>
                <a className="hover:text-gray-900">API</a>
                <div className="flex items-center gap-3">
                  <a href="/login">
                    <button className="px-4 py-2 rounded-full border">
                      Log In
                    </button>
                  </a>
                  <a href="/signup">
                    <button className="px-4 py-2 rounded-full bg-blue-600 text-white">
                      Register
                    </button>
                  </a>
                </div>
              </nav>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main>{children}</main>
      </div>
    );
  }

  // Layout with sidebar for authenticated pages
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar user={user} />

        <div className="flex-1 flex flex-col">
          {/* Header (hidden on some pages like /new-qr) */}
          {location.pathname !== "/new-qr" && (
            <header className="py-4 md:py-6 bg-white shadow-sm sticky top-0 z-10">
              <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo for mobile */}
                <a href="/new-qr" className="md:hidden">
                  <img
                    src="/logo.png"
                    alt="QRify"
                    className="h-12 w-auto object-contain cursor-pointer"
                  />
                </a>

                <nav className="flex items-center gap-3 md:gap-6 text-sm text-gray-600 ml-auto">
                  <a className="hover:text-gray-900 hidden md:block">FAQ</a>
                  <div className="hidden md:flex items-center gap-2 md:gap-3">
                    {user ? (
                      <UserProfile user={user} />
                    ) : (
                      <>
                        <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-sm">
                          Log In
                        </button>
                        <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-600 text-white text-xs md:text-sm">
                          Register
                        </button>
                      </>
                    )}
                  </div>

                  {/* Mobile Hamburger Menu - Right Side */}
                  <MobileMenuButton />
                </nav>
              </div>
            </header>
          )}

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
