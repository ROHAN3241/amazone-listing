/**
 * ExportActions component - Provides copy and export functionality.
 * Includes: Copy All, Export PDF, Download All Images buttons.
 */
import { Copy, FileDown, Download, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { copyToClipboard, formatListingText, exportAsPDF, downloadImage } from '../utils/exportHelpers';

export default function ExportActions({ listingData, infographicImages }) {
  if (!listingData) return null;

  const handleCopyAll = async () => {
    const text = formatListingText(listingData);
    const success = await copyToClipboard(text);
    if (success) {
      toast.success('Complete listing copied to clipboard!');
    } else {
      toast.error('Failed to copy. Please try manually.');
    }
  };

  const handleExportPDF = () => {
    try {
      const imageUrls = infographicImages
        ? [infographicImages.main, infographicImages.feature, infographicImages.lifestyle]
        : [];
      exportAsPDF(listingData, imageUrls);
      toast.success('PDF exported successfully!');
    } catch {
      toast.error('Failed to export PDF. Please try again.');
    }
  };

  const handleDownloadAllImages = () => {
    if (!infographicImages) {
      toast.error('No images to download.');
      return;
    }
    Object.entries(infographicImages).forEach(([type, dataUrl]) => {
      if (dataUrl) {
        downloadImage(dataUrl, `listing-genie-${type}-image.png`);
      }
    });
    toast.success('All images downloaded!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="bg-amazon-card border border-amazon-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-amazon-text">Your listing is ready!</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Copy All */}
          <button
            onClick={handleCopyAll}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-amazon-orange text-amazon-dark font-semibold rounded-xl hover:bg-amazon-orange-hover transition-colors"
          >
            <Copy className="w-5 h-5" />
            Copy All Text
          </button>

          {/* Export PDF */}
          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-amazon-dark border border-amazon-border text-amazon-text rounded-xl hover:border-amazon-orange hover:text-amazon-orange transition-colors"
          >
            <FileDown className="w-5 h-5" />
            Export as PDF
          </button>

          {/* Download Images */}
          <button
            onClick={handleDownloadAllImages}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-amazon-dark border border-amazon-border text-amazon-text rounded-xl hover:border-amazon-orange hover:text-amazon-orange transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Images
          </button>
        </div>
      </div>
    </div>
  );
}
