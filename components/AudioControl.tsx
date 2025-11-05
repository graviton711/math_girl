
import React from 'react';
import { motion } from 'framer-motion';

interface AudioControlProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const AudioControl: React.FC<AudioControlProps> = ({ isPlaying, onTogglePlay }) => {
  return (
    <button
      onClick={onTogglePlay}
      className="relative w-16 h-16 flex items-center justify-center bg-amber-500 rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-75"
      aria-label={isPlaying ? "Pause narration" : "Play narration"}
    >
      {isPlaying && (
         <motion.span
          className="absolute inset-0 rounded-full border-2 border-amber-300"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
};

export default AudioControl;
