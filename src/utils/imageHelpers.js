/**
 * Image utility functions for file handling, conversion, and validation.
 */

/** Accepted image MIME types */
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/** Maximum file size in bytes (10MB) */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Validates an image file for type and size.
 * @param {File} file - The file to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageFile(file) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Please upload a JPG, PNG, or WEBP image.' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'Image must be smaller than 10MB.' };
  }
  return { valid: true };
}

/**
 * Converts a File object to a base64-encoded string (without data URI prefix).
 * @param {File} file - The image file
 * @returns {Promise<{ base64: string, mediaType: string }>}
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Remove the data URI prefix (e.g., "data:image/jpeg;base64,")
      const base64 = reader.result.split(',')[1];
      resolve({ base64, mediaType: file.type });
    };
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Creates an object URL for image preview.
 * @param {File} file - The image file
 * @returns {string} Object URL for the image
 */
export function createImagePreviewUrl(file) {
  return URL.createObjectURL(file);
}

/**
 * Loads an image element from a URL or data URI.
 * @param {string} src - Image source URL
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image.'));
    img.src = src;
  });
}
