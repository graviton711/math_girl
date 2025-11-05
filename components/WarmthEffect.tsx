import React from 'react';

const WarmthEffect: React.FC = () => {
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      animationDuration: `${Math.random() * 8 + 6}s`, // 6 to 14 seconds
      animationDelay: `${Math.random() * 8}s`,
    };
    return <div key={i} className="warmth-particle" style={style}></div>;
  });

  return (
    <>
      <style>{`
        @keyframes driftUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-110vh) scale(0.5);
            opacity: 0;
          }
        }
        .warmth-particle {
          position: absolute;
          bottom: -10vh;
          background-color: #fbbF24; /* amber-400 */
          border-radius: 50%;
          filter: blur(4px);
          animation-name: driftUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-5">
        {particles}
      </div>
    </>
  );
};

export default WarmthEffect;