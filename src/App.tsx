import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { KandFilter } from './components/KandFilter';
import { ChapterCard } from './components/ChapterCard';
import { ChapterReaderModal } from './components/ChapterReaderModal';
import { GalleryModal } from './components/GalleryModal';
import { DailyChaupaiWidget } from './components/DailyChaupaiWidget';
import { DiwaliCelebration } from './components/DiwaliCelebration';
import { BhajanPlayer } from './components/BhajanPlayer';
import { TeachingsSection } from './components/TeachingsSection';
import { Footer } from './components/Footer';
import { CHAPTERS, Chapter, GALLERY_HIGHLIGHTS } from './data/chaptersData';
import { Bookmark, Sparkles, Filter, Eye, Flame } from 'lucide-react';
import { FestiveDiya } from './components/FestiveDiya';

export default function App() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKand, setActiveKand] = useState('all');
  const [filterMode, setFilterMode] = useState<'all' | 'bookmarked' | 'unread'>('all');

  // Bookmarks & Read chapters persisted in localStorage
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ram_katha_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [readChapters, setReadChapters] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ram_katha_read');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ram_katha_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore storage errors
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('ram_katha_read', JSON.stringify(readChapters));
    } catch {
      // ignore storage errors
    }
  }, [readChapters]);

  const toggleBookmark = (id: number) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleRead = (id: number) => {
    setReadChapters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered chapters list
  const filteredChapters = useMemo(() => {
    return CHAPTERS.filter((chap) => {
      // Kand filter
      if (activeKand !== 'all' && chap.kand !== activeKand) {
        return false;
      }
      // Bookmark/read filter
      if (filterMode === 'bookmarked' && !bookmarks.includes(chap.id)) {
        return false;
      }
      if (filterMode === 'unread' && readChapters.includes(chap.id)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = chap.title.toLowerCase().includes(q);
        const matchesSummary = chap.summary.toLowerCase().includes(q);
        const matchesChaupai = chap.chaupai.verse.toLowerCase().includes(q);
        const matchesChar = chap.keyCharacters.some((c) => c.toLowerCase().includes(q));
        const matchesNumber = chap.hindiNumber.includes(q) || String(chap.id).includes(q);
        return matchesTitle || matchesSummary || matchesChaupai || matchesChar || matchesNumber;
      }
      return true;
    });
  }, [activeKand, filterMode, searchQuery, bookmarks, readChapters]);

  const handleNavClick = (target: 'chapters' | 'gallery' | 'kands' | 'teachings' | 'diwali') => {
    if (target === 'gallery') {
      setIsGalleryOpen(true);
      return;
    }
    if (target === 'diwali') {
      const el = document.getElementById('diwali-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (target === 'teachings') {
      const el = document.getElementById('teachings-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (target === 'kands') {
      const el = document.getElementById('chapters-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (target === 'chapters') {
      const el = document.getElementById('chapters-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  };

  const handleStartReading = () => {
    // Open chapter 1 or the first unread chapter
    const firstUnread = CHAPTERS.find((c) => !readChapters.includes(c.id)) || CHAPTERS[0];
    setSelectedChapter(firstUnread);
  };

  const handlePlayBhajan = () => {
    window.dispatchEvent(new CustomEvent('toggle-ram-bhajan'));
  };

  const handleOpenChapter22 = () => {
    const chap22 = CHAPTERS.find((c) => c.id === 22);
    if (chap22) setSelectedChapter(chap22);
  };

  return (
    <div className="min-h-screen bg-[#0c0806] text-[#f7eee4] font-sans antialiased selection:bg-amber-600 selection:text-white pb-20">
      {/* Universal Top Bar */}
      <Header
        onNavClick={handleNavClick}
        onStartReading={handleStartReading}
      />

      {/* Hero Section */}
      <HeroBanner
        onStartReading={handleStartReading}
        onOpenGallery={() => setIsGalleryOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        readCount={readChapters.length}
        totalChapters={CHAPTERS.length}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Daily Chaupai Contemplation Card */}
        <DailyChaupaiWidget onOpenChapter={(chap) => setSelectedChapter(chap)} />

        {/* Diwali Deepotsav Festive Section */}
        <div id="diwali-section" className="scroll-mt-20">
          <DiwaliCelebration
            onOpenChapter22={handleOpenChapter22}
            onPlayBhajan={handlePlayBhajan}
          />
        </div>

        {/* Visual Showcase Banner */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-stone-950 via-[#190f0a] to-stone-950 border border-amber-900/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>सचित्र रामायण दर्शन</span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span>चित्रमय झाँकी</span>
              </div>
              <h2 className="font-title text-xl sm:text-2xl font-bold text-amber-200 mt-0.5">
                रामायण के ऐतिहासिक प्रसंग सचित्र
              </h2>
            </div>

            <button
              onClick={() => setIsGalleryOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-amber-800/40 hover:border-amber-600 text-amber-300 text-xs font-medium bg-amber-950/20 hover:bg-amber-950/40 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>पूरी झाँकी देखें</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {GALLERY_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setIsGalleryOpen(true)}
                className="group relative rounded-xl overflow-hidden border border-amber-950/60 bg-stone-950 cursor-pointer hover:border-amber-600/60 transition-all"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-2.5">
                  <h4 className="font-title text-xs sm:text-sm font-bold text-amber-200 group-hover:text-amber-300 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-stone-400 line-clamp-1 font-serif-in">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chapters Section */}
        <section id="chapters-section" className="space-y-6 pt-4 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-950 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                <FestiveDiya size="xs" isBurning={true} />
                <span>सम्पूर्ण ग्रंथ सूची</span>
                <span aria-hidden="true">·</span>
                <span>३० पावन अध्याय (प्रत्येक अध्याय सचित्र व वॉइस सहित)</span>
              </div>
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-stone-100">
                अध्याय सूची व पावन कथाएँ
              </h2>
            </div>

            {/* Status Tabs: All / Bookmarked / Unread */}
            <div className="flex items-center gap-1 p-1 bg-stone-950 rounded-lg border border-amber-950">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                सभी ३०
              </button>
              <button
                onClick={() => setFilterMode('bookmarked')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  filterMode === 'bookmarked'
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Bookmark className="w-3 h-3" />
                <span>बुकमार्क ({bookmarks.length})</span>
              </button>
              <button
                onClick={() => setFilterMode('unread')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterMode === 'unread'
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                अपठित ({CHAPTERS.length - readChapters.length})
              </button>
            </div>
          </div>

          {/* Kand Filter Bar */}
          <KandFilter activeKand={activeKand} onSelectKand={setActiveKand} />

          {/* Chapters Grid */}
          {filteredChapters.length === 0 ? (
            <div className="p-12 text-center rounded-xl border border-stone-800 bg-stone-900/20 space-y-3">
              <Filter className="w-8 h-8 text-amber-500/50 mx-auto" />
              <p className="font-title text-lg text-amber-200">कोई अध्याय नहीं मिला</p>
              <p className="text-xs text-stone-400">
                कृपया खोज शब्द बदलें अथवा 'सभी ३० अध्याय' फ़िल्टर का चयन करें।
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveKand('all');
                  setFilterMode('all');
                }}
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors"
              >
                फ़िल्टर साफ़ करें
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredChapters.map((chapter, index) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  onSelect={(c) => setSelectedChapter(c)}
                  isBookmarked={bookmarks.includes(chapter.id)}
                  onToggleBookmark={toggleBookmark}
                  isRead={readChapters.includes(chapter.id)}
                  onToggleRead={toggleRead}
                  index={index}
                />
              ))}
            </div>
          )}
        </section>

        {/* Life Teachings Section (Chapter 30 Highlights) */}
        <TeachingsSection
          onOpenChapter30={() => {
            const chap30 = CHAPTERS.find((c) => c.id === 30);
            if (chap30) setSelectedChapter(chap30);
          }}
        />
      </main>

      {/* Immersive Chapter Reader Modal */}
      <ChapterReaderModal
        chapter={selectedChapter}
        onClose={() => setSelectedChapter(null)}
        onSelectChapter={(c) => setSelectedChapter(c)}
        allChapters={CHAPTERS}
        isBookmarked={selectedChapter ? bookmarks.includes(selectedChapter.id) : false}
        onToggleBookmark={toggleBookmark}
        isRead={selectedChapter ? readChapters.includes(selectedChapter.id) : false}
        onToggleRead={toggleRead}
      />

      {/* Gallery Modal with high-res art */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onJumpToChapter={(chapId) => {
          const chap = CHAPTERS.find((c) => c.id === chapId);
          if (chap) setSelectedChapter(chap);
        }}
        chapters={CHAPTERS}
      />

      {/* Dedicated Floating Devotional Bhajan Player for Ram Siya Ram */}
      <BhajanPlayer />

      {/* Footer */}
      <Footer onNavClick={handleNavClick} />
    </div>
  );
}
