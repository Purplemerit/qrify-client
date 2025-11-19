import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authService, User } from "../services/auth";
import { canAccessRoute } from "../utils/roleUtils";

interface RoleBasedRouteProps {
  children: React.ReactNode;
}

export default function RoleBasedRoute({ children }: RoleBasedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkUserAndAccess = async () => {
      try {
        const response = await authService.getCurrentUser();
        const currentUser = response.user;
        setUser(currentUser);

        // Check if user can access this route
        const hasAccess = canAccessRoute(currentUser.role, location.pathname);
        if (!hasAccess) {
          setAccessDenied(true);
        }
      } catch (error) {
        console.error("Error fetching user or checking access:", error);
        setAccessDenied(true);
      } finally {
        setLoading(false);
      }
    };

    checkUserAndAccess();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H8m13-9V6a2 2 0 00-2-2H5a2 2 0 00-2 2v1m16 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. Please contact your
            administrator if you believe this is an error.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
