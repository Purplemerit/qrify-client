import React, { useState } from "react";

// Tab Navigation Component
interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className="flex w-full max-w-[620px] items-stretch gap-3 md:gap-5 text-xs md:text-sm text-[rgba(104,103,108,1)] font-bold flex-wrap justify-center md:justify-between mt-6 md:mt-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex min-h-10 items-center gap-5 overflow-hidden justify-center px-2 py-3 rounded-[8px_8px_0px_0px] transition-colors ${
            activeTab === tab.id
              ? "bg-[rgba(243,245,254,1)] text-[rgba(29,89,249,1)] border-b-2 border-[rgba(29,89,249,1)]"
              : "hover:bg-gray-50"
          }`}
        >
          <span className="self-stretch my-auto">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

// Accordion Item Component
interface AccordionItemProps {
  question: string;
  answer?: string;
  isOpen?: boolean;
  onClick?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen = false,
  onClick,
}) => {
  return (
    <article className="relative w-full max-w-[800px] text-sm md:text-base text-[rgba(34,14,39,1)] font-semibold py-4 md:py-[23px] border-[rgba(224,224,224,1)] border-b">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="z-0 my-auto">{question}</span>
        <img
          src={
            isOpen
              ? "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/f6c6fd2470d792bc61978ea7dcac518e66bea20e?placeholderIfAbsent=true"
              : "https://api.builder.io/api/v1/image/assets/35de5dc00516421d9aa405b4c562fade/9cd8fe1c52ad21762702dd496c545828216cf9af?placeholderIfAbsent=true"
          }
          alt={isOpen ? "Collapse" : "Expand"}
          className="aspect-[1] object-contain w-8 shrink-0 h-8"
        />
      </button>
      
      {/* Answer panel */}
      {answer && (
        <div
          className={`mt-4 text-[rgba(88,91,112,1)] font-normal text-sm leading-relaxed transition-all duration-200 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {answer}
        </div>
      )}
    </article>
  );
};

