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
    // Ensure only one item is open at a time.
    if (openItems.has(index)) {
      // If clicked item is already open, close it.
      setOpenItems(new Set());
    } else {
      // Open only the clicked item and close others.
      setOpenItems(new Set([index]));
    }
  };

  return (
    <div className="w-full max-w-[360px]">
      {items.map((item, index) => (
        <div
          key={index}
          className="w-full shrink-0 px-0 py-2 border-b-[#E0E0E0] border-b border-solid max-sm:py-3"
        >
          <div className="flex items-center justify-between">
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

          {/* Answer panel */}
          {item.answer && (
            <div
              id={`faq-content-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`mt-3 text-gray-600 transition-max-h duration-200 overflow-hidden ${
                openItems.has(index) ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="text-sm leading-relaxed">{item.answer}</div>
            </div>
          )}
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
      "The term “QR” stands for “quick response” and refers to instant access to the information contained in the Code. It is, in short, the evolution of the barcode, made up of patterns of black and white pixels. Denso Wave, a Japanese subsidiary of Toyota Denso, developed them in order to mark the components of their cars and thus speed up logistics in their production. Currently, it has gained great popularity, due to its versatility and accessibility, thanks to the functions of smart phones.",
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
          <h2 className="w-full text-[#220E27] text-[40px] font-bold mb-6 max-md:text-[32px] max-md:mb-5 max-sm:text-[28px] max-sm:leading-[1.2]">
            Everything you need to know to get started
          </h2>
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
              className="w-full max-w-[394px] h-auto aspect-[197/281] max-md:max-w-[300px] max-sm:max-w-[250px]"
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
