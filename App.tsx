import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { storyData } from './data/story';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import StoryScene from './components/StoryScene';
import ProgressIndicator from './components/ProgressIndicator';
import Snowfall from './components/Snowfall';
import InteractiveStartScreen from './components/InteractiveStartScreen';
import EndingScreen from './components/EndingScreen';
import WarmthEffect from './components/WarmthEffect';



const App: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [storyStarted, setStoryStarted] = useState(false);
  const [storyEnded, setStoryEnded] = useState(false);
  const [isAnimatingSpecialTransition, setIsAnimatingSpecialTransition] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSceneIndexRef = useRef(0);


  const isLastScene = currentSceneIndex === storyData.length - 1;

  const handleNarrationEnd = useCallback(() => {
    const sceneIndex = currentSceneIndexRef.current;
    console.log('handleNarrationEnd called, sceneIndex from ref:', sceneIndex);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }

    // Special handling for scene 6: trigger star effect when narration ends
    if (sceneIndex === 5) {
      console.log('Setting isAnimatingSpecialTransition to true');
      setIsAnimatingSpecialTransition(true);
      // Move to next scene after star animation completes
      setTimeout(() => {
        console.log('Setting isAnimatingSpecialTransition to false and moving to next scene');
        setIsAnimatingSpecialTransition(false);
        setCurrentSceneIndex(prev => prev + 1);
      }, 6000);
    } else if (sceneIndex < storyData.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    } else {
      setStoryEnded(true); // Show the end screen immediately
    }
  }, []);
  
  const { play } = useSpeechSynthesis({ onEnd: handleNarrationEnd });

  const currentScene = storyData[currentSceneIndex];

  // Update the ref whenever currentSceneIndex changes
  useEffect(() => {
    currentSceneIndexRef.current = currentSceneIndex;
  }, [currentSceneIndex]);

  useEffect(() => {
    if (storyStarted && !isAnimatingSpecialTransition && !storyEnded) {
      if (audioRef.current) {
        audioRef.current.volume = 0.15;
      }

      if (currentScene) {
        // All scenes: delay before narration
        setTimeout(() => {
          play(currentScene.audioSrc);
        }, 3500);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSceneIndex, storyStarted, storyEnded]);




  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStartStory = () => {
    setStoryStarted(true);
    // Play background music directly on user interaction to comply with autoplay policies
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(error => {
        console.error("Background music playback failed:", error);
      });
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentSceneIndex(0);
    setStoryEnded(false);
    setStoryStarted(false);
    setIsAnimatingSpecialTransition(false);
  };

  return (
    <>
      {/* Audio elements are now top-level and will not be unmounted on state changes. */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/voices/background_music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>


      {/* Conditionally render the visual screens */}
      {!storyStarted ? (
        <InteractiveStartScreen onStart={handleStartStory} />
      ) : storyEnded ? (
        <EndingScreen onRestart={handleRestart} />
      ) : (
        <main 
          className="relative w-full h-screen text-white overflow-hidden select-none custom-cursor"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/fa/5c/f3/fa5cf398b253c184aa4cf96c35e7988f.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="cursor-dot" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0" aria-hidden="true" />
          <Snowfall />
          {currentScene?.isMatchLit && <WarmthEffect />}
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 pt-4 md:px-8 md:pt-8 pb-24 md:pb-32">
            <AnimatePresence mode="wait">
              {currentScene && (
                <StoryScene
                  key={currentScene.id}
                  scene={currentScene}
                  isAnimatingTransition={isAnimatingSpecialTransition && currentScene.id === 6}
                />
              )}
            </AnimatePresence>
            
            <div className="absolute bottom-0 left-0 right-0 pt-12 pb-6 px-4 md:px-6 flex flex-col items-center bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <ProgressIndicator
                totalScenes={storyData.length}
                currentSceneIndex={currentSceneIndex}
              />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default App;
