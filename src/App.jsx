/**
 * ListingGenie - AI-powered Amazon Listing Generator
 *
 * Main application component that orchestrates the step-by-step flow:
 *   Step 1: Upload product image + enter API key
 *   Step 2: AI analysis (loading state)
 *   Step 3: Review & edit generated content + infographics + preview
 *   Step 4: Export (copy, download, PDF)
 */
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

// Components
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import ApiKeyInput from './components/ApiKeyInput';
import ImageUpload from './components/ImageUpload';
import AnalysisLoading from './components/AnalysisLoading';
import ListingEditor from './components/ListingEditor';
import InfographicGenerator from './components/InfographicGenerator';
import AmazonPreview from './components/AmazonPreview';
import ExportActions from './components/ExportActions';
import UpgradeModal from './components/UpgradeModal';
import AmazonModal from './components/AmazonModal';

// Utils
import { fileToBase64, createImagePreviewUrl } from './utils/imageHelpers';
import { analyzeAndGenerateListing } from './utils/claudeApi';

export default function App() {
  // Step state (1-4)
  const [currentStep, setCurrentStep] = useState(1);

  // API key
  const [apiKey, setApiKey] = useState(() => {
    try {
      return sessionStorage.getItem('listinggenie_apikey') || '';
    } catch {
      return '';
    }
  });

  // Image state
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Listing data
  const [listingData, setListingData] = useState(null);

  // Infographic image data URLs (set by InfographicGenerator)
  const [infographicImages, setInfographicImages] = useState(null);

  // Loading / error state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  // Modal state
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAmazonModal, setShowAmazonModal] = useState(false);

  /** Handle API key submission */
  const handleApiKeySubmit = useCallback((key) => {
    setApiKey(key);
    try {
      sessionStorage.setItem('listinggenie_apikey', key);
    } catch {
      // sessionStorage not available
    }
    toast.success('API key saved for this session.');
  }, []);

  /** Handle image file selection */
  const handleImageSelect = useCallback((file) => {
    setImageFile(file);
    setImagePreview(createImagePreviewUrl(file));
    setError(null);
  }, []);

  /** Handle image removal */
  const handleRemoveImage = useCallback(() => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    setListingData(null);
    setInfographicImages(null);
    setCurrentStep(1);
  }, [imagePreview]);

  /** Start AI analysis */
  const handleAnalyze = useCallback(async () => {
    if (!imageFile || !apiKey) return;

    setIsAnalyzing(true);
    setError(null);
    setCurrentStep(2);

    try {
      const { base64, mediaType } = await fileToBase64(imageFile);
      const result = await analyzeAndGenerateListing(base64, mediaType, apiKey);

      setListingData(result);
      setCurrentStep(3);
      toast.success('Listing generated successfully!');
    } catch (err) {
      setError(err.message);
      setCurrentStep(1);
      toast.error(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [imageFile, apiKey]);

  /** Update a specific field in listing data */
  const handleUpdateListing = useCallback((field, value) => {
    setListingData((prev) => ({ ...prev, [field]: value }));
  }, []);

  /** Move to export step */
  const handleGoToExport = useCallback(() => {
    setCurrentStep(4);
  }, []);

  /** Start over */
  const handleStartOver = useCallback(() => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    setListingData(null);
    setInfographicImages(null);
    setError(null);
    setCurrentStep(1);
  }, [imagePreview]);

  return (
    <div className="min-h-screen bg-amazon-darker">
      {/* Header */}
      <Header
        onUpgradeClick={() => setShowUpgradeModal(true)}
        onListOnAmazonClick={() => setShowAmazonModal(true)}
      />

      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto pb-16">
        {/* Step 1: API Key + Image Upload */}
        {currentStep === 1 && (
          <div className="space-y-8">
            {/* API Key Input */}
            {!apiKey && <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />}

            {/* Image Upload */}
            {apiKey && (
              <>
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-amazon-text mb-2">
                    Upload Your Product Image
                  </h2>
                  <p className="text-amazon-text-secondary">
                    Our AI will analyze your product and generate a complete Amazon listing
                  </p>
                </div>

                <ImageUpload
                  onImageSelect={handleImageSelect}
                  imagePreview={imagePreview}
                  onRemoveImage={handleRemoveImage}
                />

                {/* Error display */}
                {error && (
                  <div className="max-w-lg mx-auto px-4">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Analyze button */}
                {imageFile && (
                  <div className="text-center">
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="px-8 py-3 bg-amazon-orange text-amazon-dark font-bold text-lg rounded-xl hover:bg-amazon-orange-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amazon-orange/20"
                    >
                      🚀 Generate Amazon Listing
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Step 2: AI Analysis Loading */}
        {currentStep === 2 && <AnalysisLoading />}

        {/* Step 3: Review & Edit */}
        {currentStep === 3 && listingData && (
          <div className="space-y-10">
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-amazon-text mb-2">
                Review & Edit Your Listing
              </h2>
              <p className="text-amazon-text-secondary">
                Edit any section below, then proceed to export
              </p>
            </div>

            {/* Listing Editor */}
            <ListingEditor listingData={listingData} onUpdate={handleUpdateListing} />

            {/* Infographic Generator */}
            <InfographicGenerator
              imagePreview={imagePreview}
              listingData={listingData}
              onImagesGenerated={setInfographicImages}
            />

            {/* Amazon Preview */}
            <AmazonPreview listingData={listingData} imagePreview={imagePreview} />

            {/* Continue to Export button */}
            <div className="text-center space-y-3">
              <button
                onClick={handleGoToExport}
                className="px-8 py-3 bg-amazon-orange text-amazon-dark font-bold text-lg rounded-xl hover:bg-amazon-orange-hover transition-colors shadow-lg shadow-amazon-orange/20"
              >
                Continue to Export →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Export */}
        {currentStep === 4 && listingData && (
          <div className="space-y-10">
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-amazon-text mb-2">
                Export Your Listing
              </h2>
              <p className="text-amazon-text-secondary">
                Copy text, download images, or export as PDF
              </p>
            </div>

            {/* Export Actions */}
            <ExportActions listingData={listingData} infographicImages={infographicImages} />

            {/* Quick preview of listing */}
            <AmazonPreview listingData={listingData} imagePreview={imagePreview} />

            {/* Navigation buttons */}
            <div className="text-center space-x-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 bg-amazon-dark border border-amazon-border text-amazon-text rounded-xl hover:border-amazon-orange transition-colors"
              >
                ← Back to Edit
              </button>
              <button
                onClick={handleStartOver}
                className="px-6 py-2.5 bg-amazon-orange text-amazon-dark font-semibold rounded-xl hover:bg-amazon-orange-hover transition-colors"
              >
                Start New Listing
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amazon-border py-6 text-center">
        <p className="text-sm text-amazon-text-secondary">
          Built with ❤️ by ListingGenie • Powered by Claude AI
        </p>
      </footer>

      {/* Modals */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
      <AmazonModal
        isOpen={showAmazonModal}
        onClose={() => setShowAmazonModal(false)}
      />
    </div>
  );
}
