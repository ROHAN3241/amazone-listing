import { X, ShoppingCart, ArrowRight } from 'lucide-react';

export default function AmazonModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-amazon-card border border-amazon-border rounded-2xl max-w-md w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amazon-text-secondary hover:text-amazon-text transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amazon-orange/20 rounded-full mb-6">
            <ShoppingCart className="w-10 h-10 text-amazon-orange" />
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-block px-3 py-1 bg-amazon-orange/20 text-amazon-orange text-xs font-bold rounded-full mb-4">
            COMING SOON
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-amazon-text mb-3">
            Connect Your Amazon Seller Account
          </h2>

          {/* Description */}
          <p className="text-sm text-amazon-text-secondary mb-6 leading-relaxed">
            We&apos;re building direct integration with Amazon&apos;s Selling Partner API (SP-API).
            Soon you&apos;ll be able to push your optimized listings directly to your Amazon
            Seller Central account with one click.
          </p>

          {/* Features coming */}
          <div className="bg-amazon-dark rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-medium text-amazon-text mb-2">What&apos;s coming:</p>
            <ul className="space-y-2 text-sm text-amazon-text-secondary">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-amazon-orange flex-shrink-0" />
                One-click listing publish
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-amazon-orange flex-shrink-0" />
                Inventory sync
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-amazon-orange flex-shrink-0" />
                Performance analytics
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-amazon-orange flex-shrink-0" />
                Multi-marketplace support
              </li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-amazon-dark border border-amazon-border text-amazon-text rounded-xl hover:border-amazon-orange transition-colors"
          >
            Got it, notify me!
          </button>
        </div>
      </div>
    </div>
  );
}
