import { useState, useRef } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
import { validateImageFile, ACCEPTED_IMAGE_TYPES } from '../utils/imageHelpers';
import { toast } from 'react-toastify';

export default function ImageUpload({ onImageSelect, imagePreview, onRemoveImage }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleFile = (file) => {
    const { valid, error } = validateImageFile(file);
    if (!valid) {
      toast.error(error);
      return;
    }
    onImageSelect(file);
  };

  if (imagePreview) {
    return (
      <div className="relative w-full max-w-lg mx-auto">
        <div className="relative rounded-xl overflow-hidden border-2 border-amazon-orange bg-amazon-card">
          <img
            src={imagePreview}
            alt="Product preview"
            className="w-full h-auto max-h-96 object-contain bg-white p-4"
          />
          <button
            onClick={onRemoveImage}
            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors shadow-lg"
            title="Remove image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-amazon-text-secondary text-sm mt-3">
          ✓ Image uploaded successfully
        </p>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`w-full max-w-lg mx-auto border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
        isDragging
          ? 'border-amazon-orange bg-amazon-orange/10 scale-[1.02]'
          : 'border-amazon-border hover:border-amazon-orange/50 bg-amazon-card/50'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        onChange={handleFileInput}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-4">
        {isDragging ? (
          <ImageIcon className="w-16 h-16 text-amazon-orange animate-bounce" />
        ) : (
          <Upload className="w-16 h-16 text-amazon-text-secondary" />
        )}
        <div>
          <p className="text-lg font-medium text-amazon-text">
            {isDragging ? 'Drop your image here!' : 'Drag & drop your product image'}
          </p>
          <p className="text-sm text-amazon-text-secondary mt-1">
            or click to browse • JPG, PNG, WEBP up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
}
