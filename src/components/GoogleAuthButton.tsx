import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuthService, GoogleAuthResponse } from "../services/google-auth";
import { useNavigate } from "react-router-dom";

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
      try {
        // Exchange access token for user info to get an ID token equivalent
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.access_token}`
        );
        const userInfo = await userInfoResponse.json();

        if (!userInfo.email) {
          throw new Error("Could not retrieve email from Google");
        }

        // Create a credential response that mimics an ID token with user info
        const mockPayload = {
          iss: "https://accounts.google.com",
          aud: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          sub: userInfo.id,
          email: userInfo.email,
          email_verified: userInfo.verified_email,
          name: userInfo.name,
          picture: userInfo.picture,
        };

        const mockCredentialResponse = {
          credential: btoa(JSON.stringify(mockPayload)),
          select_by: "user" as const,
        };

        const result = await googleAuthService.authenticateWithGoogle(
          mockCredentialResponse
        );

        if (onSuccess) {
          onSuccess(result);
        } else {
          // Default behavior: navigate to My QR Codes page
          navigate("/my-qr-codes");
        }
      } catch (error) {
        const authError =
          error instanceof Error
            ? error
            : new Error("Google authentication failed");
        if (onError) {
          onError(authError);
        }
      }
    },
    onError: () => {
      const error = new Error("Google authentication was cancelled or failed");
      if (onError) {
        onError(error);
      }
    },
    scope: "openid profile email",
  });

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