// Call to Action Component
const CallToAction: React.FC = () => {
  const handleAnswerQuestions = () => {
    // Handle navigation to FAQ or contact page
    // ...existing code...
  };

  return (
    <section className="self-stretch mt-12 md:mt-[88px] max-md:max-w-full">
      <div className="gap-5 flex flex-col md:flex-row items-center md:items-stretch">
        <div className="w-full md:w-2/5">
          <img
            src="/footerfaq.svg"
            alt="FAQ illustration"
            className="aspect-[0.94] object-contain w-full max-w-xs md:max-w-full mx-auto"
          />
        </div>
        <div className="w-full md:w-3/5 md:ml-5">
          <div className="flex w-full flex-col items-stretch my-auto">
            <h2 className="text-[rgba(34,14,39,1)] text-2xl md:text-[40px] font-normal">
              Want to know more?
            </h2>
            <p className="text-[rgba(88,91,112,1)] text-xs md:text-sm font-semibold leading-5 md:leading-6 mt-3 md:mt-4">
              Check our FAQs to find an answer to any questions you may have
              about our QR codes.
            </p>
            <button
              onClick={handleAnswerQuestions}
              className="bg-[rgba(29,89,249,1)] flex min-h-10 items-center gap-3 text-sm md:text-base text-white font-bold justify-center mt-5 md:mt-7 px-4 md:px-5 py-2.5 md:py-[11px] rounded-3xl hover:bg-blue-600 transition-colors w-full md:w-auto"
            >
              <span>
                Answer all your questions
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main FAQ Section Component
const tabs = [
  { id: "basic", label: "Basic information" },
  { id: "design", label: "Design and creation" },
  { id: "scan", label: "Scan and print" },
];

const faqData = {
  basic: [
    {
      question: "What is a QR Code generator?",
      answer: "It is a tool that allows you to generate different types of QR codes, in an easy and intuitive way. The rise of QR codes has made our QR code generator sought after and required by many people and businesses, with businesses of all kinds: you can use our QR code generator to create QR codes for your website, share a PDF, a photo gallery, a playlist, a price list or menu, connect your customers with a service available in your business (WiFi network, attention, shifts, payments, etc.), advertise shows or other events on public roads through the link to the trailer or trailer, create a vCard with contact information and share it with your customers, and much more." 
    },
    {
      question: "What is a QR Code?",
      answer: "A QR Code (Quick Response Code) is a two-dimensional barcode that can store various types of information such as URLs, text, contact information, and more. It can be quickly scanned using a smartphone camera or QR code reader app, making it an efficient way to share information instantly."
    },
    {
      question: "Know the benefits of using QR codes",
      answer: "QR codes offer numerous benefits: they provide contactless interaction which is hygienic and convenient, enable quick access to information without typing URLs, are easy to create and share, can be customized to match your brand, track engagement through analytics, update content dynamically without changing the code, and work across all smartphone platforms without requiring special apps on modern devices."
    },
    {
      question: "How to start using QR codes?",
      answer: "Getting started is simple: First, choose the type of QR code you want to create (website, PDF, vCard, etc.). Then, enter your content or upload your files. Customize the design with colors, frames, and logos to match your brand. Finally, download your QR code and place it on your marketing materials, business cards, products, or anywhere your audience can scan it."
    },
    {
      question: "Are QR codes free to create?",
      answer: "Yes, basic QR code generation is completely free on our platform. You can create unlimited static QR codes at no cost. Dynamic QR codes with advanced features like analytics, editing capabilities, and custom domains may require a premium subscription."
    },
    {
      question: "Do QR codes expire?",
      answer: "Static QR codes never expire - they will work indefinitely as long as the destination content exists. Dynamic QR codes remain active as long as your account is maintained. You can always update the destination of dynamic QR codes without changing the printed code itself."
    },
    {
      question: "Can I track QR code scans?",
      answer: "Yes, with dynamic QR codes you can track detailed analytics including the number of scans, location data, time of scans, device types used, and more. This helps you measure the effectiveness of your marketing campaigns and understand your audience better."
    },
    {
      question: "What information can I encode in a QR code?",
      answer: "QR codes can encode various types of content including website URLs, plain text, contact information (vCard), WiFi credentials, email addresses, phone numbers, SMS messages, PDF documents, images, videos, social media links, app download links, payment information, and much more."
    },
  ],
  design: [
    {
      question: "How to customize QR code design?",
      answer: "You can customize your QR code by selecting different frame styles, choosing dot patterns (square, rounded, dots), adding your logo in the center, adjusting colors to match your brand, and selecting error correction levels. Our design tools make it easy to create QR codes that are both functional and visually appealing."
    },
    {
      question: "What design options are available?",
      answer: "Our platform offers multiple customization options: 10+ frame styles (card, scooter, juice, gift wrapper, etc.), 4 dot shape patterns (square, dots, rounded, extra rounded), logo placement in the center, custom color schemes, and 4 error correction levels. You can preview your design in real-time before downloading."
    },
    {
      question: "Can I add logos to QR codes?",
      answer: "Yes, you can add your company logo or any custom icon to the center of your QR code. We offer pre-designed logo options (WhatsApp, Location, Link, Scan, WiFi, Email) or you can upload your own logo. The QR code remains scannable even with a logo, thanks to built-in error correction."
    },
    {
      question: "How to choose colors for QR codes?",
      answer: "When choosing colors, ensure high contrast between the QR code dots and background for optimal scannability. Dark colors on light backgrounds work best. While black and white is most reliable, you can use brand colors as long as there's sufficient contrast. Always test your colored QR code before printing to ensure it scans properly."
    },
    {
      question: "Will design customization affect scannability?",
      answer: "Our platform ensures all design customizations maintain scannability. We use error correction algorithms that allow up to 30% of the QR code to be customized while remaining fully functional. However, we recommend testing your QR code with multiple devices before mass printing."
    },
  ],
  scan: [
    {
      question: "How to scan QR codes?",
      answer: "Scanning QR codes is simple: Open your smartphone camera app (most modern phones have built-in QR scanning), point the camera at the QR code ensuring it's clearly visible in the frame, and wait for a notification to appear. Tap the notification to access the encoded content. No additional app is needed on most recent smartphones."
    },
    {
      question: "What apps can scan QR codes?",
      answer: "Most modern smartphones (iPhone iOS 11+ and Android 8+) have built-in QR code scanning in the default camera app. Alternatively, you can use dedicated QR scanner apps like QR Code Reader, Google Lens, or scanner apps from your phone's app store. Many messaging apps like WhatsApp and WeChat also include built-in QR scanners."
    },
    {
      question: "How to print QR codes effectively?",
      answer: "For effective printing: ensure minimum size of 2x2 cm (0.8x0.8 inches) for reliable scanning, use high-resolution images (at least 300 DPI for print), maintain good contrast between code and background, avoid stretching or distorting the code, leave white space (quiet zone) around the QR code, and test the printed code before mass production."
    },
    {
      question: "What size should QR codes be?",
      answer: "The minimum recommended size is 2x2 cm (0.8x0.8 inches). However, the ideal size depends on the scanning distance: for business cards use 2-3 cm, for posters and flyers 3-5 cm, for billboards and signs calculate using the formula: Size (cm) = Distance (cm) ÷ 10. Always account for the expected scanning distance when determining QR code size."
    },
    {
      question: "What is the optimal scanning distance?",
      answer: "The general rule is that the scanning distance should be about 10 times the width of the QR code. For example, a 3cm QR code can be scanned from approximately 30cm away. For larger displays like posters or billboards, increase the QR code size proportionally to ensure easy scanning from a comfortable distance."
    },
  ],
};

export function FooterCta() {
  const [activeTab, setActiveTab] = useState("basic");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const currentFAQs =
    faqData[activeTab as keyof typeof faqData] || faqData.basic;

  return (
    <main className="bg-[rgba(247,247,247,1)] flex flex-col overflow-hidden items-center justify-center px-5 md:px-10 lg:px-20 py-16 md:py-24 lg:py-[126px]">
      <div className="flex w-full max-w-[836px] flex-col items-center">
        <header className="text-center px-4">
          <h1 className="text-[rgba(34,14,39,1)] text-2xl md:text-3xl lg:text-[40px] font-bold">
            Do not leave with doubt
          </h1>
          <p className="text-[rgba(88,91,112,1)] text-sm md:text-base font-semibold leading-5 md:leading-6 text-center max-w-[573px] mx-auto mt-3 md:mt-4">
            In this section you will find the basic concepts and the necessary
            steps to start enjoying the benefits of using QR.
          </p>
        </header>

        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <section
          className="w-full mt-8 md:mt-12 px-4"
          aria-label="Frequently Asked Questions"
        >
          {currentFAQs.map((faq, index) => (
            <AccordionItem
              key={`${activeTab}-${index}`}
              question={typeof faq === 'string' ? faq : faq.question}
              answer={typeof faq === 'object' ? faq.answer : undefined}
              isOpen={openAccordion === index}
              onClick={() => handleAccordionClick(index)}
            />
          ))}
        </section>

        <CallToAction />
      </div>
    </main>
  );
}
