import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function DownloadFormats() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Variety of Download Formats</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/download-formats.webp"
              alt="Download Formats illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Expand the possibilities of use of QR codes with multiple export options.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              True versatility means having the right format for every application. Our comprehensive download
              options ensure your QR codes look perfect whether they're displayed on a massive billboard, printed
              on a tiny business card, or shared digitally across social media platforms. Each format is optimized
              for specific use cases - vector formats maintain crisp clarity at any size, while raster formats
              provide web-ready files with optimal compression. From professional print production requiring high-resolution
              EPS files to quick social media shares needing PNG transparency, we've got you covered. Never compromise
              on quality or compatibility again - choose the perfect format for your specific needs and ensure your
              QR codes always look professional and scan reliably.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Available Formats</h3>
                <div className="grid md:grid-cols-2 gap-4 ml-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 mb-1">PNG (Portable Network Graphics)</h4>
                    <p className="text-sm text-gray-600">Raster format perfect for web and digital use. Supports transparency, ideal for websites, emails, and social media. Available in multiple resolutions.</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 mb-1">SVG (Scalable Vector Graphics)</h4>
                    <p className="text-sm text-gray-600">Vector format that scales infinitely without quality loss. Perfect for responsive web design, apps, and situations requiring different sizes from one file.</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 mb-1">PDF (Portable Document Format)</h4>
                    <p className="text-sm text-gray-600">Universal format ideal for presentations, documents, and sharing. Maintains quality and can be easily embedded in reports and proposals.</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 mb-1">EPS (Encapsulated PostScript)</h4>
                    <p className="text-sm text-gray-600">Professional vector format for commercial printing. Industry standard for graphic designers, print shops, and large-format printing applications.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Advantages</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Choose the right format for your specific medium and use case</li>
                  <li>Maintain perfect quality across vastly different sizes</li>
                  <li>Full compatibility with industry-standard design tools</li>
                  <li>Optimized files for both digital display and professional printing</li>
                  <li>High-resolution options available for large-format applications</li>
                  <li>Transparent backgrounds for seamless integration</li>
                  <li>Print-ready files with proper color profiles (CMYK for print, RGB for digital)</li>
                  <li>Batch download multiple formats simultaneously</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Format Selection Guide</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>For Billboards & Large Prints:</strong> Use SVG or EPS for infinite scalability</li>
                  <li><strong>For Websites & Digital:</strong> PNG works best with optimal file size and quality balance</li>
                  <li><strong>For Business Cards & Small Prints:</strong> Use high-resolution PNG or vector formats</li>
                  <li><strong>For Presentations & Documents:</strong> PDF is ideal for easy sharing and printing</li>
                  <li><strong>For Professional Design Work:</strong> EPS provides maximum flexibility for designers</li>
                  <li><strong>For Email Signatures:</strong> Small PNG files with transparency</li>
                  <li><strong>For Packaging Design:</strong> Vector formats (SVG/EPS) for print production</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Best Practices</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Always test your QR code at the intended size before mass production</li>
                  <li>Maintain adequate quiet zone (white space) around the QR code</li>
                  <li>For print, use vector formats when possible to ensure scanning reliability</li>
                  <li>Consider your background - use transparent PNG for non-white backgrounds</li>
                  <li>Download multiple formats for future flexibility</li>
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
