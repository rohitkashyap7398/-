import React, { useState, useEffect } from 'react';
import { FestiveDiya } from './FestiveDiya';
import { Sparkles, Flame, Volume2, BookOpen, Check } from 'lucide-react';
import { playTempleBell } from '../utils/soundEffects';

interface DiwaliCelebrationProps {
  onOpenChapter22: () => void;
  onPlayBhajan: () => void;
}

export const DiwaliCelebration: React.FC<DiwaliCelebrationProps> = ({
  onOpenChapter22,
  onPlayBhajan,
}) => {
  const [diyasCount, setDiyasCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ayodhya_diwali_diyas_lit');
      return saved ? parseInt(saved, 10) : 51108;
    } catch {
      return 51108;
    }
  });

  const [userLitCount, setUserLitCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('user_lit_diyas_count');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [recentlyLit, setRecentlyLit] = useState(false);
  const [blessingMessage, setBlessingMessage] = useState<string | null>(null);

  const lightDiyas = (count = 1) => {
    playTempleBell();
    const newTotal = diyasCount + count;
    const newUserTotal = userLitCount + count;
    setDiyasCount(newTotal);
    setUserLitCount(newUserTotal);

    try {
      localStorage.setItem('ayodhya_diwali_diyas_lit', newTotal.toString());
      localStorage.setItem('user_lit_diyas_count', newUserTotal.toString());
    } catch {
      // ignore
    }

    setRecentlyLit(true);
    setBlessingMessage(
      count === 1
        ? 'जय श्री राम! आपका दीप अयोध्या धाम के पावन मंदिर में प्रज्वलित हुआ!'
        : `जय श्री राम! आपके द्वारा ${count} दीप अयोध्या धाम में समर्पित हुए!`
    );

    setTimeout(() => {
      setRecentlyLit(false);
    }, 1500);

    setTimeout(() => {
      setBlessingMessage(null);
    }, 4500);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#1c100a] via-[#2a1307] to-[#140b06] shadow-[0_16px_50px_rgba(245,158,11,0.18)]">
      {/* Decorative Golden Diwali Toran Garland Top Border */}
      <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 shadow-md flex items-center justify-around overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-amber-200 border border-amber-700/60 inline-block shadow-[0_0_6px_#fde047]"
          />
        ))}
      </div>

      {/* Ambient background glow & soft sparkles */}
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Deepotsav Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-5 border-b border-amber-900/40">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 text-xs font-black uppercase tracking-wider shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-current" />
                अयोध्या दीपोत्सव महोत्सव
              </span>
              <span className="text-xs text-amber-300/80 font-serif-in">
                कार्तिक अमावस्या · पावन दीपावली
              </span>
            </div>

            <h3 className="font-title text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-100 tracking-wide">
              १४ वर्ष वनवास पश्चात प्रभु श्री राम का अयोध्या आगमन
            </h3>

            <p className="text-sm text-stone-300 font-serif-in max-w-2xl leading-relaxed">
              जब मर्यादा पुरुषोत्तम श्री राम रावण पर विजय प्राप्त कर माता सीता व लक्ष्मण संग
              अयोध्या लौटे, तब पूरी अवधपुरी ने लाखों घी के दीपक जलाकर प्रथम पावन दीपावली मनाई थी।
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={onPlayBhajan}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(245,158,11,0.3)] transition-all transform hover:scale-105 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 fill-current" />
              <span>दीपोत्सव भजन: राम सिया राम</span>
            </button>

            <button
              onClick={onOpenChapter22}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-600/50 hover:border-amber-400 bg-amber-950/40 hover:bg-amber-900/40 text-amber-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>अध्याय २२: दीपावली प्रसंग पढ़ें</span>
            </button>
          </div>
        </div>

        {/* Row of Burning Clay Diyas Across Screen */}
        <div className="flex items-center justify-between sm:justify-around py-3 px-2 rounded-2xl bg-gradient-to-r from-stone-950/80 via-[#180d07] to-stone-950/80 border border-amber-900/30">
          <FestiveDiya size="lg" isBurning={true} onClick={() => lightDiyas(1)} />
          <FestiveDiya size="md" isBurning={true} onClick={() => lightDiyas(1)} />
          <FestiveDiya size="xl" isBurning={true} onClick={() => lightDiyas(5)} />
          <FestiveDiya size="md" isBurning={true} onClick={() => lightDiyas(1)} />
          <FestiveDiya size="lg" isBurning={true} onClick={() => lightDiyas(1)} />
        </div>

        {/* Interactive Lighting Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pt-2">
          {/* Diya Counter Display */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-amber-900/30 text-center">
            <p className="text-xs text-stone-400 font-serif-in">अयोध्या में प्रज्वलित कुल पावन दीप</p>
            <div className="font-title text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1 flex items-center justify-center gap-1.5">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{diyasCount.toLocaleString('hi-IN')}</span>
              <span className="text-base text-amber-400 font-serif-in font-normal">दीपक</span>
            </div>
            {userLitCount > 0 && (
              <p className="text-[11px] text-amber-400/90 mt-1 font-medium flex items-center justify-center gap-1">
                <Check className="w-3 h-3" />
                आपने {userLitCount} दीप प्रज्वलित किए हैं
              </p>
            )}
          </div>

          {/* Interactive Diya Click Buttons */}
          <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => lightDiyas(1)}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-stone-950 font-bold text-sm shadow-[0_6px_20px_rgba(245,158,11,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Flame className="w-5 h-5 text-amber-900 fill-amber-900 animate-pulse" />
              <span>श्री राम के नाम १ दीप जलाएं</span>
            </button>

            <button
              onClick={() => lightDiyas(5)}
              className="w-full sm:w-auto px-4 py-3.5 rounded-xl border border-amber-600/60 bg-amber-950/50 hover:bg-amber-900/50 text-amber-200 font-bold text-sm hover:border-amber-400 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>५ दीप जलाएं (पंचदीप)</span>
            </button>

            <button
              onClick={() => lightDiyas(11)}
              className="w-full sm:w-auto px-4 py-3.5 rounded-xl border border-amber-600/60 bg-amber-950/50 hover:bg-amber-900/50 text-amber-200 font-bold text-sm hover:border-amber-400 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>११ दीप (महायज्ञ)</span>
            </button>
          </div>
        </div>

        {/* Real-time Blessing Feedback Toast */}
        {blessingMessage && (
          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/90 via-amber-900/80 to-amber-950/90 border border-amber-500/60 text-amber-200 text-xs sm:text-sm text-center font-serif-in animate-bounce">
            ✨ {blessingMessage} 🪔
          </div>
        )}
      </div>
    </section>
  );
};
