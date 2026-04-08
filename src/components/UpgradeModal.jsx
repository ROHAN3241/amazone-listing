import { X, Check, Zap, Crown } from 'lucide-react';

const PRO_FEATURES = [
  'Unlimited listings per day',
  'Bulk image processing',
  'Advanced SEO optimization',
  'Custom brand templates',
  'Priority AI processing',
  'Amazon SP-API integration',
  'Export to CSV/Excel',
  'Priority support',
];

export default function UpgradeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-amazon-card border border-amazon-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amazon-text-secondary hover:text-amazon-text transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amazon-orange/20 rounded-full mb-4">
              <Crown className="w-8 h-8 text-amazon-orange" />
            </div>
            <h2 className="text-2xl font-bold text-amazon-text">Upgrade to Pro</h2>
            <p className="text-amazon-text-secondary mt-2">
              Unlock the full power of ListingGenie
            </p>
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-amazon-orange">₹999</span>
              <span className="text-amazon-text-secondary">/month</span>
            </div>
            <p className="text-sm text-amazon-text-secondary mt-1">Cancel anytime</p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {PRO_FEATURES.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-amazon-orange/20 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-amazon-orange" />
                </div>
                <span className="text-sm text-amazon-text">{feature}</span>
              </div>
            ))}
          </div>

          {/* Razorpay Button Placeholder */}
          <button
            onClick={() => alert('Razorpay payment integration coming soon!')}
            className="w-full flex items-center justify-center gap-2 py-3 bg-amazon-orange text-amazon-dark font-bold rounded-xl hover:bg-amazon-orange-hover transition-colors text-lg"
          >
            <Zap className="w-5 h-5" />
            Pay with Razorpay
          </button>
          <p className="text-center text-xs text-amazon-text-secondary mt-3">
            Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
}
