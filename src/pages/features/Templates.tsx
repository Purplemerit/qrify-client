import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function Templates() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">QR Code Templates</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/templates.webp"
              alt="QR Code Templates illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Save and reuse your own designs for consistent branding.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Consistency is the cornerstone of professional branding, and our template system makes it effortless to
              maintain. Design your perfect QR code once - complete with your brand colors, logo placement, patterns,
              and frames - then save it as a template for instant reuse across unlimited campaigns. No more recreating
              the same design from scratch or worrying about slight inconsistencies between codes. Whether you're a
              marketing team managing multiple campaigns, an agency serving different clients, or a business maintaining
              strict brand guidelines, templates eliminate repetitive work while ensuring every QR code matches your
              exact specifications. Share templates across your team, create variations for different use cases, and
              onboard new team members faster with standardized designs that capture your brand's visual identity perfectly.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Powerful Template Capabilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Save unlimited custom templates - no restrictions on quantity</li>
                  <li>Store complete design specifications including all visual elements</li>
                  <li>Include brand colors, patterns, and gradient configurations</li>
                  <li>Save logo positioning, sizing, and styling preferences</li>
                  <li>Store default error correction levels for reliability</li>
                  <li>Pre-configure size, resolution, and file format settings</li>
                  <li>Share templates with all team members instantly</li>
                  <li>Clone and modify templates to create variations</li>
                  <li>Organize templates with custom categories and tags</li>
                  <li>Preview templates before applying to new codes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Customizable Design Elements</h3>
                <div className="grid md:grid-cols-2 gap-6 ml-4">
                  <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Colors & Gradients</h4>
                    <p className="text-sm text-gray-600">Save foreground and background colors, gradient styles, transparency levels, and color schemes that match your brand perfectly.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Logo Integration</h4>
                    <p className="text-sm text-gray-600">Store logo files, positioning preferences (center, corner, etc.), sizing ratios, and protective margins for optimal scanning.</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Patterns & Shapes</h4>
                    <p className="text-sm text-gray-600">Choose from dots, squares, rounded corners, or custom shapes. Save pattern density, style variations, and eye designs.</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Frames & CTAs</h4>
                    <p className="text-sm text-gray-600">Add custom borders, frames, or call-to-action text. Save frame styles, colors, text positioning, and font choices.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Benefits</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Save hundreds of hours eliminating repetitive design work</li>
                  <li>Ensure perfect brand consistency across all campaigns and channels</li>
                  <li>Quickly create new QR codes using proven, tested designs</li>
                  <li>A/B test different template variations to optimize performance</li>
                  <li>Faster team onboarding with standardized design libraries</li>
                  <li>Maintain quality control even as team grows</li>
                  <li>Reduce design review cycles with pre-approved templates</li>
                  <li>Scale QR code production without scaling design resources</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Template Management Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Organization:</strong> Create folders and categories for different brands, campaigns, or use cases</li>
                  <li><strong>Search & Filter:</strong> Quickly find the right template with powerful search capabilities</li>
                  <li><strong>Version Control:</strong> Track template changes over time and revert if needed</li>
                  <li><strong>Permissions:</strong> Control which team members can edit vs. use templates</li>
                  <li><strong>Favorites:</strong> Star frequently used templates for instant access</li>
                  <li><strong>Bulk Actions:</strong> Apply templates to multiple QR codes simultaneously</li>
                  <li><strong>Export/Import:</strong> Share templates between accounts or backup your library</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Create and Use Templates</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>Design your QR code with all desired customizations (colors, logo, pattern, frame, etc.)</li>
                  <li>Click the "Save as Template" button in the designer</li>
                  <li>Give your template a descriptive, memorable name</li>
                  <li>Add tags or assign to categories for easy organization</li>
                  <li>Optionally add notes about when/how to use this template</li>
                  <li>Save - the template is now available for the entire team</li>
                  <li>When creating new QR codes, simply select the template to apply all settings instantly</li>
                  <li>Modify individual codes as needed without affecting the base template</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Template Use Cases</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Campaign Types:</strong> Separate templates for events, products, promotions, social media</li>
                  <li><strong>Channels:</strong> Different templates optimized for print vs. digital vs. packaging</li>
                  <li><strong>Brands:</strong> Dedicated templates for each brand in multi-brand organizations</li>
                  <li><strong>Clients:</strong> Agencies can maintain template libraries for each client</li>
                  <li><strong>Seasonal:</strong> Holiday or seasonal versions of your core brand templates</li>
                  <li><strong>Languages:</strong> Localized templates with region-specific design elements</li>
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
