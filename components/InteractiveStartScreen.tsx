import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Snowfall from './Snowfall';

interface InteractiveStartScreenProps {
  onStart: () => void;
}

const InteractiveStartScreen: React.FC<InteractiveStartScreenProps> = ({ onStart }) => {
  const [isLit, setIsLit] = useState(false);
  const [showText, setShowText] = useState(true);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    // A sharp downward and rightward flick to strike
    if (info.velocity.y > 100 && info.velocity.x > 50 && !isLit) {
      strikeMatch();
    }
  };

  const strikeMatch = () => {
    if (isLit) return;
    
    setIsLit(true);
    setShowText(false);

    // Start the story after a short, predictable delay for the animation to kick in.
    setTimeout(() => {
        onStart();
    }, 1200); // 1.2 seconds, feels more responsive
  };

  return (
    <main 
      className="relative w-full h-screen text-white overflow-hidden select-none flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/fa/5c/f3/fa5cf398b253c184aa4cf96c35e7988f.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" aria-hidden="true" />
      <Snowfall />
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-300" style={{ textShadow: '0 0 15px rgba(251, 191, 36, 0.7)' }}>
            Cô Bé Bán Diêm
          </h1>
          <AnimatePresence>
            {showText && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-lg md:text-xl text-gray-300 max-w-lg"
                >
                    Hãy quẹt que diêm để bắt đầu câu chuyện
                </motion.p>
            )}
          </AnimatePresence>

          <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onClick={strikeMatch}
            className="mt-12 w-32 h-64 cursor-grab active:cursor-grabbing flex justify-center"
            style={{ perspective: 800 }}
            animate={{ scale: isLit ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            <svg viewBox="0 -80 40 320" className="w-auto h-full drop-shadow-lg">
                <defs>
                    <filter id="fire-filter">
                        <feTurbulence id="turbulence" baseFrequency="0.02 0.05" numOctaves="2" seed="2" type="fractalNoise">
                            <animate
                                attributeName="baseFrequency"
                                dur="1.5s"
                                values="0.02 0.05;0.03 0.07;0.02 0.05"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" />
                        <feGaussianBlur stdDeviation="2" />
                    </filter>
                    <radialGradient id="flame-gradient">
                        <stop offset="0%" stopColor="white" />
                        <stop offset="20%" stopColor="yellow" />
                        <stop offset="70%" stopColor="#f59e0b" /> {/* amber-500 */}
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    <linearGradient id="matchstick-gradient" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#D1B48C" />
                        <stop offset="50%" stopColor="#EADDCA" />
                        <stop offset="100%" stopColor="#D1B48C" />
                    </linearGradient>
                </defs>

                {/* Matchstick */}
                <motion.g animate={{ y: isLit ? -5 : 0 }}>
                    <path d="M 18.5,240 Q 19.5,150 20,40 L 22.5,40 Q 22,150 24.5,240 Z" fill="url(#matchstick-gradient)" />
                    <path d="M 21.25,40 C 15,40 12,30 21.25,1 C 30,30 27.5,40 21.25,40 Z" fill={isLit ? "#333" : "#991b1b"} />
                </motion.g>

                {/* Flame */}
                <AnimatePresence>
                {isLit && (
                     <motion.g
                        initial={{ opacity: 0, scale: 0, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'backOut' } }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                     >
                        <ellipse 
                            cx="21.25" 
                            cy="-15" 
                            rx="18" 
                            ry="35" 
                            fill="url(#flame-gradient)" 
                            filter="url(#fire-filter)" 
                            style={{ transformOrigin: '50% 100%' }}
                         />
                    </motion.g>
                )}
                </AnimatePresence>
            </svg>
          </motion.div>
      </div>
    </main>
  );
};

export default InteractiveStartScreen;
