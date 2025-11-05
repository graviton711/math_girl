import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Scene } from '../types';
import ParticleTransition from './ParticleTransition';

interface StorySceneProps {
  scene: Scene;
  isAnimatingTransition: boolean;
}

const StoryScene: React.FC<StorySceneProps> = ({ scene, isAnimatingTransition }) => {
  const sceneVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const textContainerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const textWordVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    },
  };

  const glowClass = scene.isMatchLit
    ? 'shadow-[0_0_35px_10px_rgba(255,190,0,0.6)]'
    // A more subtle shadow for non-lit scenes to maintain depth
    : 'shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4)]';
  
  const showParticles = scene.id === 6 && isAnimatingTransition;

  return (
    <>
    <style>{`
      @keyframes text-flicker {
        0%, 100% {
          text-shadow: 0 0 8px rgba(251, 191, 36, 0.5), 0 0 2px rgba(255, 255, 255, 0.4);
        }
        50% {
          text-shadow: 0 0 12px rgba(251, 191, 36, 0.7), 0 0 3px rgba(255, 255, 255, 0.5);
        }
      }
      .flicker-text {
        animation: text-flicker 3s ease-in-out infinite;
      }
    `}</style>
    <motion.div
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="w-full max-w-3xl flex flex-col items-center"
    >
      <div 
        className={`relative w-full aspect-video bg-amber-50 p-2 md:p-3 rounded-lg border-2 border-amber-100/50 overflow-hidden transition-shadow duration-1000 ${glowClass}`}
      >
        {showParticles && <ParticleTransition />}
        <motion.div
          className="w-full h-full"
          style={{ 
            clipPath: 'circle(150% at 50% 50%)' // Start fully visible
          }}
          animate={{
            clipPath: showParticles ? 'circle(0% at 100% 100%)' : 'circle(150% at 50% 50%)'
          }}
          transition={{ duration: 2.5, ease: 'circIn', delay: 0.1 }}
        >
          <img 
            src={scene.image} 
            alt={`Scene ${scene.id}`} 
            className="w-full h-full object-cover rounded-md" 
            style={{ objectPosition: scene.imagePosition || 'center' }}
          />
        </motion.div>
      </div>
      <motion.div 
        variants={textContainerVariants}
        initial="initial"
        animate="animate"
        className="w-full mt-8 text-center" // Removed background styles, adjusted margin
      >
        <p className="text-xl md:text-2xl leading-relaxed text-stone-100 flicker-text">
          {scene.text.split(' ').map((word, index) => (
            <motion.span
              key={index}
              variants={textWordVariants}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </motion.div>
    </>
  );
};

export default StoryScene;
