export function MarketingGrid() {
  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-12">
        Your all-in-one marketing platform
      </h2>

      <div className="max-w-6xl mx-auto mb-8">
        <div
          className="grid grid-cols-4 gap-4"
          style={{ gridAutoRows: "minmax(150px, auto)" }}
        >
          {/* Complete Analysis - spans 2 rows */}
          <div className="bg-gray-100 rounded-lg p-6 text-left row-span-2">
            <h3 className="font-semibold text-gray-900 mb-2">
              Complete Analysis
            </h3>
            <p className="text-gray-600 text-sm">
              Understand performance with detailed data.
            </p>
          </div>

          {/* Editing and management - spans 2 cols */}
          <div className="bg-gray-100 rounded-lg p-6 text-left col-span-2">
            <h3 className="font-semibold text-gray-900 mb-2">
              Editing and management of QRs
            </h3>
            <p className="text-gray-600 text-sm">
              customize and organize your QRs
            </p>
          </div>

          {/* Dynamic QR Codes - spans 2 rows */}
          <div className="bg-gray-100 rounded-lg p-6 text-left row-span-2">
            <h3 className="font-semibold text-gray-900 mb-2">
              Dynamic QR Codes
            </h3>
            <p className="text-gray-600 text-sm">
              QR codes that can be updated in real time.
            </p>
          </div>

          {/* Unlimited Contributing Users */}
          <div className="bg-gray-100 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">
              Unlimited Contributing Users
            </h3>
            <p className="text-gray-600 text-sm">
              Manage your QR codes as a team
            </p>
          </div>

          {/* Variety of download formats */}
          <div className="bg-gray-100 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">
              Variety of download formats
            </h3>
            <p className="text-gray-600 text-sm">
              Expand the possibilities of use of your QRs
            </p>
          </div>

          {/* Templates - single cell */}
          <div className="bg-gray-100 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Templates</h3>
            <p className="text-gray-600 text-sm">
              Save and reuse your own designs
            </p>
          </div>

          {/* Static QR */}
          <div className="bg-gray-100 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Static QR</h3>
            <p className="text-gray-600 text-sm">Permanent QR codes</p>
          </div>

          {/* Bulk creation and download */}
          <div className="bg-gray-100 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">
              Bulk creation and download
            </h3>
            <p className="text-gray-600 text-sm">
              Generate and download QRs on a large scale
            </p>
          </div>

          {/* Google and Facebook - spans 2 rows */}
          <div className="bg-gray-100 rounded-lg p-6 text-left row-span-2">
            <h3 className="font-semibold text-gray-900 mb-2">
              Google and Facebook pixel integration
            </h3>
            <p className="text-gray-600 text-sm">
              Improve the analysis of your digital campaigns
            </p>
          </div>

          {/* Custom Domain */}
          <div className="bg-gray-100 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Custom Domain</h3>
            <p className="text-gray-600 text-sm">
              Strengthen your brand with your own domain
            </p>
          </div>

          {/* Password access protection */}
          <div className="bg-gray-100 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">
              Password access protection
            </h3>
          </div>

          {/* Event Tracking */}
          <div className="bg-gray-100 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Event Tracking</h3>
          </div>
        </div>
      </div>

      <button className="bg-blue-600 text-white font-medium px-8 py-3 rounded-full hover:bg-blue-700 transition">
        Create QR Code
      </button>
    </section>
  );
}
