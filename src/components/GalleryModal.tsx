import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { GALLERY_HIGHLIGHTS, Chapter } from '../data/chaptersData';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToChapter: (chapterId: number) => void;
  chapters: Chapter[];
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  onJumpToChapter,
  chapters,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const currentItem = GALLERY_HIGHLIGHTS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : GALLERY_HIGHLIGHTS.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < GALLERY_HIGHLIGHTS.length - 1 ? prev + 1 : 0));
  };

  // Chapter mappings for all 8 gallery highlights
  const relatedChapterMap: Record<number, number> = {
    0: 1,  // Ram Darbar / Intro
    1: 7,  // Sita Swayamvar
    2: 11, // Kevat Prem
    3: 18, // Hanuman in Ashok Vatika
    4: 19, // Ram Setu
    5: 22, // Ayodhya Deepotsav
    6: 27, // Lava Kusha Singing Ramayan
    7: 28, // Sita Bhumi Samadhi
  };

  const relatedChapterId = relatedChapterMap[currentIndex] || 1;
  const relatedChapter = chapters.find((c) => c.id === relatedChapterId);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl rounded-2xl bg-[#120b08] border border-amber-900/50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-amber-950/80 bg-stone-950/60">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>सचित्र झाँकी दर्शन ({currentIndex + 1} / {GALLERY_HIGHLIGHTS.length})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-amber-900/40 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Visual Display */}
          <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center min-h-[300px] sm:min-h-[440px]">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              referrerPolicy="no-referrer"
              className="max-h-[60vh] w-auto max-w-full object-contain"
            />

            {/* Nav Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-amber-300 border border-amber-900/40 transition-colors cursor-pointer"
              aria-label="पिछली छवि"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-amber-300 border border-amber-900/40 transition-colors cursor-pointer"
              aria-label="अगली छवि"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Image Description & Associated Chapter Action */}
          <div className="p-5 sm:p-6 bg-[#160e0a] border-t border-amber-950/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-title text-xl sm:text-2xl font-bold text-amber-200">
                  {currentItem.title}
                </h3>
                <p className="text-xs text-amber-400/80 font-medium">
                  {currentItem.subtitle}
                </p>
              </div>

              {relatedChapter && (
                <button
                  onClick={() => {
                    onClose();
                    onJumpToChapter(relatedChapter.id);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>अध्याय {relatedChapter.hindiNumber} कथा पढ़ें</span>
                </button>
              )}
            </div>

            <p className="font-serif-in text-xs sm:text-sm text-stone-300 leading-relaxed">
              {currentItem.katha}
            </p>

            {/* Thumbnails strip */}
            <div className="flex items-center gap-3 pt-2 overflow-x-auto">
              {GALLERY_HIGHLIGHTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-20 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    currentIndex === idx ? 'border-amber-400 scale-105' : 'border-stone-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
