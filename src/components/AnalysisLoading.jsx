import { useState, useEffect } from 'react';
import { Loader2, Brain } from 'lucide-react';

const LOADING_MESSAGES = [
  'Identifying product type...',
  'Extracting features & materials...',
  'Generating SEO-optimized title...',
  'Writing compelling bullet points...',
  'Creating product description...',
  'Generating search keywords...',
];

export default function AnalysisLoading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative">
        <Brain className="w-20 h-20 text-amazon-orange animate-pulse" />
        <Loader2 className="w-8 h-8 text-amazon-orange animate-spin absolute -bottom-1 -right-1" />
      </div>
      <h2 className="text-2xl font-bold text-amazon-text mt-8 mb-3">
        AI is analyzing your product...
      </h2>
      <p className="text-amazon-orange font-medium transition-all duration-500">
        {LOADING_MESSAGES[messageIndex]}
      </p>
      <div className="flex gap-2 mt-6">
        <div className="w-3 h-3 rounded-full bg-amazon-orange loading-dot" />
        <div className="w-3 h-3 rounded-full bg-amazon-orange loading-dot" />
        <div className="w-3 h-3 rounded-full bg-amazon-orange loading-dot" />
      </div>
    </div>
  );
}
