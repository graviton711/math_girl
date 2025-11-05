import React, { useMemo } from 'react';

const Snowfall: React.FC = () => {
  // useMemo ensures that snowflakes are generated only once and not on every re-render
  // caused by parent components (like the mouse cursor tracking in App.tsx).
  const snowflakes = useMemo(() => 
    Array.from({ length: 50 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        animationDuration: `${Math.random() * 5 + 5}s`, // 5 to 10 seconds
        animationDelay: `${Math.random() * 5}s`,
      };
      return <div key={i} className="snowflake" style={style}></div>;
    }),
    [] // Empty dependency array means this runs only on mount
  );

  return (
    <>
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh);
          }
          100% {
            transform: translateY(110vh);
          }
        }
        .snowflake {
          position: absolute;
          top: -10vh;
          background-color: white;
          border-radius: 50%;
          opacity: 0.7;
          animation-name: snowfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {snowflakes}
      </div>
    </>
  );
};

export default Snowfall;