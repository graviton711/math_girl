import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSpeechSynthesisProps {
  onEnd?: () => void;
}

export const useSpeechSynthesis = ({ onEnd }: UseSpeechSynthesisProps = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayEnd = useCallback(() => {
    setIsPlaying(false);
    if (onEnd) {
      setTimeout(onEnd, 3500); // 3.5-second delay
    }
  }, [onEnd]);

  const cancel = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const play = useCallback(async (audioSrc: string) => {
    cancel(); // Stop any currently playing audio
    setIsPlaying(true);

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.addEventListener('ended', handlePlayEnd);
      }
      audioRef.current.src = audioSrc;
      await audioRef.current.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
      setIsPlaying(false);
      // Ensure we still proceed in case of an error to not halt the story
      if (onEnd) {
        onEnd();
      }
    }
  }, [cancel, onEnd, handlePlayEnd]);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return { isPlaying, play, cancel };
};
