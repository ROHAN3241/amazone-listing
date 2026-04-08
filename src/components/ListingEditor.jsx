import { Copy, Type, List, FileText, Tags } from 'lucide-react';
import { toast } from 'react-toastify';
import { copyToClipboard } from '../utils/exportHelpers';

export default function ListingEditor({ listingData, onUpdate }) {
  if (!listingData) return null;

  const { title, bulletPoints, description, searchKeywords } = listingData;

  const handleCopy = async (text, label) => {
    const success = await copyToClipboard(text);
    if (success) {
      toast.success(`${label} copied to clipboard!`);
    } else {
      toast.error('Failed to copy. Please try manually.');
    }
  };

  const handleBulletChange = (index, value) => {
    const newBullets = [...bulletPoints];
    newBullets[index] = value;
    onUpdate('bulletPoints', newBullets);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 px-4">
      {/* Title Section */}
      <div className="bg-amazon-card rounded-xl p-5 border border-amazon-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-amazon-orange" />
            <h3 className="text-lg font-semibold text-amazon-text">Product Title</h3>
          </div>
          <button
            onClick={() => handleCopy(title, 'Title')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-amazon-dark border border-amazon-border rounded-lg hover:border-amazon-orange hover:text-amazon-orange transition-colors text-amazon-text-secondary"
          >
            <Copy className="w-3.5 h-3.5" />
            Copy
          </button>
        </div>
        <textarea
          value={title}
          onChange={(e) => onUpdate('title', e.target.value)}
          rows={3}
          maxLength={200}
          className="w-full bg-amazon-dark border border-amazon-border rounded-lg p-3 text-amazon-text resize-none focus:outline-none focus:border-amazon-orange transition-colors"
        />
        <p className={`text-xs mt-1 text-right ${title.length > 200 ? 'text-red-400' : 'text-amazon-text-secondary'}`}>
          {title.length}/200 characters
        </p>
      </div>

      {/* Bullet Points Section */}
      <div className="bg-amazon-card rounded-xl p-5 border border-amazon-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <List className="w-5 h-5 text-amazon-orange" />
            <h3 className="text-lg font-semibold text-amazon-text">Key Features (Bullet Points)</h3>
          </div>
          <button
            onClick={() => handleCopy(bulletPoints.join('\n'), 'Bullet points')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-amazon-dark border border-amazon-border rounded-lg hover:border-amazon-orange hover:text-amazon-orange transition-colors text-amazon-text-secondary"
          >
            <Copy className="w-3.5 h-3.5" />
            Copy All
          </button>
        </div>
        <div className="space-y-3">
          {bulletPoints.map((bp, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-amazon-orange font-bold mt-3 text-sm min-w-[24px]">
                {index + 1}.
              </span>
              <textarea
                value={bp}
                onChange={(e) => handleBulletChange(index, e.target.value)}
                rows={2}
                className="flex-1 bg-amazon-dark border border-amazon-border rounded-lg p-3 text-amazon-text resize-none focus:outline-none focus:border-amazon-orange transition-colors text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-amazon-card rounded-xl p-5 border border-amazon-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amazon-orange" />
            <h3 className="text-lg font-semibold text-amazon-text">Product Description</h3>
          </div>
          <button
            onClick={() => handleCopy(description, 'Description')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-amazon-dark border border-amazon-border rounded-lg hover:border-amazon-orange hover:text-amazon-orange transition-colors text-amazon-text-secondary"
          >
            <Copy className="w-3.5 h-3.5" />
            Copy
          </button>
        </div>
        <textarea
          value={description}
          onChange={(e) => onUpdate('description', e.target.value)}
          rows={6}
          className="w-full bg-amazon-dark border border-amazon-border rounded-lg p-3 text-amazon-text resize-none focus:outline-none focus:border-amazon-orange transition-colors"
        />
        <p className="text-xs mt-1 text-right text-amazon-text-secondary">
          ~{description.split(/\s+/).filter(Boolean).length} words
        </p>
      </div>

      {/* Search Keywords Section */}
      <div className="bg-amazon-card rounded-xl p-5 border border-amazon-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Tags className="w-5 h-5 text-amazon-orange" />
            <h3 className="text-lg font-semibold text-amazon-text">Backend Search Keywords</h3>
          </div>
          <button
            onClick={() => handleCopy(searchKeywords, 'Keywords')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-amazon-dark border border-amazon-border rounded-lg hover:border-amazon-orange hover:text-amazon-orange transition-colors text-amazon-text-secondary"
          >
            <Copy className="w-3.5 h-3.5" />
            Copy
          </button>
        </div>
        <textarea
          value={searchKeywords}
          onChange={(e) => onUpdate('searchKeywords', e.target.value)}
          rows={3}
          className="w-full bg-amazon-dark border border-amazon-border rounded-lg p-3 text-amazon-text resize-none focus:outline-none focus:border-amazon-orange transition-colors"
        />
        <p className={`text-xs mt-1 text-right ${searchKeywords.length > 250 ? 'text-red-400' : 'text-amazon-text-secondary'}`}>
          {searchKeywords.length}/250 characters
        </p>
      </div>
    </div>
  );
}
