import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function EventTracking() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Event Tracking</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/event-tracking.webp"
              alt="Event Tracking illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Track interactions and user behavior with advanced event monitoring.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              The scan is just the beginning of the customer journey - what happens next determines success. Our comprehensive
              event tracking system monitors every interaction after a user scans your QR code, providing deep insights into
              actual behavior, engagement patterns, and conversion paths. Move beyond simple scan counts to understand how
              users interact with your content, which actions they take, how long they engage, and where they drop off in
              your funnel. This behavioral data reveals what truly resonates with your audience, enabling you to optimize
              landing pages, improve conversion rates, and allocate resources to the tactics that actually drive results.
              Whether you're measuring e-commerce transactions, event registrations, content downloads, or any custom goal,
              our event tracking transforms your QR codes into powerful data collection instruments that illuminate the entire
              customer experience from scan to conversion.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Events We Track Automatically</h3>
                <div className="space-y-4 ml-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">S</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Scans & Visits</h4>
                      <p className="text-sm text-gray-600">Track initial QR code scans, page views, session starts, returning visitors, and time between scans with precise timestamps and location data.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">C</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Conversions & Goals</h4>
                      <p className="text-sm text-gray-600">Monitor form submissions, purchases, sign-ups, downloads, or any custom goal completion with revenue tracking and funnel visualization.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">E</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Engagement Actions</h4>
                      <p className="text-sm text-gray-600">Capture button clicks, link taps, video plays, document downloads, scroll depth, and all user interactions with detailed interaction heatmaps.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">T</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Time & Session Data</h4>
                      <p className="text-sm text-gray-600">Measure time on page, session duration, pages per visit, bounce rates, and engagement depth to understand content effectiveness.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Tracking Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Define unlimited custom events specific to your business needs</li>
                  <li>Conversion funnel analysis to identify drop-off points and optimize flows</li>
                  <li>Multi-touch attribution to understand the full customer journey</li>
                  <li>Event sequencing and user journey mapping across sessions</li>
                  <li>Real-time event notifications for high-value actions</li>
                  <li>Integration with Google Analytics, Mixpanel, and other analytics platforms</li>
                  <li>Cohort analysis to compare behavior across different user groups</li>
                  <li>Automated event triggers for marketing automation workflows</li>
                  <li>Revenue tracking and e-commerce transaction details</li>
                  <li>Custom event parameters for granular segmentation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry-Specific Applications</h3>
                <div className="grid md:grid-cols-2 gap-6 ml-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-2">E-commerce & Retail</h4>
                    <p className="text-sm text-gray-600 mb-2">Track the complete purchase journey:</p>
                    <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                      <li>Product page views</li>
                      <li>Add to cart actions</li>
                      <li>Checkout initiations</li>
                      <li>Purchase completions with revenue</li>
                      <li>Product recommendations clicked</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-2">Events & Conferences</h4>
                    <p className="text-sm text-gray-600 mb-2">Monitor event engagement:</p>
                    <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                      <li>Registration form submissions</li>
                      <li>Check-in confirmations</li>
                      <li>Session attendance tracking</li>
                      <li>Networking interactions</li>
                      <li>Feedback survey completions</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-2">Lead Generation</h4>
                    <p className="text-sm text-gray-600 mb-2">Optimize your funnel:</p>
                    <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                      <li>Landing page visits</li>
                      <li>Form field interactions</li>
                      <li>Contact form submissions</li>
                      <li>Lead magnet downloads</li>
                      <li>Phone call click-to-dial</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-2">Content & Media</h4>
                    <p className="text-sm text-gray-600 mb-2">Measure content engagement:</p>
                    <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                      <li>Article/video views</li>
                      <li>Content downloads</li>
                      <li>Social sharing actions</li>
                      <li>Comment submissions</li>
                      <li>Newsletter sign-ups</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Optimization Capabilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Identify high-performing content and replicate success across campaigns</li>
                  <li>Discover friction points in user journeys and eliminate barriers</li>
                  <li>Test different landing pages and measure conversion rate impact</li>
                  <li>Segment users by behavior for personalized follow-up marketing</li>
                  <li>Calculate customer acquisition cost (CAC) per QR campaign</li>
                  <li>Determine lifetime value (LTV) of customers acquired via QR codes</li>
                  <li>Optimize content placement based on engagement heatmaps</li>
                  <li>Refine targeting based on which audience segments convert best</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Reporting & Insights</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Real-time dashboards showing event streams as they happen</li>
                  <li>Automated reports highlighting key metrics and trends</li>
                  <li>Custom event reports filtered by date, location, or user segment</li>
                  <li>Exportable data for deeper analysis in your BI tools</li>
                  <li>Comparative analysis between campaigns or time periods</li>
                  <li>Anomaly detection alerts for unusual event patterns</li>
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
