import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bookmark, CheckCircle2, ChevronRight, Volume2, VolumeX, Sparkles, UserCheck } from 'lucide-react';
import { Chapter } from '../data/chaptersData';
import { KathaSpeechReciter, playTempleBell } from '../utils/soundEffects';
import { FestiveDiya } from './FestiveDiya';

interface ChapterCardProps {
  chapter: Chapter;
  onSelect: (chapter: Chapter) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  isRead: boolean;
  onToggleRead: (id: number) => void;
  index: number;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  isRead,
  onToggleRead,
  index,
}) => {
  const [isPlayingThis, setIsPlayingThis] = useState(
    KathaSpeechReciter.getActiveChapterId() === chapter.id && KathaSpeechReciter.isSpeaking()
  );

  useEffect(() => {
    const unsubscribe = KathaSpeechReciter.subscribe((activeId) => {
      setIsPlayingThis(activeId === chapter.id);
    });
    return unsubscribe;
  }, [chapter.id]);

  const handleVoicePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingThis) {
      KathaSpeechReciter.stop();
    } else {
      playTempleBell();
      KathaSpeechReciter.speakChapter(chapter);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: Math.min((index % 6) * 0.06, 0.3) }}
      className={`group relative rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
        isPlayingThis
          ? 'bg-[#1e130c] border-amber-500 shadow-2xl shadow-amber-500/20 ring-1 ring-amber-500/50'
          : isRead
          ? 'bg-[#110b08]/90 border-stone-800'
          : 'bg-[#150e0a] border-amber-950/70 hover:border-amber-600/50 hover:bg-[#1a120c]'
      } hover:shadow-2xl hover:shadow-amber-950/40`}
    >
      <div>
        {/* Animated Visual Artwork Banner with Character Presence */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950">
          <img
            src={chapter.featuredImage}
            alt={`${chapter.title} - ${chapter.primaryCharacter}`}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
              isPlayingThis ? 'scale-105' : ''
            }`}
          />

          {/* Golden radial aura & gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#150e0a] via-[#150e0a]/30 to-black/40" />

          {/* Active Speaking Ambient Glow */}
          {isPlayingThis && (
            <div className="absolute inset-0 bg-amber-500/15 animate-pulse pointer-events-none" />
          )}

          {/* Top Bar on Image: Chapter Number, Character Badge & Festive Diya */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-stone-900 bg-amber-400/95 px-2.5 py-0.5 rounded-full shadow-md font-sans">
                अध्याय {chapter.hindiNumber}
              </span>
              <FestiveDiya size="xs" isBurning={true} />
            </div>

            {/* Character representation badge */}
            <div className="flex items-center gap-1 text-[11px] font-medium text-amber-200 bg-black/70 backdrop-blur-md border border-amber-700/40 px-2 py-0.5 rounded-full">
              <UserCheck className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="line-clamp-1 max-w-[130px] font-serif-in">{chapter.primaryCharacter}</span>
            </div>
          </div>

          {/* Live Voice Audio Trigger Button directly on Image with Animated Waves */}
          <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between z-10">
            <button
              onClick={handleVoicePlay}
              title={isPlayingThis ? 'कथा वाचन रोकें' : 'इस अध्याय की कथा और चौपाई सुनें'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md transition-all cursor-pointer shadow-lg ${
                isPlayingThis
                  ? 'bg-amber-400 text-stone-950 border border-amber-300 ring-2 ring-amber-400/50'
                  : 'bg-black/75 hover:bg-black/95 text-amber-300 border border-amber-800/60 hover:border-amber-400'
              }`}
            >
              {isPlayingThis ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-stone-950 animate-bounce" />
                  <span>वाचन जारी</span>
                  {/* Equalizer Sound Waves */}
                  <div className="flex items-end gap-0.5 h-3 ml-1">
                    <span className="w-0.5 h-2 bg-stone-950 animate-[pulse_0.6s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-3 bg-stone-950 animate-[pulse_0.4s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-1.5 bg-stone-950 animate-[pulse_0.7s_ease-in-out_infinite]" />
                  </div>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>कथा सुनें (वॉइस)</span>
                </>
              )}
            </button>

            {/* Kand & Read Time */}
            <span className="text-[11px] font-medium text-stone-300 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-stone-800">
              {chapter.kand}
            </span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-4 sm:p-5">
          {/* Metadata & Actions */}
          <div className="flex items-center justify-between text-xs text-amber-400/80 mb-2">
            <div className="flex items-center gap-2 text-stone-400">
              <span>समय: {chapter.readTime}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400/90 font-serif-in line-clamp-1 max-w-[120px]">
                {chapter.keyCharacters[0]}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Read toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRead(chapter.id);
                  playTempleBell();
                }}
                title={isRead ? 'पढ़ा हुआ चिन्ह हटाएं' : 'पढ़ा हुआ चिन्हित करें'}
                className={`p-1 rounded hover:bg-stone-800/80 transition-colors cursor-pointer ${
                  isRead ? 'text-emerald-400' : 'text-stone-500 hover:text-stone-300'
                }`}
                aria-label="पढ़ा हुआ चिन्हित करें"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              {/* Bookmark */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(chapter.id);
                  playTempleBell();
                }}
                title={isBookmarked ? 'बुकमार्क हटाएं' : 'बुकमार्क जोड़ें'}
                className={`p-1 rounded hover:bg-stone-800/80 transition-colors cursor-pointer ${
                  isBookmarked ? 'text-amber-400 fill-amber-400' : 'text-stone-500 hover:text-stone-300'
                }`}
                aria-label="बुकमार्क"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Chapter Title */}
          <h3
            onClick={() => onSelect(chapter)}
            className="font-title text-lg sm:text-xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1 mb-2"
          >
            {chapter.title}
          </h3>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-stone-300 font-serif-in leading-relaxed line-clamp-2 mb-3">
            {chapter.summary}
          </p>

          {/* Chaupai snippet highlight */}
          <div className="p-3 rounded-xl bg-black/40 border border-amber-950/60 text-xs font-serif-in text-amber-200/90 space-y-1">
            <div className="flex items-center gap-1 text-[10px] text-amber-500 font-sans font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>पावन चौपाई</span>
            </div>
            <p className="italic line-clamp-2 leading-relaxed">
              "{chapter.chaupai.verse.split('\n')[0]}"
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="px-4 py-3 sm:px-5 border-t border-stone-800/60 bg-black/20 flex items-center justify-between">
        <span className="text-[11px] text-stone-400 line-clamp-1 max-w-[160px]">
          पात्र: {chapter.keyCharacters.slice(0, 2).join(', ')}
        </span>

        <button
          onClick={() => onSelect(chapter)}
          className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group-hover:translate-x-0.5"
        >
          <span>पूर्ण कथा पढ़ें</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
};
