import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Bell, Music, Flame } from 'lucide-react';
import { toggleDevotionalDrone, isAmbientDroneActive, playTempleBell } from '../utils/soundEffects';
import { FestiveDiya } from './FestiveDiya';

interface HeaderProps {
  onNavClick: (target: 'chapters' | 'gallery' | 'kands' | 'teachings' | 'diwali') => void;
  onStartReading: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavClick, onStartReading }) => {
  const [isPlayingDrone, setIsPlayingDrone] = useState(isAmbientDroneActive());
  const [isSongPlaying, setIsSongPlaying] = useState(false);

  useEffect(() => {
    // Listen for audio play/pause state from BhajanPlayer
    const audioEl = document.querySelector('audio');
    if (!audioEl) return;

    const handlePlay = () => setIsSongPlaying(true);
    const handlePause = () => setIsSongPlaying(false);

    audioEl.addEventListener('play', handlePlay);
    audioEl.addEventListener('pause', handlePause);

    return () => {
      audioEl.removeEventListener('play', handlePlay);
      audioEl.removeEventListener('pause', handlePause);
    };
  }, []);

  const handleToggleDrone = () => {
    const nextState = toggleDevotionalDrone((active) => {
      setIsPlayingDrone(active);
    });
    setIsPlayingDrone(nextState);
  };

  const handleRingBell = () => {
    playTempleBell();
  };

  const handleToggleSong = () => {
    window.dispatchEvent(new CustomEvent('toggle-ram-bhajan'));
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0806]/92 backdrop-blur-md border-b border-amber-900/40 transition-all">
      {/* Golden Festive Top Glow Line */}
      <div className="h-0.5 bg-gradient-to-r from-amber-800 via-amber-400 to-amber-800" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 py-3">
        {/* Zone 1: Wordmark with Burning Diya */}
        <div className="flex items-center gap-2.5 shrink-0">
          <FestiveDiya size="xs" isBurning={true} />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-title text-xl sm:text-2xl font-bold tracking-wide text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap"
          >
            श्री राम चरित
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-100/80">
          <button
            onClick={() => onNavClick('chapters')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            ३० अध्याय
          </button>
          <button
            onClick={() => onNavClick('diwali')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 text-amber-300 font-semibold"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span>दीपोत्सव</span>
          </button>
          <button
            onClick={() => onNavClick('kands')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            काण्ड दर्शन
          </button>
          <button
            onClick={() => onNavClick('gallery')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            सचित्र झाँकी
          </button>
          <button
            onClick={() => onNavClick('teachings')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            जीवन दर्शन
          </button>
        </nav>

        {/* Zone 3: Actions - Bell, Bhajan, Read */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Temple Bell */}
          <button
            onClick={handleRingBell}
            title="पवित्र मंदिर घंटी बजाएं"
            className="p-2 text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 rounded-lg border border-amber-900/40 transition-colors cursor-pointer"
            aria-label="मंदिर घंटी बजाएं"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Ram Siya Ram Song Toggle Button */}
          <button
            onClick={handleToggleSong}
            title={isSongPlaying ? 'राम सिया राम भजन रोकें' : 'राम सिया राम भजन सुनें'}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
              isSongPlaying
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-900/40'
                : 'bg-amber-950/30 text-amber-200 border-amber-700/50 hover:bg-amber-900/40 hover:text-amber-100'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isSongPlaying ? 'animate-bounce' : 'text-amber-400'}`} />
            <span className="hidden sm:inline">
              {isSongPlaying ? 'भजन चालू है' : 'राम सिया राम'}
            </span>
          </button>

          {/* Tanpura Drone */}
          <button
            onClick={handleToggleDrone}
            title={isPlayingDrone ? 'तानपुरा शांत करें' : 'तानपुरा नाद आरंभ करें'}
            className={`hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isPlayingDrone
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
          >
            {isPlayingDrone ? <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>नाद</span>
          </button>

          {/* Start Reading Action */}
          <button
            onClick={onStartReading}
            className="px-3.5 sm:px-4 py-1.5 text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-lg shadow-md shadow-amber-950/40 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            कथा प्रारंभ
          </button>
        </div>
      </div>
    </header>
  );
};
