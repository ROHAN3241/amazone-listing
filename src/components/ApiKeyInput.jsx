/**
 * ApiKeyInput component - Prompts user for their Claude API key.
 * Stores in sessionStorage for the current session.
 */
import { useState } from 'react';
import { Key, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function ApiKeyInput({ onApiKeySubmit }) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="bg-amazon-card border border-amazon-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-amazon-orange" />
          <h3 className="text-lg font-semibold text-amazon-text">Enter Claude API Key</h3>
        </div>
        <p className="text-sm text-amazon-text-secondary mb-4">
          Your API key is used locally and never stored on any server.
          Get your key from{' '}
          <a
            href="https://console.anthropic.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amazon-orange hover:underline"
          >
            console.anthropic.com
          </a>
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-api..."
              className="w-full bg-amazon-dark border border-amazon-border rounded-lg px-4 py-2.5 pr-10 text-amazon-text focus:outline-none focus:border-amazon-orange transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-amazon-text-secondary hover:text-amazon-text"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button
            type="submit"
            disabled={!apiKey.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-amazon-orange text-amazon-dark font-semibold rounded-lg hover:bg-amazon-orange-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
