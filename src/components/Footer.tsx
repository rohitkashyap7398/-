import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavClick: (target: 'chapters' | 'gallery' | 'kands' | 'teachings') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-amber-950/80 bg-[#080504] text-stone-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <p className="font-title text-base font-bold text-amber-300">
            श्री राम चरित — संपूर्ण ३० अध्याय गाथा
          </p>
          <p className="text-stone-400">
            वाल्मीकि रामायण एवं गोस्वामी तुलसीदास कृत श्रीरामचरितमानस के पावन प्रसंगों पर आधारित।
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-stone-300">
          <button
            onClick={() => onNavClick('chapters')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            अध्याय सूची
          </button>
          <button
            onClick={() => onNavClick('kands')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            काण्ड विभाजन
          </button>
          <button
            onClick={() => onNavClick('gallery')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            सचित्र झाँकी
          </button>
          <button
            onClick={() => onNavClick('teachings')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            जीवन शिक्षाएँ
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-950 hover:border-amber-800 text-amber-300 hover:text-amber-200 bg-stone-900/60 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>शीर्ष पर जाएं</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
