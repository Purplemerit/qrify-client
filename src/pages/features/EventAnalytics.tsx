import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function EventAnalytics() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Analytics</h1>
          <p className="text-lg text-gray-600 mb-6">
            Track interactions and user behavior with advanced event monitoring.
          </p>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Monitor Every Interaction</h2>
              <p className="text-gray-700 leading-relaxed">
                Go beyond basic scan tracking with comprehensive event monitoring. Track what
                users do after scanning your QR codes and optimize your campaigns based on real behavior.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Events You Can Track</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">S</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Scans</h4>
                    <p className="text-sm text-gray-600">Initial QR code scan events with timestamp and location</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">C</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Conversions</h4>
                    <p className="text-sm text-gray-600">Form submissions, purchases, or other goal completions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">E</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Engagement</h4>
                    <p className="text-sm text-gray-600">Button clicks, video plays, downloads, and interactions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">T</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Time on Page</h4>
                    <p className="text-sm text-gray-600">How long users spend viewing your content</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Advanced Tracking Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Custom event definitions for your specific needs</li>
                <li>Conversion funnel analysis</li>
                <li>Multi-touch attribution</li>
                <li>Event sequencing and user journey mapping</li>
                <li>Real-time event notifications</li>
                <li>Integration with Google Analytics and other platforms</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Use Cases</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">E-commerce</h3>
                  <p className="text-sm text-gray-600">Track product views, add-to-cart, and purchases from QR codes</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Events</h3>
                  <p className="text-sm text-gray-600">Monitor registrations, check-ins, and session attendance</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Lead Generation</h3>
                  <p className="text-sm text-gray-600">Track form fills, contact requests, and qualification steps</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Content Marketing</h3>
                  <p className="text-sm text-gray-600">Measure downloads, video views, and content engagement</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <FooterCta />
    </div>
  );
}
