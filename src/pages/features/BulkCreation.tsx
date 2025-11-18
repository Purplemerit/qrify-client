import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function BulkCreation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Bulk Creation and Download</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/bulk-creation.webp"
              alt="Bulk Creation illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Generate and download QR codes on a large scale efficiently.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Scale your QR code operations from dozens to thousands with our powerful bulk creation tools. Perfect for
              businesses that need unique QR codes for every product, event attendee, location, or marketing piece, our
              bulk generation system transforms hours of manual work into minutes of automated efficiency. Simply upload
              a spreadsheet with your data, apply your brand design consistently across all codes, and download everything
              in one organized package. Whether you're creating tickets for a 10,000-person conference, QR codes for an
              entire product catalog, or location-specific codes for a nationwide campaign, our bulk tools handle the heavy
              lifting. Maintain perfect consistency, save countless hours, and ensure every code meets your exact specifications
              - all while generating them faster than you ever thought possible.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How Bulk Creation Works</h3>
                <div className="space-y-4 ml-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Upload Your Data</h4>
                      <p className="text-sm text-gray-600 mt-1">Import CSV or Excel files with unlimited rows. Each row can contain URLs, text, vCard data, or any QR code content you need.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Customize Design</h4>
                      <p className="text-sm text-gray-600 mt-1">Apply your brand colors, logo, patterns, and frames to all codes at once. Or use variable data to customize individual codes based on spreadsheet columns.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Generate & Download</h4>
                      <p className="text-sm text-gray-600 mt-1">Create all QR codes instantly and download them as a ZIP file with organized folders and sequential naming.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Powerful Bulk Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Upload CSV or Excel files with unlimited rows - no caps on volume</li>
                  <li>Variable data support for personalized QR codes using merge fields</li>
                  <li>Apply consistent branding across thousands of codes simultaneously</li>
                  <li>Download as organized ZIP file with custom folder structures</li>
                  <li>Sequential numbering and intelligent naming conventions</li>
                  <li>Preview samples before generating the full batch</li>
                  <li>Progress tracking for large batches</li>
                  <li>Error validation to catch issues before generation</li>
                  <li>Multiple file format output (PNG, SVG, PDF, EPS) for all codes</li>
                  <li>Custom resolution settings per code or batch-wide</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-World Applications</h3>
                <div className="grid md:grid-cols-2 gap-6 ml-4">
                  <div className="bg-gray-50 border-l-4 border-blue-600 p-4 rounded">
                    <h4 className="font-semibold text-gray-900 mb-2">Product Catalogs</h4>
                    <p className="text-sm text-gray-600">Generate unique QR codes for every SKU, linking to product details, specs, videos, or reviews. Perfect for packaging and retail displays.</p>
                  </div>
                  <div className="bg-gray-50 border-l-4 border-green-600 p-4 rounded">
                    <h4 className="font-semibold text-gray-900 mb-2">Event Tickets</h4>
                    <p className="text-sm text-gray-600">Create personalized tickets with unique QR codes for each attendee. Include names, ticket types, and validation data.</p>
                  </div>
                  <div className="bg-gray-50 border-l-4 border-purple-600 p-4 rounded">
                    <h4 className="font-semibold text-gray-900 mb-2">Asset Tracking</h4>
                    <p className="text-sm text-gray-600">Label equipment, inventory, or company assets with trackable QR codes linked to management systems.</p>
                  </div>
                  <div className="bg-gray-50 border-l-4 border-red-600 p-4 rounded">
                    <h4 className="font-semibold text-gray-900 mb-2">Multi-Location Campaigns</h4>
                    <p className="text-sm text-gray-600">Create location-specific QR codes for franchises, retail chains, or distributed marketing materials.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Efficiency Benefits</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Generate 1,000+ QR codes in under a minute</li>
                  <li>Eliminate manual, repetitive creation tasks</li>
                  <li>Ensure 100% consistency across all codes</li>
                  <li>Reduce human error in data entry and creation</li>
                  <li>Free up team time for strategic work</li>
                  <li>Easy updates and regeneration when needed</li>
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
