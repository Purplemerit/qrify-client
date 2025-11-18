import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Complete Analytics</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/analytics.webp"
              alt="Analytics illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Understand performance with detailed data and insights.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Transform raw scan data into actionable business intelligence with our comprehensive analytics platform.
              Understanding who scans your QR codes, when, where, and on what devices is crucial for optimizing your
              marketing campaigns and improving ROI. Our analytics dashboard goes far beyond simple scan counts - dive
              deep into user behavior patterns, geographic trends, device preferences, and time-based insights. Track
              conversion rates, measure campaign effectiveness, and make data-driven decisions that actually impact your
              bottom line. With real-time data updates, customizable reports, and intuitive visualizations, you'll gain
              the insights needed to refine your strategies, allocate resources effectively, and prove the value of your
              QR code initiatives to stakeholders. Every scan tells a story - our analytics help you understand it.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Metrics Tracking</h3>
                <div className="grid md:grid-cols-2 gap-6 ml-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Scan Metrics</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>Total scans over any time period</li>
                      <li>Unique vs. repeat scans</li>
                      <li>Scan frequency and patterns</li>
                      <li>Peak scan times and dates</li>
                      <li>Scan velocity trends</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Location Intelligence</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>Country and region breakdown</li>
                      <li>City-level data precision</li>
                      <li>Geographic heatmaps</li>
                      <li>Regional performance comparisons</li>
                      <li>Location-based insights</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Device & Technology Data</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>Device types (mobile/tablet/desktop)</li>
                      <li>Operating systems distribution</li>
                      <li>Browser types and versions</li>
                      <li>Screen resolutions</li>
                      <li>Mobile vs. desktop trends</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Time-Based Analytics</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>Hourly scan patterns</li>
                      <li>Daily trends and peaks</li>
                      <li>Weekly comparisons</li>
                      <li>Monthly performance reports</li>
                      <li>Year-over-year growth</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Analytics Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Real-time scan tracking with instant notifications</li>
                  <li>Custom date range reports for any time period</li>
                  <li>Export data to CSV/Excel for further analysis</li>
                  <li>Automated email reports delivered on schedule</li>
                  <li>Compare multiple QR codes side-by-side</li>
                  <li>ROI tracking and conversion metrics integration</li>
                  <li>Campaign performance benchmarking</li>
                  <li>Funnel analysis for conversion optimization</li>
                  <li>Attribution modeling across channels</li>
                  <li>Cohort analysis for user behavior patterns</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Visualization & Reporting</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Interactive charts and graphs for easy interpretation</li>
                  <li>Customizable dashboards tailored to your KPIs</li>
                  <li>Shareable reports for team collaboration and stakeholder updates</li>
                  <li>White-label reporting options for agencies</li>
                  <li>Mobile-friendly analytics access on the go</li>
                  <li>Historical data retention for long-term trend analysis</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Impact</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Optimize marketing spend based on actual performance data</li>
                  <li>Identify your most engaged audience segments</li>
                  <li>Discover optimal times to launch campaigns</li>
                  <li>Understand geographic opportunities for expansion</li>
                  <li>Measure the true ROI of your QR code initiatives</li>
                  <li>Make informed decisions backed by real data</li>
                  <li>Prove marketing value to leadership and stakeholders</li>
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
