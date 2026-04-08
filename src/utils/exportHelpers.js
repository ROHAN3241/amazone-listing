/**
 * Export and clipboard utility functions for copying text
 * and downloading generated content.
 */
import { jsPDF } from 'jspdf';

/**
 * Copies text to clipboard.
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Whether the copy succeeded
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

/**
 * Formats the complete listing data as copyable text.
 * @param {Object} listingData - The generated listing data
 * @returns {string} Formatted listing text
 */
export function formatListingText(listingData) {
  const { title, bulletPoints, description, searchKeywords } = listingData;

  let text = '=== AMAZON LISTING ===\n\n';
  text += `TITLE:\n${title}\n\n`;
  text += 'BULLET POINTS:\n';
  bulletPoints.forEach((bp, i) => {
    text += `${i + 1}. ${bp}\n`;
  });
  text += `\nDESCRIPTION:\n${description}\n\n`;
  text += `SEARCH KEYWORDS:\n${searchKeywords}\n`;

  return text;
}

/**
 * Downloads a canvas/stage as a PNG image.
 * @param {string} dataUrl - Data URL of the image
 * @param {string} filename - Name for the downloaded file
 */
export function downloadImage(dataUrl, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports listing data as a PDF document.
 * @param {Object} listingData - The generated listing data
 * @param {string[]} imageDataUrls - Array of infographic data URLs
 */
export function exportAsPDF(listingData, imageDataUrls = []) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = 20;

  // Title page
  doc.setFontSize(20);
  doc.setTextColor(255, 153, 0); // Amazon orange
  doc.text('ListingGenie', margin, y);
  y += 8;
  doc.setFontSize(12);
  doc.setTextColor(150, 150, 150);
  doc.text('Amazon Product Listing', margin, y);
  y += 15;

  // Product Title
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Product Title', margin, y);
  y += 8;
  doc.setFontSize(10);
  const titleLines = doc.splitTextToSize(listingData.title, maxWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 5 + 10;

  // Bullet Points
  doc.setFontSize(14);
  doc.text('Key Features', margin, y);
  y += 8;
  doc.setFontSize(10);
  listingData.bulletPoints.forEach((bp) => {
    const bpLines = doc.splitTextToSize(`• ${bp}`, maxWidth);
    if (y + bpLines.length * 5 > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(bpLines, margin, y);
    y += bpLines.length * 5 + 3;
  });
  y += 7;

  // Description
  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  doc.setFontSize(14);
  doc.text('Product Description', margin, y);
  y += 8;
  doc.setFontSize(10);
  const descLines = doc.splitTextToSize(listingData.description, maxWidth);
  descLines.forEach((line) => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, margin, y);
    y += 5;
  });
  y += 10;

  // Search Keywords
  if (y > 250) {
    doc.addPage();
    y = 20;
  }
  doc.setFontSize(14);
  doc.text('Backend Search Keywords', margin, y);
  y += 8;
  doc.setFontSize(10);
  const kwLines = doc.splitTextToSize(listingData.searchKeywords, maxWidth);
  doc.text(kwLines, margin, y);

  // Add infographic images if available
  imageDataUrls.forEach((dataUrl) => {
    if (dataUrl) {
      doc.addPage();
      try {
        doc.addImage(dataUrl, 'PNG', margin, 20, maxWidth, maxWidth * 0.75);
      } catch {
        // Skip images that can't be added
      }
    }
  });

  doc.save('listing-genie-export.pdf');
}
