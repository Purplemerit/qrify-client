import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  currentStep: number;
  loading: boolean;
  hasSelectedType: boolean;
  hasGeneratedQR: boolean;
  onStepClick: (step: number) => void;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
}

export default function NewQRHeader({
  currentStep,
  loading,
  hasSelectedType,
  hasGeneratedQR,
  onStepClick,
  onBack,
  onNext,
  onComplete,
}: Props) {
  return (
    <div className="mb-6 md:mb-12 px-4 md:px-10">
      <div className="flex items-center justify-between mb-6 md:mb-8 mt-4 md:mt-8">
        {/* Left: Step indicator */}
        <div className="flex items-center space-x-2 md:space-x-4">
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
                  : hasSelectedType
                  ? "bg-muted text-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 2 ? "✓" : "2"}
            </div>
          </div>

          <div className={`h-px w-8 md:w-16 ${currentStep > 2 ? "bg-green-500" : "bg-muted"}`} />

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
                  : hasGeneratedQR
                  ? "bg-muted text-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > 3 ? "✓" : "3"}
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
                disabled={loading}
                size="sm"
                className="px-4 md:px-8 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  "Next →"
                )}
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
                onClick={onComplete}
                disabled={loading || !hasGeneratedQR}
                size="sm"
                className="px-4 md:px-8 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? "Saving..." : "Complete"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
