import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function GooglePixel() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Google Pixel Integration</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/google-pixel.webp"
              alt="Google Pixel Integration illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Improve the analysis of your digital campaigns with advanced tracking.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Bridge the gap between physical and digital marketing with seamless tracking pixel integration. Connect
              your QR codes to Google Analytics, Facebook Pixel, and other major tracking platforms to gain a complete
              view of your customer journey from scan to conversion. Understanding how QR code scans fit into your broader
              marketing funnel is essential for accurate attribution, retargeting opportunities, and ROI calculation. Our
              integration capabilities allow you to track QR code visitors alongside your website traffic, measure cross-channel
              performance, and leverage powerful remarketing tools to re-engage users who've scanned your codes. Transform
              your QR codes from simple links into sophisticated, trackable marketing assets that feed into your existing
              analytics infrastructure and enable data-driven decision making across all channels.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Supported Integrations</h3>
                <div className="grid md:grid-cols-2 gap-6 ml-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-3">
                    <h4 className="font-semibold text-gray-900 mb-1">Google Analytics</h4>
                    <p className="text-sm text-gray-600">Track QR code scans as traffic sources in GA. See user behavior, conversion paths, and demographic data alongside your website metrics.</p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4 py-3">
                    <h4 className="font-semibold text-gray-900 mb-1">Facebook Pixel</h4>
                    <p className="text-sm text-gray-600">Build custom audiences from QR code scanners. Retarget them with Facebook and Instagram ads based on their scan behavior.</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 py-3">
                    <h4 className="font-semibold text-gray-900 mb-1">Google Tag Manager</h4>
                    <p className="text-sm text-gray-600">Manage all your tracking tags from one centralized platform. Deploy new tracking without touching QR code settings.</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-3">
                    <h4 className="font-semibold text-gray-900 mb-1">Custom Pixels</h4>
                    <p className="text-sm text-gray-600">Add any custom tracking script, pixel, or analytics platform. Support for LinkedIn, TikTok, Pinterest, and proprietary systems.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tracking Capabilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Unified analytics across all marketing channels - see QR performance alongside digital campaigns</li>
                  <li>Better attribution modeling to understand true customer journey paths</li>
                  <li>Retargeting capabilities for users who scanned but didn't convert</li>
                  <li>A/B testing integration for split testing landing pages</li>
                  <li>Cross-device user journey tracking from scan to purchase</li>
                  <li>Enhanced ROI measurement with conversion value tracking</li>
                  <li>Event tracking for micro-conversions and engagement metrics</li>
                  <li>Custom dimension and metric support for advanced segmentation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketing Benefits</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Build remarketing audiences based on QR scan behavior</li>
                  <li>Track offline-to-online customer journeys accurately</li>
                  <li>Measure true campaign ROI with full attribution</li>
                  <li>Optimize landing pages using heatmap and session recording tools</li>
                  <li>Segment audiences for personalized follow-up campaigns</li>
                  <li>Integrate with CRM systems for lead nurturing</li>
                  <li>Track customer lifetime value from initial QR scan</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Setup Process</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>Navigate to your QR code settings or create a new code</li>
                  <li>Select the "Tracking & Pixels" section</li>
                  <li>Choose your tracking platform (Google Analytics, Facebook, etc.)</li>
                  <li>Enter your tracking ID or pixel code</li>
                  <li>Configure UTM parameters for campaign tracking</li>
                  <li>Test the integration to ensure data flows correctly</li>
                  <li>Save and start collecting integrated analytics data</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Server-side tracking for enhanced accuracy and privacy compliance</li>
                  <li>First-party cookie support to bypass ad blockers</li>
                  <li>Data layer customization for advanced Tag Manager users</li>
                  <li>Conversion API integration for Facebook (CAPI)</li>
                  <li>Enhanced e-commerce tracking support</li>
                  <li>Privacy-safe tracking options compliant with GDPR and CCPA</li>
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
