import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function EditingManagement() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Editing and Management of QR Codes</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/editing-management.webp"
              alt="Editing and Management illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Customize and organize your QR codes with powerful editing tools.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Complete control over your QR code portfolio starts with powerful editing and management capabilities.
              Our intuitive platform allows you to modify designs, update destinations, reorganize campaigns, and
              maintain brand consistency across all your QR codes - all from a single, centralized dashboard. Whether
              you're managing a handful of codes or thousands, our sophisticated organization tools keep everything
              neat, searchable, and accessible. Create custom folder structures, apply tags for instant filtering,
              and use bulk operations to make sweeping changes in seconds. Never lose track of a QR code again with
              version history that lets you rollback changes, and enable/disable codes temporarily without deleting
              them permanently. Experience true flexibility with management tools designed for both efficiency and control.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Editing Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Update destination URLs without changing the physical QR code</li>
                  <li>Modify QR code design including colors, patterns, and logo placement</li>
                  <li>Change QR code types (URL, vCard, WiFi, SMS, etc.) while keeping the same code</li>
                  <li>Edit meta information like titles, descriptions, and internal notes</li>
                  <li>Adjust error correction levels for better scanning reliability</li>
                  <li>Update embedded logos and branding elements</li>
                  <li>Modify call-to-action frames and borders</li>
                  <li>Preview changes in real-time before saving</li>
                  <li>Batch edit multiple QR codes simultaneously</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Organization Tools</h3>
                <div className="grid md:grid-cols-2 gap-6 ml-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 mb-1">Folders & Categories</h4>
                    <p className="text-sm text-gray-600">Create unlimited nested folders to organize by campaign, client, product line, or any custom structure. Drag and drop to reorganize effortlessly.</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 mb-1">Tags & Labels</h4>
                    <p className="text-sm text-gray-600">Apply multiple custom tags to each QR code for flexible categorization. Filter by tags instantly to find exactly what you need.</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 mb-1">Advanced Search & Filter</h4>
                    <p className="text-sm text-gray-600">Search by name, URL, tags, creation date, or any metadata. Save favorite filters for quick access to commonly used views.</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 mb-1">Bulk Operations</h4>
                    <p className="text-sm text-gray-600">Select multiple QR codes and edit, move, tag, or delete them all at once. Massive time-saver for large-scale management.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Management Capabilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Archive inactive QR codes to declutter while preserving historical data</li>
                  <li>Duplicate QR codes to create variations quickly</li>
                  <li>Set expiration dates for time-limited campaigns</li>
                  <li>Enable/disable QR codes temporarily without deletion</li>
                  <li>Version history with rollback functionality</li>
                  <li>Favorites system for quick access to important codes</li>
                  <li>Sorting options by date, name, scans, or custom criteria</li>
                  <li>Export QR code lists with metadata to CSV</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Time-Saving Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Quick actions menu for common tasks</li>
                  <li>Keyboard shortcuts for power users</li>
                  <li>Customizable dashboard views</li>
                  <li>Recently edited items for easy access</li>
                  <li>Smart suggestions based on usage patterns</li>
                  <li>Template application to multiple codes at once</li>
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
