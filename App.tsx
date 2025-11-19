import React, { useState } from 'react';
import { generateSportsImage } from './services/geminiService';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A professional woman football player scoring a goal in a stadium, dynamic action shot, cinematic lighting, 8k resolution.');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('16:9');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const result = await generateSportsImage(prompt, aspectRatio);
      setImageUrl(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedPrompts = [
    "A woman goalkeeper making a diving save in the rain",
    "Action shot of a female striker dribbling past defenders",
    "A team of women football players celebrating a victory",
    "Cinematic close-up of a woman focused on a penalty kick"
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 selection:bg-emerald-500/30">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              PitchPerfect <span className="font-light text-slate-500">AI</span>
            </h1>
          </div>
          <div className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">
            Powered by Imagen 3
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                Configuration
              </h2>

              {/* Prompt Input */}
              <div className="space-y-2 mb-6">
                <label htmlFor="prompt" className="block text-sm font-medium text-slate-400">
                  Description
                </label>
                <textarea
                  id="prompt"
                  rows={5}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none outline-none"
                  placeholder="Describe the image you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              {/* Aspect Ratio Selector */}
              <div className="space-y-2 mb-8">
                <label className="block text-sm font-medium text-slate-400">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['1:1', '16:9', '9:16', '4:3'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                        aspectRatio === ratio
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isLoading || !prompt.trim()
                    ? 'bg-slate-700 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 shadow-emerald-500/20 hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {isLoading ? 'Generating...' : 'Generate Image'}
                {!isLoading && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                )}
              </button>
            </div>

             {/* Suggestions */}
             <div className="mt-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Try these prompts
                </p>
                <div className="space-y-2">
                  {suggestedPrompts.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setPrompt(s)}
                      className="w-full text-left p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-emerald-500/30 hover:bg-slate-800 text-sm text-slate-300 transition-colors truncate"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-8 min-h-[500px]">
            <GeneratedImageDisplay 
              imageUrl={imageUrl}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;