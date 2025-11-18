import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function CustomDomain() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Custom Domain</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/custom-domain.webp"
              alt="Custom Domain illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Strengthen your brand with your own domain for QR code URLs.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Brand trust starts with recognition, and nothing builds recognition like your own custom domain. Replace
              generic shortened URLs with branded links that reinforce your identity every time someone scans your QR code.
              When users see "go.yourbrand.com" instead of an unfamiliar third-party domain, trust increases, scan rates
              improve, and your brand stays top-of-mind throughout the customer journey. Custom domains aren't just about
              vanity - they're strategic assets that improve click-through rates, reduce friction in the customer journey,
              and give you complete control over your digital presence. Whether you're a enterprise protecting brand equity,
              an agency servicing multiple clients, or a business building long-term customer relationships, custom domains
              transform your QR codes from external tools into native brand touchpoints.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Why Custom Domains Matter</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 ml-4">
                  <p className="text-gray-700 mb-3">
                    <strong>Compare the difference:</strong>
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-red-600 font-semibold">❌</span>
                      <code className="bg-white px-3 py-1 rounded">qrfy.com/abc123</code>
                      <span className="text-gray-600">- Generic, forgettable, untrusted</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-600 font-semibold">✓</span>
                      <code className="bg-white px-3 py-1 rounded">go.yourbrand.com/special-offer</code>
                      <span className="text-gray-600">- Branded, memorable, trusted</span>
                    </div>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Increased trust and credibility - users recognize your brand instantly</li>
                  <li>Better brand recognition and recall in marketing materials</li>
                  <li>Professional appearance that matches enterprise standards</li>
                  <li>Consistent branding across all customer touchpoints</li>
                  <li>Improved click-through rates - up to 34% higher with branded links</li>
                  <li>Complete control over your links and data</li>
                  <li>Protection from third-party service disruptions</li>
                  <li>White-label solution for agencies and resellers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Features</h3>
                <div className="grid md:grid-cols-2 gap-6 ml-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-2">SSL Security Included</h4>
                    <p className="text-sm text-gray-600">Automatic HTTPS encryption for all custom domain links. Free SSL certificates with auto-renewal keep your links secure.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-2">Custom URL Paths</h4>
                    <p className="text-sm text-gray-600">Create meaningful, memorable short links like /promo, /event, or /product. Full control over URL structure.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-2">Multiple Domains</h4>
                    <p className="text-sm text-gray-600">Use different domains for different brands, campaigns, or client accounts. No limits on domain quantity.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-2">Simple DNS Setup</h4>
                    <p className="text-sm text-gray-600">Easy DNS configuration with step-by-step guidance. Support team available to help with technical setup.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Use Cases</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Enterprises:</strong> Maintain brand consistency and security compliance</li>
                  <li><strong>Agencies:</strong> White-label solution for client campaigns</li>
                  <li><strong>E-commerce:</strong> Build trust in promotional campaigns and packaging</li>
                  <li><strong>Publishers:</strong> Branded content links that match editorial standards</li>
                  <li><strong>Events:</strong> Professional registration and ticket links</li>
                  <li><strong>Franchises:</strong> Localized subdomains for each location</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Setup Process</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
                  <li><strong>Choose your domain:</strong> Use an existing domain or register a new one specifically for QR codes</li>
                  <li><strong>Add to QRify:</strong> Enter your domain in the Custom Domain settings</li>
                  <li><strong>Configure DNS:</strong> Add the provided DNS records to your domain registrar (we'll walk you through it)</li>
                  <li><strong>Verify ownership:</strong> System automatically verifies DNS configuration</li>
                  <li><strong>SSL activation:</strong> Free SSL certificate automatically provisions within minutes</li>
                  <li><strong>Start creating:</strong> Use your custom domain for all new and existing QR codes</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Options</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Subdomain support (e.g., promo.brand.com, event.brand.com)</li>
                  <li>Root domain and www variants both supported</li>
                  <li>Automatic HTTP to HTTPS redirects</li>
                  <li>Custom 404 pages for branded error handling</li>
                  <li>Domain-specific analytics and reporting</li>
                  <li>Bulk migrate existing QR codes to new domain</li>
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
