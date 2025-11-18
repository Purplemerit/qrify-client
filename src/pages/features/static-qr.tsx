import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function StaticQR() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Static QR Codes</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/static-qr.webp"
              alt="Static QR Codes illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Permanent and unalterable QR codes for your business needs.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Static QR codes are the foundation of reliable, long-term QR code solutions. Unlike dynamic codes,
              static QR codes contain fixed information that is directly encoded into the QR pattern itself.
              Once generated, the data cannot be modified, making them perfect for applications where consistency
              and permanence are crucial. These codes work indefinitely without requiring an internet connection
              or server infrastructure, ensuring your information remains accessible regardless of external factors.
              Whether you're printing business cards, creating product labels, or designing marketing materials,
              static QR codes provide a dependable solution that stands the test of time.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Permanent data - cannot be modified after creation</li>
                  <li>No expiration date - works indefinitely</li>
                  <li>No internet connection required to function</li>
                  <li>Ideal for printed materials like business cards, posters, and packaging</li>
                  <li>Fast scanning with no redirects</li>
                  <li>No monthly fees or subscriptions required</li>
                  <li>Complete data privacy - no tracking or analytics</li>
                  <li>Works offline and in areas with poor connectivity</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Perfect Use Cases</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Contact information (vCard) - Share your business details instantly</li>
                  <li>WiFi credentials - Allow guests to connect without sharing passwords verbally</li>
                  <li>Plain text messages - Display important information or instructions</li>
                  <li>URLs that won't change - Link to permanent web pages or resources</li>
                  <li>Product serial numbers - Embed unchangeable product identification</li>
                  <li>Certificates and diplomas - Add verification codes that never expire</li>
                  <li>Memorial plaques - Create lasting tributes with permanent links</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Advantages</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Maximum reliability - No server dependencies or downtime</li>
                  <li>Faster scan times - Direct data access without URL redirects</li>
                  <li>Enhanced security - Data stored locally within the code</li>
                  <li>Lower long-term costs - One-time creation with no ongoing fees</li>
                  <li>Universal compatibility - Works with any QR code scanner</li>
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
