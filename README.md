# ListingGenie 🧞‍♂️

AI-powered Amazon listing generator. Upload a product image, and ListingGenie uses Claude Vision API to analyze your product and generate a complete, SEO-optimized Amazon listing — title, bullet points, description, search keywords, and infographic images.

## Features

- **Image Upload**: Drag & drop or click to upload product images (JPG, PNG, WEBP)
- **AI Analysis**: Claude Vision API analyzes your product and extracts features
- **SEO Listing Generation**: Generates optimized title, 5 bullet points, description, and search keywords
- **Infographic Generator**: Creates 3 Amazon-style infographic images (Main, Feature, Lifestyle)
- **Amazon Preview**: See exactly how your listing will look on Amazon
- **Export Options**: Copy text, download images, export as PDF
- **Dark Theme**: Modern UI with Amazon-inspired dark theme and orange accents

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Claude API (claude-sonnet-4-20250514) for vision + text generation
- HTML Canvas for infographic generation
- jsPDF for PDF export
- lucide-react for icons
- react-toastify for notifications

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. Enter your Claude API key (get one at [console.anthropic.com](https://console.anthropic.com/))
2. Upload a product image
3. Click "Generate Amazon Listing"
4. Review and edit the generated content
5. Download infographic images and copy/export your listing

## Project Structure

```
src/
├── components/
│   ├── Header.jsx              # App header with navigation
│   ├── ProgressBar.jsx         # Step progress indicator
│   ├── ApiKeyInput.jsx         # Claude API key input
│   ├── ImageUpload.jsx         # Drag & drop image upload
│   ├── AnalysisLoading.jsx     # AI analysis loading animation
│   ├── ListingEditor.jsx       # Editable listing content
│   ├── InfographicGenerator.jsx # Canvas-based infographic creator
│   ├── AmazonPreview.jsx       # Mock Amazon listing preview
│   ├── ExportActions.jsx       # Copy/download/PDF export buttons
│   ├── UpgradeModal.jsx        # Razorpay upgrade placeholder
│   └── AmazonModal.jsx         # SP-API integration placeholder
├── utils/
│   ├── claudeApi.js            # Claude API integration
│   ├── imageHelpers.js         # Image validation & conversion
│   └── exportHelpers.js        # Clipboard, download, PDF export
├── App.jsx                     # Main application component
├── main.jsx                    # Entry point
└── index.css                   # Global styles + Tailwind
```

## License

MIT
