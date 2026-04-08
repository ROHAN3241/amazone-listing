const STEPS = [
  { num: 1, label: 'Upload Image' },
  { num: 2, label: 'AI Analysis' },
  { num: 3, label: 'Review & Edit' },
  { num: 4, label: 'Export' },
];

export default function ProgressBar({ currentStep }) {
  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.num} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step.num < currentStep
                    ? 'bg-amazon-orange text-amazon-dark'
                    : step.num === currentStep
                    ? 'border-2 border-amazon-orange text-amazon-orange animate-pulse'
                    : 'border-2 border-amazon-border text-amazon-text-secondary'
                }`}
              >
                {step.num < currentStep ? '✓' : step.num}
              </div>
              <span
                className={`mt-2 text-xs md:text-sm whitespace-nowrap ${
                  step.num <= currentStep ? 'text-amazon-orange font-medium' : 'text-amazon-text-secondary'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 md:mx-4 mb-6 transition-colors duration-300 ${
                  step.num < currentStep ? 'bg-amazon-orange' : 'bg-amazon-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
