import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Search, Music, Eye } from 'lucide-react';
import { FestiveDiya } from './FestiveDiya';

interface HeroBannerProps {
  onStartReading: () => void;
  onOpenGallery: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  readCount: number;
  totalChapters: number;
}

const heroImages = [
  {
    src: "/assets/aistudio/image_f1afedb8.png",
    title: "मर्यादा पुरुषोत्तम श्री राम",
    tag: "कोदण्ड धनुर्धारी",
    desc: "सूर्यवंश के कुलभूषण, धर्म-मर्यादा के साक्षात विग्रह प्रभु श्री राम।",
  },
  {
    src: "/assets/aistudio/image_801656d4.png",
    title: "श्री राम और माता सीता",
    tag: "दिव्य युगल",
    desc: "भक्ति, प्रेम, करुणा और त्याग की अलौकिक युगल छवि।",
  },
  {
    src: "/assets/aistudio/image_3e860088.png",
    title: "महाबली श्री हनुमान जी",
    tag: "ध्यानावस्था व गदा",
    desc: "अतुलित बल के धाम, प्रभु के चरणों में लीन रामदूत।",
  },
  {
    src: "/assets/aistudio/image_a5d8e0ec.png",
    title: "वीर धनुर्धर श्री राम",
    tag: "महासंग्राम स्वरूप",
    desc: "अधर्म के संहार हेतु प्रत्यंचा चढ़ाते महापराक्रमी प्रभु।",
  },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartReading,
  onOpenGallery,
  searchQuery,
  onSearchChange,
  readCount,
  totalChapters,
}) => {
  const [heroIndex, setHeroIndex] = React.useState(0);
  const percent = Math.round((readCount / totalChapters) * 100);

  const handlePlaySong = () => {
    window.dispatchEvent(new CustomEvent('toggle-ram-bhajan'));
  };

  return (
    <section className="relative overflow-hidden border-b border-amber-900/40 bg-gradient-to-b from-[#1c100a] via-[#120a06] to-[#0c0806] pt-8 pb-12 sm:pt-12 sm:pb-16">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-amber-600/15 blur-[120px] pointer-events-none rounded-full" />

      {/* Floating festive sparks */}
      <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-amber-400/60 festive-ember pointer-events-none" />
      <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-yellow-400/50 festive-ember pointer-events-none" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text / Editorial Invocation (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Festive Diwali Kicker with Burning Diyas */}
            <div className="flex items-center gap-3">
              <FestiveDiya size="xs" isBurning={true} />
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 tracking-wider">
                <span>सम्पूर्ण रामायण महागाथा</span>
                <span aria-hidden="true" className="text-amber-600">·</span>
                <span>३० पावन अध्याय</span>
                <span aria-hidden="true" className="text-amber-600">·</span>
                <span>अयोध्या दीपोत्सव पर्व</span>
              </div>
              <FestiveDiya size="xs" isBurning={true} />
            </div>

            <h1 className="font-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-amber-100 leading-[1.2] text-balance">
              मर्यादा पुरुषोत्तम भगवान श्री राम
              <span className="block text-amber-400 mt-1">संपूर्ण पावन जीवन कथा</span>
            </h1>

            <p className="text-stone-300 font-serif-in text-base sm:text-lg leading-relaxed max-w-2xl">
              सूर्यवंश के मुकुटमणि, धर्मधुरंधर प्रभु श्री राम के अवतार से लेकर बाललीला, धनुषयज्ञ, चौदह वर्ष वनवास, लंका विजय, पावन दीपावली दीपोत्सव, रामराज्य और परम वैकुंठ गमन तक की पूर्ण, विस्तृत एवं सचित्र गाथा।
            </p>

            {/* Sacred quote display */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/50 text-amber-200 font-serif-in text-sm italic shadow-inner">
              "रघुकुल रीति सदा चलि आई। प्राण जाहुँ बरु बचनु न जाई॥"
              <span className="block not-italic text-xs text-amber-400 font-sans mt-1">
                — श्रीरामचरितमानस
              </span>
            </div>

            {/* Interactive Search Bar & Actions */}
            <div className="space-y-3 pt-2">
              <div className="relative max-w-lg">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="अध्याय, पात्र, घटना या चौपाई खोजें (उदा: केवट, भरत, रामसेतु, दीपावली)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-900/80 border border-amber-900/50 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
                  >
                    हटाएं
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={onStartReading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-bold text-sm shadow-md shadow-amber-950/40 transition-all cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>प्रथम अध्याय से वाचन</span>
                </button>

                <button
                  onClick={handlePlaySong}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-950/80 to-[#2c1508] border border-amber-600/60 hover:border-amber-400 text-amber-300 hover:text-amber-100 text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <Music className="w-4 h-4 text-amber-400 fill-current animate-pulse" />
                  <span>राम सिया राम सुनें</span>
                </button>

                <button
                  onClick={onOpenGallery}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-800 text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>सचित्र झाँकी दर्शन</span>
                </button>
              </div>
            </div>

            {/* Reading progress banner */}
            <div className="pt-2 flex items-center gap-4 text-xs text-stone-400 max-w-lg">
              <div className="flex-1 bg-stone-900 rounded-full h-1.5 overflow-hidden border border-amber-950">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="shrink-0 text-amber-300 font-medium">
                {readCount} / {totalChapters} अध्याय संपन्न ({percent}%)
              </span>
            </div>
          </motion.div>

          {/* Right Featured Masterwork Visual (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-amber-600/50 shadow-2xl shadow-amber-950/80 bg-stone-950 group">
              <img
                src={heroImages[heroIndex].src}
                alt={heroImages[heroIndex].title}
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/5] sm:aspect-[16/11] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

              {/* Floating Top Badge */}
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-amber-500/50 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 shadow-md">
                {heroImages[heroIndex].tag}
              </div>

              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                <div className="flex items-center justify-between text-xs text-amber-300/90 mb-1">
                  <span className="font-semibold text-sm text-amber-200">{heroImages[heroIndex].title}</span>
                  <span className="text-[11px] text-amber-400">पावन दर्शन</span>
                </div>
                <p className="text-xs text-stone-300 font-serif-in line-clamp-2">
                  {heroImages[heroIndex].desc}
                </p>

                {/* Micro Thumbnails Switcher */}
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-stone-800/80">
                  {heroImages.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroIndex(idx)}
                      title={item.title}
                      className={`relative w-12 h-9 rounded-md overflow-hidden border transition-all cursor-pointer ${
                        heroIndex === idx ? 'border-amber-400 ring-1 ring-amber-400 scale-105' : 'border-stone-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={item.src} alt={item.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Ambient decorative motif */}
            <div className="mt-3 flex items-center justify-center gap-3 text-xs text-amber-400/90">
              <FestiveDiya size="xs" isBurning={true} />
              <span>सत्य · मर्यादा · धर्म · करुणा · पराक्रम</span>
              <FestiveDiya size="xs" isBurning={true} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
