import { Sparkles, Crown, ShoppingCart } from 'lucide-react';

export default function Header({ onUpgradeClick, onListOnAmazonClick }) {
  return (
    <header className="sticky top-0 z-50 bg-amazon-dark border-b border-amazon-border px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-amazon-orange" />
          <h1 className="text-xl md:text-2xl font-bold text-amazon-text">
            Listing<span className="text-amazon-orange">Genie</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onListOnAmazonClick}
            className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-sm border border-amazon-orange text-amazon-orange rounded-lg hover:bg-amazon-orange hover:text-amazon-dark transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">List on Amazon</span>
          </button>
          <button
            onClick={onUpgradeClick}
            className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-sm bg-amazon-orange text-amazon-dark font-semibold rounded-lg hover:bg-amazon-orange-hover transition-colors"
          >
            <Crown className="w-4 h-4" />
            <span className="hidden sm:inline">Upgrade to Pro</span>
          </button>
        </div>
      </div>
    </header>
  );
}
