/**
 * InfographicGenerator component - Creates 3 infographic versions
 * using HTML Canvas:
 *   a) Main Image - white background, product centered, name + tagline
 *   b) Feature Image - product with 4 feature callout boxes
 *   c) Lifestyle Image - product with lifestyle text overlay
 *
 * Each infographic is downloadable as PNG.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Download, Image as ImageIcon, Loader2 } from 'lucide-react';
import { downloadImage } from '../utils/exportHelpers';
import { toast } from 'react-toastify';

/**
 * Loads an image from a source URL.
 * @param {string} src - Image source URL
 * @returns {Promise<HTMLImageElement>}
 */
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}

/** Canvas dimensions for infographics */
const WIDTH = 1000;
const HEIGHT = 1000;

/**
 * Wraps text to fit within a maximum width on a canvas context.
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} text
 * @param {number} maxWidth
 * @returns {string[]} Array of text lines
 */
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Draws rounded rectangle on canvas.
 */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Generates Main Image infographic - white bg, product centered, title + tagline.
 */
async function generateMainImage(canvas, productImg, title) {
  const ctx = canvas.getContext('2d');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw product image centered
  const imgMaxW = 600;
  const imgMaxH = 600;
  const scale = Math.min(imgMaxW / productImg.width, imgMaxH / productImg.height);
  const imgW = productImg.width * scale;
  const imgH = productImg.height * scale;
  const imgX = (WIDTH - imgW) / 2;
  const imgY = 120;
  ctx.drawImage(productImg, imgX, imgY, imgW, imgH);

  // Product name at top
  ctx.fillStyle = '#131921';
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.textAlign = 'center';
  const titleLines = wrapText(ctx, title.substring(0, 80), WIDTH - 100);
  titleLines.forEach((line, i) => {
    ctx.fillText(line, WIDTH / 2, 60 + i * 42);
  });

  // Tagline at bottom
  ctx.fillStyle = '#FF9900';
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.fillText('★ Premium Quality ★', WIDTH / 2, HEIGHT - 60);

  // Orange accent line
  ctx.strokeStyle = '#FF9900';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(100, HEIGHT - 100);
  ctx.lineTo(WIDTH - 100, HEIGHT - 100);
  ctx.stroke();
}

/**
 * Generates Feature Image - product with 4 feature callout boxes.
 */
async function generateFeatureImage(canvas, productImg, features) {
  const ctx = canvas.getContext('2d');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#131921');
  gradient.addColorStop(1, '#1a2332');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw product image centered
  const imgMaxW = 400;
  const imgMaxH = 400;
  const scale = Math.min(imgMaxW / productImg.width, imgMaxH / productImg.height);
  const imgW = productImg.width * scale;
  const imgH = productImg.height * scale;
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  ctx.drawImage(productImg, centerX - imgW / 2, centerY - imgH / 2, imgW, imgH);

  // Feature callout positions (4 corners)
  const featurePositions = [
    { x: 40, y: 40, arrowToX: centerX - imgW / 2, arrowToY: centerY - imgH / 4 },
    { x: WIDTH - 310, y: 40, arrowToX: centerX + imgW / 2, arrowToY: centerY - imgH / 4 },
    { x: 40, y: HEIGHT - 200, arrowToX: centerX - imgW / 2, arrowToY: centerY + imgH / 4 },
    { x: WIDTH - 310, y: HEIGHT - 200, arrowToX: centerX + imgW / 2, arrowToY: centerY + imgH / 4 },
  ];

  const safeFeatures = features.slice(0, 4);
  while (safeFeatures.length < 4) {
    safeFeatures.push('Premium Quality Feature');
  }

  safeFeatures.forEach((feature, i) => {
    const pos = featurePositions[i];

    // Draw callout box
    ctx.fillStyle = 'rgba(255, 153, 0, 0.15)';
    roundRect(ctx, pos.x, pos.y, 270, 140, 12);
    ctx.fill();
    ctx.strokeStyle = '#FF9900';
    ctx.lineWidth = 2;
    roundRect(ctx, pos.x, pos.y, 270, 140, 12);
    ctx.stroke();

    // Feature text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.textAlign = 'left';
    const featureText = typeof feature === 'string' ? feature : String(feature);
    const lines = wrapText(ctx, featureText.substring(0, 60), 240);
    lines.forEach((line, li) => {
      ctx.fillText(line, pos.x + 15, pos.y + 40 + li * 24);
    });

    // Draw arrow from callout to product
    ctx.strokeStyle = '#FF9900';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(pos.x + 135, pos.y + (i < 2 ? 140 : 0));
    ctx.lineTo(pos.arrowToX, pos.arrowToY);
    ctx.stroke();
    ctx.setLineDash([]);
  });

  // Title at top center
  ctx.fillStyle = '#FF9900';
  ctx.font = 'bold 32px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('KEY FEATURES', WIDTH / 2, HEIGHT - 30);
}

