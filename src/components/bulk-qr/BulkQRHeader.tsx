import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  currentStep: number;
  loading: boolean;
  csvUrlsCount: number;
  onStepClick: (step: number) => void;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
  onGenerateBulk: () => void;
}

export default function BulkQRHeader({
  currentStep,
  loading,
  csvUrlsCount,
  onStepClick,
  onBack,
  onNext,
  onComplete,
  onGenerateBulk,
}: Props) {
  return (
    <div className="mb-6 md:mb-12 px-4 md:px-10">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        {/* Left: Step indicator */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Step 1 */}
          <div
            className="flex items-center space-x-1 md:space-x-3 cursor-pointer"
            onClick={() => onStepClick(1)}
          >
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-300 ${
                currentStep === 1
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : currentStep > 1
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 1 ? "✓" : "1"}
            </div>
          </div>

          <div className={`h-px w-8 md:w-16 ${currentStep > 1 ? "bg-green-500" : "bg-muted"}`} />

          {/* Step 2 */}
          <div
            className="flex items-center space-x-1 md:space-x-3 cursor-pointer"
            onClick={() => onStepClick(2)}
          >
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-300 ${
                currentStep === 2
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : currentStep > 2
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 2 ? "✓" : "2"}
            </div>
          </div>

          <div className={`h-px w-8 md:w-16 ${currentStep > 2 ? "bg-green-500" : "bg-muted"}`} />

          {/* Step 3 */}
          <div
            className="flex items-center space-x-1 md:space-x-3 cursor-pointer"
            onClick={() => onStepClick(3)}
          >
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-300 ${
                currentStep === 3
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : currentStep > 3
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 3 ? "✓" : "3"}
            </div>
          </div>

          <div className={`h-px w-8 md:w-16 ${currentStep > 3 ? "bg-green-500" : "bg-muted"}`} />

          {/* Step 4 */}
          <div className="flex items-center space-x-1 md:space-x-3">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-300 ${
                currentStep === 4
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              4
            </div>
          </div>
        </div>

        {/* Right: Back / Next buttons */}
        <div>
          {currentStep === 2 && (
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                variant="outline"
                onClick={onBack}
                size="sm"
                className="px-4 md:px-8 py-2 rounded-full border-2 hover:border-primary/50 transition-all duration-300"
              >
                ← Back
              </Button>
              <Button
                onClick={onNext}
                size="sm"
                className="px-4 md:px-8 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Next →
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                variant="outline"
                onClick={onBack}
                size="sm"
                className="px-4 md:px-8 py-2 rounded-full border-2 hover:border-primary/50 transition-all duration-300"
              >
                ← Back
              </Button>
              <Button
                onClick={onGenerateBulk}
                disabled={csvUrlsCount === 0 || loading}
                size="sm"
                className="px-4 md:px-8 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading
                  ? "Generating..."
                  : csvUrlsCount > 0
                  ? `Generate ${csvUrlsCount} QR${csvUrlsCount > 1 ? "s" : ""}`
                  : "Generate QR Codes"}
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                onClick={onComplete}
                disabled={loading}
                size="sm"
                className="px-4 md:px-8 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? "Saving..." : "Complete & View"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
