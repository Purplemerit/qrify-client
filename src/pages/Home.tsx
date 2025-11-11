import React from 'react';
import { useState } from "react";

// Single-file SPA (JSX + Tailwind) that clones the layout from the screenshots.
// Drop this into a React app that has Tailwind configured (e.g. CRA + Tailwind or Next.js with Tailwind).

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        <Hero />
        <HowToCreate />
        <TypesSection />
        <Showcase />
        <MarketingGrid />
        <Collections />
        <FaqAndIllustration />
        <Reviews />
        <FooterCta />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="py-6 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold">Q</div>
          <div>
            <h1 className="text-lg font-semibold">QRFY</h1>
            <p className="text-xs text-gray-400">QR Code Generator</p>
          </div>
        </div>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <a className="hover:text-gray-900">Products</a>
          <a className="hover:text-gray-900">Resources</a>
          <a className="hover:text-gray-900">Plans</a>
          <a className="hover:text-gray-900">API</a>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-full border">Log In</button>
            <button className="px-4 py-2 rounded-full bg-blue-600 text-white">Register</button>
          </div>
        </nav>
      </div>
    </header>
  );
}


export function Hero() {
  const tabs = ["Website", "Text", "PDF", "Images", "vCard Plus", "Video"];
  
  const contentMap = {
    Website: (
      <>
        <h3 className="font-semibold">1 Complete the content</h3>
        <input
          className="mt-3 w-full border rounded p-3 text-sm"
          placeholder="E.g. https://www.myweb.com/"
        />
      </>
    ),
    Text: (
      <>
        <h3 className="font-semibold">1 Enter your text</h3>
        <textarea
          className="mt-3 w-full border rounded p-3 text-sm"
          placeholder="Write your message here..."
          rows={4}
        />
      </>
    ),
    PDF: (
      <>
        <h3 className="font-semibold">1 Upload your PDF</h3>
        <input type="file" accept="application/pdf" className="mt-3 w-full" />
      </>
    ),
    Images: (
      <>
        <h3 className="font-semibold">1 Upload your image</h3>
        <input type="file" accept="image/*" className="mt-3 w-full" />
      </>
    ),
    "vCard Plus": (
      <>
        <h3 className="font-semibold">1 Fill in your contact details</h3>
        <input className="mt-3 w-full border rounded p-3 text-sm" placeholder="Name" />
        <input className="mt-3 w-full border rounded p-3 text-sm" placeholder="Phone" />
        <input className="mt-3 w-full border rounded p-3 text-sm" placeholder="Email" />
      </>
    ),
    Video: (
      <>
        <h3 className="font-semibold">1 Paste your video link</h3>
        <input
          className="mt-3 w-full border rounded p-3 text-sm"
          placeholder="E.g. https://youtube.com/..."
        />
      </>
    ),
  };

  const [activeTab, setActiveTab] = useState("Website");

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 rounded-lg p-8 shadow-inner">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-md shadow p-6">
            {/* Tabs */}
            <div className="flex gap-4 items-center mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded text-sm ${
                    activeTab === tab
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              <div>{contentMap[activeTab]}</div>

              {/* QR Design Section - stays the same for all tabs */}
              <div>
                <h3 className="font-semibold">2 Design your QR</h3>
                <div className="mt-3 bg-gray-50 border rounded p-4 flex gap-4 items-center">
                  <div className="w-20 h-14 bg-white border rounded flex items-center justify-center text-xs text-gray-400">Frame</div>
                  <div className="w-20 h-14 bg-white border rounded flex items-center justify-center text-xs text-gray-400">Shape</div>
                  <div className="w-20 h-14 bg-white border rounded flex items-center justify-center text-xs text-gray-400">Logo</div>
                  <div className="w-20 h-14 bg-white border rounded flex items-center justify-center text-xs text-gray-400">Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QR Preview */}
        <aside className="lg:col-span-4">
          <div className="bg-white rounded p-6 shadow h-full flex flex-col items-center gap-6">
            <div className="w-40 h-40 bg-gray-50 rounded-md flex items-center justify-center">QR</div>
            <button className="px-5 py-2 bg-gray-100 rounded">Download QR ▾</button>
          </div>
        </aside>
      </div>
    </section>
  );
}


function HowToCreate() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-2">QR Code Generator: Create your Free QR Code</h2>
      <p className="text-gray-500 mb-8">Customize it with your color, shape and logo in 3 simple steps.</p>

      <h3 className="text-4xl font-light mb-8">How to create a QR code?</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="h-24 bg-gray-50 rounded mb-4" />
            <h4 className="font-semibold mb-2">Choose the content of your QR code</h4>
            <p className="text-sm text-gray-500">Select from a wide variety of options: PDF, menu, video, business cards, web, apps, etc.</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full">Create QR Code</button>
      </div>
    </section>
  );
}

