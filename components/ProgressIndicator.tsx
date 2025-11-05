import React from 'react';

interface ProgressIndicatorProps {
  totalScenes: number;
  currentSceneIndex: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ totalScenes, currentSceneIndex }) => {
  return (
    <div className="flex items-center justify-center space-x-3" role="progressbar" aria-valuenow={currentSceneIndex + 1} aria-valuemin={1} aria-valuemax={totalScenes}>
      {Array.from({ length: totalScenes }).map((_, index) => {
        const isActive = index === currentSceneIndex;
        return (
          <div
            key={index}
            className={`rounded-full transition-all duration-300 ${
              isActive 
                ? 'w-4 h-4 bg-amber-400 shadow-[0_0_10px_rgba(255,190,0,0.8)]' 
                : 'w-3 h-3 bg-white bg-opacity-30'
            }`}
            aria-label={`Scene ${index + 1}`}
            aria-current={isActive ? 'step' : undefined}
          />
        );
      })}
    </div>
  );
};

export default ProgressIndicator;