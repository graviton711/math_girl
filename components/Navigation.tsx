
import React from 'react';

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
  isFirstScene: boolean;
  isLastScene: boolean;
}

const NavButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode }> = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-6 py-3 bg-white bg-opacity-10 rounded-full text-white text-lg font-bold backdrop-blur-md transition-all duration-300 hover:bg-opacity-20 hover:shadow-[0_0_15px_rgba(255,190,0,0.5)] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
  >
    {children}
  </button>
);

const Navigation: React.FC<NavigationProps> = ({ onPrev, onNext, isFirstScene, isLastScene }) => {
  return (
    <div className="flex items-center space-x-4">
      <NavButton onClick={onPrev} disabled={isFirstScene}>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Trước
        </div>
      </NavButton>
      <NavButton onClick={onNext} disabled={isLastScene}>
         <div className="flex items-center">
          Sau
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </NavButton>
    </div>
  );
};

export default Navigation;
