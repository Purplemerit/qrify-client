import React from "react";
import { ChevronDown } from "lucide-react";

// FAQ Components
interface FAQItem {
  question: string;
  answer?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="w-full max-w-[360px]">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex w-full h-16 items-center gap-2 shrink-0 justify-between px-0 py-2 border-b-[#E0E0E0] border-b border-solid max-md:relative max-md:w-full max-md:left-0 max-md:top-0 max-sm:h-auto max-sm:px-0 max-sm:py-3"
        >
          <button
            onClick={() => toggleItem(index)}
            className="flex w-full items-center justify-between text-left"
            aria-expanded={openItems.has(index)}
            aria-controls={`faq-content-${index}`}
          >
            <div className="text-[#220E27] text-base font-semibold relative max-sm:text-sm">
              {item.question}
            </div>
            <ChevronDown
              className={`w-8 h-8 aspect-[1/1] relative max-sm:w-6 max-sm:h-6 transition-transform duration-200 ${
                openItems.has(index) ? "rotate-180" : ""
              }`}
              style={{ color: "#220E27" }}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

// FAQ data
const faqItems = [
  {
    question: "What is a QR Code ?",
    answer:
      "A QR Code is a two-dimensional barcode that can store various types of information and can be quickly read by smartphones and other devices.",
  },
  {
    question: "Know the benefits of using QR",
    answer:
      "QR codes offer contactless interaction, quick access to information, easy sharing of data, and enhanced customer engagement.",
  },
  {
    question: "How to start using QR",
    answer:
      "Simply download a QR code scanner app, point your camera at the code, and follow the prompts to access the encoded information.",
  },
];

export function FaqAndIllustration() {
  return (
    <section
      className="w-full px-4 md:px-8 lg:px-16 py-16"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="w-full h-auto relative">
        <header className="text-center mb-12 max-md:mb-8">
          <h1 className="w-full text-[#220E27] text-[40px] font-bold mb-6 max-md:text-[32px] max-md:mb-5 max-sm:text-[28px] max-sm:leading-[1.2]">
            Everything you need to know to get started
          </h1>
          <p className="w-full text-[#585B70] text-center text-base font-semibold leading-6 max-md:mb-10 max-sm:text-sm max-sm:leading-5">
            In this section you will find the basic concepts and the necessary
            steps to start enjoying the benefits of using QR.
          </p>
        </header>

        <div className="flex items-start justify-center gap-12 max-md:flex-col max-md:items-center max-md:gap-8">
          <div className="flex-shrink-0">
            <img
              src="/faqimage.png"
              alt="QR Code illustration showing mobile phone scanning"
              className="w-[394px] h-[562px] shrink-0 aspect-[197/281] max-md:w-[300px] max-md:h-[428px] max-sm:w-[250px] max-sm:h-[357px]"
            />
          </div>

          <div className="flex-shrink-0 mt-0 max-md:mt-0">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
