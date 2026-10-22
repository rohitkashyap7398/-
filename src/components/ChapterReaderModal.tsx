import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Volume2,
  VolumeX,
  Bookmark,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  Type,
  Share2,
  Sparkles,
} from 'lucide-react';
import { Chapter } from '../data/chaptersData';
import { KathaSpeechReciter, playTempleBell } from '../utils/soundEffects';

interface ChapterReaderModalProps {
  chapter: Chapter | null;
  onClose: () => void;
  onSelectChapter: (chapter: Chapter) => void;
  allChapters: Chapter[];
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  isRead: boolean;
  onToggleRead: (id: number) => void;
}

export const ChapterReaderModal: React.FC<ChapterReaderModalProps> = ({
  chapter,
  onClose,
  onSelectChapter,
  allChapters,
  isBookmarked,
  onToggleBookmark,
  isRead,
  onToggleRead,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [isParchmentMode, setIsParchmentMode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Stop speech when modal closes or chapter changes
  useEffect(() => {
    return () => {
      KathaSpeechReciter.stop();
    };
  }, []);

  useEffect(() => {
    KathaSpeechReciter.stop();
    setIsSpeaking(false);
  }, [chapter?.id]);

  if (!chapter) return null;

  const currentIndex = allChapters.findIndex((c) => c.id === chapter.id);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      KathaSpeechReciter.stop();
      setIsSpeaking(false);
    } else {
      const fullTextToRead = `${chapter.title}। ${chapter.kand}। ${chapter.summary}। चौपाई: ${chapter.chaupai.verse}। भावार्थ: ${chapter.chaupai.meaning}। पूर्ण कथा: ${chapter.fullStory.join(' ')}। जीवन दर्शन: ${chapter.moralTeaching}`;
      setIsSpeaking(true);
      KathaSpeechReciter.speak(
        fullTextToRead,
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleShare = async () => {
    const text = `श्री राम चरित मानस - अध्याय ${chapter.hindiNumber}: ${chapter.title}\n\n"${chapter.chaupai.verse}"\n\n— भावार्थ: ${chapter.chaupai.meaning}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: chapter.title,
          text: text,
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fontSizeClass =
    fontSize === 'huge'
      ? 'text-xl leading-loose'
      : fontSize === 'large'
      ? 'text-lg leading-relaxed'
      : 'text-base leading-relaxed';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border shadow-2xl transition-colors duration-300 ${
            isParchmentMode
              ? 'bg-[#f7f2e8] text-[#2c1d11] border-amber-800/30'
              : 'bg-[#120b08] text-stone-100 border-amber-900/50'
          }`}
        >
          {/* Top Sticky Utility Header */}
          <div
            className={`sticky top-0 z-20 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b backdrop-blur-md ${
              isParchmentMode
                ? 'bg-[#f7f2e8]/90 border-amber-800/20 text-stone-900'
                : 'bg-[#120b08]/90 border-amber-950/80 text-stone-200'
            }`}
          >
            {/* Clean unboxed chapter index info */}
            <div className="flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400">
              <span className="font-bold">अध्याय {chapter.hindiNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{chapter.kand}</span>
              <span aria-hidden="true">·</span>
              <span>{chapter.readTime}</span>
            </div>

            {/* Reading controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Text Size toggle */}
              <button
                onClick={() => {
                  setFontSize((prev) => (prev === 'normal' ? 'large' : prev === 'large' ? 'huge' : 'normal'));
                }}
                title="अक्षर आकार बदलें"
                className="p-1.5 rounded-lg border border-amber-900/30 hover:bg-amber-500/10 transition-colors text-xs flex items-center gap-0.5 cursor-pointer"
              >
                <Type className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold">{fontSize === 'normal' ? 'अ' : fontSize === 'large' ? 'अ+' : 'अ++'}</span>
              </button>

              {/* Theme toggle: Dark / Parchment */}
              <button
                onClick={() => setIsParchmentMode(!isParchmentMode)}
                title={isParchmentMode ? 'अंधेरा गर्भगृह मोड' : 'पांडुलिपि पृष्ठ मोड'}
                className="p-1.5 rounded-lg border border-amber-900/30 hover:bg-amber-500/10 transition-colors cursor-pointer"
              >
                {isParchmentMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </button>

              {/* TTS Audio Reciter */}
              <button
                onClick={handleToggleSpeech}
                title={isSpeaking ? 'कथा वाचन रोकें' : 'कथा श्रवण करें (ऑडियो)'}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-500 text-stone-950 border-amber-400 animate-pulse font-semibold'
                    : 'border-amber-900/30 hover:bg-amber-500/10'
                }`}
              >
                {isSpeaking ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isSpeaking ? 'वाचन जारी...' : 'कथा श्रवण'}</span>
              </button>

              {/* Bookmark */}
              <button
                onClick={() => {
                  onToggleBookmark(chapter.id);
                  playTempleBell();
                }}
                title="बुकमार्क"
                className={`p-1.5 rounded-lg border border-amber-900/30 transition-colors cursor-pointer ${
                  isBookmarked ? 'text-amber-500 fill-amber-500 bg-amber-500/10' : 'hover:bg-amber-500/10'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              {/* Mark as read */}
              <button
                onClick={() => {
                  onToggleRead(chapter.id);
                  playTempleBell();
                }}
                title={isRead ? 'पढ़ा हुआ' : 'पढ़ा हुआ चिन्हित करें'}
                className={`p-1.5 rounded-lg border border-amber-900/30 transition-colors cursor-pointer ${
                  isRead ? 'text-emerald-500 bg-emerald-500/10' : 'hover:bg-amber-500/10'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                title="साझा करें"
                className="p-1.5 rounded-lg border border-amber-900/30 hover:bg-amber-500/10 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                title="बंद करें"
                className="p-1.5 rounded-lg border border-amber-900/30 hover:bg-red-500/20 hover:text-red-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {copied && (
            <div className="bg-amber-500 text-stone-950 text-xs text-center py-1 font-semibold">
              चौपाई एवं कथा विवरण क्लिपबोर्ड में कॉपी हो गया!
            </div>
          )}

          {/* Modal Reading Body */}
          <div className="p-5 sm:p-8 space-y-8 max-w-3xl mx-auto">
            {/* Title & Kicker */}
            <div className="text-center space-y-2 border-b border-amber-900/20 pb-6">
              <span className="text-xs uppercase font-medium tracking-widest text-amber-500">
                {chapter.kand} · भाग {chapter.hindiNumber}
              </span>
              <h2 className="font-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
                {chapter.title}
              </h2>
              <p className="font-serif-in text-sm sm:text-base italic text-stone-400 dark:text-stone-300 max-w-xl mx-auto pt-1">
                {chapter.summary}
              </p>
            </div>

            {/* Featured Image with Animation & Character Banner */}
            {chapter.featuredImage && (
              <div className="relative rounded-2xl overflow-hidden border border-amber-600/40 shadow-xl group bg-stone-950">
                <img
                  src={chapter.featuredImage}
                  alt={chapter.title}
                  referrerPolicy="no-referrer"
                  className={`w-full aspect-[16/9] object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                    isSpeaking ? 'scale-105' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/30 pointer-events-none" />

                {/* Character Badge overlay */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-amber-600/50 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 shadow-md">
                  पात्र दर्शन: {chapter.primaryCharacter}
                </div>

                {/* Live sound indicator */}
                {isSpeaking && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg animate-pulse">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>कथा वाचन सक्रिय</span>
                  </div>
                )}

                <div className="absolute bottom-0 inset-x-0 p-3 bg-stone-950/80 text-stone-300 text-xs font-serif-in text-center border-t border-stone-800 flex items-center justify-between px-4">
                  <span>सचित्र दर्शन: {chapter.title} का पावन प्रसंग</span>
                  <span className="text-amber-400 font-sans font-medium">अध्याय {chapter.hindiNumber}</span>
                </div>
              </div>
            )}

            {/* Sacred Chaupai / Shloka Card */}
            <div
              className={`p-5 sm:p-6 rounded-xl border relative overflow-hidden ${
                isParchmentMode
                  ? 'bg-amber-100/60 border-amber-300 text-amber-950'
                  : 'bg-amber-950/20 border-amber-700/40 text-amber-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-medium text-amber-500 mb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  पावन चौपाई / श्लोक
                </span>
                <span className="text-stone-400">{chapter.chaupai.source}</span>
              </div>

              <blockquote className="font-title text-base sm:text-lg lg:text-xl font-bold leading-relaxed whitespace-pre-line text-center py-2 text-amber-400 dark:text-amber-300">
                {chapter.chaupai.verse}
              </blockquote>

              <div className="mt-3 pt-3 border-t border-amber-800/30 font-serif-in text-xs sm:text-sm leading-relaxed">
                <strong className="text-amber-500 font-sans">भावार्थ: </strong>
                {chapter.chaupai.meaning}
              </div>
            </div>

            {/* Full Story Narrative with Editorial Drop Cap */}
            <div className={`space-y-5 font-serif-in ${fontSizeClass}`}>
              <h3 className="font-title text-lg font-bold text-amber-400 not-prose border-b border-amber-900/30 pb-1">
                विस्तृत पावन कथा
              </h3>

              {chapter.fullStory.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? 'first-letter:text-4xl first-letter:font-title first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-amber-500'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Characters & Life Lesson */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-amber-900/30">
              <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/30">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  प्रमुख पात्र एवं प्रसंग
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {chapter.keyCharacters.map((char, i) => (
                    <span
                      key={i}
                      className="text-stone-300 bg-stone-800/60 px-2 py-0.5 rounded text-xs"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-800/40 bg-amber-950/20">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  जीवन दर्शन व पावन सीख
                </h4>
                <p className="font-serif-in text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {chapter.moralTeaching}
                </p>
              </div>
            </div>

            {/* Previous & Next Chapter Navigation */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-amber-900/30">
              {prevChapter ? (
                <button
                  onClick={() => onSelectChapter(prevChapter)}
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-300 hover:text-amber-200 p-2 rounded-lg hover:bg-stone-800/50 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-left">
                    <span className="block text-[10px] text-stone-400">पिछला अध्याय</span>
                    <span className="line-clamp-1">{prevChapter.title}</span>
                  </span>
                </button>
              ) : (
                <div />
              )}

              {nextChapter ? (
                <button
                  onClick={() => onSelectChapter(nextChapter)}
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-300 hover:text-amber-200 p-2 rounded-lg hover:bg-stone-800/50 transition-colors cursor-pointer text-right ml-auto"
                >
                  <span className="text-right">
                    <span className="block text-[10px] text-stone-400">अगला अध्याय</span>
                    <span className="line-clamp-1">{nextChapter.title}</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors ml-auto cursor-pointer"
                >
                  संपूर्ण कथा संपन्न
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
