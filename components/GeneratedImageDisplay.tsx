import React, { useState } from 'react';
import { Loader } from './Loader';

interface GeneratedImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ imageUrl, isLoading, error }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `pitch-perfect-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!imageUrl) return;
    setIsSharing(true);
    
    try {
      // Convert Base64 to Blob for sharing/copying
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'pitch-perfect-image.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        // Native Share (Mobile/Supported Browsers)
        await navigator.share({
          files: [file],
          title: 'PitchPerfect AI',
          text: 'Check out this sports image I generated with PitchPerfect AI!',
        });
      } else if (typeof ClipboardItem !== 'undefined' && navigator.clipboard && navigator.clipboard.write) {
        // Clipboard Fallback (Desktop)
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ]);
          alert("Image copied to clipboard! You can now paste it directly into social media, email, or chat.");
        } catch (clipboardError) {
          // Clipboard permission denied or failed
          alert("Unable to copy automatically. Please use the Download button and upload the file manually.");
        }
      } else {
        // Final Fallback
        alert("Direct sharing isn't supported on this browser. Please Download the image to upload it online.");
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert("Something went wrong while trying to share. Please try downloading instead.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] bg-slate-800/50 rounded-2xl border border-slate-700 flex flex-col items-center justify-center overflow-hidden relative shadow-inner">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="p-6 text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-400 mb-2">Generation Failed</h3>
          <p className="text-slate-400 text-sm">{error}</p>
        </div>
      ) : imageUrl ? (
        <div className="relative w-full h-full flex flex-col group">
          <img 
            src={imageUrl} 
            alt="Generated sports scene" 
            className="w-full h-full object-contain bg-black/40 backdrop-blur-sm"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end gap-2">
             
             <button 
              onClick={handleShare}
              disabled={isSharing}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors border border-white/10"
            >
              {isSharing ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              )}
              Share
            </button>

             <button 
              onClick={handleDownload}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 opacity-50 select-none">
          <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <p className="text-slate-400 text-lg">Your creation will appear here</p>
        </div>
      )}
    </div>
  );
};