import { Star, ShoppingCart } from 'lucide-react';

export default function AmazonPreview({ listingData, imagePreview }) {
  if (!listingData) return null;

  const { title, bulletPoints, description } = listingData;

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <h3 className="text-lg font-semibold text-amazon-text mb-4 text-center">
        📦 Amazon Listing Preview
      </h3>
      <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
        {/* Amazon-like header bar */}
        <div className="bg-[#131921] px-4 py-2 flex items-center gap-3">
          <div className="text-[#ff9900] font-bold text-lg">amazon</div>
          <div className="flex-1 bg-white rounded-md h-8" />
          <div className="text-white text-sm flex items-center gap-1">
            <ShoppingCart className="w-5 h-5" /> Cart
          </div>
        </div>

        {/* Product Detail Section */}
        <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
          {/* Left: Product Image */}
          <div className="md:w-2/5 flex-shrink-0">
            <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-center bg-white">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Product"
                  className="max-h-80 w-auto object-contain"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h1 className="text-lg md:text-xl font-normal text-[#0f1111] leading-snug mb-2">
              {title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-[#de7921]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-[#007185]">4,521 ratings</span>
            </div>

            {/* Price */}
            <div className="border-b border-gray-200 pb-3 mb-3">
              <span className="text-sm text-[#565959]">Price: </span>
              <span className="text-2xl text-[#0f1111] font-light">$XX.XX</span>
            </div>

            {/* Bullet Points */}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[#0f1111] mb-2">About this item</h3>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[#333]">
                {bulletPoints.map((bp, i) => (
                  <li key={i} className="leading-relaxed">{bp}</li>
                ))}
              </ul>
            </div>

            {/* Add to Cart button */}
            <button className="w-full md:w-auto px-8 py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] text-sm text-[#0f1111] rounded-full border border-[#fcd200] font-medium cursor-default">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="border-t border-gray-200 p-4 md:p-6">
          <h3 className="text-lg font-bold text-[#0f1111] mb-3">Product Description</h3>
          <p className="text-sm text-[#333] leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
