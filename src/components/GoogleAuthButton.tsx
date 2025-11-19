import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuthService, GoogleAuthResponse } from "../services/google-auth";
import { useNavigate } from "react-router-dom";
import { GOOGLE_CLIENT_ID, isDevelopment } from "../config/google-oauth";

interface GoogleAuthButtonProps {
  onSuccess?: (response: GoogleAuthResponse) => void;
  onError?: (error: Error) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onSuccess,
  onError,
  disabled = false,
  className = "",
  children,
}) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.group("🔄 Google OAuth Success Flow");
      console.log("Token Response:", tokenResponse);
      try {
        if (!tokenResponse.access_token) {
          throw new Error("No access token received from Google");
        }

        console.log("✅ Access token received, fetching user info...");
        // Exchange access token for user info to get an ID token equivalent
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.access_token}`
        );

        if (!userInfoResponse.ok) {
          throw new Error(
            `Failed to fetch user info: ${userInfoResponse.status}`
          );
        }

        const userInfo = await userInfoResponse.json();
        console.log("✅ User info received:", userInfo);

        if (!userInfo.email) {
          throw new Error("Could not retrieve email from Google");
        }

        if (!GOOGLE_CLIENT_ID) {
          throw new Error("Google Client ID not configured");
        }

        // Create a credential response that mimics an ID token with user info
        const mockPayload = {
          iss: "https://accounts.google.com",
          aud: GOOGLE_CLIENT_ID,
          sub: userInfo.id,
          email: userInfo.email,
          email_verified: userInfo.verified_email,
          name: userInfo.name,
          picture: userInfo.picture,
        };

        console.log("🔄 Creating mock credential for server...");
        const mockCredentialResponse = {
          credential: btoa(JSON.stringify(mockPayload)),
          select_by: "user" as const,
        };

        console.log("🚀 Sending to server authentication...");
        const result = await googleAuthService.authenticateWithGoogle(
          mockCredentialResponse
        );

        console.log("✅ Server authentication successful:", result);
        console.groupEnd();
        if (onSuccess) {
          onSuccess(result);
        } else {
          // Default behavior: navigate to My QR Codes page
          navigate("/my-qr-codes");
        }
      } catch (error) {
        console.groupEnd();
        console.error("❌ Google OAuth Error:", error);
        debugger; // Debug Google OAuth errors
        const authError =
          error instanceof Error
            ? error
            : new Error("Google authentication failed");
        if (onError) {
          onError(authError);
        }
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      debugger; // Debug Google login errors
      const authError = new Error(
        `Google authentication failed: ${error.error || "Unknown error"}`
      );
      if (onError) {
        onError(authError);
      }
    },
    scope: "openid profile email",
  });

  // Don't render if Google Client ID is not available
  if (!GOOGLE_CLIENT_ID) {
    console.error("Google Client ID not configured for GoogleAuthButton");
    if (import.meta.env.PROD) {
      debugger; // Production debugging: Google Auth Button not configured
    }
    return (
      <button
        disabled
        className={`${className} opacity-50 cursor-not-allowed`}
        type="button"
      >
        Google OAuth Not Configured
      </button>
    );
  }

  return (
    <button
      onClick={() => !disabled && login()}
      disabled={disabled}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
};
