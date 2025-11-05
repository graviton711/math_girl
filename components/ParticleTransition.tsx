import React from 'react';
import { motion } from 'framer-motion';

const Particle = ({ index, ...props }: { index: number; [key: string]: any }) => {
  const duration = Math.random() * 1.5 + 2.5; // 2.5s to 4s
  const delay = Math.random() * 0.05; // Much shorter delays for smoother effect
  const xEnd = (Math.random() - 0.5) * 1000; // Spread even wider
  const yEnd = -500 - Math.random() * 500; // Fly even higher
  const scaleEnd = Math.random() * 0.1 + 0.02; // Smaller end scale
  const size = Math.random() * 10 + 2; // Smaller, more varied sizes

  // Create a denser grid-like distribution across the entire image
  const cols = 12;
  const rows = 8;
  const col = index % cols;
  const row = Math.floor(index / cols);

  const startTop = 10 + (row * 90) / (rows - 1); // 10% to 100% from top
  const startLeft = 5 + (col * 90) / (cols - 1); // 5% to 95% from left

  // Add more randomness to positions for fragmentation effect
  const randomOffsetX = (Math.random() - 0.5) * 15;
  const randomOffsetY = (Math.random() - 0.5) * 15;

  // Vary the colors to look more like light fragments
  const colors = [
    'bg-yellow-300',
    'bg-yellow-200',
    'bg-orange-300',
    'bg-amber-200',
    'bg-yellow-400',
    'bg-orange-200'
  ];
  const colorClass = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      className={`absolute rounded-full ${colorClass}`}
      style={{
        width: size,
        height: size,
        top: `${startTop + randomOffsetY}%`,
        left: `${startLeft + randomOffsetX}%`,
        boxShadow: `0 0 ${size * 2}px rgba(253, 224, 71, 0.9), 0 0 ${size}px rgba(255, 255, 255, 0.7)`,

      }}
      initial={{ opacity: 1, scale: 1.2, x: 0, y: 0 }}
      animate={{
        opacity: [1, 1, 0.8, 0],
        scale: [1.2, 2, scaleEnd],
        x: xEnd,
        y: yEnd,
        rotate: Math.random() * 360,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smoother motion
        times: [0, 0.15, 0.75, 1],
      }}
    />
  );
};

const ParticleTransition: React.FC = () => {
  const particleCount = 300; // More particles for better fragmentation
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {Array.from({ length: particleCount }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}
    </div>
  );
};

export default ParticleTransition;
