interface ShowcaseProps {
  activeType: string;
}

export function Showcase({ activeType }: ShowcaseProps) {
  const showcaseContent = {
    Website: {
      title: "Website",
      description:
        "Direct your customers to your website with a simple scan. Perfect for business cards, flyers, and promotional materials.",
      buttonText: "Generate QR Code for Website",
    },
    PDF: {
      title: "PDF",
      description:
        "From menus to user guides to creative portfolios, give your clients access to PDF documents quickly and efficiently.",
      buttonText: "Generate QR Code for PDF",
    },
    "vCard Plus": {
      title: "vCard Plus",
      description:
        "Share your complete contact information instantly. Perfect for networking events and business meetings.",
      buttonText: "Generate QR Code for vCard Plus",
    },
    Images: {
      title: "Images",
      description:
        "Display your image gallery, portfolio, or product photos with a single scan.",
      buttonText: "Generate QR Code for Images",
    },
    Text: {
      title: "Text",
      description:
        "Share important messages, instructions, or information in text format instantly.",
      buttonText: "Generate QR Code for Text",
    },
    Video: {
      title: "Video",
      description:
        "Link to your video content, tutorials, or promotional videos with ease.",
      buttonText: "Generate QR Code for Video",
    },
    Business: {
      title: "Business",
      description:
        "Promote your business with comprehensive information including location, hours, and services.",
      buttonText: "Generate QR Code for Business",
    },
  };

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Section - Dynamic Content */}
        <div className="lg:col-span-3">
          <h3 className="text-2xl font-bold mb-4">
            {showcaseContent[activeType].title}
          </h3>
          <p className="text-gray-600 mb-6">
            {showcaseContent[activeType].description}
          </p>

          <div className="mt-6">
            <button className="min-w-[220px] h-10 px-6 flex items-center justify-center whitespace-nowrap bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              {showcaseContent[activeType].buttonText}
            </button>
          </div>
        </div>

        {/* Center Section - Phone Mock */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="relative w-72 h-[32rem] flex items-center justify-center">
            <img
              src="/iphone15.png"
              alt="iPhone 15"
              className="w-full h-full object-contain"
            />
            {/* QR code overlay positioned on phone screen */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ marginTop: "-10px" }}
            >
              <div className="w-36 h-36 bg-white p-2 rounded-lg shadow-lg">
                  <img src="/QR_code.svg" alt="QR Code" className="w-32 h-32"/>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Fixed Description */}
        <div className="lg:col-span-3">
          <p className="text-gray-600 leading-relaxed mb-4">
            Customize your QR code to reflect your brand, making access to your
            documents attractive.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Adjust the content of your documents at any time, ensuring your
            clients always have access to the most recent version.
          </p>
        </div>
      </div>
    </section>
  );
}