function TypesSection() {
  const types = ['Website', 'PDF', 'vCard Plus', 'Images', 'Text', 'Video', 'Business'];
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-2">Generate different types of QR Codes</h2>
      <p className="text-gray-500 mb-6">QR codes can hold a large amount of content and at QRFY, we offer them all.</p>

      <div className="flex flex-wrap justify-center gap-10 my-6">
        {types.map((t) => (
          <div key={t} className="w-28 text-center">
            <div className="w-12 h-12 mx-auto rounded-full border flex items-center justify-center text-gray-400">🌐</div>
            <div className="mt-2 text-sm text-gray-600">{t}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      <div className="lg:col-span-1">
        <h3 className="text-2xl font-bold">PDF</h3>
        <p className="text-gray-600 mt-4">From menus to user guides to creative portfolios, give your clients access to PDF documents quickly and efficiently.</p>

        <div className="mt-6">
          <button className="px-5 py-3 bg-blue-600 text-white rounded-full">Generate QR Code for PDF</button>
        </div>
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 gap-4">
        <div className="w-full bg-white rounded-lg shadow h-96 flex items-center justify-center"> 
          {/* phone mock */}
          <div className="w-60 h-80 bg-gray-50 rounded-lg flex items-start justify-center p-6">Phone Mock</div>
        </div>
      </div>
    </section>
  );
}

function MarketingGrid() {
  const items = [
    'Complete Analysis',
    'Editing and management of QRs',
    'Dynamic QR Codes',
    'Templates',
    'Static QR',
    'Bulk creation and download',
    'Google and Facebook pixel integration',
    'Custom Domain',
    'Password access protection',
    'Event Tracking'
  ];

  return (
    <section className="py-16 px-6 bg-white text-center">
  <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-12">
    Your all-in-one marketing platform
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-8">
    {[
      ["Complete Analysis", "Understand performance with detailed data."],
      ["Editing and management of QRs", "Customize and organize your QRs"],
      ["Dynamic QR Codes", "QR codes that can be updated in real time."],
      ["Unlimited Contributing Users", "Manage your QR codes as a team"],
      ["Variety of download formats", "Expand the possibilities of use of your QRs"],
      ["Templates", "Save and reuse your own designs"],
      ["Static QR", "Permanent QR codes"],
      ["Bulk creation and download", "Generate and download QRs on a large scale"],
      ["Google and Facebook pixel integration", "Improve the analysis of your digital campaigns"],
      ["Custom Domain", "Strengthen your brand with your own domain"],
      ["Password access protection", ""],
      ["Event Tracking", ""],
    ].map(([title, desc], index) => (
      <div
        key={index}
        className="bg-gray-100 rounded-xl p-6 text-left"
      >
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        {desc && <p className="text-gray-500 text-sm">{desc}</p>}
      </div>
    ))}
  </div>

  <button className="bg-blue-600 text-white font-medium px-6 py-3 rounded-full hover:bg-blue-700 transition">
    Create QR Code
  </button>
</section>

  );
}

function Collections() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-6">Explore our extensive collection of QR codes</h2>
      <p className="text-gray-500 mb-8">QR codes can contain a wide range of content and at QRFY we offer them all.</p>

      <div className="bg-gradient-to-r from-purple-900 to-transparent rounded-xl p-8 text-left text-white flex items-center gap-8">
        <div className="w-1/2">
          <h3 className="text-2xl font-semibold mb-4">Create a unique invitation for an unforgettable event.</h3>
          <button className="mt-4 px-4 py-2 border rounded">See more</button>
        </div>
        <div className="w-1/2 opacity-90">Image mock</div>
      </div>

      <div className="mt-8 flex justify-center gap-6">
        <button className="px-6 py-3 bg-white border rounded shadow">QR code for weddings</button>
        <button className="px-6 py-3 bg-white border rounded shadow">QR code for NGOs</button>
        <button className="px-6 py-3 bg-white border rounded shadow">QR code for photographers</button>
      </div>

    </section>
  );
}

function FaqAndIllustration() {
  const questions = [
    'What is a QR Code ?',
    'Know the benefits of using QR',
    'How to start using QR'
  ];
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-2">Everything you need to know to get started</h2>
        <p className="text-gray-500 mb-6">In this section you will find the basic concepts and the necessary steps to start enjoying the benefits of using QR.</p>

        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <details key={i} className="bg-white rounded p-4 shadow-sm">
              <summary className="cursor-pointer font-medium">{questions[i % questions.length]}</summary>
              <p className="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </details>
          ))}
        </div>
      </div>

      <div className="p-8 flex items-center justify-center">
        <div className="w-80 h-96 bg-gray-50 rounded-lg shadow flex items-center justify-center">Illustration</div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-4">Our clients tell you why they should choose QRFY</h2>
      <p className="text-gray-500 mb-8">through their reviews in Google</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow"> 
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100" />
              <div className="text-left">
                <div className="font-semibold">A D Joshi</div>
                <div className="text-sm text-gray-400">July 21, 2025</div>
              </div>
            </div>
            <div className="text-yellow-400">★★★★★ 5.0</div>
            <p className="text-sm text-gray-500 mt-4">Created the QR code in blink of a second. I created for My Road Safety Website address, for easy login to my followers. Thanks QRFY</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button className="px-6 py-3 bg-white border rounded-full">See more reviews</button>
      </div>
    </section>
  );
}

function FooterCta() {
  return (
    <footer className="pt-12 pb-24 text-center">
      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-bold mb-4">Do not leave with doubt</h3>
        <p className="text-gray-500 mb-6">In this section you will find the basic concepts and the necessary steps to start enjoying the benefits of using QR.</p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full">Basic information</button>
          <button className="px-6 py-3 border rounded-full">Design and creation</button>
          <button className="px-6 py-3 border rounded-full">Scan and print</button>
        </div>
      </div>
    </footer>
  );
}
