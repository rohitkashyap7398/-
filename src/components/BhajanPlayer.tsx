import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Music,
  ChevronDown,
  ChevronUp,
  Flame,
} from 'lucide-react';
import { KathaSpeechReciter } from '../utils/soundEffects';

const AUDIO_SRC =
  '/assets/aistudio/Ram_Siya_Ram__Lyrical__Adipurush___Prabhas___Sachet-Parampara_Manoj_Muntashir_S__Om_Raut___Bhushan_K_94bd946a.mp3';

interface BhajanPlayerProps {
  onLightDiyaRequest?: () => void;
}

export const BhajanPlayer: React.FC<BhajanPlayerProps> = ({ onLightDiyaRequest }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Format time helper (mm:ss)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Listen to TTS reciter - duck volume or pause when Katha recitation speaks
  useEffect(() => {
    const unsubscribe = KathaSpeechReciter.subscribe((activeId) => {
      if (activeId !== null) {
        // Katha recitation started -> lower bhajan volume smoothly
        if (audioRef.current && isPlaying) {
          audioRef.current.volume = 0.15;
        }
      } else {
        // Katha recitation finished -> restore volume
        if (audioRef.current && !isMuted) {
          audioRef.current.volume = volume;
        }
      }
    });

    return () => unsubscribe();
  }, [isPlaying, isMuted, volume]);

  // Global toggle listener so Header and Hero buttons can toggle playback
  useEffect(() => {
    const handleToggleSong = () => {
      togglePlay();
    };

    window.addEventListener('toggle-ram-bhajan', handleToggleSong);
    return () => {
      window.removeEventListener('toggle-ram-bhajan', handleToggleSong);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="metadata"
        loop={isLooping}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          if (!isLooping) setIsPlaying(false);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Bottom Audio Bar */}
      <div
        className={`fixed bottom-4 right-4 z-40 max-w-[calc(100vw-2rem)] sm:max-w-md transition-all duration-300 ${
          isMinimized ? 'translate-y-0' : 'translate-y-0'
        }`}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.85)] border border-amber-600/50 bg-gradient-to-r from-[#170e0a]/95 via-[#23140c]/95 to-[#170e0a]/95 backdrop-blur-md">
          {/* Subtle Golden Glow Header Accent */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

          {/* Minimized Pill View */}
          {isMinimized ? (
            <div className="px-4 py-2.5 flex items-center justify-between gap-3">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
                title={isPlaying ? 'रोकें' : 'चलाएं'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <div
                onClick={() => setIsMinimized(false)}
                className="flex-1 cursor-pointer select-none"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-200">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>राम सिया राम</span>
                  {isPlaying && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      चल रहा है
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-stone-400">सचेत-परम्परा · पावन भजन</p>
              </div>

              <button
                onClick={() => setIsMinimized(false)}
                className="p-1.5 text-stone-400 hover:text-amber-300 rounded-lg hover:bg-stone-800/50 transition-colors"
                title="विस्तार करें"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Full Player Card */
            <div className="p-3.5 sm:p-4 space-y-3">
              {/* Header: Title & Window Controls */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-900 to-stone-950 border border-amber-700/50 flex items-center justify-center shrink-0 shadow-inner">
                    <Music className="w-5 h-5 text-amber-400" />
                    {isPlaying && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-title text-sm sm:text-base font-bold text-amber-200 truncate">
                        राम सिया राम
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/50 shrink-0">
                        दीपोत्सव भजन
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 truncate">
                      गायक: सचेत टंडन, परम्परा ठाकुर · गीतकार: मनोज मुन्तशिर
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1 text-stone-400 hover:text-amber-300 rounded-md hover:bg-amber-950/40 transition-colors cursor-pointer"
                    title="छोटा करें"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Animated Sound Wave Equalizer */}
              <div className="flex items-end justify-center gap-1 h-5 py-0.5">
                {[18, 36, 65, 42, 85, 52, 95, 70, 30, 80, 50, 90, 60, 35, 75, 45].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-gradient-to-t from-amber-600 to-amber-300 rounded-full transition-all duration-200"
                    style={{
                      height: isPlaying ? `${Math.max(15, (h * (0.6 + Math.sin((currentTime * 4) + i) * 0.4)))}%` : '20%',
                      opacity: isPlaying ? 0.9 : 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Progress Bar & Timers */}
              <div className="space-y-1">
                <div className="relative group">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${progressPercent}%, #292524 ${progressPercent}%, #292524 100%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between gap-3 pt-1 border-t border-amber-950/60">
                {/* Loop Button */}
                <button
                  onClick={toggleLoop}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isLooping ? 'text-amber-400 bg-amber-950/40' : 'text-stone-500 hover:text-stone-300'
                  }`}
                  title={isLooping ? 'दोहराव चालू है' : 'दोहराव बंद करें'}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Primary Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-[0_4px_16px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>भजन रोकें</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      <span>राम सिया राम सुनें</span>
                    </>
                  )}
                </button>

                {/* Volume Slider with Mute Button */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleMute}
                    className="p-1 text-stone-400 hover:text-amber-300 rounded transition-colors cursor-pointer"
                    title={isMuted ? 'ध्वनि चालू करें' : 'मूक करें'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
