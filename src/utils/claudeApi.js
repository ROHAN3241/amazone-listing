/**
 * Claude API integration for image analysis and listing generation.
 * Uses Claude Vision API to analyze product images and generate
 * SEO-optimized Amazon listing content.
 */

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

/**
 * Analyzes a product image and generates complete Amazon listing content.
 * @param {string} base64ImageData - Base64-encoded image data (without prefix)
 * @param {string} mediaType - MIME type of the image (e.g., 'image/jpeg')
 * @param {string} apiKey - Claude API key
 * @returns {Promise<Object>} Generated listing data
 */
export async function analyzeAndGenerateListing(base64ImageData, mediaType, apiKey) {
  const prompt = `Analyze this product image carefully and generate a complete Amazon product listing. Return ONLY valid JSON with no markdown formatting, no code blocks, no extra text.

The JSON must have exactly these keys:
{
  "productAnalysis": {
    "productType": "string - what the product is",
    "color": "string - primary color(s)",
    "material": "string - material if identifiable",
    "features": ["array of key visible features"],
    "useCase": "string - primary use case",
    "targetAudience": "string - who would buy this"
  },
  "title": "SEO optimized Amazon title, max 200 characters, keyword-rich, include brand placeholder BRANDNAME",
  "bulletPoints": [
    "BENEFIT - detailed bullet point with caps first word (5 total)",
    "QUALITY - second bullet point",
    "VERSATILE - third bullet point",
    "DURABLE - fourth bullet point",
    "GUARANTEE - fifth bullet point"
  ],
  "description": "150-200 word product description in storytelling style, engaging and benefit-focused",
  "searchKeywords": "comma separated backend search keywords, no repetition of words already in title, max 250 characters"
}`;

  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64ImageData,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || `API request failed with status ${response.status}`
    );
  }

  const data = await response.json();
  const textContent = data.content?.find((block) => block.type === 'text')?.text;

  if (!textContent) {
    throw new Error('No text response received from Claude API');
  }

  // Parse JSON from response, handling possible markdown code blocks
  const jsonString = textContent
    .replace(/```json\s*/g, '')
    .replace(/```\s*/g, '')
    .trim();

  try {
    return JSON.parse(jsonString);
  } catch {
    throw new Error('Failed to parse AI response as JSON. Please try again.');
  }
}
