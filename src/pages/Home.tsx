import { useState } from "react";
import {
  Header,
  Hero,
  HowToCreate,
  TypesSection,
  Showcase,
  MarketingGrid,
  Discover,
  Collections,
  FaqAndIllustration,
  Reviews,
  FooterCta,
} from "./home/index";

export default function App() {
  const [activeShowcaseType, setActiveShowcaseType] = useState("PDF");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        <Hero />
        <HowToCreate />
        <TypesSection
          onTypeSelect={setActiveShowcaseType}
          activeType={activeShowcaseType}
        />
        <Showcase activeType={activeShowcaseType} />
        <MarketingGrid />
      </main>
      <Discover />
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        <Collections />
        <FaqAndIllustration />
        <Reviews />
        <FooterCta />
      </main>
    </div>
  );
}
