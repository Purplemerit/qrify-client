import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function PasswordProtection() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Password Access Protection</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/password-protection.webp"
              alt="Password Protection illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Secure your QR codes with password protection and access controls.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Not all content should be publicly accessible to anyone with a smartphone. Our comprehensive access protection
              system gives you granular control over who can view your QR code destinations, when they can access them, and
              how many times they can scan. Perfect for exclusive events, premium content, confidential business documents,
              member-only materials, and any scenario requiring controlled distribution. Layer multiple security measures -
              combine passwords with time restrictions, geographic limitations, and access quotas to create precisely the
              right level of protection for your content. Whether you're distributing VIP event passes, sharing sensitive
              business information, or creating tiered access for different stakeholder groups, our protection features
              ensure only authorized individuals can reach your content while maintaining a smooth user experience for
              those with proper credentials.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Layer Security Features</h3>
                <div className="grid md:grid-cols-2 gap-6 ml-4">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Password Protection</h4>
                    <p className="text-sm text-gray-600">Require users to enter a password before viewing content. Support for single shared passwords or unique codes per recipient.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Time-Based Access</h4>
                    <p className="text-sm text-gray-600">Set specific date ranges, times of day, or time windows when QR codes are accessible. Automatic activation and expiration.</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Scan Limits</h4>
                    <p className="text-sm text-gray-600">Restrict the total number of times a QR code can be scanned, or limit scans per unique device or user.</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Geographic Restrictions</h4>
                    <p className="text-sm text-gray-600">Limit access to specific countries, regions, or IP address ranges. Perfect for location-specific content.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Protection Options</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Single-use password codes for maximum security - each code works only once</li>
                  <li>Automatic password rotation on schedule for enhanced security</li>
                  <li>Failed attempt tracking with automatic lockout after threshold</li>
                  <li>Whitelist specific devices, IP addresses, or user identifiers</li>
                  <li>Two-factor authentication (2FA) support via SMS or email</li>
                  <li>Custom password strength requirements and validation rules</li>
                  <li>Branded password entry pages matching your visual identity</li>
                  <li>Password expiration policies for time-sensitive access</li>
                  <li>Activity logs showing all access attempts (successful and failed)</li>
                  <li>Instant revocation capability to disable access immediately</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-World Use Cases</h3>
                <div className="space-y-4 ml-4">
                  <div className="border-l-4 border-blue-600 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">Private Events & VIP Access</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Share event details, venue maps, or exclusive content only with invited guests who received the password.
                      Perfect for weddings, corporate events, and exclusive gatherings.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">Premium Member Content</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Provide exclusive content, training materials, or resources to paying members, VIP customers, or
                      subscription tiers with unique access codes.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">Confidential Business Documents</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Secure access to sensitive contracts, financial reports, strategic plans, or proprietary information
                      with password protection and access logging for compliance.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-600 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">Internal Communications</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Share company information, training materials, or employee resources only with authorized staff members.
                      Track who accesses what and when.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-600 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">Limited Time Offers</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Create exclusive promotional codes that work only during specific time windows or for limited quantities,
                      adding urgency and exclusivity to campaigns.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Security Best Practices</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Use strong, unique passwords for high-security content</li>
                  <li>Enable 2FA for extremely sensitive material</li>
                  <li>Combine multiple protection layers (password + time + location)</li>
                  <li>Regularly rotate passwords for long-term protected content</li>
                  <li>Monitor access logs for suspicious activity patterns</li>
                  <li>Set reasonable failed attempt thresholds to prevent brute force</li>
                  <li>Use single-use codes for one-time access scenarios</li>
                  <li>Document and communicate access procedures clearly to authorized users</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Setup & Management</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>Create or edit your QR code as usual</li>
                  <li>Navigate to the "Security Settings" tab</li>
                  <li>Enable "Password Protection" and choose protection type</li>
                  <li>Set your password (or generate secure random passwords)</li>
                  <li>Optionally add time restrictions, geographic limits, or scan quotas</li>
                  <li>Customize the password entry page branding if desired</li>
                  <li>Test access to ensure everything works as expected</li>
                  <li>Save and share the QR code with password to authorized users</li>
                  <li>Monitor access attempts in real-time via the security dashboard</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Compliance & Audit Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Detailed access logs for compliance and audit requirements</li>
                  <li>Export access reports for security documentation</li>
                  <li>User identification tracking for accountability</li>
                  <li>Compliance with data protection regulations (GDPR, CCPA, etc.)</li>
                  <li>Automated alerts for security events or policy violations</li>
                  <li>Retention policies for access log data</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      <FooterCta />
    </div>
  );
}
