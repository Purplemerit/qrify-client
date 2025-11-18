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
    <nav className="flex w-[620px] max-w-full items-stretch gap-5 text-sm text-[rgba(104,103,108,1)] font-bold flex-wrap justify-between mt-10">
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
  isOpen?: boolean;
  onClick?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  isOpen = false,
  onClick,
}) => {
  return (
    <article className="relative flex min-h-16 w-[800px] max-w-full items-start gap-2 text-base text-[rgba(34,14,39,1)] font-semibold py-[23px] border-[rgba(224,224,224,1)] border-b">
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
    <section className="self-stretch mt-[88px] max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-2/5 max-md:w-full max-md:ml-0">
          <img
            src="/footerfaq.svg"
            alt="FAQ illustration"
            className="aspect-[0.94] object-contain w-full grow max-md:mt-10"
          />
        </div>
        <div className="w-3/5 ml-5 max-md:w-full max-md:ml-0">
          <div className="flex w-full flex-col self-stretch items-stretch my-auto max-md:mt-10">
            <h2 className="text-[rgba(34,14,39,1)] text-[40px] font-normal">
              Want to know more?
            </h2>
            <p className="text-[rgba(88,91,112,1)] text-sm font-semibold leading-6 mt-4 max-md:mr-2.5">
              Check our FAQs to find an answer to any questions you may have
              about our QR codes.
            </p>
            <button
              onClick={handleAnswerQuestions}
              className="bg-[rgba(29,89,249,1)] flex min-h-10 items-center gap-3 text-base text-white font-bold justify-center mt-7 px-5 py-[11px] rounded-3xl hover:bg-blue-600 transition-colors"
            >
              <span className="self-stretch my-auto">
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
    "What is a QR Code generator ?",
    "Know the benefits of using QR",
    "How to start using QR",
    "What is a QR Code ?",
    "Know the benefits of using QR",
    "How to start using QR",
    "What is a QR Code ?",
    "Know the benefits of using QR",
    "How to start using QR",
    "How to start using QR",
  ],
  design: [
    "How to customize QR code design?",
    "What design options are available?",
    "Can I add logos to QR codes?",
    "How to choose colors for QR codes?",
  ],
  scan: [
    "How to scan QR codes?",
    "What apps can scan QR codes?",
    "How to print QR codes effectively?",
    "What size should QR codes be?",
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
    <main className="bg-[rgba(247,247,247,1)] flex flex-col overflow-hidden items-center justify-center px-20 py-[126px] max-md:px-5 max-md:py-[100px]">
      <div className="flex w-[836px] max-w-full flex-col items-center">
        <header className="text-center">
          <h1 className="text-[rgba(34,14,39,1)] text-[40px] font-bold max-md:max-w-full">
            Do not leave with doubt
          </h1>
          <p className="text-[rgba(88,91,112,1)] text-base font-semibold leading-6 text-center w-[573px] mt-4 max-md:max-w-full">
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
          className="w-full mt-12 max-md:mt-10"
          aria-label="Frequently Asked Questions"
        >
          {currentFAQs.map((question, index) => (
            <AccordionItem
              key={`${activeTab}-${index}`}
              question={question}
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
