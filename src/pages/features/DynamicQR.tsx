import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function DynamicQR() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Dynamic QR Codes</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/dynamic-qr.webp"
              alt="Dynamic QR Codes illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            QR codes updatable in real time with advanced tracking capabilities.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Dynamic QR codes revolutionize the way businesses use QR technology by offering unprecedented
              flexibility and control. Instead of encoding data directly, dynamic QR codes contain a short URL
              that redirects to your target content. This powerful approach allows you to update destinations,
              track user engagement, and modify content without ever changing the physical QR code. Perfect for
              marketing campaigns, product packaging, and any scenario where you need the ability to adapt your
              message over time. With built-in analytics, A/B testing capabilities, and real-time editing, dynamic
              QR codes empower you to optimize your campaigns based on actual user behavior and changing business needs.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Edit content anytime without reprinting - Save costs on reprints and updates</li>
                  <li>Track scan analytics and user behavior - Understand your audience better</li>
                  <li>A/B testing capabilities - Test different destinations and measure performance</li>
                  <li>Shorter QR code patterns - Easier to scan and more aesthetically pleasing</li>
                  <li>Retargeting and remarketing options - Re-engage users who scanned your codes</li>
                  <li>Schedule content changes - Set up campaigns in advance</li>
                  <li>Geo-targeting - Show different content based on user location</li>
                  <li>Time-based redirects - Display content relevant to specific time periods</li>
                  <li>Password protection - Secure access to exclusive content</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Applications</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Marketing campaigns with changing offers - Update promotions without reprinting materials</li>
                  <li>Event registrations - Manage event details and registration forms dynamically</li>
                  <li>Product packaging with seasonal promotions - Keep packaging relevant year-round</li>
                  <li>Restaurant menus that update regularly - Reflect menu changes, prices, and specials instantly</li>
                  <li>Real estate listings - Update property information as status changes</li>
                  <li>Social media profiles - Keep links current as platforms evolve</li>
                  <li>Digital business cards - Update contact information without reprinting</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics & Insights</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Real-time scan tracking and notifications</li>
                  <li>Geographic data - See where your codes are being scanned</li>
                  <li>Device and browser information - Understand your audience's technology</li>
                  <li>Conversion tracking - Measure ROI on QR campaigns</li>
                  <li>Custom reports and data export options</li>
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