/**
 * Generates Lifestyle Image - product with lifestyle text overlay.
 */
async function generateLifestyleImage(canvas, productImg, title, description) {
  const ctx = canvas.getContext('2d');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(0.5, '#16213e');
  gradient.addColorStop(1, '#0f3460');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Decorative circles
  ctx.fillStyle = 'rgba(255, 153, 0, 0.08)';
  ctx.beginPath();
  ctx.arc(800, 200, 300, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(200, 800, 250, 0, Math.PI * 2);
  ctx.fill();

  // Product image on left side
  const imgMaxW = 450;
  const imgMaxH = 500;
  const scale = Math.min(imgMaxW / productImg.width, imgMaxH / productImg.height);
  const imgW = productImg.width * scale;
  const imgH = productImg.height * scale;
  ctx.drawImage(productImg, 50, (HEIGHT - imgH) / 2, imgW, imgH);

  // Lifestyle text on right
  const textX = 530;

  // Headline
  ctx.fillStyle = '#FF9900';
  ctx.font = 'bold 42px Arial, sans-serif';
  ctx.textAlign = 'left';
  const headline = title.split('|')[0]?.trim() || title.substring(0, 40);
  const headlineLines = wrapText(ctx, headline, 430);
  headlineLines.forEach((line, i) => {
    ctx.fillText(line, textX, 200 + i * 50);
  });

  // Divider
  const dividerY = 200 + headlineLines.length * 50 + 20;
  ctx.strokeStyle = '#FF9900';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(textX, dividerY);
  ctx.lineTo(textX + 100, dividerY);
  ctx.stroke();

  // Benefit text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '22px Arial, sans-serif';
  const benefitText = description.substring(0, 200);
  const descLines = wrapText(ctx, benefitText, 430);
  descLines.slice(0, 6).forEach((line, i) => {
    ctx.fillText(line, textX, dividerY + 50 + i * 32);
  });

  // CTA at bottom
  ctx.fillStyle = '#FF9900';
  roundRect(ctx, textX, HEIGHT - 120, 250, 50, 25);
  ctx.fill();
  ctx.fillStyle = '#131921';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SHOP NOW →', textX + 125, HEIGHT - 88);
}

export default function InfographicGenerator({ imagePreview, listingData, onImagesGenerated }) {
  const [images, setImages] = useState({ main: null, feature: null, lifestyle: null });
  const [generating, setGenerating] = useState(false);
  const mainCanvasRef = useRef(null);
  const featureCanvasRef = useRef(null);
  const lifestyleCanvasRef = useRef(null);

  const generateInfographics = useCallback(async () => {
    if (!imagePreview || !listingData) return;

    setGenerating(true);
    try {
      const productImg = await loadImg(imagePreview);

      const features = listingData.bulletPoints?.map((bp) => {
        // Extract the first phrase (before the dash or first sentence)
        const match = bp.match(/^([A-Z]+)\s*[-–—:]/);
        return match ? match[0].replace(/[-–—:]/, '').trim() : bp.substring(0, 50);
      }) || [];

      const newImages = {};

      // Generate all three infographics
      if (mainCanvasRef.current) {
        await generateMainImage(mainCanvasRef.current, productImg, listingData.title || '');
        newImages.main = mainCanvasRef.current.toDataURL('image/png');
      }

      if (featureCanvasRef.current) {
        await generateFeatureImage(featureCanvasRef.current, productImg, features);
        newImages.feature = featureCanvasRef.current.toDataURL('image/png');
      }

      if (lifestyleCanvasRef.current) {
        await generateLifestyleImage(
          lifestyleCanvasRef.current,
          productImg,
          listingData.title || '',
          listingData.description || ''
        );
        newImages.lifestyle = lifestyleCanvasRef.current.toDataURL('image/png');
      }

      setImages(newImages);

      // Notify parent of generated images for PDF export
      if (onImagesGenerated) {
        onImagesGenerated(newImages);
      }
    } catch {
      toast.error('Failed to generate infographics. Please try again.');
    } finally {
      setGenerating(false);
    }
  }, [imagePreview, listingData, onImagesGenerated]);

  useEffect(() => {
    generateInfographics();
  }, [generateInfographics]);

  const handleDownload = (type) => {
    const dataUrl = images[type];
    if (dataUrl) {
      downloadImage(dataUrl, `listing-genie-${type}-image.png`);
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} image downloaded!`);
    }
  };

  const handleDownloadAll = () => {
    Object.entries(images).forEach(([type, dataUrl]) => {
      if (dataUrl) {
        downloadImage(dataUrl, `listing-genie-${type}-image.png`);
      }
    });
    toast.success('All images downloaded!');
  };

  const infographicTypes = [
    { key: 'main', label: 'Main Image', desc: 'White background, product centered' },
    { key: 'feature', label: 'Feature Image', desc: 'Product with feature callouts' },
    { key: 'lifestyle', label: 'Lifestyle Image', desc: 'Lifestyle text overlay' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-amazon-orange" />
          <h3 className="text-lg font-semibold text-amazon-text">Infographic Images</h3>
        </div>
        <button
          onClick={handleDownloadAll}
          disabled={!images.main}
          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-amazon-orange text-amazon-dark font-semibold rounded-lg hover:bg-amazon-orange-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Download All Images
        </button>
      </div>

      {generating && (
        <div className="flex items-center justify-center py-8 gap-3">
          <Loader2 className="w-6 h-6 text-amazon-orange animate-spin" />
          <span className="text-amazon-text-secondary">Generating infographics...</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {infographicTypes.map(({ key, label, desc }) => (
          <div key={key} className="bg-amazon-card border border-amazon-border rounded-xl overflow-hidden">
            <div className="aspect-square bg-amazon-dark flex items-center justify-center">
              {images[key] ? (
                <img src={images[key]} alt={label} className="w-full h-full object-contain" />
              ) : (
                <div className="text-amazon-text-secondary text-sm">Generating...</div>
              )}
            </div>
            <div className="p-3">
              <h4 className="font-medium text-amazon-text text-sm">{label}</h4>
              <p className="text-xs text-amazon-text-secondary mt-0.5">{desc}</p>
              <button
                onClick={() => handleDownload(key)}
                disabled={!images[key]}
                className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs bg-amazon-dark border border-amazon-border rounded-lg hover:border-amazon-orange hover:text-amazon-orange transition-colors text-amazon-text-secondary disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                Download PNG
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden canvases for generation */}
      <div className="hidden">
        <canvas ref={mainCanvasRef} />
        <canvas ref={featureCanvasRef} />
        <canvas ref={lifestyleCanvasRef} />
      </div>
    </div>
  );
}
