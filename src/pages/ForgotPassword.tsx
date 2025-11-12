import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.forgotPassword({ email });
      setSuccess(true);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || "Failed to send reset email. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                If an account exists with that email, we've sent you a password reset link.
                Please check your inbox and follow the instructions.
              </p>
              <Link
                to="/login"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">
            Q
          </div>
          <div>
            <h1 className="text-2xl font-semibold">QRFY</h1>
            <p className="text-xs text-gray-400">QR Code Generator</p>
          </div>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
          <p className="text-gray-500 mb-6">
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
