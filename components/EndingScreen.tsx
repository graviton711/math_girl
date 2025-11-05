import React from 'react';
import { motion } from 'framer-motion';
import Snowfall from './Snowfall';

interface EndingScreenProps {
  onRestart: () => void;
}

const EndingScreen: React.FC<EndingScreenProps> = ({ onRestart }) => {
  return (
    <main
      className="relative w-full h-screen text-white overflow-hidden select-none flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/fa/5c/f3/fa5cf398b253c184aa4cf96c35e7988f.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#1a1a1a', // Dark fallback background
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" aria-hidden="true" />
      <Snowfall />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center justify-center text-center p-8"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-amber-300" style={{ textShadow: '0 0 15px rgba(251, 191, 36, 0.7), 2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
          Ánh sáng của hy vọng
        </h2>
        <p className="mt-4 text-lg md:text-xl text-white max-w-lg drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
          Dù trong đêm đông lạnh giá nhất, những giấc mơ ấm áp nhất vẫn có thể bừng cháy. Cảm ơn bạn đã lắng nghe câu chuyện.
        </p>
        <button
          onClick={onRestart}
          className="mt-10 px-8 py-4 bg-amber-500 rounded-full text-white text-xl font-bold backdrop-blur-md transition-all duration-300 hover:bg-amber-600 hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
        >
          Kể lại chuyện
        </button>
      </motion.div>
    </main>
  );
};

export default EndingScreen;
