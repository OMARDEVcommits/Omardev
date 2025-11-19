import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-500/30 rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-emerald-400 font-medium animate-pulse">Dreaming up the scene...</p>
    </div>
  );
};