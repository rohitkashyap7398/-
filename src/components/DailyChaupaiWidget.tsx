import React, { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check, BookOpen } from 'lucide-react';
import { CHAPTERS, Chapter } from '../data/chaptersData';
import { playTempleBell } from '../utils/soundEffects';

interface DailyChaupaiWidgetProps {
  onOpenChapter: (chapter: Chapter) => void;
}

export const DailyChaupaiWidget: React.FC<DailyChaupaiWidgetProps> = ({ onOpenChapter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentChapter = CHAPTERS[currentIndex];

  const handleNextChaupai = () => {
    setCurrentIndex((prev) => (prev + 1) % CHAPTERS.length);
    playTempleBell();
  };

  const handleCopy = async () => {
    const text = `"${currentChapter.chaupai.verse}"\n— भावार्थ: ${currentChapter.chaupai.meaning}\n(${currentChapter.title})`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-2xl border border-amber-900/40 bg-gradient-to-br from-[#18100c] via-[#140c09] to-[#0f0907] relative overflow-hidden shadow-xl">
      <div className="flex items-center justify-between text-xs text-amber-400 mb-3">
        <div className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>दैनिक पावन चौपाई दर्शन</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>अध्याय {currentChapter.hindiNumber}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="चौपाई कॉपी करें"
            className="p-1 rounded text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleNextChaupai}
            title="अन्य चौपाई देखें"
            className="p-1 rounded text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="font-title text-base sm:text-lg font-bold text-amber-300 whitespace-pre-line text-center py-2 leading-relaxed">
        {currentChapter.chaupai.verse}
      </p>

      <p className="font-serif-in text-xs sm:text-sm text-stone-300 text-center max-w-2xl mx-auto pt-2 border-t border-amber-900/20">
        <strong className="text-amber-500 font-sans">भावार्थ: </strong>
        {currentChapter.chaupai.meaning}
      </p>

      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={() => onOpenChapter(currentChapter)}
          className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline-offset-4 hover:underline"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>अध्याय {currentChapter.hindiNumber}: {currentChapter.title} पढ़ें</span>
        </button>
      </div>
    </div>
  );
};
